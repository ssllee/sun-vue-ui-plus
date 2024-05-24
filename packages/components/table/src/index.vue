<!-- 表格区 -->
<template>
  <div v-loading="config.loading" class="table-container">
    <template v-if="data?.length > 0">
      <el-table
        ref="tableRef"
        v-loading="config.loading"
        v-bind="$attrs"
        :data="data"
        row-key="id"
        stripe
        :border="setBorder"
        style="width: 100%"
        empty-text="暂无数据"
        class="sunwise-table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="config.isSelection" type="selection" width="50" align="center" />
        <el-table-column v-if="config.isSerialNo" type="index" label="序号" width="65" align="center" />
        <el-table-column
          v-for="(item, index) in header"
          :key="index"
          :prop="item.prop"
          :width="item.colWidth"
          :label="item.title"
          :align="item.align"
          show-overflow-tooltip
        >
          <template #default="scope">
            <!-- type: 'image' 图片 -->
            <template v-if="item.type === TableHeaderTypeEnum.TABLE_HEADER_TYPE_IMAGE">
              <img :src="scope.row[item.prop]" :width="item.width" :height="item.height" />
            </template>
            <!-- type: 'state' 状态 -->
            <template v-else-if="item.type === TableHeaderTypeEnum.TABLE_HEADER_TYPE_STATE">
              <el-tag
                size="default"
                class="item-state-tag"
                :type="item.stateOptions[scope.row[item.prop] + '']?.className"
              >
                <div class="x-y-center">
                  <!-- <div><s-svg-icon name="dot"></s-svg-icon></div> -->
                  <div class="icon-size"><SolidCircle /></div>
                  <div>
                    {{ item.stateOptions[scope.row[item.prop] + '']?.stateName }}
                  </div>
                </div>
              </el-tag>
            </template>
            <!-- type: 'link' 超链接 -->
            <template v-else-if="item.type === TableHeaderTypeEnum.TABLE_HEADER_TYPE_LINK">
              <el-link type="primary" @click="isFunction(item.handleClick) && item.handleClick(scope.row)">
                {{ scope.row[item.prop] }}
              </el-link>
            </template>
            <!-- type: 'text' 文字 -->
            <template v-else>
              {{ scope.row[item.prop] }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="config.isOperate"
          label="操作"
          :align="config.operateColumnAlign"
          header-align="center"
          :width="config.operateWidth"
        >
          <template #default="scope">
            <template v-for="(operate, index) in config.operator">
              <el-button
                v-if="buttonCondition(operate, scope.row)"
                :key="index"
                v-onBlur
                link
                size="small"
                type="primary"
                @click="isFunction(operate.handleClick) && operate?.handleClick(scope.row)"
              >
                {{ operate.label }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <s-empty-area tips="暂无数据" :emptyImage="emptyImage" />
    </template>
  </div>
</template>

<script setup lang="ts" name="STable">
  import SolidCircle from '@/components/icons/SolidCircle.vue'
  import { PropType } from 'vue'
  import { isFunction } from '@vueuse/core'
  import { OnBlur } from '@/utils/directives/index'
  // import SSvgIcon from '@/components/svgIcon/index'
  import SEmptyArea from '@/components/emptyArea/index'
  import SEmptyImage from '@/assets/images/noData.png'
  import _clonedeep from 'lodash.clonedeep'
  import { TableHeaderTypeEnum } from './constants'
  import type { RefType, EmptyObjectType, TableOperatorType, TableConfigInfo } from 'sun-vue-ui-plus/types'

  // 定义父组件传过来的值
  const props = defineProps({
    // 列表内容
    data: {
      type: Array<EmptyObjectType>,
      default: () => []
    },
    // 表头内容
    header: {
      type: Array<EmptyObjectType>,
      default: () => []
    },
    // 配置项
    config: {
      type: Object as PropType<TableConfigInfo>,
      default: () => {}
    },
    // 空数据图片
    emptyImage: {
      type: String,
      default: SEmptyImage
    }
  })

  // 自定义指令
  const vOnBlur = OnBlur

  // 定义子组件向父组件传值/事件
  const emit = defineEmits(['delRow'])

  const tableRef = ref<RefType>()
  const state = reactive({
    page: {
      pageNum: 1,
      pageSize: 10
    },
    selectlist: [] as EmptyObjectType[]
  })

  // 设置边框显示/隐藏
  const setBorder = computed(() => {
    return !!props.config.isBorder
  })

  // 按钮显示与否的条件
  const buttonCondition = (operate: TableOperatorType, row: any) => {
    return operate.condition ? operate.condition && isFunction(operate.condition) && operate.condition(row) : true
  }

  // 表格多选改变时
  const handleSelectionChange = (val: EmptyObjectType[]) => {
    state.selectlist = val
  }

  // 获取选中的列
  const getSelectedList = () => {
    return _clonedeep(state.selectlist)
  }

  defineExpose({
    tableRef,
    getSelectedList
  })
</script>

<style scoped lang="scss">
  .table-container {
    background: #fff;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 200px;
    overflow: hidden;
    .el-table {
      flex: 1;
    }
    .item-state-tag {
      font-size: 12px;
      padding-right: 8px !important;
      padding-left: 5px !important;
    }
  }
  .icon-size {
    display: flex;
    font-size: 4px;
    margin-right: 3px;
  }

  :deep(.el-tag.el-tag--success) {
    --el-tag-border-color: var(--el-color-success);
  }
  :deep(.el-tag.el-tag--warning) {
    --el-tag-border-color: var(--el-color-warning);
  }
  :deep(.el-tag.el-tag--info) {
    --el-tag-border-color: var(--el-color-info);
  }
  :deep(.el-tag.el-tag--danger) {
    --el-tag-border-color: var(--el-color-danger);
  }
</style>
