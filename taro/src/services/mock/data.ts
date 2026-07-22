import type { DanceRoom, Teacher } from '@/types'

export interface BannerItem {
  id: string
  title: string
  subtitle: string
  color: string
}

export const mockBanners: BannerItem[] = [
  {
    id: '1',
    title: '新课程·春日企划',
    subtitle: '限时优惠 8折起',
    color: '#E8D5C4'
  },
  {
    id: '2',
    title: '新人专享体验课',
    subtitle: '首次预约立减 ¥50',
    color: '#D4C5B2'
  },
  {
    id: '3',
    title: '导师一对一指导',
    subtitle: '定制你的舞蹈计划',
    color: '#C4A882'
  }
]

export const mockRooms: DanceRoom[] = [
  {
    id: '1',
    name: 'Hype Dance Studio',
    description: '专业舞蹈训练空间，配备进口地胶和环绕音响系统',
    address: '上海市静安区南京西路1788号',
    images: [],
    facilities: ['地胶', '全身镜', '音响', '灯光', '空调'],
    pricePerHour: 12800,
    rating: 4.8,
    openHours: '09:00-22:00'
  },
  {
    id: '2',
    name: 'Butterfly 舞蹈教室',
    description: '韩舞专用教室，落地镜面墙，沉浸式灯光',
    address: '上海市黄浦区淮海中路333号',
    images: [],
    facilities: ['落地镜', '音响', '灯光', '更衣室'],
    pricePerHour: 9800,
    rating: 4.6,
    openHours: '10:00-21:00'
  },
  {
    id: '3',
    name: 'X-Studio 排练厅',
    description: '大型排练空间，适合团体课和编舞排练',
    address: '上海市徐汇区衡山路10号',
    images: [],
    facilities: ['地胶', '音响', '投影', '休息区'],
    pricePerHour: 15800,
    rating: 4.9,
    openHours: '08:00-23:00'
  },
  {
    id: '4',
    name: 'Muse 舞蹈空间',
    description: '温馨小班教室，私人课程首选',
    address: '上海市长宁区愚园路128号',
    images: [],
    facilities: ['地胶', '全身镜', '音响', '空调'],
    pricePerHour: 8800,
    rating: 4.5,
    openHours: '09:00-21:00'
  }
]

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Hyejin',
    avatar: '',
    title: '首席导师',
    description: '10年舞蹈教学经验，前 SM 娱乐编舞师',
    rating: 4.9,
    pricePerSession: 29800,
    specialties: ['K-pop', 'Jazz', 'Urban']
  },
  {
    id: '2',
    name: 'Nabi',
    avatar: '',
    title: '高级导师',
    description: '专注 K-pop 女团舞教学，风格细腻',
    rating: 4.8,
    pricePerSession: 24800,
    specialties: ['K-pop', 'Girls Hip-hop']
  },
  {
    id: '3',
    name: 'Rosa',
    avatar: '',
    title: '高级导师',
    description: '现代舞出身，擅长身体开发和表达',
    rating: 4.7,
    pricePerSession: 22800,
    specialties: ['现代舞', 'Contemporary', '芭蕾']
  },
  {
    id: '4',
    name: 'Luna',
    avatar: '',
    title: '中级导师',
    description: '新生代编舞师，风格前卫活力',
    rating: 4.6,
    pricePerSession: 19800,
    specialties: ['Hip-hop', 'Street', 'Dancehall']
  }
]
