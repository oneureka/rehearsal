import { create } from 'zustand'
import type { PromoCoupon, UserPromoCoupon } from '@/types'
import { useUserStore } from './userStore'

const MOCK_PROMO_COUPONS: PromoCoupon[] = [
  {
    id: 'pc_001',
    name: '新人 5 折券',
    type: 'discount',
    value: 50,
    condition: 0,
    validDays: 7,
    description: '首单场地预约享受 5 折优惠，最高减 ¥100'
  },
  {
    id: 'pc_002',
    name: '满 200 减 30',
    type: 'voucher',
    value: 3000,
    condition: 20000,
    validDays: 30,
    description: '满 ¥200 减 ¥30，适用于所有场地预约'
  },
  {
    id: 'pc_003',
    name: '体验课 8 折券',
    type: 'discount',
    value: 20,
    condition: 0,
    validDays: 14,
    description: '导师课程指导享受 8 折优惠'
  }
]

let seq = 0

interface PromoCouponState {
  availableCoupons: PromoCoupon[]
  userCoupons: UserPromoCoupon[]
  claimCoupon: (id: string) => boolean
}

export const usePromoCouponStore = create<PromoCouponState>((set, get) => ({
  availableCoupons: MOCK_PROMO_COUPONS,
  userCoupons: [],

  claimCoupon: (id) => {
    const coupon = MOCK_PROMO_COUPONS.find((c) => c.id === id)
    if (!coupon) return false

    const userId = useUserStore.getState().user.id
    const alreadyClaimed = get().userCoupons.find(
      (uc) => uc.couponId === id && uc.userId === userId
    )
    if (alreadyClaimed) return false

    seq++
    const now = new Date()
    const expireDate = new Date(now.getTime() + coupon.validDays * 86400000)

    const userCoupon: UserPromoCoupon = {
      id: `upc_${String(seq).padStart(3, '0')}`,
      userId,
      couponId: coupon.id,
      coupon,
      expireDate: expireDate.toISOString(),
      used: false
    }

    set((state) => ({ userCoupons: [userCoupon, ...state.userCoupons] }))
    return true
  }
}))
