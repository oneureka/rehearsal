export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface BaseBooking {
  id: string
  userId: string
  status: BookingStatus
  totalPrice: number
  paymentMethod: 'balance' | 'card' | 'wechat'
  createdAt: string
}

export interface StudioBooking extends BaseBooking {
  type: 'studio'
  studioId: string
  date: string
  startTime: string
  endTime: string
}

export interface SessionBooking extends BaseBooking {
  type: 'course'
  choreographerId: string
  courseId: string
  date: string
  timeSlot: string
}

export type Booking = StudioBooking | SessionBooking

export interface CreateStudioBookingParams {
  studioId: string
  date: string
  startTime: string
  endTime: string
  paymentMethod: 'balance' | 'card' | 'wechat'
  cardId?: string
}

export interface CreateSessionBookingParams {
  choreographerId: string
  courseId: string
  date: string
  timeSlot: string
  paymentMethod: 'balance' | 'card' | 'wechat'
  cardId?: string
}
