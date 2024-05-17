import { createApp } from 'vue'
import App from './App.vue'
import SunVueUi from 'sun-vue-ui'
// import {STable} from '@/index' // 按需引入
import SunVueUiPlus from '@/index' // 全部引入
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
// app.component('STable', STable)
app.use(SunVueUi, { locale: zhCn })
app.use(SunVueUiPlus)
app.mount('#app')
