import { create } from 'zustand'
import type { Booking } from '@/types'

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk_001',
    userId: 'user_001',
    type: 'room',
    roomId: '1',
    date: '2026-07-25',
    startTime: '14:00',
    endTime: '16:00',
    totalPrice: 25600,
    paymentMethod: 'balance',
    status: 'confirmed',
    createdAt: '2026-07-22T10:00:00+08:00'
  }
]

interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  isLoading: boolean

  setBookings: (bookings: Booking[]) => void
  addBooking: (booking: Booking) => void
  setCurrentBooking: (booking: Booking | null) => void
  updateBookingStatus: (id: string, status: Booking['status']) => void
  cancelBooking: (id: string) => void
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: MOCK_BOOKINGS,
  currentBooking: null,
  isLoading: false,

  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) =>
    set((state) => ({ bookings: [booking, ...state.bookings] })),
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  updateBookingStatus: (id, status) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, status } : b))
    })),
  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status: 'cancelled' as const } : b
      )
    }))
}))
