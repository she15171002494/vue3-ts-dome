export interface ListInt {
  id: number
  nickName: string
  userName: string
  role: object
}
export interface selectDataInt {
  userName: string
  nickName: string
  page: number
  pagesize: number
  count: number
}
export class InitData {
  list: ListInt[] = []
  selectData: selectDataInt = {
    userName: '',
    nickName: '',
    page: 1,
    pagesize: 10,
    count: 0,
  }
}
