
<template>
  <div class="newList_container">

    <!-- 顶部返回按钮 -->
    <van-loading v-if="isShow" :vertical="true" type="spinner" color="#ccc" size="30px">加载中...</van-loading>

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="newlist">

        <!--  用变量就要用属性绑定加 冒号 :to="'/newsdetail/'+item.id" 这里前面是写死的，后面是动态的 -->
        <router-link :to="'/newsDetails/'+item.id" tag="div" class="item" v-for="item in newslist" :key="item.id">
          <div class="img_container">
            <img v-lazy="item.img_url"  alt="">
          </div>
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <span>发布时间:{{ item.add_time | dateFormat('YYYY-MM-DD')}}</span>
              <span>点击次数:{{ item.click }}</span>
            </div>
          </div>
        </router-link>

        <!-- <div class="item">
          <div class="img_container">
            <img src="http://test.w0824.com/fangyuan.jpg" alt="">
          </div>
          <div class="text">
            <div class="title"></div>
            <div class="info">
              <span>发布时间：2018-12-21</span>
              <span>点击次数：100</span>
            </div>
          </div>
        </div> -->
      </div>
    </van-pull-refresh>

     <!-- 点击加载 -->
        <van-button v-if="isButton"   @click="loadMore" :loading="isMore" block loading-text="loading" size="large" type="info" >加载</van-button>
  </div>
</template>

<script>

import { getNewsListData } from '@/api/index.js';
import { PullRefresh , Toast, Button,Loading} from 'vant';   // 下拉刷新是组件
export default {
  name:"newList",
  components:{
    "van-pull-refresh":PullRefresh,
    "van-button": Button,
    "van-loading": Loading,
  },
  data(){
    return{
      isLoading : false,   // 下拉刷新组件

      newslist: [],       // 获取所有数据变量

      page: 1,            // 默认 1 页
      pagesize: 5,        // 默认 5条数据

      isMore:false,       // 点击加载
      hasData: true,      // 判断是否有数据
      isShow: false,      // 下拉刷新 大圈圈  判断是否有数据

      isButton: true,
    } 
  },
  created(){
    // 显示 navbar  this.$parent: 获取到父组件的变量
    // this.$parent.isShowNavBar ;
    // this.$parent.title= "标题";

    this.$parent.showNavBar({ title:'新闻列表' });
    this.$parent.showHeader();
    this.getNewsList();
  },
  methods:{
    /** 获取数据 */ 
    async getNewsList() {
      this.hasButton = true;                // 显示下面的加载更多按钮
      if ( this.hasData == false ) {        // 如果相等说明时候最后一页了
        Toast("亲，已经没数据了");
        this.isMore = false;
        return;
      }


      var { message } = await getNewsListData(this.page, this.pagesize);
      console.log(message);
      this.isMore = false;
      this.isShow = false;
      
      if (message.length == 0) {      // 判断数据是否加载完毕
        Toast("没有更多数据");
        this.hasData = false;      // 说明没有数据了，就不要请求
        return ;
      }
      
      this.newslist = this.newslist.concat(message)  ;    // 数组拼接， 新数据 拼接 旧数据
      
    },

    /** 下拉刷新 */ 
    onRefresh() {
      this.page = 1;            // 下拉的时候页面重置为 1
      this.newslist = [];       //  数据情况
      this.hasData = true;
      this.isShow = true;
      this.isButton = true;
      setTimeout(() => {
        // Toast('下拉刷新');
        this.isLoading = false;
        
        this.getNewsList();        // 下拉刷新即重新加载当前页面中的数据既可
        Toast('刷新成功')
      }, 1000);
    },

    /** 点击加载更多 */ 
    loadMore(){
      // 核心：把当前页面 相加, 相加后再获取数据
      this.page++;
      this.isMore = true;
    
      this.getNewsList();              // 这里就变成 第二页 共10条数据
    }
  },

}
</script>
<style lang="scss" scoped>
.newList_container {
  .newlist {
    padding: 5px;
    background-color: rgb(241, 235, 235);
    .item {
      display: flex;
      border-bottom: 1px solid #ccc;
      margin-top: 8px;

      .img_container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
        width: 100px;
        height: 100px;

        img {
          width: 100px;
          height: 100%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2px;

        .title {
          color: #000;
          font-size: 12px;
          margin-top: 10px;
          font-weight: 700;
          // 限制两行文本，超出显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .info {
          display: flex;
          justify-content: space-between;
          color: #888;
          font-size: 12px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>