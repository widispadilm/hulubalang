import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';

export default async function AdminRootPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  } else if (session.user.role === 'DRIVER') {
    redirect('/admin/my-trips');
  } else if (session.user.role === 'POOL_KEEPER') {
    redirect('/admin/checkpoints');
  } else {
    redirect('/admin/dashboard');
  }
}
