export function formatDateTime(value: string) {
  return new Date(value).toLocaleString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString('sr-RS');
}
