// import SEmptyArea from './lib/emptyArea/src/index.vue'
// import SPagination from './lib/pagination/src/index.vue'
// import SSearch from './lib/search/src/index.vue'
// import SSvgIcon from './lib/svgIcon/src/index.vue'
// import STable from './lib/table/src/index.vue'

import SEmptyArea from './lib/components/emptyArea/src/index.vue'
import SPagination from './lib/components/pagination/src/index.vue'
import SSearch from './lib/components/search/src/index.vue'
import SSvgIcon from './lib/components/svgIcon/src/index.vue'
import STable from './lib/components/table/src/index.vue'

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElPagination: typeof import('element-plus')['ElPagination']

    SEmptyArea: typeof SEmptyArea
    SPagination: typeof SPagination
    SSearch: typeof SSearch
    SSvgIcon: typeof SSvgIcon
    STable: typeof STable
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
