export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/booking/index',
    'pages/coupons/index',
    'pages/profile/index',
    'pages/room-list/index',
    'pages/room-detail/index',
    'pages/room-booking/index',
    'pages/teacher-list/index',
    'pages/teacher-detail/index',
    'pages/course-booking/index',
    'pages/recharge/index',
    'pages/withdraw/index',
    'pages/points/index',
    'pages/coupon-buy/index',
    'pages/order-detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '舞蹈室预约',
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
        pagePath: 'pages/booking/index',
        text: '预约',
        iconPath: 'assets/icons/booking.png',
        selectedIconPath: 'assets/icons/booking-active.png'
      },
      {
        pagePath: 'pages/coupons/index',
        text: '卡券',
        iconPath: 'assets/icons/coupons.png',
        selectedIconPath: 'assets/icons/coupons-active.png'
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
