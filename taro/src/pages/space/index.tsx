import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { mockSpaces, mockStudios } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'
import './index.css'

const spaceColors = ['#E8D5C4', '#C9BAA3']

const studioTypeLabel: Record<string, string> = {
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

  const studios = mockStudios.filter((r) => space.studioIds.includes(r.id))

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
          <View className="space-studios">
            {studios.map((studio) => (
              <View
                key={studio.id}
                className="space-studio"
                hoverClass="hover-card"
                onClick={() =>
                  Taro.navigateTo({ url: `/pages/studio/index?id=${studio.id}` })
                }
              >
                <View className="space-studio-header">
                  <Text className="space-studio-name">{studio.name}</Text>
                  <Text className="space-studio-type">
                    {studioTypeLabel[studio.type]}
                  </Text>
                </View>
                <View className="space-studio-meta">
                  <Text className="space-studio-meta-item">{studio.area}㎡</Text>
                  <Text className="space-studio-meta-item">容纳 {studio.capacity} 人</Text>
                  <Text className="space-studio-meta-item">{formatPrice(studio.pricePerHour)}/时</Text>
                </View>
                <View className="space-studio-tags">
                  {studio.facilities.slice(0, 3).map((f) => (
                    <Text key={f} className="space-studio-tag">{f}</Text>
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
