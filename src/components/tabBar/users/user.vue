<template>
  <div class="user-container">
    <van-cell-group>
      <img src="../../../assets/images/logo.png" alt>
      <div>用户名：{{ username }}</div>
    </van-cell-group>
    <van-cell title="修改密码" is-link/>
    <van-cell title="我的订单" is-link/>
    <van-cell title="地址管理" to="/address" is-link/>

    <van-cell class="feedback" title="提交反馈" is-link/>
    <van-cell title="关于乐淘" value="v1.0.0"/>

    <!-- 退出按钮 -->
    <van-button block class="logout">退出登录</van-button>
  </div>
</template>

<script>
import { isLogins } from '@/api/index.js';
import { Cell, CellGroup ,Button} from 'vant';
export default {
  name: 'user',           // 个人中心
  components:{
    "van-cell-group":CellGroup,
    "van-cell": Cell,
    "van-button" : Button, 
  },
   created(){
    this.login()            // 判断是否 登录

    this.$parent.showNavBar({ title: "个人中心" });
    this.$parent.showHeader();
    this.$parent.hideTabbar();

    // 存的时候是对象，取的时候解析对象
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.username = userInfo.username;
  },
  data(){
    return{
      username: '',
    }
  },
  methods:{
    async login(){
      
      var res = await isLogins() ;
      console.log(res, 1111);
      // console.log(message);
      // console.log(status);
    }
  }
} // 啥问题？  为什么是 undefined ?   状态码  和 信息 已经请求到了 ，怎么打印就是 undefind?
</script>

<style lang="scss" scoped>
.user-container{
  .van-cell-group{
    display: flex;
    align-items: center;
    padding: 10px;
    img{
      width: 20%;
      margin-right: 100px;
    }
  }

  .feedback{
    margin-top: 30px;
  }
  .logout{
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
}

</style>