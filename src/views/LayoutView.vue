<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-header>
          <div class="logo">
            <img src="../assets/images/pp_logo.png" alt="" class="logoIMG" />
          </div>

          <h2>皮皮后台管理系统</h2>

          <div class="signOut">
            <img src="../assets/images/user.jpg" alt="" />
            <el-button type="danger" @click="dialogVisible = true">退出登录</el-button>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu
              active-text-color="#ffd04b"
              background-color="#96b1d9"
              class="el-menu-vertical-demo"
              :default-active="active"
              text-color="#fff"
              router
            >
              <!-- @open="handleOpen"
              @close="handleClose" -->
              <!-- router开启路由模式，通过el-menu-item 里面index来进行跳转 -->
              <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                <span>{{ item.meta.title }}</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view />
            <el-dialog v-model="dialogVisible" title="温馨提示" width="30%">
              <span style="color: red">亲，此操作将退出后台管理系统，你确定要退出嘛？</span>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="determineLogout">确定</el-button>
                </span>
              </template>
            </el-dialog>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      dialogVisible: false,
    })
    // let obj: any = {
    //   path: '/haha',
    //   name: 'haha',
    //   meta: {
    //     isShow: true,
    //     title: '动态路由',
    //   },
    //   component: () => import('../views/HahaView.vue'),
    // }
    // console.log(router)
    console.log('路由列表', router.getRoutes())
    // router.addRoute('home', obj)
    const list = router.getRoutes().filter(v => v.meta.isShow)
    // const list = router.getRoutes()
    // if (obj) {
    //   // list.addRoute(obj)
    //   obj = {}
    // }
    console.log('新路由列表', list)

    let determineLogout = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }
    return { ...toRefs(data), router, list, determineLogout, active: route.path }
  },
})
</script>

<style scoped></style>
