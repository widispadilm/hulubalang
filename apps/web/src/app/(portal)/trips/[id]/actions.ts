'use server';

import { getCustomerSession, getAdminSession } from '@/lib/session';
import { tripsService } from '@/server/services/trips.service';

export async function getTripAction(tripId: string) {
  const customerSession = await getCustomerSession();
  const adminSession = await getAdminSession();
  const session = customerSession || adminSession;
  if (!session) return null;

  try {
    const trip = await tripsService.findOneAuthorized(tripId, session.user);
    return JSON.parse(JSON.stringify(trip));
  } catch {
    return null;
  }
}
