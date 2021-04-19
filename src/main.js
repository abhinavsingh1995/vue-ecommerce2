import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//css import for mdb5 ui
import 'mdb-vue-ui-kit/css/mdb.min.css'

createApp(App).use(store).use(router).mount('#app')
