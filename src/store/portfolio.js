import convert from "@/apiCoin/convert";
export default {
   namespaced: true,
   state: {
      assets: [], // {count} //! сохраняется в виде строки, для работы с большими дробями/числами
      currency: 'usd',
      request: "succsess",
   },
   getters: {
      assets: state => state.assets,
      currency: state => state.currency,
      total: state => state.assets.reduce((acc, item) => acc += item.price * +item.count, 0),
      request: state => state.request,
   },
   mutations: {
      setAssets(state, data) {
         state.assets = data;
      },
      changeCoin(state, { id, count, price }) {
         if (count) {
            state.assets[id].count = count;
         }
         if (price) {
            state.assets[id].price = price;
         }
      },
      addCoin(state, coin) {
         state.assets.push(coin);
      },
      setRequest(state, result) {
         state.request = result;
      },
   },

   actions: {
      async changeAssets({ getters, commit }, { op, coin, count }) {
         //?(подумать) можно не блокировать, а переделать на промис и пусть выполняются по очереди
         //ToDo (подумать) сделать конструкцию ниже читабельнее
         count = Number(count);
         if (getters.request === "pending") {
            return
         }
         commit("setRequest", "pending");
         try {
            if (!op || !coin) {
               commit("setRequest", "succsess");
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
            else if (!isNaN(count)) {
               const price = getters.currency === coin.id ? 1
                  :
                  await convert({
                     coin: [coin.name],
                     toCoin: [getters.currency],
                  });
               const findIndex = getters?.assets.findIndex((coin) => coin?.id === id);
               let oldCount = findIndex !== -1 ? getters.assets[findIndex].count : 0;
               oldCount = Number(oldCount);
               let newCount = 0;
               if (op === "increase") {
                  newCount = oldCount + count;
               }
               else if (op === "decrease") {
                  newCount = oldCount - count;
                  if (findIndex == -1) {
                     commit("setRequest", "succsess");
                     return
                  }
               }
               if (findIndex !== -1) {
                  if (newCount <= 0) {
                     remove();
                     commit("setRequest", "succsess");
                     return;
                  }
                  commit("changeCoin", { id: findIndex, count: newCount.toString(), price });
               }
               else {
                  const newCoint = { ...coin, count: count.toString(), price }
                  commit("addCoin", newCoint);
               }
            }
            commit("setRequest", "succsess");
         }
         catch (e) {
            console.warn(e);
            commit("setRequest", false);
         }
      },
      async updateAssetsPrices({ getters, commit }) {
         if (getters.request === "pending") {
            return
         }
         try {
            commit("setRequest", "pending");
            const getPrice = async (name) => await convert({
               coin: [name],
               toCoin: [getters.currency],
            });
            const updateAll = () => getters.assets.map(async coin => {
               const price = getters.currency === coin.id ? 1 : await getPrice(coin.name);
               return new Promise(resolve => {
                  if (price) {
                     const findIndex = getters?.assets.findIndex((el) => el?.id === coin.id);
                     commit("changeCoin", { id: findIndex, price });
                     resolve();
                  }
                  else {
                     commit("setRequest", false);
                     resolve(); //reject
                     throw new Error("Ошибка обновления стоимости валюты")
                  }
               })
            });
            await Promise.all(updateAll());
            commit("setRequest", "succsess");
         }
         catch (e) {
            commit("setRequest", false);
            console.warn(e)
         }
      },
   },
}
