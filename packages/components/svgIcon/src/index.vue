<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts" name="SSvgIcon">
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon'
    },
    /**
     * 传入svg的名称
     * 如：'icons/apps/homePage.svg'  name='apps-homePage'
     * 如：'icons/dot.svg'            name='dot'
     */
    name: {
      type: String,
      require: true
    },
    color: {
      type: String,
      default: '#333'
    }
  })
  // 与配置文件里保持一致
  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
  }
</style>
