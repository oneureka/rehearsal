import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import { mockTeachers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const avatarColors = ['#C4A882', '#B89B80', '#D4BFA8', '#C9B090']

function goToDetail(id: string) {
  Taro.navigateTo({ url: `/pages/teacher-detail/index?id=${id}` })
}

export default function TeacherList() {
  return (
    <View className="teacher-list">
      {mockTeachers.map((teacher, i) => (
        <View
          key={teacher.id}
          className="teacher-list-card"
          hoverClass="hover-card"
          onClick={() => goToDetail(teacher.id)}
        >
          <View
            className="teacher-list-avatar"
            style={{
              backgroundColor: avatarColors[i % avatarColors.length]
            }}
          >
            <Text className="teacher-list-avatar-text">{teacher.name[0]}</Text>
          </View>
          <View className="teacher-list-body">
            <View className="teacher-list-header">
              <Text className="teacher-list-name">{teacher.name}</Text>
              <Text className="teacher-list-title">{teacher.title}</Text>
            </View>
            <Text className="teacher-list-desc" numberOfLines={2}>
              {teacher.description}
            </Text>
            <View className="teacher-list-row">
              <Text className="teacher-list-price">
                {formatPrice(teacher.pricePerSession)}/节
              </Text>
              <Text className="teacher-list-rating">★ {teacher.rating}</Text>
            </View>
            <View className="teacher-list-tags">
              {teacher.specialties.map((s) => (
                <Text key={s} className="teacher-list-tag">
                  {s}
                </Text>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
