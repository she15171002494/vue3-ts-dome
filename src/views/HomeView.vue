<template>
  <el-container>
    <el-header>欢迎来到首页</el-header>
    <el-main>
      <h2>vux初体验</h2>
      <div>使用stroe的数据: -----{{ name }}----{{ setAsyncRoutesMark ? 1 : 0 }}</div>

      <el-button type="primary" @click="edit" style="margin-top: 30px">修改</el-button>
      <el-button type="warning" @click="asyncEdit" style="margin-top: 30px">异步修改</el-button>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const data = reactive({
      name: store.state.name,
      setAsyncRoutesMark: store.state.setAsyncRoutesMark,
      num: 0,
    })

    const edit = () => {
      data.num++
      store.commit('setName', '修改后的新名字' + data.num)

      data.name = store.state.name
    }

    //模拟异步修改数据
    const asyncEdit = () => {
      setTimeout(() => {
        console.log('模拟异步修改数据')
        store.dispatch('asyncSetName', '修改后的新名字99')
        data.name = store.state.name
      }, 1500)
    }
    return { ...toRefs(data), edit, asyncEdit }
  },
})
</script>

<style lang="scss" scoped></style>
