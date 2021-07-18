<template>
  <div class="address_container">
   <van-address-list v-model="chosenAddressId" :list="listAll" @add="onAdd" @edit="onEdit"/>
  </div>
  <!-- 没传这里是 ui 的属性 -->
</template>

<script>
import { userAddressData } from '@/api/index'  // 地址
import { AddressList } from 'vant';
export default {
  name: 'administration',          // 地址管理
  components:{
   "van-address-list": AddressList,
  },
  created(){
    this.$parent.showNavBar({ title: "地址管理" });
    this.$parent.showHeader();

    this.getUserAddress();
  },
  data() {
    return {
      chosenAddressId: '1',
      listAll: [],       // 这里要怎么获取到 list? 
      // listAll: [
      //   {
      //     id: '1',
      //     name: '张三',
      //     tel: '13000000000',
      //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
      //     isDefault: true,
      //   },//
      //   {
      //     id: '2',
      //     name: '李四',
      //     tel: '1310000000',
      //     address: '浙江省杭州市拱墅区莫干山路 50 号',
      //   },
      // ],
    };
  },
  methods: {
    /** 获取地址 */  
    async getUserAddress(){

      // 这里获取 用户信息  转对象 
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));   
      var userAddress = await userAddressData(userInfo.id); 
      var that = this;
      console.log(userAddress,'地址');
      // 筛选地址
      userAddress.map( v=>{
        v.address  = v.addressDetail;
        if(v.isDefault == 1){
          v.isDefault = true;
          that.chosenAddressId = v.id;
        }else{
          delete v.isDefault;
        }
      })
      this.listAll = userAddress;
      
    },

    /* 跳转地址管理 */ 
    onAdd() {
      // this.$toast('新增地址');

      this.$router.push('/addressAdd')
    },
    onEdit(item, index) {
      this.$toast('编辑地址:' + index);
      this.$router.push('/addressEdit')
    },
  },
}
</script>
<style lang="scss" scoped>
  .address_container{

  }
</style>