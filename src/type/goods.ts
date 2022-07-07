export interface ListInt {
  userId: number
  id: number
  title: string
  introduce: string
}
export interface selectDataInt {
  title: string
  introduce: string
  page: number
  count: number
  pagesize: number
}
export class InitData {
  list: ListInt[] = [] //展示的内容数据
  selectData: selectDataInt = {
    title: '',
    introduce: '',
    page: 1,
    count: 0,
    pagesize: 10,
  }
}
