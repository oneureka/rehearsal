export type TransactionType = 'recharge' | 'withdraw' | 'payment' | 'refund'

export interface Transaction {
  id: string
  userId: string
  type: TransactionType
  amount: number
  balanceAfter: number
  description: string
  createdAt: string
}

export interface PointsRecord {
  id: string
  userId: string
  points: number
  type: 'earn' | 'spend'
  description: string
  createdAt: string
}

export interface RechargeParams {
  amount: number
  paymentMethod: 'wechat'
}

export interface WithdrawParams {
  amount: number
}
