<template>
<!-- <div>
  <div> 获取参数第一种方式-{{ id }}</div>
  <div> 获取参数第二种方式-{{ id }} 或 直接获取参数-{{ $route.params.id }}</div>  
</div>   -->
<div class="newsDetail_container">
  <h3 class="title">{{ news.title }}</h3>
  <div class="publish_date">
    <span>发布时间：{{ news.add_time  | dateFormat }}</span>
    <span>阅读次数：{{ news.click }}</span>
  </div>

  <!-- 分割线 -->
  <van-divider :hairline="false" />

  <div class="content" v-html="news.content">
    <!-- {{ news.content }} 使用 v-html 输出 里面有 html 标签 不能 用插值表达式 -->    
  </div>

  <!-- 组件 -->
  <van-field
    class="comment"
    v-model="comment"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
  />

  <!-- 评论按钮 -->
  <van-button class="comment_btn" type="info" block @click="postComment">评论</van-button>
  
  <!-- 评论列表 -->
  <div class="comment_list" v-for="item in comments" :key="item.id">
    <div class="item">
      <div>匿名用户：{{ item.user_name }}</div>
      <div>评论时间：{{ item.add_time | dateFormat }}</div>
    </div>
    <!-- <div class="item">
      <span>匿名用户：admin</span>
      <span>评论时间：2020-02-02</span>
    </div> -->
  </div>

  <!-- 加载更多 -->
  <van-button class="acting" type="danger" block :plain="true" @click="loadMore" :loading="isLoading" loading-text="加载中..." >加载更多</van-button>
</div>
</template>

<script>
import{ getnewsDetailsData , getommentsData ,postComment} from "@/api/index.js"
import { Field,Button,Divider} from 'vant';
export default {
  name: 'newsDetails',      
  props: ['id'],                 // 路由传参值是一个数组 {{ id }}

  components:{
    "van-field": Field,
    "van-button":Button,
    "van-divider":Divider,
  },

  /** 生命周期 */ 
  created(){
    // this.id = $route.params.id; // 路由传参
    this.$parent.showNavBar({ title :"新闻咨询" });
    this.$parent.showHeader();

    this.getnewsDetails();             // 获取新闻资讯
    this.getComments();                // 获取新闻资讯评论
  },
  data(){
    return {
      // id: ''                        // 路由传参
      comment: ''  ,                   // 评论区 v-model 绑定
    
      news: {},                       // 咨询数据
      comments: [],                   // 评论区数据
      page: 1,                        // 页码 默认1 页

      isLoading: false
    } 
  },

  methods: {

    /** 获取图文资讯 */ 
    async getnewsDetails(){
      var res = await getnewsDetailsData( this.id )
      this.news = res.message;
    },

    /** 获取图文咨询 评论 */ 
    async getComments(){
      this.isLoading = true;
      var { message } = await getommentsData( this.id, this.page );
      this.isLoading = false;

      // 第二页 新数据和旧数据 相加
      this.comments = this.comments.concat(message);

      
    },

    /** 发布评论 */
    async postComment(){
      var content = this.comment.trim()        //  去除输入框两边的空格
      if( content == ''){
        this.$Toast('不能为空')
        return
      }
      var { message,status,insertId } = await postComment(this.id);
      if( status == 0 ){
        this.$Toast(message);
        this.message = "";
        
        var item = { 
          add_time: Date.now() ,        // 获取当前是时间
          content,
          id: insertId,
          user_name: '路人甲'
        }

        this.comments.unshift(item);
      }else{
        this.$Toast('发布失败')
      }
    },

    /** 点击加载更多 */
    loadMore(){
      this.page++;
      this.getComments();
    }
  }
}
</script>

<style lang="scss" scoped>
  .newsDetail_container{
    // background-color: rgb(236,233,233);
    padding: 6px;
    
    .title{
      text-align: center;
      font-size: 16px;
      color: #404040;

    }

    .publish_date{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #888;
      padding: 0 10PX;
    
    }
    .content{
      /deep/ img{
        width: 100%;
      }

      /deep/ *{
        font-size: 14px;
      }
    }
    .textarea{              
      margin: 8px 0;
    }

    
    .comment_btn{           // 评论按钮
      margin-top: 8px 0;
    }
 
    .comment_list{           // 评论列表
      
      .item{
        background: #ccc;
        font-size: 12px;
        margin-top: 10px;
        padding: 4px;
    
      }
    }

    .acting{
      margin: 10px 0;
    }
  } 
</style>