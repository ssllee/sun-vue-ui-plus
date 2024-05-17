<template>
  <div>
    <!-- 如果组件上的 color="#00ff00" 不生效，可使用 样式中的 color-->
    <s-svg-icon name="dot" color="#00ff00" class="ff green"></s-svg-icon>
    <s-svg-icon name="apps-job" color="#00ff00" class="ff green"></s-svg-icon>
    <s-svg-icon name="apps-homePage" color="#0000ff" class="ff"></s-svg-icon>
  </div>
</template>
<script setup lang="ts" name="DemoSvgIcon">
  //@ts-ignore
  import ids from 'virtual:svg-icons-names'
  console.log('ids:', ids)
</script>
<style scoped lang="scss">
  .ff {
    font-size: 30px;
  }
  .green {
    color: aquamarine;
  }
</style>
