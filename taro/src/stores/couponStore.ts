import { create } from 'zustand'
import type { CardTemplate, UserCard, PurchaseCardParams } from '@/types'
import { useUserStore } from './userStore'
import { useTransactionStore } from './transactionStore'

const MOCK_TEMPLATES: CardTemplate[] = [
  {
    id: 'ct_001',
    name: '10小时通卡',
    type: 'timeCard',
    value: 600000,
    price: 88000,
    validDays: 90,
    description: '适用于所有场地预约，不限时段'
  },
  {
    id: 'ct_002',
    name: '5次课程卡',
    type: 'classCard',
    value: 5,
    price: 128000,
    validDays: 180,
    description: '适用于所有导师课程指导'
  },
  {
    id: 'ct_003',
    name: '8折折扣卡',
    type: 'discount',
    value: 20,
    price: 19800,
    validDays: 30,
    description: '全场场地预约享受 8 折优惠'
  }
]

let cardSeq = 0

interface CouponState {
  cardTemplates: CardTemplate[]
  userCards: UserCard[]
  isLoading: boolean

  purchaseCard: (params: PurchaseCardParams) => boolean
  addUserCard: (card: UserCard) => void
  useUserCard: (id: string) => void
}

export const useCouponStore = create<CouponState>((set) => ({
  cardTemplates: MOCK_TEMPLATES,
  userCards: [],
  isLoading: false,

  purchaseCard: (params) => {
    const template = MOCK_TEMPLATES.find((t) => t.id === params.cardId)
    if (!template) return false

    const userStore = useUserStore.getState()
    const totalPrice = template.price * params.quantity

    if (userStore.user.balance < totalPrice) return false

    const now = new Date()
    const expireDate = new Date(now.getTime() + template.validDays * 86400000)

    const newCards: UserCard[] = Array.from({ length: params.quantity }, () => {
      cardSeq++
      return {
        id: `uc_${String(cardSeq).padStart(3, '0')}`,
        userId: userStore.user.id,
        cardId: template.id,
        cardTemplate: template,
        remainingSessions: template.type === 'classCard' ? template.value : 0,
        expireDate: expireDate.toISOString(),
        status: 'active'
      }
    })

    userStore.addBalance(-totalPrice)
    useTransactionStore.getState().addTransaction({
      id: `tx_${Date.now()}`,
      userId: userStore.user.id,
      type: 'payment',
      amount: -totalPrice,
      balanceAfter: userStore.user.balance - totalPrice,
      description: `购买 ${template.name} x${params.quantity}`,
      createdAt: new Date().toISOString()
    })

    set((state) => ({ userCards: [...state.userCards, ...newCards] }))
    return true
  },

  addUserCard: (card) =>
    set((state) => ({ userCards: [card, ...state.userCards] })),

  useUserCard: (id) =>
    set((state) => ({
      userCards: state.userCards.map((c) =>
        c.id === id ? { ...c, status: 'used' as const } : c
      )
    }))
}))
