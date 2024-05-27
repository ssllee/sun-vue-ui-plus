<!--多个按钮的切换 按钮之间有间隔-->
<template>
  <div>
    <el-button
      v-for="(item, index) in currentOptions"
      v-bind="$attrs"
      :key="index"
      v-onBlur
      :type="currentValue === item.value ? 'primary' : 'info'"
      :plain="currentValue === item.value ? false : true"
      @click="handleChange(item.value)"
    >
      {{ item.label }}
    </el-button>
  </div>
</template>
<script lang="ts" setup>
  import { OnBlur } from '@/utils/directives/index'
  import { OptionsItem } from 'sun-vue-ui-plus/types'

  // 自定义指令
  const vOnBlur = OnBlur

  defineOptions({
    inheritAttrs: false
  })
  const props = defineProps({
    //  当前选中
    modelValue: {
      type: [String, Boolean],
      default: ''
    },
    // 选项数组
    options: {
      type: Array<OptionsItem>,
      default: () => [],
      require: true
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const currentValue = ref(props.modelValue)
  const currentOptions = computed(() => {
    return props.options
  })

  const handleChange = (val) => {
    currentValue.value = val
    emit('update:modelValue', val)
  }
</script>
