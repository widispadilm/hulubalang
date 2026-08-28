import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AppRole } from './roles.decorator';

export interface AuthUser {
  id: string;
  email: string;
  role: AppRole;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
