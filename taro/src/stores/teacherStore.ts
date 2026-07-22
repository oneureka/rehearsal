import { create } from 'zustand'
import type { Teacher, Course, TeacherListParams } from '@/types'

interface TeacherState {
  teachers: Teacher[]
  currentTeacher: Teacher | null
  courses: Course[]
  isLoading: boolean
  params: TeacherListParams

  setTeachers: (teachers: Teacher[]) => void
  setCurrentTeacher: (teacher: Teacher | null) => void
  setCourses: (courses: Course[]) => void
  setParams: (params: TeacherListParams) => void
}

export const useTeacherStore = create<TeacherState>((set) => ({
  teachers: [],
  currentTeacher: null,
  courses: [],
  isLoading: false,
  params: {},

  setTeachers: (teachers) => set({ teachers }),
  setCurrentTeacher: (teacher) => set({ currentTeacher: teacher }),
  setCourses: (courses) => set({ courses }),
  setParams: (params) => set({ params })
}))
