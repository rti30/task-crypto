import server from '@/apiCoin/server'

export default async ({ coin, toCoin }) => {
	const chartApi = await server()
	if (!chartApi) {
		throw new Error("Сервер валют недоступен")
	}
	const { data } = await chartApi.simple.price({
		ids: coin,
		vs_currencies: toCoin,
	});
	return data[coin[0]][toCoin[0]];
}