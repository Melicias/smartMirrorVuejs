import { createApp } from 'vue'
import App from './App.vue'
import GridLayout from 'vue3-drr-grid-layout'
import 'vue3-drr-grid-layout/dist/style.css'
import './assets/main.css'
import VCalendar from 'v-calendar';

import 'v-calendar/dist/style.css';
createApp(App).use(GridLayout).use(VCalendar, {}).mount('#app')
