import SDialog from './components/dialog/src/index.vue'
import SEmptyArea from './components/emptyArea/src/index.vue'
import SPagination from './components/pagination/src/index.vue'
import SSearch from './components/search/src/index.vue'
// import SSvgIcon from './components/svgIcon/src/index.vue'
import STable from './components/table/src/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    SDialog: typeof SDialog
    SEmptyArea: typeof SEmptyArea
    SPagination: typeof SPagination
    SSearch: typeof SSearch
    // SSvgIcon: typeof SSvgIcon
    STable: typeof STable
  }
}
