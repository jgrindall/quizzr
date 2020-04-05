import Vue from 'vue';
import Vuex from 'vuex';
import UserService from './UserService';
import router from '../router/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
     selectedPlayer: null,
    players:[
      'john', 'levi', 'test'
    ]
  },

  actions: {
    onPlayerSelected({commit}, p){
      commit("setSelectedPlayer", p)
    },
    onLogin ({state}, data) {
      UserService
        .login(state.selectedPlayer, data.password)
        .then(res=>{
          console.log(res);
          router.push('/home');
        })
        .catch(error=> {
          console.log(error);
        });
    }
  },
  mutations: {
    setSelectedPlayer(state, p){
      state.selectedPlayer = p;
    }
  }
})
