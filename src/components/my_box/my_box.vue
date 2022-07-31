<template>
  <div class="my_box">
    <div class="box" v-for="v in parentValue" :key="v.id">
      <div class="box_t">姓名：{{ v.name }}</div>
      <div class="box_c">
        <p>年龄：{{ v.age }}</p>
        <p>阶段：{{ v.duty }}</p>
        <p>位置：{{ v.schoolName }}</p>
      </div>
      <div class="box_b">
        <el-button v-for="(s, i) in v.btn" :key="i" :type="s.btnType" @click="changeNav(v, s.name)">{{
          s.name
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['parentValue'],

  setup(props, { emit }) {
    console.log('parentValue', props.parentValue)

    const changeNav = (v, s) => {
      // isCollapse.value = !isCollapse.value
      // emit('changeNavfu', { data: isCollapse.value })
      // console.log('点击了', v, s)
      emit('clickChange', { data1: v, data2: s })
    }

    return { changeNav }
  },
})
</script>

<style lang="scss" scoped>
.my_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .box {
    width: 20%;
    margin-right: 30px;
    margin-bottom: 30px;
    padding: 20px 50px 20px 30px;
    border-radius: 10px;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.5);
    .box_t {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      font-weight: 600;
      color: #333;
    }
    .box_c {
      margin: 10px 0;
      p {
        height: 26px;
        font-size: 20px;
        color: #666;
        line-height: 24px;
      }
    }
  }
}
</style>
