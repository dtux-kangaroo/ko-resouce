import api from "@/api/index.js";


const global = {
  state: {
    navData:{
      topNav:[],
      sideNav:[]
    },
    sideBar:{
      isFold:false
    }
  },
  mutations: {
    GET_NAV_DATA: (state, data) => {
      state.navData = data;
    },
    TOGGLE_SIDE_BAR: (state, data) => {
      state.sideBar.isFold =!state.sideBar.isFold;
    }
  },
  actions: {
    getNavData({ commit }, params,cb) {
      api.getNavData({}).then(ret=>{
        console.log(ret);
        commit('GET_NAV_DATA', ret.data||[]);
      })
   },
   toggleSideBar({ commit }, params,cb) {
     commit('TOGGLE_SIDE_BAR', );
   }
  }
}

export default global
