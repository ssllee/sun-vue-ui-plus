<!-- 搜索 + 表格 + 分页 -->
<template>
  <div class="h-100">
    <el-card class="mt">
      <DemoDialog />
    </el-card>

    <!-- <DemoSvgIcon /> -->

    <el-card class="mt">
      <DemoSearchTable />
    </el-card>

    <el-card class="mt">
      <DemoTabs />
    </el-card>
  </div>
</template>
<script setup lang="ts" name="DemoExample">
  import DemoDialog from './dialog/index.vue'
  import DemoSearchTable from './searchTable/index.vue'
  import DemoTabs from './tabs/index.vue'
  // import DemoSvgIcon from './svgIcon/index.vue'
</script>
<style lang="scss" scoped>
  .mt {
    margin-top: 10px;
  }
</style>
