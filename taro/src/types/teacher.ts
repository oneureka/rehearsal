export interface Teacher {
  id: string
  name: string
  avatar: string
  title: string
  description: string
  rating: number
  pricePerSession: number
  specialties: string[]
}

export interface Course {
  id: string
  teacherId: string
  name: string
  description: string
  duration: number
  price: number
  type: 'group' | 'private'
  maxStudents: number
}

export interface TeacherListParams {
  specialty?: string
  minRating?: number
}
