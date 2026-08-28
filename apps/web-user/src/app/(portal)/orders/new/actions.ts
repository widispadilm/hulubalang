'use server';

import { redirect } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
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
  let orderId: string;
  try {
    const order = await api.post<{ id: string }>('/orders', {
      ...input,
      requestPickupDate: new Date(input.requestPickupDate).toISOString(),
    });
    orderId = order.id;
  } catch (e) {
    return { error: e instanceof ApiError ? e.message : 'Gagal membuat order' };
  }
  redirect(`/orders/${orderId}`);
}
