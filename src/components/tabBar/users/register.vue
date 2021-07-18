<template>
  <div class="register-container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
        v-model="password"
        type="password"
        name="password"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>

    <div class="text">
      <router-link to="/login">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button } from "vant";
export default {
  name: "user",
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
  },
  created() {
    this.$parent.showNavBar({ title: "注册" });
    this.$parent.showHeader();
  },
  data() {
    return {
      username: "", // 用户名
      password: "", // 密码
      repassword: "", // 再次确认密码
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  padding-top: 30px;

  .text {
    text-align: center;

    a {
      color: #333;
    }
  }
}
</style>