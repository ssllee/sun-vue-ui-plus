<!-- 搜索 + 表格 + 分页 -->
<template>
  <div class="demo-table-wrap">
    <SSearch ref="searchRef" :search="tableData.search" labelWidth="100px" @search="handleQuery" />
    <STable ref="tableRef" v-bind="tableData" />
    <SPagination
      v-show="tableData.config.total > 0"
      v-model:page="tableData.param.pageNum"
      v-model:limit="tableData.param.pageSize"
      :total="tableData.config.total"
      style="margin-top: 15px; margin-left: auto"
      @pagination="handleQuery"
    />
  </div>
</template>
<script setup lang="ts" name="DemoSearchTable">
  import { TableSearchTypeEnum } from '@/components/search/src/constants'
  import { TableHeaderTypeEnum } from '@/components/table/src/constants'
  import { StateColorEnum } from '@/utils/constants'
  import { SearchTableState, RefType, EmptyObjectType } from 'sun-vue-ui-plus/types'

  const searchRef = ref<RefType>()
  const tableRef = ref<RefType>()

  // 表格行 链接
  const handleNameLink = (row: any) => {
    console.log('handleNameLink:', row)
  }
  // 操作-删除
  const handleDelete = (row: any) => {
    console.log('handleDelete:', row)
  }
  // 操作-办理
  const handleHandle = (row: any) => {
    console.log('handleHandle:', row)
  }

  const state = reactive<SearchTableState>({
    tableData: {
      // 列表数据（必传）
      data: [],
      // 表头内容（必传）
      header: [
        {
          prop: 'name',
          colWidth: '',
          title: '超链接名称',
          align: 'center',
          type: TableHeaderTypeEnum.TABLE_HEADER_TYPE_LINK,
          handleClick: handleNameLink
        },
        {
          prop: 'state',
          colWidth: '',
          title: '状态',
          align: 'center',
          type: TableHeaderTypeEnum.TABLE_HEADER_TYPE_STATE,
          stateOptions: {
            0: {
              className: StateColorEnum.STATE_COLOR_GREY,
              stateName: '未发布'
            },
            1: {
              className: StateColorEnum.STATE_COLOR_GREEN,
              stateName: '已发布'
            },
            2: {
              className: StateColorEnum.STATE_COLOR_ORANGE,
              stateName: '已撤销'
            }
          }
        },
        {
          prop: 'name',
          colWidth: '',
          title: '任务名称',
          align: 'center',
          type: TableHeaderTypeEnum.TABLE_HEADER_TYPE_TEXT
        },
        {
          prop: 'appInfoName',
          colWidth: '',
          title: '所属应用',
          align: '',
          type: TableHeaderTypeEnum.TABLE_HEADER_TYPE_TEXT
        },
        {
          prop: 'startUserName',
          colWidth: '',
          title: '发起人',
          align: '',
          type: TableHeaderTypeEnum.TABLE_HEADER_TYPE_TEXT
        }
      ],
      // 配置项（必传）
      config: {
        total: 0, // 列表总数
        loading: true, // loading 加载
        isBorder: false, // 是否显示表格边框
        isSerialNo: true, // 是否显示表格序号
        isSelection: false, // 是否显示表格多选
        isOperate: true, // 是否显示表格操作列
        operateWidth: 105, // 表格操作列 width
        operateColumnAlign: 'center', // 表格操作列 对齐方式
        // 表格操作列 按钮
        operator: [
          { label: '删除', handleClick: handleDelete, condition: undefined },
          {
            label: '办理',
            handleClick: handleHandle,
            condition: (row: any) => {
              return row.state === 2
            }
          }
        ]
      },
      // 搜索表单
      search: [
        {
          label: '任务名称',
          prop: 'name',
          placeholder: '请输入任务名称',
          required: true,
          // style: 'width: 200px',
          type: TableSearchTypeEnum.TABLE_SEARCH_TYPE_INPUT,
          default: ''
        },
        {
          label: '状态',
          prop: 'state',
          placeholder: '请选择状态',
          required: false,
          // style: 'width: 200px',
          type: TableSearchTypeEnum.TABLE_SEARCH_TYPE_SELECT,
          options: [
            { label: '未发布', value: 0 },
            { label: '已发布', value: 1 },
            { label: '已撤销', value: 2 }
          ],
          default: 1
        },
        {
          label: '所属应用',
          prop: 'appInfoName',
          placeholder: '请输入所属应用',
          required: false,
          type: TableSearchTypeEnum.TABLE_SEARCH_TYPE_INPUT
        }
      ],
      // 搜索参数
      param: {
        pageNum: 1,
        pageSize: 10
      }
    }
  })

  const { tableData } = toRefs(state)

  const testData = () => {
    const element = {
      id: 0,
      state: 1,
      name: '工作待办',
      appInfoName: 'AEM应用', //所属应用
      startUserName: 'sunwise', //发起人
      createTime: '2023-11-01 11:22:15', //创建时间
      endTime: '2023-11-01 11:22:15', //截止时间
      dealTime: '2023-11-01 11:22:15', //办理时间
      detailUrl: 'https://www.baidu.com/', //查看详情
      dealUrl: 'https://www.baidu.com/' //办理链接
    }
    const arr: any = []
    for (let i = 0; i < 30; i++) {
      element.id = i
      arr.push(element)
    }
    return arr
  }

  // 搜索 获取列表数据
  const handleQuery = async (data: EmptyObjectType) => {
    try {
      // console.log(tableRef.value.getSelectedList())
      state.tableData.config.loading = true
      state.tableData.param = Object.assign({}, state.tableData.param, {
        ...data
      })
      // const res: any = await getXXXList(state.tableData.param)
      const res = {
        code: 0,
        data: {
          data: testData(),
          totalCount: 100
        }
      }
      if (res.code === 0) {
        state.tableData.data = res.data.data
        state.tableData.config.total = res.data.totalCount
      }
    } catch (err: any) {
      console.log(err)
    } finally {
      state.tableData.config.loading = false
    }
  }

  const init = () => {
    const searchParam = searchRef.value.getSearchFormData()
    handleQuery(searchParam)
  }

  onMounted(() => {
    init()
  })
</script>
<style scoped lang="scss">
  .demo-table-wrap {
    height: 600px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: white;
  }
</style>
