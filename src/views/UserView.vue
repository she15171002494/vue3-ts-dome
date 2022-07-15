<template>
  <el-container>
    <el-header>
      <div class="header">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="角色">
            <!-- <el-input v-model="selectData.nickName" placeholder="请输入关键字" /> -->
            <el-select v-model="selectData.role" class="m-2" placeholder="请选择">
              <el-option label="全部" :value="0" />
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item.roleName"
                :value="item.roleId"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="nickName" label="姓名" width="180" />
        <el-table-column prop="role" label="角色" width="180">
          <template #default="scope">
            <el-button
              v-for="item in scope.row.role"
              :key="item.role"
              link
              size="small"
              @click.prevent="deleteRow(scope.row)"
            >
              {{ item.roleName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="昵称" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="editRow(scope.row)"> 编辑 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="editShow" title="编辑">
        <el-form :model="editObj">
          <el-form-item label="姓名" label-width="50px">
            <el-input v-model="editObj.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色" label-width="50px">
            <el-select multiple v-model="editObj.role" placeholder="请选择角色">
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :label="item.roleName"
                :value="item.roleId"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editShow = false">取消</el-button>
            <el-button type="primary" @click="editUpdt">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '../request/api'
import { InitData, ListInt } from '../type/user'

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

    // 获取角色列表
    let getRoleDataList = () => {
      getRoleList().then(res => {
        console.log('获取角色列表', res)
        data.roleList = res.data
        // data.selectData.count = res.data.length
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
      console.log('查询', data.selectData.role)
      let arr: ListInt[] = []
      if (data.selectData.role || data.selectData.nickName) {
        if (data.selectData.nickName) {
          arr = data.list.filter(v => v.nickName == data.selectData.nickName)
          console.log(data.list)
        }
        if (data.selectData.role) {
          arr = (data.selectData.nickName ? arr : data.list).filter(s => {
            return s.role.find(item => item.role == data.selectData.role)
          })
        }
      } else {
        arr = data.list
      }
      data.list = arr
    }

    // 表格插槽
    let deleteRow = () => {
      console.log('表格插槽')
    }

    // 编辑
    let editRow = v => {
      data.editShow = true
      console.log('编辑', v)
      console.log('编辑2', v.role)
      data.editObj = {
        id: v.id,
        nickName: v.nickName,
        userName: v.userName,
        role: v.role.map(v => v.role || v.roleId),
      }
      console.log('编辑数据', data.editObj)
    }

    // 确认修改
    let editUpdt = () => {
      data.editShow = false
      console.log('点击了修改', data.editObj)
      // let obj: editObjInt[] = []
      let obj: any = data.list.find(v => v.id == data.editObj.id)
      obj.nickName = data.editObj.nickName
      obj.role = data.roleList.filter(v => {
        return data.editObj.role.indexOf(v.roleId) !== -1
      })
      data.list.forEach((item, i) => {
        if (item.id === obj.id) {
          data.list[i] = obj
        }
      })
      console.log('123', data.list)
    }

    watch([() => data.selectData.nickName, () => data.selectData.role], () => {
      if (data.selectData.nickName == '' || data.selectData.role == 0) {
        getUserDataList()
      }
    })

    onMounted(() => {
      getUserDataList()
      getRoleDataList()
    })
    return {
      ...toRefs(data),
      dataList,
      curretChange,
      sizeChange,
      onSubmit,
      deleteRow,
      editRow,
      editUpdt,
    }
  },
})
</script>

<style scoped></style>
