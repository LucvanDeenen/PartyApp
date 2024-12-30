import { createApp } from 'vue'
import { createAuth } from './services/auth';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './style.css'


const app = createApp(App)
app.use(router)
app.use(vuetify)

createAuth();

app.mount('#app')