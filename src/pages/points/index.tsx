import { View, Text } from '@tarojs/components'
import { useUserStore } from '@/stores/userStore'
import { useTransactionStore } from '@/stores/transactionStore'
import { formatRelativeTime } from '@/utils/format'
import './index.css'

export default function Points() {
  const points = useUserStore((s) => s.user.points)
  const pointsRecords = useTransactionStore((s) => s.pointsRecords)

  return (
    <View className="points">
      <View className="points-header">
        <Text className="points-header-value">{points}</Text>
        <Text className="points-header-label">当前积分</Text>
      </View>

      <View className="points-list">
        {pointsRecords.length === 0 ? (
          <View className="points-empty">
            <Text className="points-empty-text">暂无积分记录</Text>
          </View>
        ) : (
          pointsRecords.map((record) => (
            <View key={record.id} className="points-record">
              <View className="points-record-left">
                <Text className="points-record-desc">{record.description}</Text>
                <Text className="points-record-time">
                  {formatRelativeTime(record.createdAt)}
                </Text>
              </View>
              <Text
                className={`points-record-points ${record.type === 'earn' ? 'points-record-points--earn' : 'points-record-points--spend'}`}
              >
                {record.type === 'earn' ? '+' : '-'}
                {record.points}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  )
}
