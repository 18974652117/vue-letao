<template>
  <div class="cart_container">
    <div v-if="hasGoods">
      <van-divider :hairline="false">收货地址：{{ $store.getters.getGoodsId }}</van-divider>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
      />

      <van-divider :hairline="false">购买商品{{ $store.getters.getGoodsSumPrice }}</van-divider>
      <div class="car">
        <div class="item" v-for="(item,index) in carData" :key="item.id">
          <div class="switch">
            <van-switch @change="switchChange(item.id , $store.getters.getGoodsSelected[item.id])" v-model="$store.getters.getGoodsSelected[item.id]"  />
          </div>
          
          <div class="img_container">
             <img :src="item.thumb_path" alt="">
          </div>

          <div class="info"> 
            <div class="title" >{{ item.title }} </div>
            <div class="footer">
              <div class="price">&yen;{{ item.sell_price }}</div>
                    <!-- "$store.getters.getGoodsNumber：是对象，通过取值 [item.id]: 值  -->
              <van-stepper @change="numberModified( item.id , $store.getters.getGoodsNumber[item.id])" v-model="$store.getters.getGoodsNumber[item.id]" />
              <van-button type="danger" size="normal" @click="delGoods(item.id,index)" >删除</van-button>
            </div>
          </div>
        </div>

        <!-- <div class="item">
          <div class="switch">
            <van-switch v-model="checked" />
          </div>
          
          <div class="img_container">
            <img src="http://test.w0824.com/yingcun.png" alt="">
          </div>

          <div class="info"> 
            <div class="title" > 照亮你的美 照亮你的美照亮你的美照亮你的美照亮你的美照亮你的美</div>
            <div class="footer">
              <div class="price">&yen;2000</div>
              <van-stepper class="number" v-model="count" />
              <van-button type="danger" size="normal">删除</van-button>
            </div>
          </div>
        </div> -->

        <van-cell icon="balance-o" title="微信支付" value="内容" />

        <!-- 提交订单 -->
        <van-submit-bar :price="$store.getters.getGoodsSumPrice" button-text="订单z支付">
           <template #default>
            共{{ $store.getters.getGoodsSelectedNumber }}件商品
          </template>
          <template #tip>
            只支持微信支付, 
          </template>
        </van-submit-bar>
      </div>
    </div>
    <div v-else>
      空空如有
    </div>
  </div>
</template>

<script>
import { getCarData, } from '@/api/index.js'
import { Divider,AddressList,Switch,Stepper,Button,Cell,SubmitBar } from 'vant';
export default {
  name: 'cart',
  components:{
    "van-divider": Divider,
    "van-address-list": AddressList,
    "van-switch": Switch,
    "van-stepper": Stepper,
    "van-button": Button,
    "van-cell": Cell,
    "van-submit-bar": SubmitBar,
  },
  created(){
    this.$parent.showNavBar({ title :"购物车" });
    this.$parent.showHeader();    // 隐藏头部搜索框
    this.$parent.showTabbar();

    this.getCarGoods()
  },
  /** 计算属性 */
  computed: {
    hasGoods(){
      return this.carData.length > 0;
    }
  },

   data() {
    return {
      // count:1 ,          // 步进器
      // checked: true,     // 开关
      carData: [],          // 从本地获取 商品

      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
    
      ],
    };
  },
  methods: {

    /** 从接口 获取购物车商品id 价格 图片 */ 
    async getCarGoods(){
      // 从 vuex 中获取 id ,
      var ids = this.$store.getters.getGoodsId;   
      // 把 id 传个后端
      var { message } = await getCarData(ids);
      this.carData = message;
    },


    /** 删除商品  调用vueX 中的 mutations 里的方法 */
   delGoods(goods_id, index){
    this.$store.commit('delCarGoods', goods_id)
    // 同时也要在当前的私有数据this.carData也要删除
    this.carData.splice(index, 1)
   },


    /** switch 开关的改变  修改xueX中的数据 */
    switchChange( goods_id , selected ){
      this.$store.commit('switchSelected',{ goods_id, selected } );
    },


    /** 步进器加减 */
    numberModified(goods_id,number){
      this.$store.commit('changeNumber' , { goods_id , number });
    } 
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";
  .cart_container{
    background-color: #e9e9ee;
    
    .van-divider{
      text-align: center;
      color: #6f7370;
      font-size: 16px;
      border-color: #545e6c;
      margin: 2px;
    }
    .van-address-list{
      padding-bottom:  10px;
    }
    .van-address-list__bottom{
      visibility: hidden;
    }

    .car{
      margin: 10px;

      .item{
        display: flex;
        align-content: center;
        justify-content: space-between;
        border-radius: 8px;
        padding: 10px;
        margin: 10px 0;
        background-color: #fff;

        .switch{
          display: flex;
          align-items: center;
        }

        .img_container{
          display: flex;
          justify-content: center;
          align-items: center;  
          width: 80px;
          height: 80px;
          margin: 0 4px;

          img{
            width: 100%;
          }
        }

        .info{
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title{
            overflow: hidden;
            text-overflow: ellipsis;		// 此属性可以设置当文本溢出时将显示省略标记(...)
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .footer{
            display: flex;
            align-content: center;
            justify-content: space-between;

            .van-button{
              border-radius: 5px;
            }
          }
          .price{
            color: #ff0000;

          } 
          .numbe{
            // margin: 0 8px;
          }
        }
      }
    }

    .van-cell{
      border-radius: 8px;
    }
  }

</style>