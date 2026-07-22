import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useMemo, useState } from 'react'
import { useBookingStore } from '@/stores/bookingStore'
import { mockRooms, mockTeachers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'
import { BOOKING_STATUS_MAP } from '@/constants'
import './index.css'

const tabs = ['全部', '场地', '课程']

function getLabel(booking: {
  type: string
  roomId?: string
  teacherId?: string
}) {
  if (booking.type === 'room') {
    const room = mockRooms.find((r) => r.id === booking.roomId)
    return room?.name || '舞蹈室'
  }
  const teacher = mockTeachers.find((t) => t.id === booking.teacherId)
  return teacher?.name || '导师课程'
}

export default function Booking() {
  const bookings = useBookingStore((s) => s.bookings)
  const [activeTab, setActiveTab] = useState(0)

  const filtered = useMemo(() => {
    if (activeTab === 0) return bookings
    if (activeTab === 1) return bookings.filter((b) => b.type === 'room')
    return bookings.filter((b) => b.type === 'course')
  }, [bookings, activeTab])

  return (
    <View className="booking">
      <View className="booking-tabs">
        {tabs.map((tab, i) => (
          <View
            key={tab}
            className={`booking-tab ${i === activeTab ? 'booking-tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <Text className="booking-tab-text">{tab}</Text>
            {i === activeTab && <View className="booking-tab-indicator" />}
          </View>
        ))}
      </View>

      {filtered.length === 0 ? (
        <View className="booking-empty">
          <View className="booking-empty-icon">
            <Text className="booking-empty-icon-text">📋</Text>
          </View>
          <Text className="booking-empty-title">暂无预约记录</Text>
          <Text className="booking-empty-desc">去预约舞蹈室或导师课程吧</Text>
          <View className="booking-empty-actions">
            <View
              className="booking-empty-btn"
              hoverClass="hover-btn"
              onClick={() => Taro.navigateTo({ url: '/pages/room-list/index' })}
            >
              <Text className="booking-empty-btn-text">预约场地</Text>
            </View>
            <View
              className="booking-empty-btn booking-empty-btn--secondary"
              hoverClass="hover-btn"
              onClick={() =>
                Taro.navigateTo({ url: '/pages/teacher-list/index' })
              }
            >
              <Text className="booking-empty-btn-text">预约课程</Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="booking-list">
          {filtered.map((booking) => (
            <View
              key={booking.id}
              className="booking-item"
              hoverClass="hover-card"
              onClick={() =>
                Taro.navigateTo({
                  url: `/pages/order-detail/index?id=${booking.id}`
                })
              }
            >
              <View className="booking-item-top">
                <Text className="booking-item-name">{getLabel(booking)}</Text>
                <Text
                  className={`booking-item-status booking-item-status--${booking.status}`}
                >
                  {BOOKING_STATUS_MAP[booking.status]}
                </Text>
              </View>
              <Text className="booking-item-desc">
                {booking.type === 'room'
                  ? `${booking.date} ${booking.startTime}-${booking.endTime}`
                  : `${booking.date} ${booking.timeSlot}`}
              </Text>
              <View className="booking-item-bottom">
                <Text className="booking-item-type">
                  {booking.type === 'room' ? '场地预约' : '课程预约'}
                </Text>
                <Text className="booking-item-price">
                  {formatPrice(booking.totalPrice)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
