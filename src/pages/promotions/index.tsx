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

export default function Promotions() {
  const { availableCoupons, claimedCoupons, claimCoupon } = usePromoCouponStore()
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
    <View className="promotions">
      <View className="promotions-tabs">
        {tabs.map((tab, i) => (
          <View
            key={tab}
            className={`promotions-tab ${i === activeTab ? 'promotions-tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <Text className="promotions-tab-text">{tab}</Text>
            {i === activeTab && <View className="promotions-tab-indicator" />}
          </View>
        ))}
      </View>

      {activeTab === 0 ? (
        <View className="promotions-list">
          {availableCoupons.map((coupon) => (
            <View key={coupon.id} className="promotions-card">
              <View className={`promotions-card-side promotions-card-side--${coupon.type}`}>
                <Text className="promotions-card-side-value">
                  {coupon.type === 'discount' ? `${coupon.value}%` : `${formatPrice(coupon.value)}`}
                </Text>
                <Text className="promotions-card-side-label">
                  {couponTypeLabel[coupon.type]}
                </Text>
              </View>
              <View className="promotions-card-body">
                <Text className="promotions-card-name">{coupon.name}</Text>
                <Text className="promotions-card-desc">{coupon.description}</Text>
                {coupon.condition > 0 && (
                  <Text className="promotions-card-condition">
                    满 {formatPrice(coupon.condition)} 可用
                  </Text>
                )}
                <Text className="promotions-card-expire">
                  有效期 {coupon.validDays} 天
                </Text>
                <View
                  className="promotions-card-btn"
                  hoverClass="hover-btn"
                  onClick={() => handleClaim(coupon.id)}
                >
                  <Text className="promotions-card-btn-text">立即领取</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="promotions-list">
          {claimedCoupons.length === 0 ? (
            <View className="promotions-empty">
              <Text className="promotions-empty-text">暂无优惠券</Text>
            </View>
          ) : (
            claimedCoupons.map((uc) => {
              const coupon = uc.coupon
              if (!coupon) return null
              return (
                <View
                  key={uc.id}
                  className={`promotions-card ${uc.used ? 'promotions-card--used' : ''}`}
                >
                  <View className={`promotions-card-side promotions-card-side--${coupon.type}`}>
                    <Text className="promotions-card-side-value">
                      {coupon.type === 'discount' ? `${coupon.value}%` : formatPrice(coupon.value)}
                    </Text>
                    <Text className="promotions-card-side-label">
                      {couponTypeLabel[coupon.type]}
                    </Text>
                  </View>
                  <View className="promotions-card-body">
                    <Text className="promotions-card-name">{coupon.name}</Text>
                    <Text className="promotions-card-desc">{coupon.description}</Text>
                    <Text className="promotions-card-expire">
                      有效期至 {formatDate(uc.expireDate)}
                    </Text>
                    {uc.used && (
                      <Text className="promotions-card-used">已使用</Text>
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
