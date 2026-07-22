import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.css'
import { mockCoaches } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const avatarColors: Record<string, string> = {
  '1': '#C4A882',
  '2': '#B89B80',
  '3': '#D4BFA8',
  '4': '#C9B090'
}

export default function CoachDetail() {
  const router = useRouter()
  const coach = mockCoaches.find((c) => c.id === router.params.id)

  if (!coach) {
    return (
      <View className="coach-error">
        <Text>导师不存在</Text>
      </View>
    )
  }

  const color = avatarColors[coach.id] || '#C4A882'

  return (
    <View className="coach">
      <ScrollView className="coach-scroll">
        <View className="coach-hero">
          <View className="coach-avatar" style={{ backgroundColor: color }}>
            <Text className="coach-avatar-text">{coach.name[0]}</Text>
          </View>
          <Text className="coach-name">{coach.name}</Text>
          <Text className="coach-title">{coach.title}</Text>
          <View className="coach-tags">
            {coach.specialties.map((s) => (
              <Text key={s} className="coach-tag">{s}</Text>
            ))}
          </View>
          <View className="coach-stats">
            <View className="coach-stat">
              <Text className="coach-stat-value">{formatPrice(coach.pricePerSession)}</Text>
              <Text className="coach-stat-label">单节价格</Text>
            </View>
            <View className="coach-stat-divider" />
            <View className="coach-stat">
              <Text className="coach-stat-value">★ {coach.rating}</Text>
              <Text className="coach-stat-label">评分</Text>
            </View>
          </View>
        </View>

        <View className="coach-body">
          <View className="coach-divider" />
          <Text className="coach-section-title">简介</Text>
          <Text className="coach-desc">{coach.description}</Text>

          <View className="coach-divider" />
          <Text className="coach-section-title">课程</Text>
          <View className="coach-empty">
            <Text className="coach-empty-text">暂无课程信息</Text>
          </View>
        </View>
      </ScrollView>

      <View
        className="coach-book"
        hoverClass="hover-btn"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/course-booking/index?teacherId=${coach.id}`
          })
        }
      >
        <Text className="coach-book-text">课程指导</Text>
      </View>
    </View>
  )
}
