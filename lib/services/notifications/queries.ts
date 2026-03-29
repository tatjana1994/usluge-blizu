import { createClient } from '@/lib/supabase/server';

export async function getUserNotifications(userId: string, limit = 20) {
  const supabase = await createClient();

  const { data } = await supabase
    .from('notifications')
    .select(
      'id, user_id, listing_id, title, message, type, is_read, created_at, link',
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return data ?? [];
}
