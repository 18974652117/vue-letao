// 封装一个模块化，用于定义各种请求方法。
import instance from './config';

// 获取轮播图
export async function getLunBoData(){
  return await  instance.get('/getlunbo');
}

// 获取首页推荐商品
export async function getRecommendData(limit = 10){
  return  await instance.get(`/recommend?limit=${limit}`);
}


// 获取图文资讯
export async function getNewsListData(page=1,pagesize=5){
  return await  instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}
 
// 获取图文资讯  
export async function getnewsDetailsData(id){
  return await  instance.get(`/getnew/${id}`);
}

// 获取图文资讯 品论  getcomments/:artid?pageindex=1
export async function getommentsData( id ,page){
  return await  instance.get(`/getcomments/${id}?pageindex=${page}`);
}


// 发布评论信息 post请求   postcomment/:id
export async function postComment(id){
  return await  instance.post(`/postcomment/${id}`);
}

// 商品详情 列表数据  getgoods?pageindex=number
export async function  getGoodsData(page){
  return await  instance.get(`/getgoods?pageindex=${page}`);
}


// 美图欣赏(图片分类数据) getcategory
export async function  getMeituData(page){
  return await  instance.get('/getcategory');
}

// 获取指定图片下的分组  getcatelist/:id
export async function  getCatelistData(id){
  return await  instance.get(`/getcatelist/${id}`);
}


// 获取指定图片缩略图 /getthumbimsges
export async function  getThumbImsgesData(id){
  return await  instance.get(`/getthumbimages/${id}`);
}


// 获取商品参数区和价格，标题等数据 getgoodsinfo/:id
export async function  getGoodsinfoData(id){
  return await  instance.get(`/getgoodsinfo/${id}`);
}


// 获取购物车商品数据 getshopcarlist/:ids
export async function  getCarData(ids){
  return await  instance.get(`/getshopcarlist/${ids}`);
}


// 用户登录 post 请求
export async function  getUserLogin(data){
  return await instance.post(`/login`,data)
}


// 检测 token  判断用户是否登录 
export async function  isLogins () {
  var token = localStorage.getItem('token')
  try{
    // 没返回 打印  undefind
    return  await instance.post(`/checktoken?token=${token}`)
  }catch(e){

  }
}


// 获取用户地址  
export async function  userAddressData (userid) {
  var token = localStorage.getItem('token');
  // return await instance.get(`/getaddress/${userid}?v=${Math.random()}`)
  return await instance.get(`/getaddress/${userid}`)
  // return await instance.get(`/getaddress/${userid}?token=${token}`)
}

// 添加用户收货地址 post
export async function  getAddUserAddressData (userid,userInfo) {
  return await instance.post(`/addaddress/${userid}`,userInfo)
}

// 删除用户收货地址
export async function  deleteUserAddressData (addessid) {
  return await instance.post(`/deladdress/${addessid}`)
}


