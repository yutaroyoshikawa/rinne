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
  name: 'ScaleTransition',
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
    isExiting(): boolean {
      return (
        this.$store.state.pageTransitionState === PageTransitionState.EXITING
      )
    },
  },
})
</script>

<style module lang="scss">
.enter {
  transform: scale(0);
}

.enterTo {
  transform: scale(1);
}

.leave {
  transform: scale(1);
}

.leaveTo {
  transform: scale(0);
}

.enterActive {
  transition: transform cubic-bezier(0.89, -0.11, 0.07, 1.4);
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}

.leaveActive {
  transition: transform cubic-bezier(1, -0.46, 0.065, 1.005);
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}
</style>
