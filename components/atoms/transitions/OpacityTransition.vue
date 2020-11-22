<template>
  <transition
    :enter-class="$style.enter"
    :enter-to-class="$style.enterTo"
    :leave-class="$style.leave"
    :leave-to-class="$style.leaveTo"
    :enter-active-class="$style.enterActive"
    :leave-active-class="$style.leaveActive"
    :appear="true"
  >
    <div
      v-if="!isExiting && $props.in"
      :style="{
        '--delay': `${$props.delay}ms`,
        '--duration': `${$props.duration}ms`,
      }"
    >
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageTransitionState } from '@/extentions/pageTransitionState'

export default Vue.extend({
  name: 'OpacityTransition',
  props: {
    duration: {
      type: Number,
      default: 600,
    },
    delay: {
      type: Number,
      default: 0,
    },
    in: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isExiting() {
      return (
        (this.$store as any).state.pageTransitionState ===
        PageTransitionState.EXITING
      )
    },
  },
})
</script>

<style module lang="scss">
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
