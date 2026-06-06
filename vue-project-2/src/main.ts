import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueScan, { type VueScanOptions } from 'z-vue-scan'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  }
})

// app.use<VueScanOptions>(VueScan, {})

app.mount('#app')
