'use server';

import { redirect } from 'next/navigation';
import { getCustomerSession } from '@/lib/session';
import { ordersService } from '@/server/services/orders.service';
import type { ShipmentType } from '@/lib/types';

export interface VehicleInput {
  shipmentType: ShipmentType;
  vehicleBrand: string;
  vehicleModel: string;
  plateNumber: string;
  chassisNumber: string;
  engineNumber: string;
}

export interface CreateOrderInput {
  pic: string;
  originCity: string;
  destinationCity: string;
  requestPickupDate: string;
  specialInstruction?: string;
  vehicles: VehicleInput[];
}

export async function createOrderAction(input: CreateOrderInput): Promise<{ error?: string }> {
  const session = await getCustomerSession();
  if (!session) return { error: 'Sesi telah berakhir, silakan login kembali' };

  let orderId: string;
  try {
    const order = await ordersService.createForCustomer(session.user.id, input);
    orderId = order.id;
  } catch (e: any) {
    return { error: e.message ?? 'Gagal membuat order' };
  }

  redirect(`/orders/${orderId}`);
}
