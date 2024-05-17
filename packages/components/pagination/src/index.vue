<!-- 分页区 -->
<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    v-bind="{
      background: background,
      layout: layout,
      pageSizes: pageSizes,
      pagerCount: pagerCount,
      ...$attrs
    }"
    :total="Number(total)"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts" name="SPagination">
  const props = defineProps({
    // 总条数
    total: {
      required: true,
      type: [Number, String]
    },
    // 当前是第几页
    page: {
      type: Number,
      default: 1
    },
    // 每页最多显示几条
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array<number>,
      default() {
        return [10, 20, 30, 50]
      }
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    }
  })

  const emit = defineEmits(['update:page', 'update:limit', 'pagination'])
  const currentPage = useVModel(props, 'page', emit)
  const pageSize = useVModel(props, 'limit', emit)

  function handleSizeChange(val) {
    if (currentPage.value * val > Number(props.total)) {
      currentPage.value = 1
    }
    emit('pagination', { page: currentPage.value, limit: val })
  }
  function handleCurrentChange(val) {
    emit('pagination', { page: val, limit: pageSize.value })
  }
</script>

<style scoped lang="scss">
  :deep(.el-pagination) {
    justify-content: end;
  }
</style>
