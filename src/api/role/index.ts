import request from '@/axios'

export const getRoleListApi = (data: any = {}) => {
  return request.post({ url: '/system/roles/page', data })
}

export const saveRoleApi = (data: any) => {
  return request.post({ url: '/system/roles/save', data })
}
