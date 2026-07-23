import dayjs from 'dayjs'

export function formatPrice(cents: number): string {
  const yuan = cents / 100
  return `¥${yuan.toFixed(2)}`
}

export function formatDate(date: string): string {
  return dayjs(date).format('YYYY-MM-DD')
}

export function formatDateTime(date: string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export function formatTimeSlot(start: string, end: string): string {
  return `${start}-${end}`
}

export function formatRelativeTime(date: string): string {
  const diff = dayjs().diff(dayjs(date), 'hour')
  if (diff < 1) return '刚刚'
  if (diff < 24) return `${diff}小时前`
  const days = Math.floor(diff / 24)
  if (days < 30) return `${days}天前`
  return formatDate(date)
}
