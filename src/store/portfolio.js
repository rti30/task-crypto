import convert from "@/apiCoin/convert";
export default {
   namespaced: true,
   state: {
      assets: [],
      currency: 'usd',
   },
   getters: {
      assets: state => state.assets,
      currency: state => state.currency,
      total: state => state.assets.reduce((acc, item) => acc += item.value, 0)
   },
   mutations: {
      setAssets(state, data) {
         state.assets = data;
      },
      changeCoin(state, { id, value }) {
         state.assets[id].value = value;
      },
      addCoin(state, coin) {
         state.assets.push(coin);
      },
   },

   actions: {
      async changeAssets({ getters, commit }, { op, coin, value }) {
         if (!op || !coin) {
            return;
         }
         const id = coin?.id;
         const remove = () => {
            const data = getters.assets?.filter(item => item.id !== id);
            commit("setAssets", data);
         }
         if (op === "remove") {
            remove();
         }
         else if (!isNaN(value)) {
            value = getters.currency === coin.id ? value
               :
               await convert({
                  coin: [coin.name],
                  toCoin: [getters.currency],
               });
            const findIndex = getters?.assets.findIndex((coin) => coin?.id === id);
            const oldValue = findIndex !== -1 ? getters.assets[findIndex].value : 0;
            let newValue = 0;
            if (op === "increase") {
               newValue = oldValue + value;
            }
            else if (op === "decrease") {
               newValue = oldValue - value;
               if (newValue <= 0 && findIndex == -1) {
                  return
               }
            }
            if (findIndex !== -1) {
               if (newValue <= 0) {
                  remove();
                  return;
               }
               commit("changeCoin", { id: findIndex, value: newValue });
            }
            else {
               const newCoint = { ...coin, value }
               commit("addCoin", newCoint);
            }
         }

      }
   },
}
