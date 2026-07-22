import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useCouponStore } from '@/stores/couponStore'
import { formatPrice, formatDate } from '@/utils/format'
import { CARD_TYPE_MAP } from '@/constants'
import './index.css'

export default function Coupons() {
  const { userCards } = useCouponStore()

  if (userCards.length === 0) {
    return (
      <View className="coupons">
        <View className="coupons-empty">
          <View className="coupons-empty-icon">
            <Text className="coupons-empty-icon-text">🎫</Text>
          </View>
          <Text className="coupons-empty-title">暂无卡券</Text>
          <Text className="coupons-empty-desc">购买卡券享受更多优惠</Text>
          <View
            className="coupons-empty-btn"
            hoverClass="hover-btn"
            onClick={() => Taro.navigateTo({ url: '/pages/coupon-buy/index' })}
          >
            <Text className="coupons-empty-btn-text">去购买</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="coupons">
      <View className="coupons-list">
        {userCards.map((card) => (
          <View key={card.id} className="coupons-card">
            <View className="coupons-card-top">
              <Text className="coupons-card-name">
                {card.cardTemplate?.name || '卡券'}
              </Text>
              {card.cardTemplate && (
                <Text className="coupons-card-type">
                  {CARD_TYPE_MAP[card.cardTemplate.type]}
                </Text>
              )}
            </View>
            {card.cardTemplate?.type === 'classCard' && (
              <Text className="coupons-card-count">
                剩余 {card.remainingSessions} 次
              </Text>
            )}
            <View className="coupons-card-bottom">
              <Text className="coupons-card-expire">
                有效期至 {formatDate(card.expireDate)}
              </Text>
              <Text
                className={`coupons-card-status coupons-card-status--${card.status}`}
              >
                {card.status === 'active'
                  ? '有效'
                  : card.status === 'expired'
                    ? '已过期'
                    : '已使用'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
