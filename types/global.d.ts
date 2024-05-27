// type SEmptyArea = import('./lib/components/emptyArea/src/index.vue')
import SDialog from './lib/components/dialog/src/index.vue'
import SEmptyArea from './lib/components/emptyArea/src/index.vue'
import SPagination from './lib/components/pagination/src/index.vue'
import SSearch from './lib/components/search/src/index.vue'
// import SSvgIcon from './lib/components/svgIcon/src/index.vue'
import STable from './lib/components/table/src/index.vue'
import { SBtnTabsGroup, SBtnTabsSpace } from './lib/components/tabs/src/index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElPagination: typeof import('element-plus')['ElPagination']

    SDialog: typeof SDialog
    SEmptyArea: typeof SEmptyArea
    SPagination: typeof SPagination
    SSearch: typeof SSearch
    // SSvgIcon: typeof SSvgIcon
    STable: typeof STable
    SBtnTabsGroup: typeof SBtnTabsGroup
    SBtnTabsSpace: typeof SBtnTabsSpace

    // SEmptyArea: typeof import('./lib/components/emptyArea/src/index.vue')
    // SPagination: typeof import('./lib/components/pagination/src/index.vue')
    // SSearch: typeof import('./lib/components/search/src/index.vue')
    // SSvgIcon: typeof import('./lib/components/svgIcon/src/index.vue')
    // STable: typeof import('./lib/components/table/src/index.vue')
  }

  interface ComponentCustomProperties {
    $message: typeof import('element-plus')['ElMessage']
    $notify: typeof import('element-plus')['ElNotification']
    $msgbox: typeof import('element-plus')['ElMessageBox']
    $messageBox: typeof import('element-plus')['ElMessageBox']
    $alert: typeof import('element-plus')['ElMessageBox']['alert']
    $confirm: typeof import('element-plus')['ElMessageBox']['confirm']
    $prompt: typeof import('element-plus')['ElMessageBox']['prompt']
    $loading: typeof import('element-plus')['ElLoadingService']
  }
}

export {}
