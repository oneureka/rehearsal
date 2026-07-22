import { View, Text } from '@tarojs/components'
import './index.css'

interface LoadingProps {
  visible: boolean
  text?: string
}

export default function Loading({ visible, text = '加载中...' }: LoadingProps) {
  if (!visible) return null

  return (
    <View className="loading-mask">
      <View className="loading-box">
        <View className="loading-spinner" />
        <Text className="loading-text">{text}</Text>
      </View>
    </View>
  )
}
