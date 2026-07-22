import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import { mockRooms } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const cardColors = ['#E8D5C4', '#D4C5B2', '#C9BAA3', '#E0D0C0']

const roomTypeLabel: Record<string, string> = {
  dance: '舞蹈房',
  studio: '摄影棚'
}

function goToDetail(id: string) {
  Taro.navigateTo({ url: `/pages/room/index?id=${id}` })
}

export default function RoomList() {
  return (
    <View className="room-list">
      {mockRooms.map((room, i) => (
        <View
          key={room.id}
          className="room-list-card"
          hoverClass="hover-card"
          onClick={() => goToDetail(room.id)}
        >
          <View
            className="room-list-card-media"
            style={{ backgroundColor: cardColors[i % cardColors.length] }}
          >
            <Text className="room-list-card-media-text">{room.name[0]}</Text>
          </View>
          <View className="room-list-card-body">
            <View className="room-list-card-header">
              <Text className="room-list-card-name">{room.name}</Text>
              <Text className="room-list-card-type">
                {roomTypeLabel[room.type]}
              </Text>
            </View>
            <View className="room-list-card-row">
              <Text className="room-list-card-size">{room.area}㎡ · 容纳 {room.capacity}人</Text>
              <Text className="room-list-card-rating">★ {room.rating}</Text>
            </View>
            <View className="room-list-card-row">
              <Text className="room-list-card-price">
                {formatPrice(room.pricePerHour)}/时
              </Text>
            </View>
            <View className="room-list-card-tags">
              {room.facilities.slice(0, 4).map((f) => (
                <Text key={f} className="room-list-card-tag">
                  {f}
                </Text>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
