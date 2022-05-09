import { createStore } from 'vuex'
import coin from '@/store/coin';
import portfolio from '@/store/portfolio';
import chartData from '@/store/chartData';

export default createStore({
   modules: {
      coin,
      portfolio,
      chartData
   },
   strict: process.env.NODE_ENV !== 'production',
})


