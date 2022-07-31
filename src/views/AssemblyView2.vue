<template>
  <el-container>
    <el-header>vue3组件封装测试页面</el-header>
    <el-main>
      <my_box :parentValue="list"></my_box>
    </el-main>
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
          name: '张三',
          age: 20,
          duty: '水泥工',
          schoolName: '实验工地',
          btn: [
            { name: '请假', btnType: 'warning' },
            { name: '辞职', btnType: 'danger' },
          ],
        },
        {
          id: 2,
          name: '李四',
          age: 37,
          duty: '水泥工',
          schoolName: '实验工地',
          btn: [
            { name: '请假', btnType: 'warning' },
            { name: '辞职', btnType: 'danger' },
          ],
        },
        {
          id: 3,
          name: '王五',
          age: 26,
          duty: '水泥工',
          schoolName: '实验工地',
          btn: [
            { name: '请假', btnType: 'warning' },
            { name: '辞职', btnType: 'danger' },
          ],
        },
        {
          id: 4,
          name: '赵六',
          age: 33,
          duty: '水泥工',
          schoolName: '实验工地',
          btn: [
            { name: '请假', btnType: 'warning' },
            { name: '辞职', btnType: 'danger' },
          ],
        },
        {
          id: 5,
          name: '陈七',
          age: 49,
          duty: '水泥工',
          schoolName: '实验工地',
          btn: [
            { name: '请假', btnType: 'warning' },
            { name: '辞职', btnType: 'danger' },
          ],
        },
      ],
    })
    return { ...toRefs(data) }
  },
})
</script>

<style scoped></style>
