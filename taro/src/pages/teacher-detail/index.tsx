import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.css'
import { mockTeachers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const avatarColors: Record<string, string> = {
  '1': '#C4A882',
  '2': '#B89B80',
  '3': '#D4BFA8',
  '4': '#C9B090'
}

export default function TeacherDetail() {
  const router = useRouter()
  const teacher = mockTeachers.find((t) => t.id === router.params.id)

  if (!teacher) {
    return (
      <View className="teacher-detail-error">
        <Text>导师不存在</Text>
      </View>
    )
  }

  const color = avatarColors[teacher.id] || '#C4A882'

  return (
    <View className="teacher-detail">
      <ScrollView className="teacher-detail-scroll">
        <View className="teacher-detail-hero">
          <View
            className="teacher-detail-avatar"
            style={{ backgroundColor: color }}
          >
            <Text className="teacher-detail-avatar-text">
              {teacher.name[0]}
            </Text>
          </View>
          <Text className="teacher-detail-name">{teacher.name}</Text>
          <Text className="teacher-detail-title">{teacher.title}</Text>
          <View className="teacher-detail-tags">
            {teacher.specialties.map((s) => (
              <Text key={s} className="teacher-detail-tag">
                {s}
              </Text>
            ))}
          </View>
          <View className="teacher-detail-stats">
            <View className="teacher-detail-stat">
              <Text className="teacher-detail-stat-value">
                {formatPrice(teacher.pricePerSession)}
              </Text>
              <Text className="teacher-detail-stat-label">单节价格</Text>
            </View>
            <View className="teacher-detail-stat-divider" />
            <View className="teacher-detail-stat">
              <Text className="teacher-detail-stat-value">
                ★ {teacher.rating}
              </Text>
              <Text className="teacher-detail-stat-label">评分</Text>
            </View>
          </View>
        </View>

        <View className="teacher-detail-body">
          <View className="teacher-detail-divider" />

          <Text className="teacher-detail-section-title">简介</Text>
          <Text className="teacher-detail-desc">{teacher.description}</Text>

          <View className="teacher-detail-divider" />

          <Text className="teacher-detail-section-title">课程</Text>
          <View className="teacher-detail-empty">
            <Text className="teacher-detail-empty-text">暂无课程信息</Text>
          </View>
        </View>
      </ScrollView>

      <View
        className="teacher-detail-book"
        hoverClass="hover-btn"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/course-booking/index?teacherId=${teacher.id}`
          })
        }
      >
        <Text className="teacher-detail-book-text">预约课程</Text>
      </View>
    </View>
  )
}
