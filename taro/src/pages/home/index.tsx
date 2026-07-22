import { useState } from 'react'
import { View, Text, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import { mockBanners, mockRooms, mockTeachers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const roomColors = ['#E8D5C4', '#D4C5B2', '#C9BAA3', '#E0D0C0']
const teacherColors = ['#C4A882', '#B89B80', '#D4BFA8', '#C9B090']

function navigateTo(url: string) {
  Taro.navigateTo({ url })
}

export default function Home() {
  const [bannerIndex, setBannerIndex] = useState(0)

  return (
    <View className="home">
      <View className="home-header">
        <Text className="home-logo">rehearsal</Text>
      </View>

      <Swiper
        className="banner"
        autoplay
        circular
        interval={4000}
        indicatorDots={false}
        onChange={(e) => setBannerIndex(e.detail.current)}
      >
        {mockBanners.map((banner) => (
          <SwiperItem key={banner.id} className="banner-slide">
            <View
              className="banner-content"
              style={{ backgroundColor: banner.color }}
            >
              <Text className="banner-title">{banner.title}</Text>
              <Text className="banner-subtitle">{banner.subtitle}</Text>
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className="banner-dots">
        {mockBanners.map((_, i) => (
          <View
            key={i}
            className={`banner-dot ${i === bannerIndex ? 'banner-dot--active' : ''}`}
          />
        ))}
      </View>

      <View className="quick-actions">
        <View
          className="quick-action-item"
          hoverClass="hover-press"
          onClick={() => navigateTo('/pages/room-list/index')}
        >
          <View className="quick-action-icon quick-action-icon--room">
            <Text className="quick-action-icon-text">R</Text>
          </View>
          <Text className="quick-action-label">预约场地</Text>
        </View>
        <View
          className="quick-action-item"
          hoverClass="hover-press"
          onClick={() => navigateTo('/pages/coupon-buy/index')}
        >
          <View className="quick-action-icon quick-action-icon--coupon">
            <Text className="quick-action-icon-text">C</Text>
          </View>
          <Text className="quick-action-label">购买卡券</Text>
        </View>
        <View
          className="quick-action-item"
          hoverClass="hover-press"
          onClick={() => navigateTo('/pages/teacher-list/index')}
        >
          <View className="quick-action-icon quick-action-icon--teacher">
            <Text className="quick-action-icon-text">T</Text>
          </View>
          <Text className="quick-action-label">导师课程</Text>
        </View>
      </View>

      <View className="section">
        <View
          className="section-header"
          hoverClass="hover-opacity"
          onClick={() => navigateTo('/pages/room-list/index')}
        >
          <Text className="section-title">热门舞蹈室</Text>
          <Text className="section-more">查看全部 →</Text>
        </View>
        <ScrollView className="section-scroll" scrollX showScrollbar={false}>
          {mockRooms.map((room, i) => (
            <View
              key={room.id}
              className="room-card"
              hoverClass="hover-press-down"
              onClick={() =>
                navigateTo(`/pages/room-detail/index?id=${room.id}`)
              }
            >
              <View
                className="room-card-image"
                style={{ backgroundColor: roomColors[i % roomColors.length] }}
              >
                <Text className="room-card-image-text">{room.name[0]}</Text>
              </View>
              <View className="room-card-body">
                <Text className="room-card-name">{room.name}</Text>
                <View className="room-card-meta">
                  <Text className="room-card-rating">★ {room.rating}</Text>
                  <Text className="room-card-price">
                    {formatPrice(room.pricePerHour)}/时
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="section">
        <View
          className="section-header"
          hoverClass="hover-opacity"
          onClick={() => navigateTo('/pages/teacher-list/index')}
        >
          <Text className="section-title">推荐导师</Text>
          <Text className="section-more">查看全部 →</Text>
        </View>
        <ScrollView className="section-scroll" scrollX showScrollbar={false}>
          {mockTeachers.map((teacher, i) => (
            <View
              key={teacher.id}
              className="teacher-card"
              hoverClass="hover-scale"
              onClick={() =>
                navigateTo(`/pages/teacher-detail/index?id=${teacher.id}`)
              }
            >
              <View
                className="teacher-avatar"
                style={{
                  backgroundColor: teacherColors[i % teacherColors.length]
                }}
              >
                <Text className="teacher-avatar-text">{teacher.name[0]}</Text>
              </View>
              <Text className="teacher-name">{teacher.name}</Text>
              <Text className="teacher-title">{teacher.title}</Text>
              <View className="teacher-tags">
                {teacher.specialties.slice(0, 2).map((s) => (
                  <Text key={s} className="teacher-tag">
                    {s}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="home-footer">
        <Text className="home-footer-text">rehearsal · 舞蹈空间预约</Text>
      </View>
    </View>
  )
}
