# sun-vue-ui-plus

基于 element-plus 组件封装的企业组件

# Install

```shell
npm i sun-vue-ui-plus
```

# Usage

```js
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import SunVueUi from 'sun-vue-ui'
import SunVueUiPlus from 'sun-vue-ui-plus' // 全部引入
// import {STable} from '@/index' // 按需引入

const app = createApp(App)
// app.component('STable', STable)
app.use(SunVueUi, { locale: zhCn })
app.use(SunVueUiPlus)
app.mount('#app')
```

### 问题 build 中 dts 时报错 error TS2742
