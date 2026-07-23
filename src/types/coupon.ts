export type CardType = 'timeCard' | 'classCard' | 'discount'

export interface CardTemplate {
  id: string
  name: string
  type: CardType
  value: number
  price: number
  validDays: number
  description: string
}

export interface UserCard {
  id: string
  userId: string
  cardId: string
  cardTemplate?: CardTemplate
  remainingSessions: number
  expireDate: string
  status: 'active' | 'expired' | 'used'
}

export interface PurchaseCardParams {
  cardId: string
  quantity: number
}

export type PromoCouponType = 'discount' | 'voucher'

export interface PromoCoupon {
  id: string
  name: string
  type: PromoCouponType
  value: number
  condition: number
  validDays: number
  description: string
}

export interface ClaimedCoupon {
  id: string
  userId: string
  couponId: string
  coupon?: PromoCoupon
  expireDate: string
  used: boolean
}
