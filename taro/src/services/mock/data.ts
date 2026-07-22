import type { Studio, Choreographer, Space } from '@/types'

export interface BannerItem {
  id: string
  title: string
  subtitle: string
  color: string
}

export const mockBanners: BannerItem[] = [
  {
    id: '1',
    title: '新人 5 折券 + 体验课',
    subtitle: '首次预约立减 ¥50',
    color: '#E8D5C4'
  },
  {
    id: '2',
    title: '人气导师',
    subtitle: '限时公开课报名中',
    color: '#D4C5B2'
  },
  {
    id: '3',
    title: '精选场地',
    subtitle: '舞蹈房 · 摄影棚 · 专业设备',
    color: '#C4A882'
  }
]

export const mockSpaces: Space[] = [
  {
    id: 'space_001',
    name: 'Oneureka 静安店',
    address: '上海市静安区南京西路1788号',
    phone: '021-6288-8888',
    openHours: '09:00-22:00',
    description: '位于静安寺商圈，交通便利，配备专业舞蹈房与摄影棚',
    images: [],
    studioIds: ['1', '2']
  },
  {
    id: 'space_002',
    name: 'Oneureka 徐汇店',
    address: '上海市徐汇区衡山路10号',
    phone: '021-6433-9999',
    openHours: '08:00-23:00',
    description: '坐落于衡复历史文化风貌区，大型排练空间与专业录音设备',
    images: [],
    studioIds: ['3', '4']
  }
]

export const mockStudios: Studio[] = [
  {
    id: '1',
    name: 'Hype Dance Studio',
    description: '专业舞蹈训练空间，配备进口地胶和环绕音响系统',
    address: '上海市静安区南京西路1788号',
    images: [],
    facilities: ['K-pop', '自然光', '镜面墙', '专业音响', '空调'],
    pricePerHour: 12800,
    rating: 4.8,
    openHours: '09:00-22:00',
    spaceId: 'space_001',
    area: 80,
    capacity: 6,
    type: 'dance'
  },
  {
    id: '2',
    name: 'Butterfly 摄影棚',
    description: '专业摄影棚，配备影室灯、背景架及隔音系统，适合平面拍摄与视频录制',
    address: '上海市静安区南京西路1788号',
    images: [],
    facilities: ['隔音', '专业设备', '背景架', '影室灯', '化妆间'],
    pricePerHour: 15800,
    rating: 4.7,
    openHours: '10:00-21:00',
    spaceId: 'space_001',
    area: 60,
    capacity: 4,
    type: 'studio'
  },
  {
    id: '3',
    name: 'X-Studio 排练厅',
    description: '大型排练空间，适合团体课、编舞排练和公开课',
    address: '上海市徐汇区衡山路10号',
    images: [],
    facilities: ['街舞', '大型排练', '专业音响', '地胶', '休息区'],
    pricePerHour: 15800,
    rating: 4.9,
    openHours: '08:00-23:00',
    spaceId: 'space_002',
    area: 120,
    capacity: 12,
    type: 'dance'
  },
  {
    id: '4',
    name: 'Muse 舞蹈空间',
    description: '温馨小班教室，落地镜面墙，沉浸式灯光系统',
    address: '上海市徐汇区衡山路10号',
    images: [],
    facilities: ['自然光', '镜面墙', '全身镜', '音响', '空调'],
    pricePerHour: 8800,
    rating: 4.5,
    openHours: '09:00-21:00',
    spaceId: 'space_002',
    area: 50,
    capacity: 4,
    type: 'dance'
  }
]

export const mockChoreographers: Choreographer[] = [
  {
    id: '1',
    name: 'Hyejin',
    avatar: '',
    title: '首席导师',
    description: '10年教学经验，前 SM 娱乐编舞师，擅长 K-pop 与 Urban Dance',
    rating: 4.9,
    pricePerSession: 29800,
    specialties: ['K-pop', 'Jazz', 'Urban']
  },
  {
    id: '2',
    name: 'Nabi',
    avatar: '',
    title: '高级导师',
    description: '专注 K-pop 女团舞与编舞教学，风格细腻有感染力',
    rating: 4.8,
    pricePerSession: 24800,
    specialties: ['K-pop', 'Girls Hip-hop']
  },
  {
    id: '3',
    name: 'Rosa',
    avatar: '',
    title: '高级导师',
    description: '现代舞出身，擅长身体开发与情感表达，课程兼具力量与美感',
    rating: 4.7,
    pricePerSession: 22800,
    specialties: ['现代舞', 'Contemporary', '芭蕾']
  },
  {
    id: '4',
    name: 'Luna',
    avatar: '',
    title: '人气导师',
    description: '新生代编舞师，风格前卫活力，深受年轻学员喜爱',
    rating: 4.6,
    pricePerSession: 19800,
    specialties: ['Hip-hop', 'Street', 'Dancehall']
  }
]
