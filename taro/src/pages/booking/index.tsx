import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useBookingStore } from '@/stores/bookingStore'
import { mockRooms } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'
import TimeSlotPicker from '@/components/TimeSlotPicker'
import Loading from '@/components/Loading'
import './index.css'

export default function Booking() {
  const router = useRouter()
  const room = mockRooms.find((r) => r.id === router.params.id)
  const balance = useUserStore((s) => s.user.balance)
  const addBooking = useBookingStore((s) => s.addBooking)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedStart, setSelectedStart] = useState(0)
  const [selectedEnd, setSelectedEnd] = useState(0)
  const [loading, setLoading] = useState(false)

  if (!room) {
    return (
      <View className="booking-error">
        <Text>预约信息有误</Text>
      </View>
    )
  }

  const hours = Math.max(0, selectedEnd - selectedStart)
  const total = hours * room.pricePerHour
  const canSubmit = hours > 0 && total <= balance

  const handleSlotSelect = (date: string, start: number, end: number) => {
    setSelectedDate(date)
    setSelectedStart(start)
    setSelectedEnd(end)
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setLoading(true)
    setTimeout(() => {
      addBooking({
        id: `bk_${Date.now()}`,
        userId: useUserStore.getState().user.id,
        type: 'room',
        roomId: room.id,
        date: selectedDate,
        startTime: `${selectedStart}:00`,
        endTime: `${selectedEnd}:00`,
        totalPrice: total,
        paymentMethod: 'balance',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      })
      setLoading(false)
      Taro.showToast({ title: '预约成功', icon: 'success' })
      setTimeout(() => Taro.navigateBack(), 1500)
    }, 800)
  }

  return (
    <View className="booking">
      <Loading visible={loading} text="提交中..." />

      <View className="booking-card">
        <Text className="booking-card-name">{room.name}</Text>
        <Text className="booking-card-price">
          {formatPrice(room.pricePerHour)}/时
        </Text>
      </View>

      <TimeSlotPicker
        pricePerHour={room.pricePerHour}
        onSelect={handleSlotSelect}
      />

      <View className="booking-section">
        <Text className="booking-section-title">支付方式</Text>
        <View className="booking-payment">
          <View className="booking-payment-item">
            <View>
              <Text className="booking-payment-label">余额支付</Text>
              <Text className="booking-payment-desc">
                可用 {formatPrice(balance)}
              </Text>
            </View>
            <Text className="booking-payment-check">✓</Text>
          </View>
        </View>
      </View>

      <View className="booking-total">
        <Text className="booking-total-label">共 {hours} 小时</Text>
        <Text className="booking-total-price">{formatPrice(total)}</Text>
      </View>

      <View
        className={`booking-submit ${!canSubmit ? 'booking-submit--disabled' : ''}`}
        hoverClass={canSubmit ? 'hover-btn' : undefined}
        onClick={handleSubmit}
      >
        <Text className="booking-submit-text">
          {canSubmit ? '确认预约' : hours > 0 ? '余额不足' : '请选择时段'}
        </Text>
      </View>
    </View>
  )
}
