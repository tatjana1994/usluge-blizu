import { redirect } from 'next/navigation';
import { requireUser } from './require-user';

export async function requireAdmin() {
  const { supabase, user } = await requireUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  return { supabase, user, profile };
}
