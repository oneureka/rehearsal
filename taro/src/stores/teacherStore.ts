import { create } from 'zustand'
import type { Coach, Course, CoachListParams } from '@/types'

interface CoachState {
  coaches: Coach[]
  currentCoach: Coach | null
  courses: Course[]
  isLoading: boolean
  params: CoachListParams

  setCoaches: (coaches: Coach[]) => void
  setCurrentCoach: (coach: Coach | null) => void
  setCourses: (courses: Course[]) => void
  setParams: (params: CoachListParams) => void
}

export const useCoachStore = create<CoachState>((set) => ({
  coaches: [],
  currentCoach: null,
  courses: [],
  isLoading: false,
  params: {},

  setCoaches: (coaches) => set({ coaches }),
  setCurrentCoach: (coach) => set({ currentCoach: coach }),
  setCourses: (courses) => set({ courses }),
  setParams: (params) => set({ params })
}))
