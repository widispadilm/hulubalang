import { api } from '@/lib/api';
import { getSession } from '@/lib/session';
import type { Trip } from '@/lib/types';
import { TrackingClient } from './TrackingClient';

export default async function TripTrackingPage({ params }: PageProps<'/trips/[id]'>) {
  const { id } = await params;
  const session = await getSession();
  const trip = await api.get<Trip>(`/trips/${id}`);

  return <TrackingClient initialTrip={trip} token={session!.token} customerId={session!.user.id} />;
}
