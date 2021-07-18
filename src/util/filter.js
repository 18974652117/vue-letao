import  Vue from 'vue'
import moment from 'moment'   // 全局 过滤器

// 封装时间 格式   w外部使用 dateFormat 把时间戳转换时间格式
Vue.filter('dateFormat' ,function(date,format="YYYY-MM-DD"){
    return moment(date).format(format)
  });
