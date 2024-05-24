// import 'virtual:svg-icons-register' // svg-icon
import '@/assets/styles/index.scss'

import type { Component, App } from 'vue'
import SEmptyArea from './components/emptyArea'
import SPagination from './components/pagination'
import SSearch from './components/search'
// import SSvgIcon from './components/svgIcon' // svg-icon 先不导出了，暂时外部无法显示
import STable from './components/table'

// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  SEmptyArea,
  SPagination,
  SSearch,
  STable
}

// vue插件
const install: any = (app: any, router?: any) => {
  for (const key in components) {
    app.component(key, components[key])
  }
}

// 按需引入
export { SEmptyArea, SPagination, SSearch, STable }

// 全部引入
export default {
  install
}
