import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.prototype.axios = axios

export default new Vuex.Store({
  state: {
    wholeDatas: [],
    datas: []
    // parentData: []
  },
  mutations: {
    modifyTitles (state, Obj) {
      // console.log(state.wholeDatas[Obj])
      state.datas = state.wholeDatas[Obj]
    },
    firstShow (state, Obj) {
      if (Obj.classify[0].field === 'active') {
        state.datas = Obj[Obj.classify[0].text]
      }
      state.wholeDatas = Obj
    }
    // submitPages (state, Obj) {
    //   state.parentData = Obj
    // }
  },
  actions: {
    showTitles (context) {
      axios.get('http://134.175.89.43:8745/static/demo.json', {})
        .then(function (response) {
          context.commit('firstShow', response.data)

          // self.classify = response.data.classify
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

})
