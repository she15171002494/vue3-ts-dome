<template>
  <el-container>
    <el-header>
      <div class="header">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="selectData.title" placeholder="请输入关键字" />
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
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
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="introduce" label="详情" />
      </el-table>
    </el-main>
    <el-footer
      ><el-pagination
        @current-change="curretChange"
        @size-change="sizeChange"
        layout="prev, pager, next"
        :total="selectData.count"
    /></el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, computed, watch } from 'vue'
import { getGoodsList } from '../request/api'
import { InitData, ListInt } from '../type/goods'
export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    // 获取数据
    let getList = () => {
      getGoodsList().then(res => {
        // console.log('结果', res)
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
      console.log('查询 ', data.selectData.title)
      console.log('查询 ', data.selectData.introduce)
      let arr: ListInt[] = [] //定义数组，用来接受查询过后要展示的数据
      if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
          arr = data.list.filter(v => {
            return v.title.indexOf(data.selectData.title) !== -1
          })
        }
        if (data.selectData.introduce) {
          arr = data.list.filter(v => {
            return v.introduce.indexOf(data.selectData.introduce) !== -1
          })
        }
      } else {
        arr = data.list
      }
      data.list = arr //查询后数据重新赋值给data.list
      data.selectData.count = arr.length //查询后重新赋值总条数
    }

    // 监听输入框的两个属性
    watch([() => data.selectData.title, () => data.selectData.introduce], () => {
      if (data.selectData.title == '' && data.selectData.introduce == '') {
        getList()
      }
    })

    onMounted(() => {
      getList()
    })
    return { ...toRefs(data), onMounted, curretChange, sizeChange, dataList, onSubmit }
  },
})
</script>

<style lang="scss" scoped></style>
