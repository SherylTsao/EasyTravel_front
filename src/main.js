import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '../node_modules/bootstrap/dist/js/bootstrap'
import './assets/main.scss'
import App from './App.vue'
import router from './router'

import CanvasJSChart from '../node_modules/@canvasjs/vue-charts';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin

app.mount('#app')
