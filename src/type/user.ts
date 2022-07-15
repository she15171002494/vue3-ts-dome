export interface ListInt {
  id: number
  nickName: string
  userName: string
  role: RoleInt[]
}
interface RoleInt {
  role: number
  roleName: string
}
interface RoleListInt {
  authority: []
  roleId: number
  roleName: string
}
export interface editObjInt {
  id: number
  nickName: string
  userName: string
  role: any[]
}
export interface selectDataInt {
  role: number
  nickName: string
  userName: string
  page: number
  pagesize: number
  count: number
}
export class InitData {
  list: ListInt[] = []
  roleList: RoleListInt[] = []
  selectData: selectDataInt = {
    nickName: '',
    role: 0,
    userName: '',
    page: 1,
    pagesize: 10,
    count: 0,
  }
  editShow = false
  editObj: editObjInt = {
    id: 0,
    nickName: '',
    userName: '',
    role: [],
  }
}
