<template>
  <el-container>
    <el-header>vue3组件封装测试页面</el-header>
    <el-main>
      <my_box :parentValue="list" @clickChange="changeNav"></my_box>
    </el-main>
    <el-dialog v-model="fromShow" :title="title">
      <el-form :model="myFrom">
        <el-form-item label="姓名">
          <el-input v-model="myFrom.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="myFrom.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="阶段">
          <el-input v-model="myFrom.duty" autocomplete="off" />
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="myFrom.schoolName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="fromShow = false">取消</el-button>
          <el-button type="primary" @click="edit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import my_box from '../components/my_box/my_box.vue'

export default defineComponent({
  components: {
    my_box,
  },
  setup() {
    const data = reactive({
      list: [
        {
          id: 1,
          name: '小明',
          age: 10,
          duty: '小学生',
          schoolName: '实验学校',
          btn: [
            { name: '编辑', btnType: 'warning' },
            { name: '升学', btnType: 'primary' },
            { name: '毕业', btnType: 'success' },
          ],
        },
        {
          id: 2,
          name: '小王',
          age: 17,
          duty: '高中生',
          schoolName: '实验学校',
          btn: [
            { name: '编辑', btnType: 'warning' },
            { name: '升学', btnType: 'primary' },
            { name: '毕业', btnType: 'success' },
          ],
        },
        {
          id: 3,
          name: '小张',
          age: 21,
          duty: '大学生',
          schoolName: '实验学校',
          btn: [
            { name: '编辑', btnType: 'warning' },
            { name: '升学', btnType: 'primary' },
            { name: '毕业', btnType: 'success' },
          ],
        },
        {
          id: 4,
          name: '小李',
          age: 13,
          duty: '初中生',
          schoolName: '实验学校',
          btn: [
            { name: '编辑', btnType: 'warning' },
            { name: '升学', btnType: 'primary' },
            { name: '毕业', btnType: 'success' },
          ],
        },
        {
          id: 5,
          name: '小李',
          age: 23,
          duty: '大学生',
          schoolName: '实验学校',
          btn: [
            { name: '编辑', btnType: 'warning' },
            { name: '升学', btnType: 'primary' },
            { name: '毕业', bntType: 'success' },
          ],
        },
      ],
      fromShow: false,
      title: '',
      myFrom: {
        id: 1,
        name: '',
        age: 1,
        duty: '',
        schoolName: '',
        btn: [],
      },
    })

    const changeNav = val => {
      console.log(data.fromShow)
      data.fromShow = true
      console.log(val)
      data.myFrom = val.data1
      data.title = val.data2
    }

    const edit = () => {
      console.log('编辑')
      data.list.forEach(v => {
        if (v.id === data.myFrom.id) {
          v.name = data.myFrom.name
          v.age = data.myFrom.age
          v.duty = data.myFrom.duty
          v.schoolName = data.myFrom.schoolName
        }
      })
      data.myFrom = {
        id: 1,
        name: '',
        age: 1,
        duty: '',
        schoolName: '',
        btn: [],
      }
      data.fromShow = false
    }

    return { ...toRefs(data), changeNav, edit }
  },
})
</script>

<style scoped></style>
