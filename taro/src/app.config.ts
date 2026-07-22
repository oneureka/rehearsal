export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/coupons/index',
    'pages/orders/index',
    'pages/profile/index',
    'pages/space/index',
    'pages/room/index',
    'pages/booking/index',
    'pages/choreographers/index',
    'pages/choreographer/index',
    'pages/lessons/index',
    'pages/wallet/index',
    'pages/points/index',
    'pages/coupon-buy/index',
    'pages/promotions/index',
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
