import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 本地存储中肯能会有购物车商品，要先全部取出来，放在全局共享 state 中
var carData = JSON.parse( localStorage.getItem('carData') || '[]' );


const Store = new Vuex.Store({

  // 获取 state :this.$store.name  , 
  // 购物车商品对象{id,number,price,selecr:treu}
  
  state: {             // 状态-数据。    共享数据。
    carData: carData
  },

  mutations: {          // 同步修改数据 。 修改共享数据的唯一途径。// 组件中通过 this.$store.commit('方法名'，'参数') 进行调用
    
    /** 商品 加入 购物车中 */ 
    addGoodsCar(state,goods){
      // 1：加入购物车之前要先判断是否有同名的 id的 商品。
      var index  ;
      var isSameGoods =  state.carData.some( function(item,k){
        index = k;      // 记录当前同名商品下标
        return item.id === goods.id;
      });
      
      if( isSameGoods ){
        // 2：有：就数量累加。
        state.carData[index].number += goods.number;
      }else{
        // 3：没有： 构造一个购物车商品对象。
        state.carData.push(goods);
      }
      // 4：最后要把购同步在本地存储物车对象。
      localStorage.setItem( 'carData',JSON.stringify(state.carData) );
    },


    /** 删除商品 */
    delCarGoods (state, goods_id){
      var index ;
      var isFind = state.carData.some( (v,k) =>{ 
        if(v.id === goods_id){
          index = k; 
          return true;
        } 
      })

      // 删除数组元素
      if( isFind ){
        state.carData.splice(index, 1)
      }

      // 删除之后还有存储到本地存储
      localStorage.setItem( 'carData',JSON.stringify(state.carData) );
    },
    

    /** 修改开关 选中的状态  根据id 找到其所在的下标位置 */ 
    switchSelected (state , obj){
      let newIndex = state.carData.findIndex( v =>{
        return v.id == obj.goods_id
      })

      // 修改开关的状态
      state.carData[newIndex].selected = obj.selected;
      // 同步到本地存储
      localStorage.setItem('carData', JSON.stringify(state.carData))
    },  


    /**  步进器加减  修改商品的数量 */
    changeNumber(state , obj){
      var index = state.carData.findIndex(v => {
        return v.id == obj.goods_id
      })
      // 修改 步进器的 数量
      state.carData[index].number = obj.number
      // 同步到本地存储
      localStorage.setItem('carData', JSON.stringify(state.carData))
    } 
  },

  
  // 如果state中的数据需要进行过滤处理之后再返回，就可以吧逻辑定义在getters中
  // 组件中通过 this.$store.getters.getNameAge 获取 
 
  // 获取 购物车总数量  二次加工
  getters:{             // 获取数据。   getter就是对数据状态进行处理筛选，我们可以通过getter处理过后再返回给组件使用。 
    
    /** 获取购物车 商品数量 */ 
    carTotal(state){
      var total = 0 ;
      state.carData.map( v => total +=parseInt( v.number))
      return total;
    },


    /** 获取购物车所有商品的 id  */ 
    getGoodsId(state){
      var ids = [] ;
      state.carData.map( v => ids.push(v.id) );
      var idStr = ids.join(',');
      return idStr;
    },

    /** 获取购物车商品的购买数量 {商品id: 商品number} */ 
    getGoodsNumber(state){
      let obj = {};
      state.carData.map( v =>{
        // 为什么用中括号 ，每次不会被覆盖。给obj单独加个 id属性
        obj[v.id] = v.number
      })
      return obj;
    },

    /** 获取购物车商品是否选中 状态   { 商品id: true,商品id: false } */ 
    getGoodsSelected(state){
      let obj = {};
      state.carData.map( v =>{
        // 为什么用中括号 ，每次不会被覆盖。给obj单独加个 id属性
        obj[v.id] = v.selected
      })
      return obj;
    },


    /** 获取购物车选中的数量 */ 
    getGoodsSelectedNumber(state){
      var total = 0;
      state.carData.map( v =>{
        if(v.selected === true)
        total += v.number;
      })
      return total;
    },

    /** 获取选中商品总价格 */
    getGoodsSumPrice(state){
      let sum = 0;
      state.carData.map( v =>{
        if( v.selected === true){
          sum += v.number * v.price
        }
      })
      return sum*100;
    }

  },

  /** actions： 异步修改数据，最终还是要调用mutations来修改数据 */ 
  // 组件中通过 this.$store.dispatch('actions中方法',参数)来调用
  actions: {            // 异步修改数据。 // 异步的处理数据，最终触发mutations中的方法来修改数据   
    
  },
 
})
export default Store;