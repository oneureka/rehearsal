import { create } from 'zustand'
import type { Transaction, PointsRecord, RechargeParams } from '@/types'
import { useUserStore } from './userStore'

const MOCK_POINTS: PointsRecord[] = [
  {
    id: 'pr_001',
    userId: 'user_001',
    points: 100,
    type: 'earn',
    description: '首次注册奖励',
    createdAt: '2026-06-07T01:17:14+08:00'
  }
]

interface TransactionState {
  transactions: Transaction[]
  pointsRecords: PointsRecord[]
  isLoading: boolean

  addTransaction: (transaction: Transaction) => void
  recharge: (params: RechargeParams) => boolean
  withdraw: (amount: number) => boolean
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  pointsRecords: MOCK_POINTS,
  isLoading: false,

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions]
    })),

  recharge: (params) => {
    const userStore = useUserStore.getState()
    if (params.amount <= 0) return false

    userStore.addBalance(params.amount)
    userStore.addPoints(Math.floor(params.amount / 100))

    const now = new Date().toISOString()
    const transaction: Transaction = {
      id: `tx_${Date.now()}`,
      userId: userStore.user.id,
      type: 'recharge',
      amount: params.amount,
      balanceAfter: userStore.user.balance + params.amount,
      description: `微信充值 ¥${(params.amount / 100).toFixed(0)}`,
      createdAt: now
    }
    const pointsRecord: PointsRecord = {
      id: `pr_${Date.now()}`,
      userId: userStore.user.id,
      points: Math.floor(params.amount / 100),
      type: 'earn',
      description: `充值赠送积分`,
      createdAt: now
    }

    set((state) => ({
      transactions: [transaction, ...state.transactions],
      pointsRecords: [pointsRecord, ...state.pointsRecords]
    }))
    return true
  },

  withdraw: (amount) => {
    const userStore = useUserStore.getState()
    if (amount <= 0) return false
    if (userStore.user.balance < amount) return false

    userStore.addBalance(-amount)

    const transaction: Transaction = {
      id: `tx_${Date.now()}`,
      userId: userStore.user.id,
      type: 'withdraw',
      amount: -amount,
      balanceAfter: userStore.user.balance - amount,
      description: `余额提现 ¥${(amount / 100).toFixed(0)}`,
      createdAt: new Date().toISOString()
    }

    set((state) => ({
      transactions: [transaction, ...state.transactions]
    }))
    return true
  }
}))
