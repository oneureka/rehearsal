export const BOOKING_STATUS_MAP: Record<string, string> = {
  pending: '待确认',
  confirmed: '已确认',
  completed: '已完成',
  cancelled: '已取消'
}

export const CARD_TYPE_MAP: Record<string, string> = {
  timeCard: '计时卡',
  classCard: '次卡',
  discount: '折扣卡'
}

export const TRANSACTION_TYPE_MAP: Record<string, string> = {
  recharge: '充值',
  withdraw: '提现',
  payment: '消费',
  refund: '退款'
}

export const POINTS_TYPE_MAP: Record<string, string> = {
  earn: '获得',
  spend: '消耗'
}

export const PAYMENT_METHOD_MAP: Record<string, string> = {
  balance: '余额支付',
  card: '卡券支付',
  wechat: '微信支付'
}

export const PAGE_SIZE = 20
