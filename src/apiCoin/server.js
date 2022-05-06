import CoinGecko from "coingecko-api";
const CoinGeckoClient = new CoinGecko();
export default async () => (await CoinGeckoClient.ping())?.success ? CoinGeckoClient : false;
