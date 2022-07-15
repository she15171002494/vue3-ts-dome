<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">
          <el-button type="primary" @click="addRole"> 添加角色 </el-button>
        </div>
      </el-header>
      <el-main>
        <el-table :data="list" border style="width: 100%">
          <el-table-column prop="roleId" label="id" />
          <el-table-column prop="roleName" label="角色" />
          <el-table-column prop="authority" label="操作">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="editRow(scope.row)">
                修改权限
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '../request/api'
import { InitData } from '../type/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()
    // 获取角色列表
    let getList = async () => {
      let res: any = await getRoleList()
      console.log('获取数据', res)
      if (res.code == 200) {
        data.list = res.data
      }
      // console.log('结果', data)
    }

    // 添加
    let addRole = () => {
      console.log('添加角色')
      ElMessageBox.prompt('请输入角色名称', '添加', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          if (value) {
            //判断输入框送是否有值
            data.list.push({
              roleId: data.list.length + 1,
              roleName: value,
              authority: [],
            })
          }
          ElMessage({
            type: 'success',
            message: `${value}角色添加成功`,
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消操作',
          })
        })
    }

    // 编辑
    let editRow = v => {
      console.log(v)
      router.push({
        name: 'authority',
        params: {
          id: v.roleId,
          authority: v.authority,
        },
      })
    }

    onMounted(() => {
      getList()
    })
    return { ...toRefs(data), addRole, editRow }
  },
})
</script>

<style scoped>
div {
  overflow-x: hidden;
  box-sizing: border-box;
}
</style>
