import { View, Text, Picker } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/userStore'
import { useBookingStore } from '@/stores/bookingStore'
import { mockChoreographers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'
import Loading from '@/components/Loading'
import './index.css'

const SLOTS = ['10:00', '11:00', '14:00', '15:00', '16:00', '19:00', '20:00']

export default function LessonBooking() {
  const router = useRouter()
  const choreographer = mockChoreographers.find((c) => c.id === router.params.choreographerId)
  const balance = useUserStore((s) => s.user.balance)
  const addBooking = useBookingStore((s) => s.addBooking)

  const today = dayjs().format('YYYY-MM-DD')
  const [date, setDate] = useState(today)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loading, setLoading] = useState(false)

  const dateDisplay = useMemo(() => dayjs(date).format('MM月DD日 ddd'), [date])

  if (!choreographer) {
    return (
      <View className="lesson-error">
        <Text>预约信息有误</Text>
      </View>
    )
  }

  const price = choreographer.pricePerSession
  const canSubmit = !!selectedSlot && price <= balance

  const handleSubmit = () => {
    if (!canSubmit) return
    setLoading(true)
    setTimeout(() => {
      addBooking({
        id: `bk_${Date.now()}`,
        userId: useUserStore.getState().user.id,
        type: 'course',
        choreographerId: choreographer.id,
        courseId: '',
        date,
        timeSlot: selectedSlot,
        totalPrice: price,
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
    <View className="lesson">
      <Loading visible={loading} text="提交中..." />

      <View className="lesson-card">
        <View className="lesson-avatar lesson-avatar--lg">
          <Text className="lesson-avatar-text">{choreographer.name[0]}</Text>
        </View>
        <View className="lesson-card-body">
          <Text className="lesson-card-name">{choreographer.name}</Text>
          <Text className="lesson-card-title">{choreographer.title}</Text>
          <Text className="lesson-card-price">
            {formatPrice(price)}/节
          </Text>
        </View>
      </View>

      <View className="lesson-section">
        <Text className="lesson-section-title">选择日期</Text>
        <Picker
          mode="date"
          value={date}
          onChange={(e) => setDate(e.detail.value)}
          start={today}
        >
          <View className="lesson-picker">
            <Text className="lesson-picker-text">{dateDisplay}</Text>
            <Text className="lesson-picker-arrow">▼</Text>
          </View>
        </Picker>
      </View>

      <View className="lesson-section">
        <Text className="lesson-section-title">选择时段</Text>
        <View className="lesson-slots">
          {SLOTS.map((slot) => (
            <View
              key={slot}
              className={`lesson-slot ${selectedSlot === slot ? 'lesson-slot--active' : ''}`}
              hoverClass="lesson-slot--hover"
              onClick={() => setSelectedSlot(slot)}
            >
              <Text
                className={`lesson-slot-text ${selectedSlot === slot ? 'lesson-slot-text--active' : ''}`}
              >
                {slot}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="lesson-section">
        <Text className="lesson-section-title">支付方式</Text>
        <View className="lesson-payment">
          <View className="lesson-payment-item">
            <View>
              <Text className="lesson-payment-label">余额支付</Text>
              <Text className="lesson-payment-desc">
                可用 {formatPrice(balance)}
              </Text>
            </View>
            <Text className="lesson-payment-check">✓</Text>
          </View>
        </View>
      </View>

      <View className="lesson-total">
        <Text className="lesson-total-label">合计</Text>
        <Text className="lesson-total-price">{formatPrice(price)}</Text>
      </View>

      <View
        className={`lesson-submit ${!canSubmit ? 'lesson-submit--disabled' : ''}`}
        hoverClass={canSubmit ? 'hover-btn' : undefined}
        onClick={handleSubmit}
      >
        <Text className="lesson-submit-text">
          {canSubmit ? '确认预约' : selectedSlot ? '余额不足' : '请选择时段'}
        </Text>
      </View>
    </View>
  )
}
