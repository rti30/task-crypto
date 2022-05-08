
import getCoins from "@/apiCoin/getCoins"
import convert from "@/apiCoin/convert";
import dataChart from "@/apiCoin/chart";
export default {
   namespaced: true,
   state: {
      coins: {},
      // TODO, это можно перенести в отельный state
      chart: [],
      convert: {
         from: null,
         to: null,
         result: null,
      },
      // TODO, это можно перенести в отельный state
      requests: {
         chartHistory: "succsess",
         convert: "succsess",
      },
   },
   getters: {
      coins: (state) => state.coins,
      chart: (state) => state.chart,
      days: () => "14",
      convert: (state) => state.convert,
      requests: state => state.requests,
   },
   mutations: {
      setCoins(state, data) {
         if (data) { state.coins = data }
      },
      // TODO, это можно перенести в отельный state
      setChart(state, data) {
         if (data) { state.chart = data }
      },
      setForConvert(state, { item, coin }) {
         state.convert[item] = coin;
      },
      setResult(state, result) {
         state.convert.result = result;
      },
      // TODO, это можно перенести в отельный state
      setRequest(state, { name, result }) {
         state.requests[name] = result;

      },
      // TODO, это можно перенести в отельный state
      isClear(state) {
         state.chart = [];
         Object.keys(state.convert).forEach(el => state.convert[el] = el === "request" ? "succsess" : null);
      }
   },
   actions: {
      getCoins({ commit }) {
         //Заглушка, не ассинхронная. В случае замены на запрос, добавить защиту от множественного выполнения
         try {
            const data = getCoins();
            commit("setCoins", data)
         }
         catch (e) {
            console.warn(e);
         }
      },
      // TODO, это можно перенести в отельный state
      async getChartData({ commit, getters }, { coin, toCoin }) {
         if (getters.requests.chartHistory === "pending") {
            return;
         }
         try {
            commit("setRequest", { result: "pending", name: "convert" });
            let { data } = await dataChart({
               days: getters.days,
               coin,
               toCoin
            });
            if (data) {
               commit("setChart", data.prices)
            }
            commit("setRequest", { name: "convert", result: "succsess" });
         }
         catch (e) {
            console.warn(e);
            commit("setRequest", { name: "convert", result: false });
         }
      },
      changeSelect({ commit, getters }, { item, coin }) {
         const hasInCoins = () => getters.coins?.some(item => item.id === coin.id);
         if (item && coin && hasInCoins()) {
            commit("setForConvert", { item, coin });
         }
      },
      async convert({ commit, getters }) {
         if (getters.requests.convert === "pending") {
            return
         }
         commit("setResult", null);
         try {
            commit("setRequest", { result: "pending", name: "convert" });
            if (getters.convert.to && getters.convert.from) {
               try {
                  const result = await convert({
                     coin: [getters.convert.from.name],
                     toCoin: [getters.convert.to.id],
                  });
                  commit("setResult", result);
               }
               catch (e) {
                  console.warn(e);
               }
            }
            commit("setRequest", { name: "convert", result: "succsess" });
         }
         catch (e) {
            console.warn(e);
            commit("setRequest", { name: "convert", result: false });
         }
      },
      // TODO, это можно перенести в отельный state
      clearData({ commit }) {
         commit("isClear");
      }
   },
}
