//   这里封装一个 axios 的实例

import axios  from "axios";
import router from '../router/index'
import { Toast } from "vant";
const instance = axios.create({
  baseURL: 'http://api.w0824.com/api',
});

 
 // 请求拦截器   设置请求头
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 设置自定义请求头(authorized - 要求是 https)把 token 带给后台，方便进行后台验证
  var token = localStorage.getItem('token') || '' ; 
  token && (config.headers.token = token) ;

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  var status = error.response.status;
  var message = error.response.data.message;
  
  switch(status){
    case 401:
      Toast('用户信息过去，请重新登录');
      router.push('/login')
      break;
    default:
      this.$toast('网咯错误，请稍后再试')
  }
  // return Promise.reject(error.response);
});


export default instance;