import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import "@/assets/style/index.scss"
store.dispatch('coin/getCoins')
createApp(App).use(store).use(router).mount('#app')
