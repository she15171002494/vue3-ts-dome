export interface CeShiInt {
  id: number
  name: string
  age: number
  duty: string
  schoolName: string
  btn: []
}
export class CeShiData {
  form: CeShiInt = {
    id: 1,
    name: '',
    age: 1,
    duty: '',
    schoolName: '',
    btn: [],
  }
  fromShow: false
}
