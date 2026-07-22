import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useMemo, useState } from 'react'
import { useBookingStore } from '@/stores/bookingStore'
import { useTransactionStore } from '@/stores/transactionStore'
import { mockRooms, mockCoaches } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'
import { BOOKING_STATUS_MAP, TRANSACTION_TYPE_MAP } from '@/constants'
import './index.css'

const tabs = ['全部', '场地', '课程', '交易']

function getLabel(booking: { type: string; roomId?: string; teacherId?: string }) {
  if (booking.type === 'room') {
    const room = mockRooms.find((r) => r.id === booking.roomId)
    return room?.name || '场地'
  }
  const coach = mockCoaches.find((t) => t.id === booking.teacherId)
  return coach?.name || '课程指导'
}

export default function Orders() {
  const bookings = useBookingStore((s) => s.bookings)
  const transactions = useTransactionStore((s) => s.transactions)
  const [activeTab, setActiveTab] = useState(0)

  const filtered = useMemo(() => {
    if (activeTab === 0) {
      const bookingItems = bookings.map((b) => ({ type: 'booking' as const, data: b }))
      const txItems = transactions.map((t) => ({ type: 'transaction' as const, data: t }))
      return [...bookingItems, ...txItems].sort(
        (a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime()
      )
    }
    if (activeTab === 1) return bookings.filter((b) => b.type === 'room').map((b) => ({ type: 'booking' as const, data: b }))
    if (activeTab === 2) return bookings.filter((b) => b.type === 'course').map((b) => ({ type: 'booking' as const, data: b }))
    return transactions.map((t) => ({ type: 'transaction' as const, data: t }))
  }, [bookings, transactions, activeTab])

  return (
    <View className="orders">
      <View className="orders-tabs">
        {tabs.map((tab, i) => (
          <View
            key={tab}
            className={`orders-tab ${i === activeTab ? 'orders-tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <Text className="orders-tab-text">{tab}</Text>
            {i === activeTab && <View className="orders-tab-indicator" />}
          </View>
        ))}
      </View>

      {filtered.length === 0 ? (
        <View className="orders-empty">
          <View className="orders-empty-icon">
            <Text className="orders-empty-icon-text">📋</Text>
          </View>
          <Text className="orders-empty-title">暂无记录</Text>
          <Text className="orders-empty-desc">去预约场地或购买卡券吧</Text>
          <View className="orders-empty-actions">
            <View
              className="orders-empty-btn"
              hoverClass="hover-btn"
              onClick={() => Taro.navigateTo({ url: '/pages/rooms/index' })}
            >
              <Text className="orders-empty-btn-text">空间预约</Text>
            </View>
            <View
              className="orders-empty-btn orders-empty-btn--secondary"
              hoverClass="hover-btn"
              onClick={() => Taro.navigateTo({ url: '/pages/coupon-buy/index' })}
            >
              <Text className="orders-empty-btn-text">购买卡券</Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="orders-list">
          {filtered.map((item) => {
            if (item.type === 'booking') {
              const b = item.data
              const name = getLabel(b)
              return (
                <View
                  key={b.id}
                  className="orders-item"
                  hoverClass="hover-card"
                  onClick={() =>
                    Taro.navigateTo({ url: `/pages/order/index?id=${b.id}` })
                  }
                >
                  <View className="orders-item-top">
                    <Text className="orders-item-name">{name}</Text>
                    <Text className={`orders-item-status orders-item-status--${b.status}`}>
                      {BOOKING_STATUS_MAP[b.status]}
                    </Text>
                  </View>
                  <Text className="orders-item-desc">
                    {b.type === 'room'
                      ? `${b.date} ${b.startTime}-${b.endTime}`
                      : `${b.date} ${b.timeSlot}`}
                  </Text>
                  <View className="orders-item-bottom">
                    <Text className="orders-item-type">
                      {b.type === 'room' ? '场地预约' : '课程指导'}
                    </Text>
                    <Text className="orders-item-price">
                      {formatPrice(b.totalPrice)}
                    </Text>
                  </View>
                </View>
              )
            }
            const tx = item.data
            return (
              <View key={tx.id} className="orders-item">
                <View className="orders-item-top">
                  <Text className="orders-item-name">{tx.description}</Text>
                  <Text className={`orders-item-price ${tx.amount > 0 ? 'orders-item-price--positive' : ''}`}>
                    {tx.amount > 0 ? '+' : ''}{formatPrice(tx.amount)}
                  </Text>
                </View>
                <Text className="orders-item-desc">
                  {TRANSACTION_TYPE_MAP[tx.type]}
                </Text>
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}
