import { notFound, redirect } from 'next/navigation';
import { getCustomerSession } from '@/lib/session';
import { tripsService } from '@/server/services/trips.service';
import { TrackingClient } from './TrackingClient';

export default async function TripTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getCustomerSession();
  if (!session) redirect('/login');

  let trip;
  try {
    trip = await tripsService.findOneAuthorized(id, session.user);
  } catch {
    notFound();
  }

  // Serialize dates for client
  const serializedTrip = JSON.parse(JSON.stringify(trip));

  return <TrackingClient initialTrip={serializedTrip} />;
}
