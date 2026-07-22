import { create } from 'zustand'
import type { Choreographer, ChoreographerListParams } from '@/types'

interface ChoreographerState {
  choreographers: Choreographer[]
  currentChoreographer: Choreographer | null
  isLoading: boolean
  params: ChoreographerListParams

  setChoreographers: (choreographers: Choreographer[]) => void
  setCurrentChoreographer: (choreographer: Choreographer | null) => void
  setParams: (params: ChoreographerListParams) => void
}

export const useChoreographerStore = create<ChoreographerState>((set) => ({
  choreographers: [],
  currentChoreographer: null,
  isLoading: false,
  params: {},

  setChoreographers: (choreographers) => set({ choreographers }),
  setCurrentChoreographer: (choreographer) => set({ currentChoreographer: choreographer }),
  setParams: (params) => set({ params })
}))
