import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { mockSpaces, mockRooms } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'
import './index.css'

const spaceColors = ['#E8D5C4', '#C9BAA3']

const roomTypeLabel: Record<string, string> = {
  dance: '舞蹈房',
  studio: '摄影棚'
}

export default function SpaceDetail() {
  const router = useRouter()
  const space = mockSpaces.find((s) => s.id === router.params.id)

  if (!space) {
    return (
      <View className="space-error">
        <Text>空间不存在</Text>
      </View>
    )
  }

  const rooms = mockRooms.filter((r) => space.spaceIds.includes(r.id))

  return (
    <View className="space">
      <ScrollView className="space-scroll">
        <View
          className="space-hero"
          style={{ backgroundColor: spaceColors[0] }}
        >
          <Text className="space-hero-text">{space.name}</Text>
        </View>

        <View className="space-body">
          <Text className="space-name">{space.name}</Text>
          <Text className="space-desc">{space.description}</Text>

          <View className="space-divider" />

          <View className="space-info">
            <View className="space-info-row">
              <Text className="space-info-label">地址</Text>
              <Text className="space-info-value">{space.address}</Text>
            </View>
            <View className="space-info-row">
              <Text className="space-info-label">电话</Text>
              <Text className="space-info-value">{space.phone}</Text>
            </View>
            <View className="space-info-row">
              <Text className="space-info-label">营业时间</Text>
              <Text className="space-info-value">{space.openHours}</Text>
            </View>
          </View>

          <View className="space-divider" />

          <Text className="space-section-title">所有场地</Text>
          <View className="space-rooms">
            {rooms.map((room) => (
              <View
                key={room.id}
                className="space-room"
                hoverClass="hover-card"
                onClick={() =>
                  Taro.navigateTo({ url: `/pages/room/index?id=${room.id}` })
                }
              >
                <View className="space-room-header">
                  <Text className="space-room-name">{room.name}</Text>
                  <Text className="space-room-type">
                    {roomTypeLabel[room.type]}
                  </Text>
                </View>
                <View className="space-room-meta">
                  <Text className="space-room-meta-item">{room.area}㎡</Text>
                  <Text className="space-room-meta-item">容纳 {room.capacity} 人</Text>
                  <Text className="space-room-meta-item">{formatPrice(room.pricePerHour)}/时</Text>
                </View>
                <View className="space-room-tags">
                  {room.facilities.slice(0, 3).map((f) => (
                    <Text key={f} className="space-room-tag">{f}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
