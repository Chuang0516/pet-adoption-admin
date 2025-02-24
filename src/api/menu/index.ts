import request from '@/axios'

export const getMenuListApi = (params: any = {}) => {
  return request.get({ url: '/system/menus/trees', params })
}


export const saveMenuApi = (data: any) => {
  return request.post({ url: '/system/menus/save', data })
}

// 删除菜单
export const delMenuApi = (ids: string) => {
  return request.delete({
    url: `/system/menus/delete/${ids}`,
    method: 'delete',
  })
}