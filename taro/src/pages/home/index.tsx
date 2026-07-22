import { useState } from 'react'
import { View, Text, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import { mockBanners, mockSpaces, mockRooms, mockChoreographers } from '@/services/mock/data'
import { formatPrice } from '@/utils/format'

const roomColors = ['#E8D5C4', '#D4C5B2', '#C9BAA3', '#E0D0C0']
const choreographerColors = ['#C4A882', '#B89B80', '#D4BFA8', '#C9B090']

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
          onClick={() => Taro.switchTab({ url: '/pages/orders/index' })}
        >
          <View className="quick-action-icon quick-action-icon--room">
            <Text className="quick-action-icon-text">R</Text>
          </View>
          <Text className="quick-action-label">预约中心</Text>
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
          onClick={() => navigateTo('/pages/choreographers/index')}
        >
          <View className="quick-action-icon quick-action-icon--teacher">
            <Text className="quick-action-icon-text">T</Text>
          </View>
          <Text className="quick-action-label">课程指导</Text>
        </View>
        <View
          className="quick-action-item"
          hoverClass="hover-press"
          onClick={() => navigateTo('/pages/promotions/index')}
        >
          <View className="quick-action-icon quick-action-icon--teacher">
            <Text className="quick-action-icon-text">P</Text>
          </View>
          <Text className="quick-action-label">优惠券</Text>
        </View>
      </View>

      <View className="section">
        <View className="section-header">
          <Text className="section-title">我们的空间</Text>
        </View>
        {mockSpaces.map((space) => (
          <View
            key={space.id}
            className="space-card"
            hoverClass="hover-card"
            onClick={() => navigateTo(`/pages/space/index?id=${space.id}`)}
          >
            <View className="space-card-top">
              <Text className="space-card-name">{space.name}</Text>
              <Text className="space-card-arrow">→</Text>
            </View>
            <Text className="space-card-address">{space.address}</Text>
            <Text className="space-card-hours">{space.openHours}</Text>
          </View>
        ))}
      </View>

      <View className="section">
        <View className="section-header">
          <Text className="section-title">精选场地</Text>
        </View>
        <ScrollView className="section-scroll" scrollX showScrollbar={false}>
          {mockRooms.map((room, i) => (
            <View
              key={room.id}
              className="room-card"
              hoverClass="hover-press-down"
              onClick={() =>
                navigateTo(`/pages/room/index?id=${room.id}`)
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
          onClick={() => navigateTo('/pages/choreographers/index')}
        >
          <Text className="section-title">人气导师</Text>
          <Text className="section-more">查看全部 →</Text>
        </View>
        <ScrollView className="section-scroll" scrollX showScrollbar={false}>
          {mockChoreographers.map((choreographer, i) => (
            <View
              key={choreographer.id}
              className="choreographer-card"
              hoverClass="hover-scale"
              onClick={() =>
                navigateTo(`/pages/choreographer/index?id=${choreographer.id}`)
              }
            >
              <View
                className="choreographer-avatar"
                style={{
                  backgroundColor: choreographerColors[i % choreographerColors.length]
                }}
              >
                <Text className="choreographer-avatar-text">{choreographer.name[0]}</Text>
              </View>
              <Text className="choreographer-name">{choreographer.name}</Text>
              <Text className="choreographer-title">{choreographer.title}</Text>
              <View className="choreographer-tags">
                {choreographer.specialties.slice(0, 2).map((s) => (
                  <Text key={s} className="choreographer-tag">
                    {s}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="home-footer">
        <Text className="home-footer-text">rehearsal</Text>
      </View>
    </View>
  )
}
