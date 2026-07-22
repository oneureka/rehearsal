import { View, Text, Picker } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/userStore'
import { useBookingStore } from '@/stores/bookingStore'
import { mockTeachers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'
import Loading from '@/components/Loading'
import './index.css'

const SLOTS = ['10:00', '11:00', '14:00', '15:00', '16:00', '19:00', '20:00']

export default function CourseBooking() {
  const router = useRouter()
  const teacher = mockTeachers.find((t) => t.id === router.params.teacherId)
  const balance = useUserStore((s) => s.user.balance)
  const addBooking = useBookingStore((s) => s.addBooking)

  const today = dayjs().format('YYYY-MM-DD')
  const [date, setDate] = useState(today)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loading, setLoading] = useState(false)

  const dateDisplay = useMemo(() => dayjs(date).format('MM月DD日 ddd'), [date])

  if (!teacher) {
    return (
      <View className="course-booking-error">
        <Text>预约信息有误</Text>
      </View>
    )
  }

  const price = teacher.pricePerSession
  const canSubmit = !!selectedSlot && price <= balance

  const handleSubmit = () => {
    if (!canSubmit) return
    setLoading(true)
    setTimeout(() => {
      addBooking({
        id: `bk_${Date.now()}`,
        userId: useUserStore.getState().user.id,
        type: 'course',
        teacherId: teacher.id,
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
    <View className="course-booking">
      <Loading visible={loading} text="提交中..." />

      <View className="course-booking-card">
        <View className="course-booking-avatar course-booking-avatar--lg">
          <Text className="course-booking-avatar-text">{teacher.name[0]}</Text>
        </View>
        <View className="course-booking-card-body">
          <Text className="course-booking-card-name">{teacher.name}</Text>
          <Text className="course-booking-card-title">{teacher.title}</Text>
          <Text className="course-booking-card-price">
            {formatPrice(price)}/节
          </Text>
        </View>
      </View>

      <View className="course-booking-section">
        <Text className="course-booking-section-title">选择日期</Text>
        <Picker
          mode="date"
          value={date}
          onChange={(e) => setDate(e.detail.value)}
          start={today}
        >
          <View className="course-booking-picker">
            <Text className="course-booking-picker-text">{dateDisplay}</Text>
            <Text className="course-booking-picker-arrow">▼</Text>
          </View>
        </Picker>
      </View>

      <View className="course-booking-section">
        <Text className="course-booking-section-title">选择时段</Text>
        <View className="course-booking-slots">
          {SLOTS.map((slot) => (
            <View
              key={slot}
              className={`course-booking-slot ${selectedSlot === slot ? 'course-booking-slot--active' : ''}`}
              hoverClass="course-booking-slot--hover"
              onClick={() => setSelectedSlot(slot)}
            >
              <Text
                className={`course-booking-slot-text ${selectedSlot === slot ? 'course-booking-slot-text--active' : ''}`}
              >
                {slot}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="course-booking-section">
        <Text className="course-booking-section-title">支付方式</Text>
        <View className="course-booking-payment">
          <View className="course-booking-payment-item">
            <View>
              <Text className="course-booking-payment-label">余额支付</Text>
              <Text className="course-booking-payment-desc">
                可用 {formatPrice(balance)}
              </Text>
            </View>
            <Text className="course-booking-payment-check">✓</Text>
          </View>
        </View>
      </View>

      <View className="course-booking-total">
        <Text className="course-booking-total-label">合计</Text>
        <Text className="course-booking-total-price">{formatPrice(price)}</Text>
      </View>

      <View
        className={`course-booking-submit ${!canSubmit ? 'course-booking-submit--disabled' : ''}`}
        hoverClass={canSubmit ? 'hover-btn' : undefined}
        onClick={handleSubmit}
      >
        <Text className="course-booking-submit-text">
          {canSubmit ? '确认预约' : selectedSlot ? '余额不足' : '请选择时段'}
        </Text>
      </View>
    </View>
  )
}
