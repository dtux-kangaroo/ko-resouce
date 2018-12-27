import api from "@/api/index.js";


const user = {
  state: {
    userData:[]
  },
  mutations: {
    GET_USER_DATA: (state, userData) => {
      state.userData = userData
    }
  },
  actions: {
    getUserData({ commit }, params,cb) {
        api.getUserData({}).then(ret=>{
          console.log(ret);
          commit('GET_USER_DATA', ret.data||[]);
        })
     }
  }
}

export default user
