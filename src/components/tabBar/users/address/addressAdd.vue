<template>
  <div class="addressAdd">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="onChangeArea"
    />
    </div>
</template>
<script>
import { AddressEdit } from "vant"
import areaList from "@/util/area.js" 
import { getAddUserAddressData } from '@/api/index'
export default {
  name: "addresAdd",       //  新增地址管理页面    
  components:{
    "van-address-edit": AddressEdit,
  },
  created(){
    this.$parent.showNavBar({ title: "新增地址管理" });
    this.$parent.showHeader();
  },
  data() {
    return {
      areaList,
      searchResult: [],
      areaCode: '',
    };
  },
  methods: {
    /* 收集到的用户的地址信息 */ 
    async onSave(addressInfo) {
      // console.log(addressInfo);

      addressInfo.country = addressInfo.county;
      if(addressInfo.isDefault == true){
          addressInfo.isDefault = 1;
      }else{
          addressInfo.isDefault = 0;
      }
      
      // 这里通过 this 接收到 areaCode
      addressInfo.areaCode = this.areaCode;
      
      // addressInfo:收集到的用户地址信息， 把用户信息存起来,
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log(addressInfo,'用户地址');
      var user_id = userInfo.id;

      // 调用地址
      var res = await getAddUserAddressData( user_id,addressInfo );
      console.log(res);
        
      this.$toast('添加地址成功112345')
        if(res.status == 0){
          this.$router.push('/address')
      }
        
      // this.$toast('save');
    },
    onDelete() {
      this.$toast('delete');
    },
    
    /* 用户点击省市区确认按钮 */ 
    onChangeArea(values) {
      console.log(values);

      var areaArr = [];
      values.map(v=>{
        areaArr.push(v.code);
      })

      // 通过this.把 area.code 传到onSave里面去。
      this.areaCode = areaArr.join('-');
    }
  },
}
</script>

<style lang="scss" scoped>

</style>