import { create } from 'zustand'
import type { DanceRoom, TimeSlot, RoomListParams } from '@/types'

interface RoomState {
  rooms: DanceRoom[]
  currentRoom: DanceRoom | null
  availableSlots: TimeSlot[]
  isLoading: boolean
  params: RoomListParams

  setRooms: (rooms: DanceRoom[]) => void
  setCurrentRoom: (room: DanceRoom | null) => void
  setAvailableSlots: (slots: TimeSlot[]) => void
  setParams: (params: RoomListParams) => void
  resetParams: () => void
}

const defaultParams: RoomListParams = {}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  currentRoom: null,
  availableSlots: [],
  isLoading: false,
  params: { ...defaultParams },

  setRooms: (rooms) => set({ rooms }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setAvailableSlots: (slots) => set({ availableSlots: slots }),
  setParams: (params) => set({ params }),
  resetParams: () => set({ params: { ...defaultParams } })
}))
