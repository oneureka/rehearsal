import { View, Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { useBookingStore } from '@/stores/bookingStore'
import { mockRooms, mockTeachers } from '@/services/mock/data'
import { formatPrice, formatDateTime } from '@/utils/format'
import { BOOKING_STATUS_MAP } from '@/constants'
import './index.css'

export default function OrderDetail() {
  const { params } = useRouter()
  const booking = useBookingStore((s) =>
    s.bookings.find((b) => b.id === params.id)
  )

  if (!booking) {
    return (
      <View className="order-detail">
        <View className="order-detail-card">
          <Text className="order-detail-card-title">订单详情</Text>
          <View className="order-detail-divider" />
          <View className="order-detail-row">
            <Text className="order-detail-label">订单编号</Text>
            <Text className="order-detail-value">{params.id || '—'}</Text>
          </View>
          <View className="order-detail-row">
            <Text className="order-detail-label">状态</Text>
            <Text className="order-detail-value">未找到</Text>
          </View>
        </View>
      </View>
    )
  }

  const subjectName =
    booking.type === 'room'
      ? mockRooms.find((r) => r.id === booking.roomId)?.name || '舞蹈室'
      : mockTeachers.find((t) => t.id === booking.teacherId)?.name || '导师课程'

  return (
    <View className="order-detail">
      <View className="order-detail-card">
        <Text className="order-detail-card-title">订单详情</Text>
        <View className="order-detail-divider" />
        <View className="order-detail-row">
          <Text className="order-detail-label">名称</Text>
          <Text className="order-detail-value">{subjectName}</Text>
        </View>
        <View className="order-detail-row">
          <Text className="order-detail-label">类型</Text>
          <Text className="order-detail-value">
            {booking.type === 'room' ? '场地预约' : '课程预约'}
          </Text>
        </View>
        <View className="order-detail-row">
          <Text className="order-detail-label">日期</Text>
          <Text className="order-detail-value">{booking.date}</Text>
        </View>
        <View className="order-detail-row">
          <Text className="order-detail-label">时段</Text>
          <Text className="order-detail-value">
            {booking.type === 'room'
              ? `${booking.startTime}-${booking.endTime}`
              : booking.timeSlot}
          </Text>
        </View>
        <View className="order-detail-divider" />
        <View className="order-detail-row">
          <Text className="order-detail-label">金额</Text>
          <Text className="order-detail-price">
            {formatPrice(booking.totalPrice)}
          </Text>
        </View>
        <View className="order-detail-row">
          <Text className="order-detail-label">状态</Text>
          <Text
            className={`order-detail-status order-detail-status--${booking.status}`}
          >
            {BOOKING_STATUS_MAP[booking.status]}
          </Text>
        </View>
        <View className="order-detail-divider" />
        <View className="order-detail-row">
          <Text className="order-detail-label">订单编号</Text>
          <Text className="order-detail-value">{booking.id}</Text>
        </View>
        <View className="order-detail-row">
          <Text className="order-detail-label">创建时间</Text>
          <Text className="order-detail-value">
            {formatDateTime(booking.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  )
}
