<template>
  <div>
    <div>
      <SBtnTabsGroup v-model="activeTab" :options="tabSpaceOptions" size="default" />
      <!-- <SBtnTabsSpace v-model="activeTab" :options="tabSpaceOptions" size="default" /> -->
    </div>
    <div class="tab-div">
      <component :is="currentCom"></component>
    </div>
  </div>
</template>
<script lang="ts" setup name="DemoTabs">
  import TabA from './components/TabA.vue'
  import TabB from './components/TabB.vue'
  import TabC from './components/TabC.vue'
  const tabSpaceOptions = ref([
    { label: '我的待办', value: 'tab1' },
    { label: '我发起的', value: 'tab2' },
    { label: '我办理的', value: 'tab3' }
  ])
  const activeTab = ref(tabSpaceOptions.value[0].value)
  const allComponents = {
    tab1: markRaw(TabA),
    tab2: markRaw(TabB),
    tab3: markRaw(TabC)
  }
  const currentCom = ref(allComponents[activeTab.value])
  watch(activeTab, (newVal) => {
    currentCom.value = allComponents[newVal]
  })
</script>
<style lang="scss" scoped>
  .tab-div {
    height: 50px;
    border: 1px solid #ecc1ea;
  }
</style>
