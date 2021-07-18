<template>
  <div class="home_container">

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" :indicator-color="swipeColor">
      <van-swipe-item v-for="item in swipeUrl" :key="item.img">
        <img v-lazy="item.img"   alt="">
      </van-swipe-item>
      <!-- <van-swipe-item>
        <img src="http://test.w0824.com/banner10.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://test.w0824.com/banner11.jpg" alt="">
      </van-swipe-item> -->
    </van-swipe>

    <!-- 八宫格 -->
    <van-grid :column-num="4" :border="false">
      <van-grid-item @click="goodsDetails" icon="photo-o" text="文字">
        <img src="../../../assets/images/menu10.png" alt="">
        <span>数码电器</span>
      </van-grid-item>
      <van-grid-item to="/newList" icon="photo-o" text="文字">
        <img src="../../../assets/images/menu19.png" alt="">
        <span>乐淘头条</span>
      </van-grid-item>
      <van-grid-item to="/meitu" icon="photo-o" text="文字">
        <img src="../../../assets/images/menu18.png" alt="">
        <span>美图欣赏</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <img src="../../../assets/images/menu15.png" alt="">
        <span>乐淘服饰</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <img src="../../../assets/images/menu12.png" alt="">
        <span>9.9元拼单</span>
        </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <img src="../../../assets/images/menu13.png" alt="">
        <span>话费充值</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <img src="../../../assets/images/menu16.png" alt="">
        <span>物流查询</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <img src="../../../assets/images/menu17.png" alt="">
        <span>全部</span>
      </van-grid-item>
    </van-grid>

    <div class="divider">
      <van-divider>为你推荐</van-divider>
    </div>

    <!-- 商品推荐列表 -->
    <div class="goodslist">
      <div class="item" v-for="item in goodslist" :key="item.id">
        <img v-lazy="item.img_url" alt="">
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="footer">
            <span class="price">&yen;{{ item.sell_price }}</span>
            <span class="buy">{{ item.buy }}人购买</span>
          </div>
        </div>
      </div>
      <!-- <div class="item">
        <img src="http://test.w0824.com/pengmo.png" alt="">
        <div class="text">
          <div class="title">惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦</div>
          <div class="footer">
            <span class="price">&yen299</span>
            <span class="buy">345购买</span>
          </div>
        </div>
      </div>
      <div class="item">
        <img src="http://test.w0824.com/pengmo.png" alt="">
        <div class="text">
          <div class="title">惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦</div>
          <div class="footer">
            <span class="price">&yen299</span>
            <span class="buy">345购买</span>
          </div>
        </div>
      </div>
      <div class="item">
        <img src="http://test.w0824.com/pengmo.png" alt="">
        <div class="text">
          <div class="title">惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦惠而浦</div>
          <div class="footer">
            <span class="price">&yen299</span>
            <span class="buy">345购买</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem,Grid, GridItem, Divider } from 'vant';
// import axios from "axios";
import { getLunBoData,getRecommendData } from '@/api/index.js'

export default {
  name: 'home',
  components:{
    "van-swipe": Swipe, 
    "van-swipe-item": SwipeItem,
    "van-grid": Grid,
    "van-grid-item": GridItem,
    "van-divider": Divider,
  },
  // 获取数据
  created(){
    console.log(this.$api);
    this.getLunbotu();
    this.getRecommend();
    this.$parent.hideHeader();          // 切换回首页后 显示头部
    this.$parent.hideNavBar();          // 隐藏 navbar
  },

  data(){
    return {
      swipeColor: 'red',                // 轮播上的 3个圆点颜色
      swipeUrl: [],                     // 轮播图
      goodslist: [],                    // 首页推荐图
    }
  },
  methods:{
    goodsDetails(){
      // 编程式导航 实现跳转
      this.$router.push('/goodsList')
    },

    // 获取轮播图
    async getLunbotu(){
      /** 第一种写法  */
        // var that = this;
        /** 为给定 ID 的user 创建请求 */
        // axios.get('http://api.w0824.com/api/getlunbo').then((res)=>{
        // that.swipeUrl = res.data.message;

      /** 第二种写法使用 async 和 await   */
      // var that = this;
      // var res = await axios.get('http://api.w0824.com/api/getlunbo')
      //   that.swipeUrl = res.data.message;  
    
      /** 第三张写法 把axios 挂载到原型上， 在main.js 中 */ 
      // var res = await this.$api.get('http://api.w0824.com/api/getlunbo')
      // this.swipeUrl = res.data.message;  
    
      // 第四种写法
      var res = await getLunBoData();
      this.swipeUrl = res.message;  
    },

    // 获取首页推荐图
    async getRecommend (){
      // 解构赋值 把 message里的数据 解构出来
      var { message } = await getRecommendData();
      console.log(message);
      this.goodslist = message;
    }
  }
}
</script>

<style lang="scss" scoped>
.home_container{
background: #EFEDEE;
  .van-swipe-item {
    height: 200px;
    line-height: 150px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background-color: #39a9ed;

    img{
      width: 100%;
      height: 100% ;
    }
  }
  .van-grid{
    background: #fff;
    .van-grid-item{
      padding: 10px 4px ;  

      .van-grid-item__content{
        
        img{
          width: 50%;
          vertical-align: middle;  // 去除图片底部 3px 的间距 
        }
        span{
          font-size: 14px;
          color: #524949;
        }
      }
    }
  }

  .divider {
    .van-divider {
      text-align: center;
      padding: 0 4px;
      color: #333;
      font-size: 16px;
      border-color: #545e6c;
    }
  }

  .goodslist{
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    justify-content: center;
    
    .item{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 47%;
      margin: 5px;
      border-radius: 6px;
      background: #fff;
      overflow: hidden;     

      img{
        width: 100%;
        // border-radius: 6px;
      }
      .text{
        padding: 2px;
        display: flex;
        flex-direction: column;       // 垂直对齐
        
        .title{
          color: #333;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;		// 此属性可以设置当文本溢出时将显示省略标记(...)
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .footer{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px;
          font-size: 12px;

          .price{
            color: rgb(235, 62, 62);
            font-size: 14px;
          }
          .buy{
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>