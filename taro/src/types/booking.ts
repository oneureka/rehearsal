export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface BaseBooking {
  id: string
  userId: string
  status: BookingStatus
  totalPrice: number
  paymentMethod: 'balance' | 'card' | 'wechat'
  createdAt: string
}

export interface RoomBooking extends BaseBooking {
  type: 'room'
  roomId: string
  date: string
  startTime: string
  endTime: string
}

export interface SessionBooking extends BaseBooking {
  type: 'course'
  teacherId: string
  courseId: string
  date: string
  timeSlot: string
}

export type Booking = RoomBooking | SessionBooking

export interface CreateRoomBookingParams {
  roomId: string
  date: string
  startTime: string
  endTime: string
  paymentMethod: 'balance' | 'card' | 'wechat'
  cardId?: string
}

export interface CreateSessionBookingParams {
  teacherId: string
  courseId: string
  date: string
  timeSlot: string
  paymentMethod: 'balance' | 'card' | 'wechat'
  cardId?: string
}
