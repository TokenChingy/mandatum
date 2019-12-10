import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import _ from 'lodash';

Vue.use(Vuex);

const Persist = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    userName: 'mandatum',
    theme: {
      dark: '#0a0012',
      mid: '#0f0d1f',
      light: '#1a2230',
      primary: '#b2f6ff',
      secondary: '#db698a',
    },
  },
  getters: {
    getUserName: state => state.userName,
    getTheme: state => state.theme,
  },
  mutations: {
    setUserName: (state, userName) => {
      state.userName = userName;
    },
    setTheme: (state, payload) => {
      const newColour = _.includes(payload[0], '#') ? payload[0] : `#${payload[0]}`;
      state.theme[payload[1]] = newColour;
    },
  },
  actions: {},
  plugins: [Persist.plugin],
});
