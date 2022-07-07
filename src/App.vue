<template>
  <!-- <el-button type="primary">Primary</el-button>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100vh;
  min-width: 1200px;
  overflow-y: hidden;
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
    height: 100%;
    background-color: #96b1d9;
  }
  .el-main {
    width: 100%;
    height: 100%;
    background: #d0dfef;
    overflow: hidden;
    .el-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      // background-color: #fff;
      .el-header {
        width: 100%;
        height: 50px;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding-left: 25px;
        box-sizing: border-box;
        .el-form {
          width: 100%;
          height: 30px;
        }
      }
      .el-main {
        width: 100%;
        height: calc(100vh - 250px);
        background-color: #fff;
        margin: 10px 0;
        overflow: auto;
      }
      .el-footer {
        width: 100%;
        height: 50px;
        background-color: #fff;
        text-align: center;
        .el-pagination {
          margin: 10px auto;
        }
      }
    }
  }
}
</style>
