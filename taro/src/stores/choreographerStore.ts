import { create } from 'zustand'
import type { Choreographer, Course, ChoreographerListParams } from '@/types'

interface ChoreographerState {
  coaches: Choreographer[]
  currentChoreographer: Choreographer | null
  courses: Course[]
  isLoading: boolean
  params: ChoreographerListParams

  setChoreographeres: (coaches: Choreographer[]) => void
  setCurrentChoreographer: (choreographer: Choreographer | null) => void
  setCourses: (courses: Course[]) => void
  setParams: (params: ChoreographerListParams) => void
}

export const useChoreographerStore = create<ChoreographerState>((set) => ({
  coaches: [],
  currentChoreographer: null,
  courses: [],
  isLoading: false,
  params: {},

  setChoreographeres: (coaches) => set({ coaches }),
  setCurrentChoreographer: (choreographer) => set({ currentChoreographer: choreographer }),
  setCourses: (courses) => set({ courses }),
  setParams: (params) => set({ params })
}))
