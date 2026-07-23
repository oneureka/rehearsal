import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useCouponStore } from '@/stores/couponStore'
import { useUserStore } from '@/stores/userStore'
import { formatPrice } from '@/utils/format'
import { CARD_TYPE_MAP } from '@/constants'
import './index.css'

export default function CouponBuy() {
  const { cardTemplates, purchaseCard } = useCouponStore()
  const balance = useUserStore((s) => s.user.balance)
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const qty = (id: string) => quantities[id] || 1

  const changeQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = (prev[id] || 1) + delta
      if (next < 1) return prev
      return { ...prev, [id]: next }
    })
  }

  const handleBuy = (cardId: string) => {
    const ok = purchaseCard({ cardId, quantity: qty(cardId) })
    if (ok) {
      Taro.showToast({ title: '购买成功', icon: 'success' })
      setQuantities((prev) => ({ ...prev, [cardId]: 1 }))
    } else {
      Taro.showToast({ title: '余额不足', icon: 'none' })
    }
  }

  return (
    <View className="coupon-buy">
      <View className="coupon-buy-balance">
        <Text className="coupon-buy-balance-label">余额</Text>
        <Text className="coupon-buy-balance-value">{formatPrice(balance)}</Text>
      </View>

      {cardTemplates.map((card) => (
        <View key={card.id} className="coupon-buy-card">
          <View className="coupon-buy-card-top">
            <Text className="coupon-buy-card-name">{card.name}</Text>
            <Text className="coupon-buy-card-type">
              {CARD_TYPE_MAP[card.type]}
            </Text>
          </View>
          <Text className="coupon-buy-card-value">
            {card.type === 'discount'
              ? `${100 - card.value}折`
              : card.type === 'classCard'
                ? `${card.value}次`
                : '通用'}
          </Text>
          <Text className="coupon-buy-card-desc">{card.description}</Text>

          <View className="coupon-buy-card-qty">
            <Text className="coupon-buy-card-qty-label">数量</Text>
            <View className="coupon-buy-card-qty-ctrl">
              <View
                className="coupon-buy-card-qty-btn"
                hoverClass="hover-btn"
                onClick={() => changeQty(card.id, -1)}
              >
                <Text className="coupon-buy-card-qty-btn-text">−</Text>
              </View>
              <Text className="coupon-buy-card-qty-num">{qty(card.id)}</Text>
              <View
                className="coupon-buy-card-qty-btn"
                hoverClass="hover-btn"
                onClick={() => changeQty(card.id, 1)}
              >
                <Text className="coupon-buy-card-qty-btn-text">+</Text>
              </View>
            </View>
          </View>

          <View className="coupon-buy-card-bottom">
            <View>
              <Text className="coupon-buy-card-price">
                {formatPrice(card.price * qty(card.id))}
              </Text>
              <Text className="coupon-buy-card-unit">
                {formatPrice(card.price)}/张
              </Text>
            </View>
            <View
              className="coupon-buy-card-btn"
              hoverClass="hover-btn"
              onClick={() => handleBuy(card.id)}
            >
              <Text className="coupon-buy-card-btn-text">立即购买</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
