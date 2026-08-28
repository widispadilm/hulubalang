import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import type { AuthUser } from '../common/decorators/current-user.decorator';

const INTERNAL_ROLES = [
  'ADMIN',
  'MARKETING',
  'OPERATION',
  'FINANCE',
  'MANAGEMENT',
  'DRIVER',
  'POOL_KEEPER',
];

@WebSocketGateway({
  cors: { origin: (process.env.CORS_ORIGINS ?? '').split(',').filter(Boolean) },
})
export class RealtimeGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private jwt: JwtService) {}

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token as string | undefined;
      if (!token) return client.disconnect();
      const user = this.jwt.verify<AuthUser>(token);
      (client.data as { user: AuthUser }).user = user;
    } catch {
      client.disconnect();
    }
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    const user = (client.data as { user?: AuthUser }).user;
    if (!user) return;

    const isOwnCustomerRoom = room === `customer:${user.id}`;
    const isInternal = INTERNAL_ROLES.includes(user.role);
    if (isOwnCustomerRoom || isInternal) {
      client.join(room);
    }
  }

  emitTripUpdate(trip: { id: string; orderCustomerId: string }) {
    this.server
      .to(`trip:${trip.id}`)
      .to(`customer:${trip.orderCustomerId}`)
      .to('internal')
      .emit('trip:update', trip);
  }
}
