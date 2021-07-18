<template>
  <div class="goodsDetails_container">
    <!-- <h3>商品详情--{{ id }}</h3> 获取 id -->
    <div v-if="false">
       <!-- 获取 vuex-mutation 数据 -->
        姓名：{{ $store.state.name }} ---
        年龄：{{ $store.state.age }}
        
        <!-- 同步修改 vuex-mutation 数据 -->
        <button @click="vuex_mutation">同步修改vuex</button><br/> 

        <!-- 获取 vuex-getters  -->
        姓名和 年龄：{{ $store.getters.getGetter }}<br/>

        <!-- 异步修改 vuex-Actions -->
        爱好：{{ $store.state.hobby }}
        <button @click="vuex_actions">异步修改vuex</button><br/> 
    </div>
   

    <!-- 轮播图 -->
    <div class="card">
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="pink">
        <van-swipe-item v-for="item in swipe" :key="item.src" >
          <img :src="item.src" alt="">
        </van-swipe-item>
        <!-- <van-swipe-item>
          <img src="http://test.w0824.com/huaweiry.png" alt="">
        </van-swipe-item> -->
      </van-swipe>
    </div>
    
    <!-- 商品价格 -->
    <div class="card">
      <div class="goodsName"  titles>{{ goodsInfo.title }}</div>
      <van-divider :hairline="false"></van-divider>
      <div class="price ">
        <span class="market_price">市场价：&yen;{{ goodsInfo.market_price }}</span>
        <span class="sell_price">本店价：&yen;{{ goodsInfo.sell_price }}</span>
        <span>商品id：{{goodsInfo.id }}</span>
      </div>
      <div class="goodsNumber">
        <span class="Number">购买数量：</span>
        <van-stepper v-model="count" />
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="card">
      <van-divider :hairline="false">商品信息</van-divider>
      <div class="info">
        <span>商品编号：{{  goodsInfo.goods_no}}</span>
        <span>库存情况：{{ goodsInfo.stock_quantity }}</span>
        <span>上架时间：{{ goodsInfo.add_time | dateFormat }}</span>
      </div>
    </div>

    <!-- 商品介绍 -->
    <div class="card">
      <van-divider :hairline="false">介绍</van-divider>
      <div class="content" v-html="goodsInfo.content"> </div>
    </div>

    <!-- 加购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
                                           <!-- 获取 geetters里的数量 -->
      <van-goods-action-icon icon="cart-o" :badge="$store.getters.carTotal" @click="toShoppingCar" text="购物车" />
      <van-goods-action-button type="warning" @click="addGoodsCart"  text="加入购物车-1" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { getThumbImsgesData, getGoodsinfoData } from "@/api/index.js"
import { Swipe, SwipeItem ,Divider,Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
export default {
  name: 'goodsDetails',
  components:{
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-divider": Divider,
    "van-stepper": Stepper,
    "van-goods-action":GoodsAction,
    "van-goods-action-icon":GoodsActionIcon,
    "van-goods-action-button":GoodsActionButton,
  },
  props: ['id'],
  created(){
    this.$parent.showNavBar({ title :"商品详情" });
    this.$parent.showHeader();
    this.$parent.hideTabbar();
    this.getSwipe();
    this.getGoodsInfo();
  },
  data(){
    return {  
      count: 1,              // 步进器
      swipe: [],             // 数组数据 用循环
      goodsInfo:{},          // 对象数据 直接用差值表达式
    }
  },

  methods: {
 
    /** 轮播图 */ 
    async getSwipe(){
      var { message } = await getThumbImsgesData(this.id);
      // console.log(message);
      this.swipe = message ;
    },

    /** 获取商品 参数 价格等 信息 */ 
    async getGoodsInfo(){
      var { message } = await getGoodsinfoData(this.id);
      console.log(message);
      this.goodsInfo = message;
    },


    /** 加入购物车   购物车商品对象{id,number,price,selected: true   }*/ 
    addGoodsCart(){
      let goods = {
        id: this.goodsInfo.id ,             // 当前商品 id
        number : this.count,                // 当前的商品 数量 count
        price : this.goodsInfo.sell_price,  // 当前商品 本店价格  sell_price
        selected: true,                     // 默认选中状态
      };
      this.$store.commit('addGoodsCar',goods)
    },

    /** 跳转购物车 */ 
    toShoppingCar(){
      this.$router.push("/cart");
    },



    
    /**  以下方法是 Vuex 练习  */
    /** 同步修改vuex 的数据 */
    vuex_mutation(){      // mutation 只能传一个数据 所以用 对象
      // this.$store.state.name = 'admin';  // 不建议在这里修改
      // this.$store.commit('方法名'，'参数') 进行调用
      this.$store.commit('setMutations', { newName:'admin',newAge: '20' })
    },
    
    /** 异步修改 */
    vuex_actions(){
      this.$store.dispatch('setActions',['王者荣耀','吃鸡']);

    }
  },
}
</script>

<style lang="scss" scoped>
// 还可以放到 App 里面全局使用
@import "../../assets/style/common.scss";
  .goodsDetails_container{
    background-color: #e9e9e9;
    .card{
      padding: 4px;
      margin: 4px;
      border-radius: 6px;
      background: #fff;
      .van-swipe{
        height: 245px;
        border-radius: 6px;
        background: #FFFFFF;

        .van-swipe-item{
          display: flex;
          justify-content: center;
          align-items: center;
          
          img{
            width: 245px;
            height: 100%;
          }
        }
      }

      // <!-- 商品价格 -->
      .goodsName{
        color: #333;
        text-align: center;
      }
      .price{
        display: flex;
        
        margin:  10px;
        font-size: 14px;
        .market_price{
          text-decoration: line-through; 
          padding-right: 30px;
        }
        .sell_price{
          color: #FF270D;
          font-weight: 700;
        }
      }

      .goodsNumber{
        display: flex;
        margin: 10px;

        .Number{
          margin-right: 30px;
        }

        // 步进器 
        .van-stepper{ 

        }
      }

      // 商品信息
      .info{
        display: flex;
        flex-direction: column;
        margin: 0 8px;
      }

      // 介绍
      .content{

        /deep/ img{
          width: 100%;
          font-size: 14px;
          font-size: #ccc;
        }
      }
    }
  }
</style>