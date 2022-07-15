<template>
  <el-container>
    <el-header>
      <el-button type="primary" @click="editChange">修改</el-button>
    </el-header>
    <el-main>
      <div>
        <el-tree
          ref="treeRef"
          :data="list"
          show-checkbox
          node-key="roleId"
          :check-strictly="true"
          :default-checked-keys="authority"
          :props="{
            children: 'roleList',
            label: 'name',
          }"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { InitData } from '../type/authority'
import { getAuthorityList } from '../request/api'

export default defineComponent({
  setup() {
    const route = useRoute()
    console.log('参数哦', route)
    const params: any = route.params
    const data = reactive(new InitData(params.id, params.authority))

    // 获取权限列表
    let getList = async () => {
      let res = await getAuthorityList()
      console.log(111, res)
      data.list = res.data
    }

    // 修改
    let editChange = () => {
      console.log(
        '修改',
        data.treeRef.getCheckedKeys().sort(function (a: number, b: number) {
          return a - b
        })
      )
      // 传输后台，后台去修改
    }

    onMounted(() => {
      getList()
    })

    return { ...toRefs(data), editChange }
  },
})
</script>

<style scoped></style>
