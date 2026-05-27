import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueScan, { type VueScanOptions } from 'z-vue-scan'

const app = createApp(App)

app.use(router)

// app.use<VueScanOptions>(VueScan, {})

app.mount('#app')
