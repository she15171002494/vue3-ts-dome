<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1>皮皮后台管理系统</h1>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
import { login } from '../request/api'
import { useRouter } from 'vue-router'

import { setCookie, getCookie } from '../utils/cookie'

export default defineComponent({
  setup() {
    const data = reactive(new LoginData())
    const rules = {
      username: [
        { required: true, message: '请输入你的账号', trigger: 'blur' },
        { min: 5, max: 10, message: '账号长度5-10', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入你的密码', trigger: 'blur' },
        { min: 6, max: 10, message: '账号长度6-10', trigger: 'blur' },
      ],
    }
    // 登录
    const ruleFormRef = ref<FormInstance>()
    const router = useRouter() //相当于$router
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      // 对表单的内容进行验证
      // valid布尔类型，为true表示验证成功,反之
      await formEl.validate((valid, fields) => {
        if (valid) {
          // console.log('submit!')
          login(data.ruleForm).then(res => {
            console.log('结果', res)
            localStorage.setItem('token', res.data.token)
            const list = [
              {
                path: '/goods',
                name: 'goods',
                meta: {
                  isShow: true,
                  title: '商品列表',
                },
                component: 'GoodsView.vue',
              },
              {
                path: '/user',
                name: 'user',
                meta: {
                  isShow: true,
                  title: '用户列表',
                },
                component: 'UserView.vue',
              },
              {
                path: '/role',
                name: 'role',
                meta: {
                  isShow: true,
                  title: '角色列表',
                },
                component: 'RoleView.vue',
              },
              {
                path: '/authority',
                name: 'authority',
                meta: {
                  isShow: false,
                  title: '权限列表',
                },
                component: 'AuthorityView.vue',
              },
              {
                path: '/ceshi',
                name: 'ceshi',
                meta: {
                  isShow: true,
                  title: '测试页面',
                },
                component: 'CeshiView.vue',
              },
              // {
              //   path: '/assembly',
              //   name: 'assembly',
              //   meta: {
              //     isShow: true,
              //     title: '测试页面',
              //   },
              //   component: 'AssemblyView.vue',
              // },
            ]
            console.log('模拟动态路由数据', list)
            localStorage.setItem('routes', JSON.stringify(list))
            // let route = JSON.parse(localStorage.getItem('routes'))

            //---------------------------------------------------------------------------
            //测试把token存入cookie中
            setCookie('token', res.data.token, 'h1')
            let myToken = getCookie('token')
            console.log('cookie保存的token', myToken)
            //---------------------------------------------------------------------------
            console.log('登录成功，跳转')
            router.push('/layout')
          })
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    // 重置
    const resetForm = () => {
      data.ruleForm.username = ''
      data.ruleForm.password = ''
    }
    return { ...toRefs(data), rules, ruleFormRef, resetForm, submitForm }
  },
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../assets/images/bg.jpeg');
  // background-size: contain;
  position: relative;
  .demo-ruleForm {
    position: absolute;
    right: 200px;
    top: 50%;
    transform: translateY(-50%);
    width: 450px;
    height: 500px;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    padding-top: 100px;
    padding-right: 50px;
    overflow: hidden;
    // box-sizing: border-box;
    h1 {
      width: 100%;
      height: 100px;
      text-align: center;
      color: #1970d3;
    }
    .el-button {
      /* margin-left: 12px; */
      margin: 0;
    }
    .loginBtn {
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
    }
  }
}
</style>
