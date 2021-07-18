<template>
  <div class="meitu_container">
    <van-tree-select
      @click-nav="navHandle"
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex">

      <!-- 父传子。  替换 conten插槽 的内容 --> 
      <template #content>
        <!-- activeIndex: 是当前分组的下标  @img-click: 自定义事件 子通信父 把imgClick事件传给子 ， 子通过 $emit 获取-->
        <common v-if="isShowCommon"  @img-click="thumb" :meituChildren="items[activeIndex].children"></common>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import{ getMeituData, getCatelistData,getThumbImsgesData} from "@/api/index.js"
import { TreeSelect,ImagePreview } from 'vant';
import common from '../../components/commom/common.vue'
export default {
  name: 'Meitu',            // 美图欣赏
  components:{
    common,
    "van-tree-select":TreeSelect,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  created(){
    this.getMeitu();

    this.$parent.showNavBar({ title :"美图欣赏" });
    this.$parent.showHeader();
  },
  data(){
    return{
      id: '',
      items: [],
      // items: [{ text: '分组1' ,children: [{ text:1111 }]},
      //         { text: '分组2' ,children: [{ text:2222 }] },
      //         { text: '分组2' ,children: [{ text:3333 }]}],
      activeId: 1,
      activeIndex: 0,

      isShowCommon: false
    }
  },

  methods:{

    /** 获取图片分类(分组) */ 
    async getMeitu(){
      var { message } = await getMeituData();
     
      if( !message.length ){ return };           // 先判断 message 里是都有数据
     
      var first_id = message[0].id;               // 取数组里 第一个 id

      // 同时最开始的时候还需要获取第一个分组的数据
      var first_children = await this.getCatelist(first_id);

      // 赋值给第一个分组的 children 属性。
      message[0].children = first_children;
      // console.log(message,'111');
      message.map(v => {
        v.text = v.title;                   //因为组件内部需要 text 属性， 所以我们需要构造出这样的属性
        delete v.title;                     // 用完后 删掉
      });
      
      this.items = message;

      // 等待上面的子组件加载完毕
      this.isShowCommon = true;             // 数据加载完毕之后再让子组件显示
    },

    /** 获取 分组下的列表数据 (获取children) */ 
    async getCatelist(id){
      var { message }  = await getCatelistData(id);
      // console.log(message,'2222');
      // 循环数组 添加 text 属性，显示分组内容
      message.map( v=>{
        v.text = v.title;
      })
      return message;
    },

    /** 点击侧边获取数据 */ 
    async navHandle(index){
      
      // 优化提高性能，可以提高用户体验
      // 判断当前 chilren 是有数据，有就是有缓存的数据，没有就发送请求。 优化减少请求次数。
      if( this.items[index].children &&  this.items[index].children.length > 0){      // 
        return;
      }
      this.isShowCommon = false; 
      var id = this.items[index].id;        // 获取图片分组的id
      
      var children = await this.getCatelist(id);   // 获取指定分组下面的图片列表数据
      // console.log(children,'3333');
      this.items[index].children = children;  // 需要把获取的数据赋值给对应的分组 children
      this.isShowCommon = true;
    },


    /** 子通信父 */ 
    async thumb(id){
      // alert('id'+ id)
      var { message } = await getThumbImsgesData(id)

      // 判断 防止没有数据
      if( !message.length ){
        this.$toast('亲,没有该图片哦')
        return
      }

      var thumbnailArr = [];
      message.map( v =>  thumbnailArr.push( v.src ) )
      ImagePreview(thumbnailArr);
    }
  }
}
</script>

<style lang="scss" scoped>
  .meitu_container{
    .van-tree-select {
       height: 100vh !important;
    }
  }
</style>