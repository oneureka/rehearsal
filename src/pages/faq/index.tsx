import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import './index.css'

const faqList = [
  {
    q: '如何预约场地？',
    a: '在首页点击"预约中心"或进入"场地列表"选择心仪的场地，选择日期和时段后确认预约即可。'
  },
  {
    q: '预约后可以取消吗？',
    a: '预约成功后可在预约中心查看详情并取消订单。已确认的预约请提前 2 小时取消。'
  },
  {
    q: '什么是卡券？',
    a: '卡券是可购买的预付产品，包括计时卡、次卡和折扣卡，购买后在有效期内可使用。'
  },
  {
    q: '什么是优惠券？',
    a: '优惠券为满减券或打折券，可在首页"优惠券"入口领取，预约时抵扣使用。'
  },
  {
    q: '余额可以提现吗？',
    a: '可以在"我的"页面点击提现，最低提现金额为 ¥1.00，提现后将扣除相应余额。'
  },
  {
    q: '积分如何获得？',
    a: '每充值 ¥1 可获得 1 积分。积分目前可在积分中心查看积累情况。'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <View className="faq">
      <View className="faq-header">
        <Text className="faq-header-title">常见问题</Text>
        <Text className="faq-header-desc">了解如何使用 rehearsal</Text>
      </View>
      <View className="faq-list">
        {faqList.map((item, i) => (
          <View
            key={i}
            className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <View className="faq-item-q">
              <Text className="faq-item-q-text">{item.q}</Text>
              <Text className="faq-item-arrow">{openIndex === i ? '−' : '+'}</Text>
            </View>
            {openIndex === i && (
              <View className="faq-item-a">
                <Text className="faq-item-a-text">{item.a}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}
