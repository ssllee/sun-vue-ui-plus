<!--多个按钮的切换-->
<template>
  <el-radio-group v-model="currentOptionModel" v-bind="$attrs">
    <el-radio-button
      v-for="(item, index) in currentOptions"
      :key="index"
      :value="item.value"
      :options="options"
      @update:model-value="emit('update:modelValue', currentOptionModel)"
      @click="handleChange(item.value)"
    >
      {{ item.label }}
    </el-radio-button>
  </el-radio-group>
</template>
<script lang="ts" setup>
  import { OptionsItem } from 'sun-vue-ui-plus/types'

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
  const currentOptionModel = ref(props.modelValue)
  const currentOptions = computed<Array<OptionsItem>>(() => {
    return props.options
  })

  const handleChange = (val) => {
    currentOptionModel.value = val
    emit('update:modelValue', val)
  }
</script>
