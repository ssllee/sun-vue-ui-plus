import BtnTabsGroup from './src/BtnTabsGroup.vue'
import BtnTabsSpace from './src/BtnTabsSpace.vue'
import { withInstall } from '@/utils/withInstall'

const SBtnTabsGroup = withInstall(BtnTabsGroup)
const SBtnTabsSpace = withInstall(BtnTabsSpace)

export { SBtnTabsGroup, SBtnTabsSpace }
