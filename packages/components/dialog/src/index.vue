<!--弹框-->
<template>
  <el-dialog
    v-model="isShow"
    :title="title"
    :width="type === 'fullScreen' ? '100%' : width"
    draggable
    :closeOnClickModal="false"
    :showClose="showClose"
    append-to-body
    :class="typeClass"
    :before-close="onCancel"
    :fullscreen="type === 'fullScreen'"
  >
    <slot></slot>
    <template v-if="!disableFooter" #footer>
      <div class="dialog-footer">
        <el-button v-onBlur @click="onCancel">{{ labelCancel }}</el-button>
        <el-button v-onBlur type="primary" @click="onSave">{{ labelConfirm }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="SDialog">
  const props = defineProps({
    // 模态框是否显示
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    // 不是全屏弹窗时设置宽度
    width: {
      type: String,
      default: '500'
    },
    // 弹窗类型 参看 typeStyle 变量
    type: {
      type: String,
      default: 'default'
    },
    // 屏蔽footer
    disableFooter: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    labelCancel: {
      type: String,
      default: '取消'
    },
    labelConfirm: {
      type: String,
      default: '确认'
    }
  })

  const emit = defineEmits(['update:modelValue', 'save', 'cancel'])
  const isShow = useVModel(props, 'modelValue', emit)
  const typeStyle = {
    default: '', // 顶部没有横线
    hasLine: 'dialog-type-a', // 顶部有横线
    fullScreen: 'dialog-type-header-fixed w-full' // 全屏
  }
  const typeClass = computed(() => {
    return typeStyle[props.type]
  })

  const onSave = () => {
    // isShow.value = false
    emit('save')
  }

  const onCancel = () => {
    isShow.value = false
    emit('cancel')
  }
</script>
