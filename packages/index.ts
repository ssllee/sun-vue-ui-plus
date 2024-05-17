import 'virtual:svg-icons-register' // svg-icon
import '@/assets/styles/index.scss'

import type { Component, App } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn' // 因element-plus默认是英文，我们指定一下默认中文
import SEmptyArea from './components/emptyArea'
import SPagination from './components/pagination'
import SSearch from './components/search'
import SSvgIcon from './components/svgIcon'
import STable from './components/table'

// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  SEmptyArea,
  SPagination,
  SSearch,
  SSvgIcon,
  STable
}

// vue插件
const install: any = (app: any, router?: any) => {
  // !router && installRouter(app);
  // components.forEach((comp: any) => {
  //   app.component(comp.name as string, comp)
  // })
  //   app.use(ElementPlus, {
  //     locale // 语言设置
  //   // size: Cookies.get('size') || 'medium' // 设置默认尺寸
  // })
  for (const key in components) {
    app.component(key, components[key])
  }
}

// 按需引入
export { SEmptyArea, SPagination, SSearch, SSvgIcon, STable }

// 全部引入
export default {
  install
}
