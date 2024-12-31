import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(store)

store.dispatch('auth/init')

app.mount('#app')
