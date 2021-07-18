import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  // 获取 state :this.$store.name  , 
  state: {              // 状态-数据。    共享数据。
    name: 'gkw',
    age: 28,
    hobby: ['篮球','足球']
  },

  // 如果state中的数据需要进行过滤处理之后再返回，就可以吧逻辑定义在getters中
  // 组件中通过 this.$store.getters.getNameAge 获取 
  getters:{             // 获取数据。   getter就是对数据状态进行处理筛选，我们可以通过getter处理过后再返回给组件使用。 
    getGetter(state){
      return "我叫"+ state.name  +'年龄'+ state.age;
    }
  },

  /** mutations：修改数据 */   // 只能传 1 个 参数，传多就用就用 对象
  mutations: {          // 同步修改数据 。 修改共享数据的唯一途径。// 组件中通过 this.$store.commit('方法名'，'参数') 进行调用
    setMutations(state,obj){
      state.name = obj.newName;       // this.$store.commit('方法名'，'参数') 进行调用
      state.age = obj.newAge;
    },
    

    setAction(state, newHobby){
      state.hobby = newHobby
    }
  },

  /** actions： 异步修改数据，最终还是要调用mutations来修改数据 */ 
  // 组件中通过 this.$store.dispatch('actions中方法',参数)来调用
  actions: {            // 异步修改数据。 // 异步的处理数据，最终触发mutations中的方法来修改数据   
    
    // context: 治理是context是当前的store 上下文对象
    setActions(context,newHobby){
      setTimeout( () =>{
        context.commit('setAction',newHobby)
      },1000)
    }
  },
  modules: {            // 模块           Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块
  }
})
