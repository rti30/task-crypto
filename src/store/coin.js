
import getCoins from "@/apiCoin/getCoins"
import convert from "@/apiCoin/convert";
import dataChart from "@/apiCoin/chart";
export default {
   namespaced: true,
   state: {
      coins: {},
      chart: [],
      convert: {
         from: null,
         to: null,
         result: null,
      }
   },
   getters: {
      coins: (state) => state.coins,
      chart: (state) => state.chart,
      days: () => "14",
      convert: (state) => state.convert,
   },
   mutations: {
      setCoins(state, data) {
         if (data) { state.coins = data }
      },
      setChart(state, data) {
         if (data) { state.chart = data }
      },
      setForConvert(state, { item, coin }) {
         state.convert[item] = coin;
      },
      setResult(state, result) {
         state.convert.result = result;
      }
   },
   actions: {
      getCoins({ commit }) {
         const data = getCoins();
         commit("setCoins", data)
      },
      async getChartData({ commit, getters }, { coin, toCoin }) {
         let { data } = await dataChart({
            days: getters.days,
            coin,
            toCoin
         });
         if (data) {
            commit("setChart", data.prices)
         }
      },
      changeSelect({ commit, getters }, { item, coin }) {
         const hasInCoins = () => getters.coins?.some(item => item.id === coin.id);
         if (item && coin && hasInCoins()) {
            commit("setForConvert", { item, coin });
         }
      },
      async convert({ commit, getters }) {
         commit("setResult", null);
         if (getters.convert.to && getters.convert.from) {
            const result = await convert({
               coin: [getters.convert.from.name],
               toCoin: [getters.convert.to.id],
            });
            commit("setResult", result);
         }
      }
   },
}
