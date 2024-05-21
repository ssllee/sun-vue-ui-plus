type AxiosResponse = import('axios').AxiosResponse
type TableSearchTypeEnum = import('../packages/components/search/src/constants').TableSearchTypeEnum
type TableHeaderTypeEnum = import('../packages/components/table/src/constants').TableHeaderTypeEnum
type StateColorEnum = import('../packages/utils/constants').StateColorEnum

declare module 'sun-vue-ui-plus/types' {
  // Function
  type Func = (...args: any[]) => any

  // 声明 ref
  type RefType<T = any> = T | null

  // 接口返回
  interface ApiResultState<T = any> extends AxiosResponse {
    code?: number
    msg?: string
    data: T
  }

  // 声明 数组
  type EmptyArrayType<T = any> = T[]

  // 声明 对象
  type EmptyObjectType<T = any> = {
    [key: string]: T
  }

  // 键-值 对象
  interface ObjectKeyValue extends Record<string | number | symbol, unknown> {}

  // options 数组包含元素
  type OptionsItem<T = any> = {
    label: string
    value: T
  }

  // table 搜索区
  type TableSearchType = {
    prop: string
    label: string | undefined
    required: boolean
    placeholder: string
    // 默认值
    default?: string | number | boolean
    // 输入框、下拉选择框等的样式
    style?: string
    // 类型：'input' / 'data' / 'select'
    type: TableSearchTypeEnum
    // 'select' 类型 下拉选项
    options?: OptionsItem[]
  }

  // table 表格区 header 操作列按钮
  type TableOperatorType = {
    label: string // 按钮显示文本
    handleClick: Function | undefined // 按钮点击事件
    condition?: Function | undefined // 显示按钮时的条件
  }

  // table 表格 header 区
  type TableHeaderType = {
    prop: string
    title: string
    // column width
    colWidth: string
    // column align
    align?: string
    // isCheck: boolean  // column 是否选中展示该列
    // 类型： 'text' / 'link' / 'state' / 'image'
    type: TableHeaderTypeEnum
    // 'image' 类型width
    width?: string | number
    // 'image' 类型height
    height?: string | number
    // 'link' 类型点击回调函数
    handleClick?: Function | undefined
    // 'state' 类型 状态值对应显示颜色与内容
    stateOptions?: {
      [key: string | number]: { className: StateColorEnum; stateName: string }
    }
  }

  // table 表格 table 区
  type TableConfigInfo = {
    total: number // 列表总数
    loading: boolean // loading 加载
    isBorder: boolean // 是否显示表格边框
    isSerialNo: boolean //  是否显示表格序号
    isSelection: boolean //  是否显示表格多选
    isOperate: boolean // 是否显示表格操作列
    operateWidth?: number // 操作列 width
    operateColumnAlign?: string // 表格操作列 对齐方式
    operator: TableOperatorType[] // 表格操作列 按钮
  }

  // 搜索+表格+分页
  type SearchTableState = {
    tableData: {
      // 列表数据
      data: EmptyObjectType[]
      // 表头内容
      header: TableHeaderType[]
      // 配置项
      config: TableConfigInfo
      // 搜索表单，动态生成（传空数组时，将不显示搜索）
      search?: TableSearchType[]
      // 搜索参数
      param: {
        pageNum: number
        pageSize: number
        [key: string]: any
      }
    }
  }
}
