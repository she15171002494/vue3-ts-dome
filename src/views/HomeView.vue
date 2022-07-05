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
            <el-button type="danger">退出登录</el-button>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu
              active-text-color="#ffd04b"
              background-color="#96b1d9"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>商品列表</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .common-layout {
    width: 100%;
    height: 100%;
    .el-container {
      width: 100%;
      height: 100%;
    }
  }
}
.el-header {
  background-color: #3b6ec7;
  height: 80px;
  padding: 0;
  display: flex;
  .logo {
    width: 200px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logoIMG {
    width: 60px;
    height: 60px;
  }
  h2 {
    flex: 1;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .signOut {
    width: 300px;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
    }
  }
}

.el-aside {
  // width: 100%;
  height: 100%;
  background-color: #96b1d9;
}
.el-main {
  width: 100%;
  height: 100%;
  background: #d0dfef;
}
</style>
