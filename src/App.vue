<template>
  <!-- 头部 -->
  <div class="app_container">
    <!-- navbar -->
    <van-sticky>
      <van-nav-bar
        :title="title"
        left-text="返回"
        v-show="isShowNavBar"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </van-sticky>
    <!-- 头部 -->
    <div class="header" v-show='isShowHeader'  id="header">
      <img src="./assets/images/logo.png" alt="" />
      <van-search placeholder="请输入搜索关键词" />
    </div>

    <!-- 中间(路由匹配的动态能容) -->
    <router-view></router-view>

    <!-- 底部 -->
    <van-tabbar v-model="active" v-if="isSHowTabbar">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
                                                      <!-- 获取 geetters里的数量 -->
      <van-tabbar-item to="/cart" icon="shopping-cart-o" :badge="$store.getters.carTotal">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { search, Tabbar, TabbarItem, NavBar,Sticky } from "vant";
export default {
  name: "app",
  components: {
    "van-search": search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-nav-bar": NavBar,
    "van-sticky":Sticky
  },
  created() {
    // 未挂载到真实 dom 之前
    this.$nextTick(function () {
      // 挂载到真实 dom 之后，才会执行回调函数里的 逻辑
      // console.log('created');
      // console.log(document.querySelector(".header"));
      this.controlHeader();
    });
  },

  mounted() {
    // 获取 methods 真实 dom
    // this.controlHeader();
    // console.log('mounted');
    // console.log(document.querySelector(".header"));
  },
  data() {
    return {
      active: 0,

      isShowNavBar: false,          // 显示搜索栏上面不分
      title: '',                    // 标题
      isShowHeader: true,
      isSHowTabbar: true,
    };
  },
  methods: {
    /** 头部 */
    controlHeader() {
      var headerE1 = document.querySelector(".header");
      // 获取   offsetHeight：包括内 外边距 边框
      var headerHeight = headerE1.offsetHeight;
      // 页面滚动事件
      window.addEventListener("scroll", function () {
        // 获取 页面卷上去的高度 document.body.scrollTop: 获取 body。   document.documentElement.scrollTop：获取html根标签。
        var scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop >= headerHeight) {
          // 设置固定定位
          // headerE1.style.position = 'fixed';
          // headerE1.style.top = "0";
          // headerE1.style.left ="0";
          // headerE1.style['z-index'] = 999

          // headerE1.className： 获取元素类名 返回的是个字符串。 indexOf：判断是否有这个类, -1 没有此类
          if (headerE1.className.indexOf("headerFixed") == -1) {
            // 添加 headerFixed 类， 轮播图被压住一部分了
            headerE1.classList.add("headerFixed");
          }
        } else {
          headerE1.classList.remove("headerFixed");
        }
      });
    },

    /** 控制 navbar 的显示 和 隐藏 */
    showNavBar(options){
      this.title = options.title;
      this.isShowNavBar = true;
    },

    /** 隐藏 navbar */ 
    hideNavBar(){
      this.isShowNavBar = false;
    },

    /** 头部隐藏 */
    showHeader(){
      this.isShowHeader = false;
    },
    /** 头部显示 */
    hideHeader(){
       this.isShowHeader = true;
    },

    /** 隐藏 Tabbar */ 
    hideTabbar(){
      this.isSHowTabbar = false;
    },
    /** 显示 Tabbar */ 
    showTabbar(){
      this.isSHowTabbar = true;
    },
   
  },
};
</script>
<style lang="scss" scoped>
.app_container {
  min-width: 320px;
  max-width: 750px;
  height: 100vh;
  background-color: #e9e9e9;
  margin: auto;
  padding-bottom: 50px; // 为了不让 tabbar 压住内容部分

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center; // 垂直居中
    padding: 2px;

    img {
      height: 44px;
    }
    .van-search {
      flex: 1;
    }
  }

  .headerFixed {
    position: sticky;
    width: 100%;
    min-width: 320px;
    max-width: 750px;
    top: 0;
    left: 0;
    z-index: 999;
    background: #fff;
    // transform: translateX(50%);
  }
}
</style>
