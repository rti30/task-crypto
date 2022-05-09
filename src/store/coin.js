
import getCoins from "@/apiCoin/getCoins"
import convert from "@/apiCoin/convert";
export default {
   namespaced: true,
   state: {
      coins: {},
      convert: {
         from: null,
         to: null,
         count: 1,
         price: null,
      },
      request: "succsess",
   },
   getters: {
      coins: (state) => state.coins,
      convert: (state) => state.convert,
      request: state => state.request,
      result: ({ convert }) => convert.price ? convert.price * convert.count : null
   },
   mutations: {
      setCoins(state, data) {
         if (data) { state.coins = data }
      },
      setForConvert(state, { item, value }) {
         state.convert[item] = value;
      },
      setPrice(state, result) {
         state.convert.price = result;
      },
      setRequest(state, result) {
         state.request = result;

      },
      isClear(state) {
         Object.keys(state.convert).forEach(el => state.convert[el] = el === "count" ? 1 : null);
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
      changeSelect({ commit, getters }, { item, coin, count }) {
         const hasInCoin = () => getters.coins?.some(item => item.id === coin.id);
         if (item && hasInCoin()) {
            commit("setForConvert", { item, value: coin });
         }
         if (!isNaN(count)) {
            commit("setForConvert", { item: "count", value: count });
         }
      },
      async convert({ commit, getters }) {
         if (getters.request === "pending") {
            return
         }
         commit("setPrice", null);
         commit("setRequest", "pending");
         try {
            if (getters.convert.to && getters.convert.from && !isNaN(getters.convert.count)) {
               try {
                  const result = (await convert({
                     coin: [getters.convert.from.name],
                     toCoin: [getters.convert.to.id],
                  }));
                  commit("setRequest", "succsess");
                  if (result) {
                     commit("setPrice", result);
                  }
               }
               catch (e) {
                  commit("setRequest", false);
                  console.warn(e);
               }
            }
         }
         catch (e) {
            commit("setRequest", false);
            console.warn(e);
         }
      },
      clearData({ commit }) {
         commit("isClear");
      }
   },
}
