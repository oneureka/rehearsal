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
