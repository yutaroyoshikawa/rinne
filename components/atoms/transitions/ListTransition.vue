<template>
  <transition-group
    :tag="$props.tag"
    :class="$props.className"
    :enter-class="$style.enter"
    :enter-to-class="$style.enterTo"
    :leave-class="$style.leave"
    :leave-to-class="$style.leaveTo"
    :enter-active-class="$style.enterActive"
    :leave-active-class="$style.leaveActive"
  >
    <slot />
  </transition-group>
</template>

<script lang="ts">
import Vue from 'vue'

type Prop = {
  list: any[]
}

export default Vue.extend({
  name: 'ListTransition',
  props: {
    className: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
})
</script>

<style lang="scss" module>
.enter {
  opacity: 0;
}

.enterTo {
  opacity: 1;
}

.leave {
  opacity: 1;
}

.leaveTo {
  opacity: 0;
}

.enterActive {
  transition: opacity ease;
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}

.leaveActive {
  transition: opacity ease;
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}
</style>
