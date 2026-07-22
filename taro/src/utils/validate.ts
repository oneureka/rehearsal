export function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

export function isValidAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount)
}

export function isValidTimeSlot(start: string, end: string): boolean {
  return start < end
}
