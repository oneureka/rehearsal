import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { usePromoCouponStore } from '@/stores/promoCouponStore'
import { formatPrice, formatDate } from '@/utils/format'
import './index.css'

const tabs = ['可领取', '我的优惠券']

const couponTypeLabel: Record<string, string> = {
  discount: '打折券',
  voucher: '满减券'
}

export default function CouponPromo() {
  const { availableCoupons, userCoupons, claimCoupon } = usePromoCouponStore()
  const [activeTab, setActiveTab] = useState(0)

  const handleClaim = (id: string) => {
    const ok = claimCoupon(id)
    if (ok) {
      Taro.showToast({ title: '领取成功', icon: 'success' })
    } else {
      Taro.showToast({ title: '已领取过', icon: 'none' })
    }
  }

  return (
    <View className="coupon-promo">
      <View className="coupon-promo-tabs">
        {tabs.map((tab, i) => (
          <View
            key={tab}
            className={`coupon-promo-tab ${i === activeTab ? 'coupon-promo-tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <Text className="coupon-promo-tab-text">{tab}</Text>
            {i === activeTab && <View className="coupon-promo-tab-indicator" />}
          </View>
        ))}
      </View>

      {activeTab === 0 ? (
        <View className="coupon-promo-list">
          {availableCoupons.map((coupon) => (
            <View key={coupon.id} className="coupon-promo-card">
              <View className={`coupon-promo-card-side coupon-promo-card-side--${coupon.type}`}>
                <Text className="coupon-promo-card-side-value">
                  {coupon.type === 'discount' ? `${coupon.value}%` : `${formatPrice(coupon.value)}`}
                </Text>
                <Text className="coupon-promo-card-side-label">
                  {couponTypeLabel[coupon.type]}
                </Text>
              </View>
              <View className="coupon-promo-card-body">
                <Text className="coupon-promo-card-name">{coupon.name}</Text>
                <Text className="coupon-promo-card-desc">{coupon.description}</Text>
                {coupon.condition > 0 && (
                  <Text className="coupon-promo-card-condition">
                    满 {formatPrice(coupon.condition)} 可用
                  </Text>
                )}
                <Text className="coupon-promo-card-expire">
                  有效期 {coupon.validDays} 天
                </Text>
                <View
                  className="coupon-promo-card-btn"
                  hoverClass="hover-btn"
                  onClick={() => handleClaim(coupon.id)}
                >
                  <Text className="coupon-promo-card-btn-text">立即领取</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="coupon-promo-list">
          {userCoupons.length === 0 ? (
            <View className="coupon-promo-empty">
              <Text className="coupon-promo-empty-text">暂无优惠券</Text>
            </View>
          ) : (
            userCoupons.map((uc) => {
              const coupon = uc.coupon
              if (!coupon) return null
              return (
                <View
                  key={uc.id}
                  className={`coupon-promo-card ${uc.used ? 'coupon-promo-card--used' : ''}`}
                >
                  <View className={`coupon-promo-card-side coupon-promo-card-side--${coupon.type}`}>
                    <Text className="coupon-promo-card-side-value">
                      {coupon.type === 'discount' ? `${coupon.value}%` : formatPrice(coupon.value)}
                    </Text>
                    <Text className="coupon-promo-card-side-label">
                      {couponTypeLabel[coupon.type]}
                    </Text>
                  </View>
                  <View className="coupon-promo-card-body">
                    <Text className="coupon-promo-card-name">{coupon.name}</Text>
                    <Text className="coupon-promo-card-desc">{coupon.description}</Text>
                    <Text className="coupon-promo-card-expire">
                      有效期至 {formatDate(uc.expireDate)}
                    </Text>
                    {uc.used && (
                      <Text className="coupon-promo-card-used">已使用</Text>
                    )}
                  </View>
                </View>
              )
            })
          )}
        </View>
      )}
    </View>
  )
}
