export interface Studio {
  id: string
  name: string
  description: string
  address: string
  images: string[]
  facilities: string[]
  pricePerHour: number
  rating: number
  openHours: string
  spaceId: string
  area: number
  capacity: number
  type: 'dance' | 'studio'
}

export interface TimeSlot {
  date: string
  startTime: string
  endTime: string
  available: boolean
}

export interface StudioListParams {
  keyword?: string
  district?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'rating' | 'price' | 'distance'
}
