'use server';

import { createClient } from '@/lib/supabase/server';

function getString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function markNotificationAsRead(formData: FormData) {
  const supabase = await createClient();
  const id = getString(formData.get('id'));

  if (!id) return;

  await supabase.from('notifications').update({ is_read: true }).eq('id', id);
}
