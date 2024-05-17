import type { Directive } from 'vue'
import { useEventListener } from '@vueuse/core'
// 移除焦点
const OnBlur: Directive = {
  mounted(el) {
    useEventListener(el, 'focus', () => el.blur())
  }
}

export default OnBlur
