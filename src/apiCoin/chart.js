import server from '@/apiCoin/server'
export default async ({ days, coin, toCoin }) => {
   try {
      const chartApi = await server()
      if (!chartApi) {
         throw new Error("Сервер валют недоступен")
      }
      return await chartApi.coins.fetchMarketChart(coin, {
         days: days,
         vs_currency: toCoin,
      });
   }
   catch (e) {
      console.warn(e);
   }
}