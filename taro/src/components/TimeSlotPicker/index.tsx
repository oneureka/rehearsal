import { View, Text, Picker } from '@tarojs/components'
import { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import './index.css'

const HOURS = Array.from({ length: 12 }, (_, i) => i + 9)

interface TimeSlotPickerProps {
  pricePerHour: number
  onSelect?: (date: string, start: number, end: number) => void
}

export default function TimeSlotPicker({
  pricePerHour,
  onSelect
}: TimeSlotPickerProps) {
  const today = dayjs().format('YYYY-MM-DD')
  const [date, setDate] = useState(today)
  const [start, setStart] = useState<number | null>(null)
  const [end, setEnd] = useState<number | null>(null)

  const dateDisplay = useMemo(() => dayjs(date).format('MM月DD日 ddd'), [date])

  const handleDateChange = (e: { detail: { value: string } }) => {
    setDate(e.detail.value)
    setStart(null)
    setEnd(null)
  }

  const selectSlot = (hour: number) => {
    if (start === null || (start !== null && end !== null)) {
      setStart(hour)
      setEnd(null)
      return
    }
    if (hour <= start) {
      setStart(hour)
      setEnd(null)
      return
    }
    const newEnd = hour
    setEnd(newEnd)
    onSelect?.(date, start, newEnd)
  }

  const hours = Math.max(0, (end ?? 0) - (start ?? 0))
  const total = hours * pricePerHour

  return (
    <View className="tsp">
      <View className="tsp-section">
        <View className="tsp-section-header">
          <Text className="tsp-section-title">选择日期</Text>
        </View>
        <Picker
          mode="date"
          value={date}
          onChange={handleDateChange}
          start={today}
        >
          <View className="tsp-date">
            <Text className="tsp-date-value">{dateDisplay}</Text>
            <Text className="tsp-date-arrow">▼</Text>
          </View>
        </Picker>
      </View>

      <View className="tsp-section">
        <View className="tsp-section-header">
          <Text className="tsp-section-title">选择时段</Text>
          <Text className="tsp-section-hint">
            {start
              ? `已选 ${start}:00 - ${end ?? '?'}:00 ${hours}小时`
              : '点选开始和结束时间'}
          </Text>
        </View>
        <View className="tsp-grid">
          {HOURS.map((h) => {
            const selected =
              start !== null && h >= start && (end === null || h < end)
            const edge = h === start || h === end
            return (
              <View
                key={h}
                className={`tsp-slot ${selected ? 'tsp-slot--selected' : ''} ${edge ? 'tsp-slot--edge' : ''}`}
                hoverClass="tsp-slot--hover"
                onClick={() => selectSlot(h)}
              >
                <Text
                  className={`tsp-slot-text ${selected ? 'tsp-slot-text--selected' : ''}`}
                >
                  {h}:00
                </Text>
              </View>
            )
          })}
        </View>
      </View>

      <View className="tsp-total">
        <Text className="tsp-total-label">共 {hours} 小时</Text>
        <Text className="tsp-total-price">¥{(total / 100).toFixed(0)}</Text>
      </View>
    </View>
  )
}
