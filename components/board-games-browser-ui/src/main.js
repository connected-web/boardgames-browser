import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import setupIcons from './helpers/icons.js'
import router from './routes.js'

const app = createApp(App)
setupIcons(app)
app.use(router)
app.mount('#app')
