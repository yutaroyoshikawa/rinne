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
      v-show="!isExiting && $props.in"
      :style="{
        '--delay': `${$props.delay}ms`,
        '--duration': `${$props.duration}ms`,
      }"
    >
      <div :class="$style.innerWrap">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageTransitionState } from '@/extentions/pageTransitionState'

export default Vue.extend({
  name: 'ScaleCircleTransition',
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
    enablePageTransition: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isExiting(): boolean {
      if (!this.$props.enablePageTransition) {
        return false
      }

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
  transform: scale(0);
  border-radius: 50%;
}

.enterTo {
  transform: scale(1);
}

.leave {
  transform: scale(1);
}

.leaveTo {
  transform: scale(0);
  border-radius: 50%;
}

.enterActive {
  transition: transform cubic-bezier(0.89, -0.11, 0.07, 1.4),
    border-radius ease-in-out;
  overflow: hidden;
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}

.leaveActive {
  transition: transform cubic-bezier(1, -0.46, 0.065, 1.005) border-radius
    ease-in-out;
  overflow: hidden;
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}

.innerWrap {
  width: 100vw;
  height: 100vh;
}
</style>
