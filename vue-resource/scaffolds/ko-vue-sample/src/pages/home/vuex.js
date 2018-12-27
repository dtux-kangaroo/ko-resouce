import api from "@/api/index.js";


const home = {
  state: {
    homeData:[]
  },
  mutations: {
    GET_HOME_DATA: (state, homeData) => {
      state.homeData = homeData
    }
  },
  actions: {
    getHomeData({ commit }, params,cb) {
        api.getHomeData({}).then(ret=>{
          console.log(ret);
          commit('GET_HOME_DATA', ret.data||[]);
        })
     }
  }
}

export default home
