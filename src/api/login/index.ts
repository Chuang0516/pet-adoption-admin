import request from '@/axios'
import type { UserType } from './types'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: UserType & {code: string | undefined, uuid: string | undefined}): Promise<IResponse<{accessToken: string, userInfo:any}>> => {
  return request.post({ url: '/auth/login', data })
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.post({ url: '/auth/logout' })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: UserType[]
      total: number
    }
  }>({ url: '/mock/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/system/roles/getLoginUserMenus', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/mock/role/list2', params })
}


// 获取验证码
export const getCaptchaApi = (): Promise<IResponse> => {
  return request.get({
    url: '/system/common/getCaptchaImage'
  })
}


// 获取当前用户的菜单
export const getLoginUserMenusApi = (): Promise<IResponse> => {
  return request.get({
    url: '/system/roles/getLoginUserMenus'
  })
}