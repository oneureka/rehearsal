import Taro from '@tarojs/taro'

const BASE_URL = process.env.TARO_APP_API_BASE || 'https://api.example.com'

interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

function getToken(): string {
  return Taro.getStorageSync('token') || ''
}

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: Record<string, unknown>
): Promise<T> {
  const token = getToken()
  const res = await Taro.request({
    url: `${BASE_URL}${url}`,
    method,
    data,
    header: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  })

  const body = res.data as ApiResponse<T>
  if (body.code !== 0) {
    throw new Error(body.message || '请求失败')
  }

  return body.data
}

export const api = {
  get<T>(url: string) {
    return request<T>('GET', url)
  },
  post<T>(url: string, data?: Record<string, unknown>) {
    return request<T>('POST', url, data)
  },
  put<T>(url: string, data?: Record<string, unknown>) {
    return request<T>('PUT', url, data)
  },
  delete<T>(url: string) {
    return request<T>('DELETE', url)
  }
}
