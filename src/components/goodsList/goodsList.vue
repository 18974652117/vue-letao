<template>
  <div class="goods_container">
    <div class="goodslist">
      
      <!-- 用变量就要用属性绑定 -->
      <router-link :to="'/goodsDetails/'+item.id" tag="div" class="item" v-for="item in goodslist" :key="item.id">
        <img v-lazy="item.img_url" alt="">
        <div class="text">
          <div class="title titles">{{ item.title }}</div>
          <div class="price">
            <span class="sell_price">&yen;{{ item.sell_price }}</span>
            <span class="market_price">&yen;{{ item.market_price }}</span>
          </div>
          <div class="hot">
            <span>热卖中</span>
            <span>剩余{{ item.stock_quantity }}件</span>
          </div>
        </div>
      </router-link>
      <!-- <div class="item">
        <img src="http://test.w0824.com/huaweiry.png" alt="">
        <div class="text">
          <div class="title">华为荣耀。。。</div>
          <div class="price">
            <span class="shoPrice">&yen;1999</span>
            <span class="marketPrice">&yen;2200</span>
          </div>
          <div class="hot">
            <span>热卖中</span>
            <span>剩余50件</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>

</template>

<script>
import { getGoodsData} from "../../api/index"
export default {
  name: 'goodslist',               // 商品列表
  components:{

  },

  /** vue 生命周期 */ 
  created(){
    this.$parent.showNavBar({ title: "商品列表" });
    this.$parent.showHeader();
    this.$parent.hideTabbar();  // 隐藏 tabbar
    this.getGoods();
  },

  data(){
    return{
      page: 1,              // 默认 第一页
      goodslist: [],     // 获取所有数据
    }
  },
  methods:{
    async getGoods(){
      var { message } = await getGoodsData(this.page);
      console.log(message);
      this.goodslist = message;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
  .goods_container{
    padding: 4px;
    background-color: #e9e9e9;

    .goodslist{
      display: flex;
      flex-wrap: wrap;                 // 换行

      .item{
        display: flex;
        flex-direction: column;         // 上下排列
        justify-content: space-between;
        width: 46%;
        padding: 2px;
        margin: 4px;
        border-radius: 6px;
        overflow: hidden;               // 超出隐藏
        background: #fff;

        img{
          width: 100%;
        }

        .text{
          padding: 5px;

          .title{
            padding: 2px;
            font-size: 12px;
            color: #333;

            // overflow: hidden;
            // text-overflow: ellipsis;		// 此属性可以设置当文本溢出时将显示省略标记(...)
            // display: -webkit-box;
            // -webkit-line-clamp: 1;
            // -webkit-box-orient: vertical;
          }

          .price{
            margin: 4px 0;

            .sell_price{
              font-size: 16px;
              color: #ff0000;
              margin-right: 20px;
            } 
            .market_price{
              font-size: 12px;
              color: #333;
              text-decoration: line-through;            //  钱上的删除线
            }
          }
        }

        .hot{
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }

</style>