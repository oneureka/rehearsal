import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import { mockChoreographers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const avatarColors = ['#C4A882', '#B89B80', '#D4BFA8', '#C9B090']

function goToDetail(id: string) {
  Taro.navigateTo({ url: `/pages/choreographer/index?id=${id}` })
}

export default function ChoreographerList() {
  return (
    <View className="choreographers">
      {mockChoreographers.map((choreographer, i) => (
        <View
          key={choreographer.id}
          className="choreographers-card"
          hoverClass="hover-card"
          onClick={() => goToDetail(choreographer.id)}
        >
          <View
            className="choreographers-avatar"
            style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
          >
            <Text className="choreographers-avatar-text">{choreographer.name[0]}</Text>
          </View>
          <View className="choreographers-body">
            <View className="choreographers-header">
              <Text className="choreographers-name">{choreographer.name}</Text>
              <Text className="choreographers-title">{choreographer.title}</Text>
            </View>
            <Text className="choreographers-desc" numberOfLines={2}>
              {choreographer.description}
            </Text>
            <View className="choreographers-row">
              <Text className="choreographers-price">
                {formatPrice(choreographer.pricePerSession)}/节
              </Text>
              <Text className="choreographers-rating">★ {choreographer.rating}</Text>
            </View>
            <View className="choreographers-tags">
              {choreographer.specialties.map((s) => (
                <Text key={s} className="choreographers-tag">{s}</Text>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
