import Vue  from "vue";
import Router from 'vue-router'

Vue.use(Router)

const home =() => import('../components/tabBar/home/home.vue')
const cart =() => import('../components/tabBar/cart/cart.vue')
const user =() => import('../components/tabBar/users/user.vue')
const login =() => import('../components/tabBar/users/login.vue')
const address =() => import('../components/tabBar/users/address/address.vue') // 地址管理
const addressAdd =() => import('../components/tabBar/users/address/addressAdd.vue') // 地址管理
const addressEdit =() => import('../components/tabBar/users/address/addressEdit.vue')
const register =() => import('../components/tabBar/users/register.vue')
const newList =() => import('../components/newList/newList.vue')            // 新闻资讯
const newsDetails =() => import('../components/newList/newsDetails.vue')   // 新闻详情
const goodsList =() => import('../components/goodsList/goodsList.vue')
const goodsDetails =() => import('../components/goodsList/goodsDetails.vue')
const meitu =() => import('../components/Meitu/meitu.vue')

const router = new Router({
  routes: [
    { path:'/',redirect: '/home' },
    { path:'/home' , component: home },
    { path:'/cart' , component: cart },
    
    // props： true  解耦获取参数
    { path:'/user',component: user },
    { path:'/login',component: login },
    { path:'/register',component: register },

    /* 地址管理 */
    {path:"/address", component: address }, 
    {path:"/addressAdd" , component: addressAdd }, 
    {path:"/addressEdit" , component: addressEdit }, 

    { path:'/newList' , component: newList },
    // props 结构，获取参数页面可以不用 route 获取参数
    {path:"/newsDetails/:id" , component: newsDetails, props: true},
    { path:'/goodsList' , component: goodsList },
     /** 商品详情 */   
     {path:"/goodsDetails/:id" , component: goodsDetails, props: true},

    { path:'/meitu' , component: meitu },
   
    
  ],
  mode:'history'
})

// 全局路由  前置导航
// router.beforeEach((to,from,next) =>{
//   if(to.path == '/home'){
//     Vue.nextTick( () =>{
//       // 等待Dom渲染挂载后再触发
//       document.getElementById('header').style = 'block';
//     })
//   }else{
//     Vue.nextTick( () =>{
//       document.getElementById('header').style.display = "none";
//     } )
//   }
//   next();
// })

export default router
