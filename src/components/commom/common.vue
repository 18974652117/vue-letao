
<template>
  <div class="newList_container">
    <div class="newlist">
      <router-link :to="'/newsDetails/'+item.id" tag="div" class="item" v-for="item in meituChildren" :key="item.id">
        <div class="img_container">
          <img @click.stop="imgClick(item.id)" v-lazy="item.img_url"  alt="">
        </div>
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="zhaiyao"> {{ item.zhaiyao }} </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>


export default {
  name:"common",                // 公共的 子组件

  props: ['meituChildren', 'testindex'],      // 子组件通过 props 接收

  methods:{
    imgClick(id){
      // 把数据传给父组件
      this.$emit('img-click',id)        // 接收事件传过来的 id
    }
  }
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

        .zhaiyao {
           overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
}
</style>