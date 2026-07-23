import { create } from 'zustand'
import type { Studio, TimeSlot, StudioListParams } from '@/types'

interface StudioState {
  studios: Studio[]
  currentStudio: Studio | null
  availableSlots: TimeSlot[]
  isLoading: boolean
  params: StudioListParams

  setStudios: (studios: Studio[]) => void
  setCurrentStudio: (studio: Studio | null) => void
  setAvailableSlots: (slots: TimeSlot[]) => void
  setParams: (params: StudioListParams) => void
  resetParams: () => void
}

const defaultParams: StudioListParams = {}

export const useStudioStore = create<StudioState>((set) => ({
  studios: [],
  currentStudio: null,
  availableSlots: [],
  isLoading: false,
  params: { ...defaultParams },

  setStudios: (studios) => set({ studios }),
  setCurrentStudio: (studio) => set({ currentStudio: studio }),
  setAvailableSlots: (slots) => set({ availableSlots: slots }),
  setParams: (params) => set({ params }),
  resetParams: () => set({ params: { ...defaultParams } })
}))
