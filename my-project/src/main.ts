import { createApp } from 'vue'
import App from './App.vue'
import GridLayout from 'vue3-drr-grid-layout'
import 'vue3-drr-grid-layout/dist/style.css'
import './assets/main.css'
createApp(App).use(GridLayout).mount('#app')
