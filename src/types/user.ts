export interface User {
  id: string
  phone: string
  nickname: string
  avatar: string
  balance: number
  points: number
  createdAt: string
}

export interface LoginParams {
  phone: string
  code: string
}

export interface LoginResult {
  token: string
  user: User
}
