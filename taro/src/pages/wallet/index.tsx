import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useTransactionStore } from '@/stores/transactionStore'
import { formatPrice } from '@/utils/format'
import './index.css'

const PRESETS = [5000, 10000, 20000, 50000, 100000, 200000]

type Tab = 'recharge' | 'withdraw'

export default function Wallet() {
  const balance = useUserStore((s) => s.user.balance)
  const recharge = useTransactionStore((s) => s.recharge)
  const withdraw = useTransactionStore((s) => s.withdraw)

  const [tab, setTab] = useState<Tab>('recharge')
  const [selected, setSelected] = useState(PRESETS[2])
  const [amount, setAmount] = useState('')

  const parsed = Math.floor(parseFloat(amount || '0') * 100)

  const handleRecharge = () => {
    const ok = recharge({ amount: selected, paymentMethod: 'wechat' })
    if (ok) {
      Taro.showToast({ title: '充值成功', icon: 'success' })
    }
  }

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
    <View className="wallet">
      <View className="wallet-balance">
        <Text className="wallet-balance-label">当前余额</Text>
        <Text className="wallet-balance-value">{formatPrice(balance)}</Text>
      </View>

      <View className="wallet-tabs">
        <View
          className={`wallet-tab ${tab === 'recharge' ? 'wallet-tab--active' : ''}`}
          onClick={() => setTab('recharge')}
        >
          <Text className="wallet-tab-text">充值</Text>
        </View>
        <View
          className={`wallet-tab ${tab === 'withdraw' ? 'wallet-tab--active' : ''}`}
          onClick={() => setTab('withdraw')}
        >
          <Text className="wallet-tab-text">提现</Text>
        </View>
      </View>

      {tab === 'recharge' ? (
        <>
          <View className="wallet-section">
            <Text className="wallet-section-title">选择充值金额</Text>
            <View className="wallet-grid">
              {PRESETS.map((amount) => (
                <View
                  key={amount}
                  className={`wallet-item ${selected === amount ? 'wallet-item--active' : ''}`}
                  onClick={() => setSelected(amount)}
                >
                  <Text
                    className={`wallet-item-value ${selected === amount ? 'wallet-item-value--active' : ''}`}
                  >
                    ¥{(amount / 100).toFixed(0)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="wallet-section">
            <Text className="wallet-section-title">支付方式</Text>
            <View className="wallet-payment">
              <Text className="wallet-payment-text">微信支付</Text>
            </View>
          </View>

          <View
            className="wallet-submit"
            hoverClass="hover-btn"
            onClick={handleRecharge}
          >
            <Text className="wallet-submit-text">
              充值 {formatPrice(selected)}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View className="wallet-input-group">
            <Text className="wallet-input-label">提现金额</Text>
            <View className="wallet-input-row">
              <Text className="wallet-input-prefix">¥</Text>
              <Input
                className="wallet-input"
                type="digit"
                placeholder="请输入金额"
                value={amount}
                onInput={(e) => setAmount(e.detail.value)}
              />
            </View>
            <Text className="wallet-input-hint">最低提现 ¥1.00</Text>
          </View>

          <View
            className={`wallet-submit ${parsed > 0 && parsed <= balance ? '' : 'wallet-submit--disabled'}`}
            hoverClass={parsed >= 100 && parsed <= balance ? 'hover-btn' : undefined}
            onClick={handleWithdraw}
          >
            <Text className="wallet-submit-text">提现</Text>
          </View>
        </>
      )}
    </View>
  )
}
