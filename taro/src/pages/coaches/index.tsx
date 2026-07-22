import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import { mockCoaches } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const avatarColors = ['#C4A882', '#B89B80', '#D4BFA8', '#C9B090']

function goToDetail(id: string) {
  Taro.navigateTo({ url: `/pages/coach/index?id=${id}` })
}

export default function CoachList() {
  return (
    <View className="coaches">
      {mockCoaches.map((coach, i) => (
        <View
          key={coach.id}
          className="coaches-card"
          hoverClass="hover-card"
          onClick={() => goToDetail(coach.id)}
        >
          <View
            className="coaches-avatar"
            style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
          >
            <Text className="coaches-avatar-text">{coach.name[0]}</Text>
          </View>
          <View className="coaches-body">
            <View className="coaches-header">
              <Text className="coaches-name">{coach.name}</Text>
              <Text className="coaches-title">{coach.title}</Text>
            </View>
            <Text className="coaches-desc" numberOfLines={2}>
              {coach.description}
            </Text>
            <View className="coaches-row">
              <Text className="coaches-price">
                {formatPrice(coach.pricePerSession)}/节
              </Text>
              <Text className="coaches-rating">★ {coach.rating}</Text>
            </View>
            <View className="coaches-tags">
              {coach.specialties.map((s) => (
                <Text key={s} className="coaches-tag">{s}</Text>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
