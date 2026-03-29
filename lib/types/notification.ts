export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type NotificationItem = {
  id: string;
  user_id: string;
  listing_id: string | null;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
  link?: string | null;
};
