# sun-vue-ui-plus

基于 element-plus 组件封装的企业组件

# Install

```shell
npm i sun-vue-ui-plus
```

# Usage

```js
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import SunVueUi from 'sun-vue-ui' // element-plus(原生UI样式进行了修改)
import SunVueUiPlus from 'sun-vue-ui-plus' // 全部引入
// import {STable} from '@/index' // 按需引入

const app = createApp(App)
// app.component('STable', STable)
app.use(SunVueUi, { locale: zhCn, size: 'large' })
app.use(SunVueUiPlus)
app.mount('#app')
```

### 问题

1.build 中 dts 时报错 error TS2742

import type { FormInstance } from 'element-plus'

(node 18 error / node 16 ok)

2.
