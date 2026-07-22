export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/coupons/index',
    'pages/orders/index',
    'pages/profile/index',
    'pages/space/index',
    'pages/rooms/index',
    'pages/room/index',
    'pages/room-booking/index',
    'pages/coaches/index',
    'pages/coach/index',
    'pages/course-booking/index',
    'pages/recharge/index',
    'pages/withdraw/index',
    'pages/points/index',
    'pages/coupon-buy/index',
    'pages/coupon-promo/index',
    'pages/faq/index',
    'pages/order/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '场地预约',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#333',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/coupons/index',
        text: '卡券',
        iconPath: 'assets/icons/coupons.png',
        selectedIconPath: 'assets/icons/coupons-active.png'
      },
      {
        pagePath: 'pages/orders/index',
        text: '订单',
        iconPath: 'assets/icons/orders.png',
        selectedIconPath: 'assets/icons/orders-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.png',
        selectedIconPath: 'assets/icons/profile-active.png'
      }
    ]
  }
})
