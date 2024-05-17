<!-- 搜索区 -->
<template>
  <div v-if="props.search.length > 0" class="table-search-container">
    <el-form
      ref="tableSearchRef"
      :model="state.form"
      size="default"
      :inline="true"
      :label-width="labelWidth"
      class="table-form"
    >
      <el-row>
        <el-col v-for="(val, key) in search" :key="key" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <el-form-item
            v-if="val.type"
            :label="val.label"
            :prop="val.prop"
            :rules="[
              {
                required: val.required,
                message: `${val.label}不能为空`,
                trigger: val.type === 'input' ? 'blur' : 'change'
              }
            ]"
          >
            <el-input
              v-if="val.type === 'input'"
              v-model="state.form[val.prop]"
              :placeholder="val.placeholder"
              clearable
              :style="val.style || 'width: 100%'"
            />
            <el-date-picker
              v-else-if="val.type === 'date'"
              v-model="state.form[val.prop]"
              type="date"
              :placeholder="val.placeholder"
              :style="val.style || 'width: 100%'"
            />
            <el-select
              v-else-if="val.type === 'select'"
              v-model="state.form[val.prop]"
              :placeholder="val.placeholder"
              clearable
              :style="val.style || 'width: 100%'"
            >
              <el-option v-for="item in val.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <el-form-item lable="">
            <el-button size="default" type="primary" @click="handleSearch(tableSearchRef)">查询 </el-button>
            <el-button size="default" @click="handleReset(tableSearchRef)"> 重置 </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="SSearch">
  import _clonedeep from 'lodash.clonedeep'
  import type { FormInstance } from 'element-plus'
  import type { TableSearchType } from 'sun-vue-ui-plus/types'

  const props = defineProps({
    // 搜索表单
    search: {
      type: Array<TableSearchType>,
      default: () => []
    },
    // 表单 label 宽度
    labelWidth: {
      type: String,
      default: '100px'
    }
  })

  const emit = defineEmits(['search'])

  // 定义变量内容
  const tableSearchRef = ref<FormInstance>()
  const state = reactive({
    form: {}
  })

  // 查询
  const handleSearch = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // @ts-ignore
    formEl.validate((valid: boolean) => {
      if (valid) {
        emit('search', state.form)
      } else {
        return false
      }
    })
  }
  // 重置
  const handleReset = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    // initFormField()
    emit('search', state.form)
  }
  // 初始化 form 字段，取自父组件 search.prop
  const initFormField = () => {
    if (props.search.length <= 0) return false
    props.search.forEach((item) => (state.form[item.prop] = item.default || ''))
  }

  // 获取 form 表单数据
  const getSearchFormData = () => {
    return _clonedeep(state.form)
  }

  onMounted(() => {
    initFormField()
  })

  defineExpose({
    tableSearchRef,
    getSearchFormData
  })
</script>

<style scoped lang="scss">
  .table-search-container {
    background: #fff;
    // display: flex;
    .table-form {
      flex: 1;
    }
    .el-form-item--default {
      margin-bottom: 16px;
      width: calc(100% - 16px);
    }
  }
</style>
