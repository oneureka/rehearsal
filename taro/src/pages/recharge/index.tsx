import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useTransactionStore } from '@/stores/transactionStore'
import { formatPrice } from '@/utils/format'
import './index.css'

const PRESETS = [5000, 10000, 20000, 50000, 100000, 200000]

export default function Recharge() {
  const balance = useUserStore((s) => s.user.balance)
  const recharge = useTransactionStore((s) => s.recharge)
  const [selected, setSelected] = useState(PRESETS[2])

  const handleRecharge = () => {
    const ok = recharge({ amount: selected, paymentMethod: 'wechat' })
    if (ok) {
      Taro.showToast({ title: '充值成功', icon: 'success' })
    }
  }

  return (
    <View className="recharge">
      <View className="recharge-balance">
        <Text className="recharge-balance-label">当前余额</Text>
        <Text className="recharge-balance-value">{formatPrice(balance)}</Text>
      </View>

      <View className="recharge-section">
        <Text className="recharge-section-title">选择充值金额</Text>
        <View className="recharge-grid">
          {PRESETS.map((amount) => (
            <View
              key={amount}
              className={`recharge-item ${selected === amount ? 'recharge-item--active' : ''}`}
              onClick={() => setSelected(amount)}
            >
              <Text
                className={`recharge-item-value ${selected === amount ? 'recharge-item-value--active' : ''}`}
              >
                ¥{(amount / 100).toFixed(0)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="recharge-section">
        <Text className="recharge-section-title">支付方式</Text>
        <View className="recharge-payment">
          <Text className="recharge-payment-text">微信支付</Text>
        </View>
      </View>

      <View
        className="recharge-submit"
        hoverClass="hover-btn"
        onClick={handleRecharge}
      >
        <Text className="recharge-submit-text">
          充值 {formatPrice(selected)}
        </Text>
      </View>
    </View>
  )
}
