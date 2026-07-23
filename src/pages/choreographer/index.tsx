import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.css'
import { mockChoreographers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const avatarColors: Record<string, string> = {
  '1': '#C4A882',
  '2': '#B89B80',
  '3': '#D4BFA8',
  '4': '#C9B090'
}

export default function ChoreographerDetail() {
  const router = useRouter()
  const choreographer = mockChoreographers.find((c) => c.id === router.params.id)

  if (!choreographer) {
    return (
      <View className="choreographer-error">
        <Text>导师不存在</Text>
      </View>
    )
  }

  const color = avatarColors[choreographer.id] || '#C4A882'

  return (
    <View className="choreographer">
      <ScrollView className="choreographer-scroll">
        <View className="choreographer-hero">
          <View className="choreographer-avatar" style={{ backgroundColor: color }}>
            <Text className="choreographer-avatar-text">{choreographer.name[0]}</Text>
          </View>
          <Text className="choreographer-name">{choreographer.name}</Text>
          <Text className="choreographer-title">{choreographer.title}</Text>
          <View className="choreographer-tags">
            {choreographer.specialties.map((s) => (
              <Text key={s} className="choreographer-tag">{s}</Text>
            ))}
          </View>
          <View className="choreographer-stats">
            <View className="choreographer-stat">
              <Text className="choreographer-stat-value">{formatPrice(choreographer.pricePerSession)}</Text>
              <Text className="choreographer-stat-label">单节价格</Text>
            </View>
            <View className="choreographer-stat-divider" />
            <View className="choreographer-stat">
              <Text className="choreographer-stat-value">★ {choreographer.rating}</Text>
              <Text className="choreographer-stat-label">评分</Text>
            </View>
          </View>
        </View>

        <View className="choreographer-body">
          <View className="choreographer-divider" />
          <Text className="choreographer-section-title">简介</Text>
          <Text className="choreographer-desc">{choreographer.description}</Text>

          <View className="choreographer-divider" />
          <Text className="choreographer-section-title">课程</Text>
          <View className="choreographer-empty">
            <Text className="choreographer-empty-text">暂无课程信息</Text>
          </View>
        </View>
      </ScrollView>

      <View
        className="choreographer-book"
        hoverClass="hover-btn"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/lessons/index?choreographerId=${choreographer.id}`
          })
        }
      >
        <Text className="choreographer-book-text">课程指导</Text>
      </View>
    </View>
  )
}
