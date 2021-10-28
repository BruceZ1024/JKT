import {createStore} from 'vuex';
import routes from './../router/routes'

const keepLiveRoute = routes.filter((item) => {
  const meta = item.meta
  if (!!meta) return meta.keepAlive
  return false;
}).map(item => (item.name))

export default createStore({
  state: {
    keepLiveRoute: [...keepLiveRoute],
    exclude: [...keepLiveRoute],
  },
  mutations: {
    ClearKeep(state) {
      if (state.keepLiveRoute.length) state.keepLiveRoute = [];
    },
    SetKeep(state) {
      if (!state.keepLiveRoute.length) state.keepLiveRoute = keepLiveRoute;
    }
  },
  actions: {},
  modules: {},
});
