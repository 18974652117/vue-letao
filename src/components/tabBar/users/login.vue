<template>
  <div class="login-container">
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" >提交</van-button >
      </div>
    </van-form>

    <div class="text">
      <router-link to="/register">用户注册</router-link>
    </div>
  
  </div>

</template>

<script>
import {  getUserLogin } from "@/api/index";
import { Form, Field, Button } from "vant";
export default {
  name: "user",
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
  },
  created() {
    this.$parent.showNavBar({ title: "登录" });
    this.$parent.showHeader();
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {

    /** 用户登录 */
    async onSubmit(data) {
      // loding提示： 加载中
      this.$toast.loading({
        message: '登录中...',  
        forbidClick: true,  // 禁用，登录的时候旁边的都不能点击。
        duration: 0, // 持续提示 ，停不下来， 
      })
      let { status,message,userInfo,token } = await getUserLogin(data);
      this.$toast.clear();  // 关闭弹框提示
      this.$toast(message);

      // 只有状态码 等等于 0 的时候存起来。
      if(status == 0){
        // 把json转为字符进行存储，
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
        // token 是字符型可以直接存起来。
        localStorage.setItem('token',token);

        // 成功之后跳转到首页
        this.$router.push("/home")
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  padding-top: 30px;

  .text{
    text-align: center;

    a{
      color: #333;
    }
  }
}
</style>