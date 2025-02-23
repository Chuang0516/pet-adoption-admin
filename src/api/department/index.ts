import request from '@/axios'
import { DepartmentListResponse, DepartmentUserResponse, QueryPageParams } from './types'

export const getDepartmentApi = () => {
  return request.post<any>({ url: '/system/dept/list' })
}

export const getUserPageApi = (data: QueryPageParams) => {
  return request.post<DepartmentUserResponse>({ url: '/system/users/page', data })
}

export const deleteUserByIdApi = (ids: string[] | number[]) => {
  return request.delete({ url: `/system/users/delete/${ids.toString()}` })
}

export const saveUserApi = (data: any) => {
  return request.post({ url: '/system/users/save', data })
}

export const saveDepartmentApi = (data: any) => {
  return request.post({ url: '/system/dept/save', data })
}

export const deleteDepartmentApi = (ids: string[] | number[]) => {
  return request.post({ url: '/mock/department/delete', data: { ids } })
}

export const getDepartmentTableApi = (data: any) => {
  return request.post({ url: '/system/dept/page', data })
}

/**
 * @LastEditors  : liuwenchuang
 * @Description  :  获取部门树
 */
export const getDepartmentTreesApi = () => {
  return request.get({ url: '/system/dept/trees' })
}
 