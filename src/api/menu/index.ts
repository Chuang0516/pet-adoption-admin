import request from '@/axios'

export const getMenuListApi = (params: any = {}) => {
  return request.get({ url: '/system/menus/trees', params })
}


export const saveMenuApi = (data: any) => {
  return request.post({ url: '/system/menus/save', data })
}