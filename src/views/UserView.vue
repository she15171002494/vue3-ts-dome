<template>
  <el-container>
    <el-header>
      <div class="header">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="selectData.userName" placeholder="请输入关键字" />
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="selectData.nickName" placeholder="请输入关键字" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table :data="dataList.comList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="nickName" label="标题" width="180" />
        <el-table-column prop="role" label="标题" width="180" />
        <el-table-column prop="userName" label="详情" />
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        @current-change="curretChange"
        @size-change="sizeChange"
        layout="prev, pager, next"
        :total="selectData.count"
      />
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getUserList } from '../request/api'
import { InitData } from '../type/user'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    // 获取人员列表
    let getUserDataList = () => {
      getUserList().then(res => {
        console.log('获取用户列表', res)
        data.list = res.data
        data.selectData.count = res.data.length
      })
    }

    // 分页
    let dataList = reactive({
      comList: computed(() => {
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pagesize,
          data.selectData.page * data.selectData.pagesize
        )
      }),
    })

    let curretChange = (page: number) => {
      data.selectData.page = page
    }
    let sizeChange = (pagesize: number) => {
      data.selectData.pagesize = pagesize
    }

    // 查询
    let onSubmit = () => {
      console.log('查询')
    }

    onMounted(() => {
      getUserDataList()
    })
    return { ...toRefs(data), dataList, curretChange, sizeChange, onSubmit }
  },
})
</script>

<style scoped></style>
