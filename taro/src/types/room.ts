export interface DanceRoom {
  id: string
  name: string
  description: string
  address: string
  images: string[]
  facilities: string[]
  pricePerHour: number
  rating: number
  openHours: string
}

export interface TimeSlot {
  date: string
  startTime: string
  endTime: string
  available: boolean
}

export interface RoomListParams {
  keyword?: string
  district?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'rating' | 'price' | 'distance'
}
