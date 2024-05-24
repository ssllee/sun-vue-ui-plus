<!--弹框 demo-->
<template>
  <div>
    <el-button type="primary" @click="onClickOpenDialog('default')"> 弹出弹窗 type:default (顶部没有横线) </el-button>
    <el-button type="primary" @click="onClickOpenDialog('hasLine')">弹出弹窗 type:hasLine (顶部有横线)</el-button>
    <el-button type="primary" @click="onClickOpenDialog('fullScreen')"> 弹出弹窗 type:fullScreen (全屏展示)</el-button>

    <SDialog
      v-if="isShow"
      v-model="isShow"
      title="请输入新流程名称"
      :type="dialogType"
      @save="onSave(formRef)"
      @cancel="onCancel"
    >
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="请输入新流程名称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
      </el-form>
    </SDialog>
  </div>
</template>
<script lang="ts" setup name="DemoDialog">
  //   import SDialog from '@/components/SDialog/index.vue'
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'

  const isShow = ref(false)
  const formRef = ref<FormInstance>()
  const state = reactive({
    form: { name: '' },
    rules: {
      name: { required: true, trigger: ['blur', 'change'], message: '新流程名称不能为空' }
    }
  })
  const dialogType = ref('')
  const typeStyle = {
    default: '', // 顶部没有横线
    hasLine: 'dialog-type-a', // 顶部有横线
    fullScreen: 'dialog-type-header-fixed w-full' // 全屏
  }

  const { form, rules } = toRefs(state)

  const initData = () => {
    state.form = { name: '' }
  }

  // 保存
  const onSave = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        ElMessage.success('保存成功！')
        isShow.value = false
        initData()
      }
    })
  }

  // 取消
  const onCancel = () => {
    initData()
  }

  // 弹窗类型赋值
  const onClickOpenDialog = (type: string) => {
    isShow.value = true
    dialogType.value = type
  }
</script>
