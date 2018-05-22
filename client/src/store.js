import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    postTemp: []
  },
  mutations: {
    setPostTemp(state, payload) {
      state.postTemp = [...payload]
    }
  },
  actions: {
    getAllPost({ commit }) {
      Axios
        .get('http://localhost:3000/posts')
        .then(result => {
          console.log(result)
          commit('setPostTemp', result.data.posts)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
