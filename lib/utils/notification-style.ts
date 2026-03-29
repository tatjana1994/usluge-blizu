import type { NotificationType } from '@/lib/types/notification';

export function getNotificationTypeStyles(type: NotificationType) {
  switch (type) {
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'error':
      return 'border-rose-200 bg-rose-50 text-rose-700';
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    default:
      return 'border-stone-200 bg-stone-50 text-stone-700';
  }
}
