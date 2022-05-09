
import dataChart from "@/apiCoin/chart";
export default {
   namespaced: true,
   state: {
      chart: [],
      request: "succsess",
      convert: { //Логика не дублируется. Это отдельный модуль. Т.е. при конвертации может прийти ошибка. А график останется с прошлыми значениями.
         from: null,
         to: null,
      }

   },
   getters: {
      chart: (state) => state.chart,
      days: () => "14",
      convert: (state) => state.convert,
      request: (state) => state.request
   },
   mutations: {
      setChart(state, { data, toCoin, coin }) {
         state.chart = data;
         state.convert.from = coin;
         state.convert.to = toCoin;
      },
      isClear(state) {
         state.chart = [];
      },
      setRequest(state, result) {
         state.request = result;
      },
   },
   actions: {
      async getChartData({ commit, getters }, { coin, toCoin }) {
         if (getters.request === "pending") {
            return;
         }
         try {
            commit("setRequest", "pending");
            let { data } = await dataChart({
               days: getters.days,
               coin,
               toCoin
            });
            if (data) {
               commit("setChart", { data: data.prices, coin, toCoin })
            }
            commit("setRequest", "succsess");
         }
         catch (e) {
            console.warn(e);
            commit("setRequest", false);
         }
      },
      clearData({ commit }) {
         commit("isClear");
      }
   },
}
