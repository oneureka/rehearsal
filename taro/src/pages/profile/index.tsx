import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useUserStore } from '@/stores/userStore'
import { useCouponStore } from '@/stores/couponStore'
import { formatPrice } from '@/utils/format'
import './index.css'

export default function Profile() {
  const { user } = useUserStore()
  const cardCount = useCouponStore((s) => s.userCards.length)

  return (
    <View className="profile">
      <View className="profile-header">
        <View className="profile-avatar">
          <Text className="profile-avatar-text">{user.nickname[0]}</Text>
        </View>
        <Text className="profile-name">{user.nickname}</Text>
        <Text className="profile-phone">{user.phone}</Text>
      </View>

      <View className="profile-stats">
        <View className="profile-stat">
          <Text className="profile-stat-value">
            {formatPrice(user.balance)}
          </Text>
          <Text className="profile-stat-label">余额</Text>
        </View>
        <View className="profile-stat-divider" />
        <View className="profile-stat">
          <Text className="profile-stat-value">{user.points}</Text>
          <Text className="profile-stat-label">积分</Text>
        </View>
        <View className="profile-stat-divider" />
        <View className="profile-stat">
          <Text className="profile-stat-value">{cardCount}</Text>
          <Text className="profile-stat-label">卡券</Text>
        </View>
      </View>

      <View className="profile-menu">
        <View
          className="profile-menu-item"
          hoverClass="hover-opacity"
          onClick={() => Taro.navigateTo({ url: '/pages/order-detail/index' })}
        >
          <Text className="profile-menu-text">我的订单</Text>
          <Text className="profile-menu-arrow">→</Text>
        </View>
        <View className="profile-menu-divider" />
        <View
          className="profile-menu-item"
          hoverClass="hover-opacity"
          onClick={() => Taro.navigateTo({ url: '/pages/recharge/index' })}
        >
          <Text className="profile-menu-text">余额充值</Text>
          <Text className="profile-menu-arrow">→</Text>
        </View>
        <View className="profile-menu-divider" />
        <View
          className="profile-menu-item"
          hoverClass="hover-opacity"
          onClick={() => Taro.navigateTo({ url: '/pages/withdraw/index' })}
        >
          <Text className="profile-menu-text">提现</Text>
          <Text className="profile-menu-arrow">→</Text>
        </View>
        <View className="profile-menu-divider" />
        <View
          className="profile-menu-item"
          hoverClass="hover-opacity"
          onClick={() => Taro.navigateTo({ url: '/pages/points/index' })}
        >
          <Text className="profile-menu-text">积分明细</Text>
          <Text className="profile-menu-arrow">→</Text>
        </View>
        <View className="profile-menu-divider" />
        <View
          className="profile-menu-item"
          hoverClass="hover-opacity"
          onClick={() => Taro.navigateTo({ url: '/pages/coupons/index' })}
        >
          <Text className="profile-menu-text">我的卡券</Text>
          <Text className="profile-menu-arrow">→</Text>
        </View>
      </View>
    </View>
  )
}
