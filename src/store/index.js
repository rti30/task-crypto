import { createStore } from 'vuex'
import coin from '@/store/coin';
import portfolio from '@/store/portfolio';

export default createStore({
   modules: {
      coin,
      portfolio,
   },
   strict: process.env.NODE_ENV !== 'production',
})


