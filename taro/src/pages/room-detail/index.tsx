import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.css'
import { mockRooms } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const cardColors: Record<string, string> = {
  '1': '#E8D5C4',
  '2': '#D4C5B2',
  '3': '#C9BAA3',
  '4': '#E0D0C0'
}

export default function RoomDetail() {
  const router = useRouter()
  const room = mockRooms.find((r) => r.id === router.params.id)

  if (!room) {
    return (
      <View className="room-detail-error">
        <Text>舞蹈室不存在</Text>
      </View>
    )
  }

  const color = cardColors[room.id] || '#E8D5C4'

  return (
    <View className="room-detail">
      <ScrollView className="room-detail-scroll">
        <View className="room-detail-media" style={{ backgroundColor: color }}>
          <Text className="room-detail-media-text">{room.name[0]}</Text>
        </View>

        <View className="room-detail-body">
          <View className="room-detail-header">
            <Text className="room-detail-name">{room.name}</Text>
            <Text className="room-detail-price">
              {formatPrice(room.pricePerHour)}/时
            </Text>
          </View>

          <View className="room-detail-rating">
            <Text className="room-detail-stars">★ {room.rating}</Text>
          </View>

          <View className="room-detail-address">
            <Text className="room-detail-address-text">{room.address}</Text>
          </View>

          <View className="room-detail-divider" />

          <Text className="room-detail-section-title">设施</Text>
          <View className="room-detail-tags">
            {room.facilities.map((f) => (
              <Text key={f} className="room-detail-tag">
                {f}
              </Text>
            ))}
          </View>

          <View className="room-detail-divider" />

          <View className="room-detail-info-row">
            <Text className="room-detail-info-label">营业时间</Text>
            <Text className="room-detail-info-value">{room.openHours}</Text>
          </View>

          <View className="room-detail-divider" />

          <Text className="room-detail-section-title">简介</Text>
          <Text className="room-detail-desc">{room.description}</Text>
        </View>
      </ScrollView>

      <View
        className="room-detail-book"
        hoverClass="hover-btn"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/room-booking/index?id=${room.id}`
          })
        }
      >
        <Text className="room-detail-book-text">预约场地</Text>
      </View>
    </View>
  )
}
