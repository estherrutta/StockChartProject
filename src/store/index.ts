import Vue from "vue";
import Vuex from "vuex";
import { dataStream } from "./StreamService/dataStream";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    assetObject: {},
    subscriber: null
  },
  getters: {
    assetList: (state) => {
      return Object.values(state.assetObject);
    },
  },
  mutations: {
    updateStockObject: (state, payload) => {
      if (state.assetObject[payload.assetId] != null) {
        state.assetObject[payload.assetId].price = payload.price;
        state.assetObject[payload.assetId].lastUpdate = payload.lastUpdate;
      } else {
        Vue.set(state.assetObject, payload.assetId, {});
        Vue.set(state.assetObject, payload.assetId, payload);
      }
    },
    setSubscriber: (state, payload) => {
      state.subscriber = payload;
    },
    setIsFavorite: (state, payload) => {
      state.assetObject[payload.assetId].isFavorite = payload.value;
    },
     
  },
  actions: {
    startObservable: ({ commit }) => {
      let subscriber = dataStream.subscribe((val) => {
        commit("updateStockObject", val);
      });
      commit("setSubscriber", subscriber);
    },
    stopObservable: ({ commit, state }) => {
      if (state.subscriber != null) {
        state.subscriber.unsubscribe();
        commit("setSubscriber", null);
      }
    },
  },
});
