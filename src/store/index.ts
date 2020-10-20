import Vue from "vue";
import Vuex from "vuex";
import { dataStream } from "./StreamService/dataStream";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stockList: {},
    subscriber: null,
  },
  getters: {
    assets: (state) => {
      var listOfStocks = Object.values(state.stockList);
      return listOfStocks.sort((a, b) => {
        return b.isFavorite - a.isFavorite;
      });
    },
  },
  mutations: {
    updateStockObject: (state, payload) => {
      console.log(state.stockList[payload.assetId]);
      if (state.stockList[payload.assetId] != null) {
        state.stockList[payload.assetId].price = payload.price;
        state.stockList[payload.assetId].lastUpdate = payload.lastUpdate;
      } else {
        Vue.set(state.stockList, payload.assetId, {});
        Vue.set(state.stockList, payload.assetId, payload);
      }
    },
    setSubscriber: (state, payload) => {
      state.subscriber = payload;
    },
    setIsFavorite: (state, payload) => {
      state.stockList[payload.assetId].isFavorite = payload.value;
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
