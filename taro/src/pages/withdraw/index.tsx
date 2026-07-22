import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useTransactionStore } from '@/stores/transactionStore'
import { formatPrice } from '@/utils/format'
import './index.css'

export default function Withdraw() {
  const balance = useUserStore((s) => s.user.balance)
  const withdraw = useTransactionStore((s) => s.withdraw)
  const [amount, setAmount] = useState('')

  const parsed = Math.floor(parseFloat(amount || '0') * 100)

  const handleWithdraw = () => {
    if (parsed < 100) {
      Taro.showToast({ title: '最低提现 ¥1.00', icon: 'none' })
      return
    }
    if (parsed > balance) {
      Taro.showToast({ title: '余额不足', icon: 'none' })
      return
    }
    const ok = withdraw(parsed)
    if (ok) {
      Taro.showToast({ title: '提现申请已提交', icon: 'success' })
      setAmount('')
    }
  }

  return (
    <View className="withdraw">
      <View className="withdraw-balance">
        <Text className="withdraw-balance-label">可提现余额</Text>
        <Text className="withdraw-balance-value">{formatPrice(balance)}</Text>
      </View>

      <View className="withdraw-input-group">
        <Text className="withdraw-input-label">提现金额</Text>
        <View className="withdraw-input-row">
          <Text className="withdraw-input-prefix">¥</Text>
          <Input
            className="withdraw-input"
            type="digit"
            placeholder="请输入金额"
            value={amount}
            onInput={(e) => setAmount(e.detail.value)}
          />
        </View>
        <Text className="withdraw-input-hint">最低提现 ¥1.00</Text>
      </View>

      <View
        className="withdraw-submit"
        hoverClass="hover-btn"
        onClick={handleWithdraw}
      >
        <Text className="withdraw-submit-text">提现</Text>
      </View>
    </View>
  )
}
