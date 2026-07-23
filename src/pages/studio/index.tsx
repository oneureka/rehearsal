import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './index.css'
import { mockStudios } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const cardColors: Record<string, string> = {
  '1': '#E8D5C4',
  '2': '#D4C5B2',
  '3': '#C9BAA3',
  '4': '#E0D0C0'
}

const studioTypeLabel: Record<string, string> = {
  dance: '舞蹈房',
  studio: '摄影棚'
}

export default function StudioDetail() {
  const router = useRouter()
  const studio = mockStudios.find((r) => r.id === router.params.id)

  if (!studio) {
    return (
      <View className="studio-detail-error">
        <Text>场地不存在</Text>
      </View>
    )
  }

  const color = cardColors[studio.id] || '#E8D5C4'

  return (
    <View className="studio-detail">
      <ScrollView className="studio-detail-scroll">
        <View className="studio-detail-media" style={{ backgroundColor: color }}>
          <Text className="studio-detail-media-text">{studio.name[0]}</Text>
        </View>

        <View className="studio-detail-body">
          <View className="studio-detail-header">
            <View>
              <Text className="studio-detail-name">{studio.name}</Text>
              <Text className="studio-detail-type">{studioTypeLabel[studio.type]}</Text>
            </View>
            <Text className="studio-detail-price">
              {formatPrice(studio.pricePerHour)}/时
            </Text>
          </View>

          <View className="studio-detail-rating">
            <Text className="studio-detail-stars">★ {studio.rating}</Text>
          </View>

          <View className="studio-detail-info-row">
            <Text className="studio-detail-info-label">面积</Text>
            <Text className="studio-detail-info-value">{studio.area}㎡</Text>
          </View>
          <View className="studio-detail-info-row">
            <Text className="studio-detail-info-label">容纳</Text>
            <Text className="studio-detail-info-value">{studio.capacity} 人</Text>
          </View>

          <View className="studio-detail-address">
            <Text className="studio-detail-address-text">{studio.address}</Text>
          </View>

          <View className="studio-detail-divider" />

          <Text className="studio-detail-section-title">设施</Text>
          <View className="studio-detail-tags">
            {studio.facilities.map((f) => (
              <Text key={f} className="studio-detail-tag">
                {f}
              </Text>
            ))}
          </View>

          <View className="studio-detail-divider" />

          <View className="studio-detail-info-row">
            <Text className="studio-detail-info-label">营业时间</Text>
            <Text className="studio-detail-info-value">{studio.openHours}</Text>
          </View>

          <View className="studio-detail-divider" />

          <Text className="studio-detail-section-title">简介</Text>
          <Text className="studio-detail-desc">{studio.description}</Text>
        </View>
      </ScrollView>

      <View
        className="studio-detail-book"
        hoverClass="hover-btn"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/booking/index?id=${studio.id}`
          })
        }
      >
        <Text className="studio-detail-book-text">空间预约</Text>
      </View>
    </View>
  )
}
