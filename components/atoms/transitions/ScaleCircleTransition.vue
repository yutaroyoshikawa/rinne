<template>
  <div :class="$style.wrap">
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
  </div>
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
        this.$store.state.pageTransitionState === PageTransitionState.EXITING
      )
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.enter {
  width: 1px;
  height: 1px;
  border-radius: 50%;
}

.enterTo {
  width: 100vmax;
  height: calc(100vmax - #{$header-height});
  border-radius: 50%;
}

.leave {
  width: 100vmax;
  height: 100vmax;
  border-radius: 50%;
}

.leaveTo {
  width: 1px;
  height: 1px;
  border-radius: 50%;
}

.enterActive {
  transition: width height cubic-bezier(0.89, -0.11, 0.07, 1.4);
  overflow: hidden;
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}

.leaveActive {
  transition: width height cubic-bezier(1, -0.46, 0.065, 1.005) border-radius
    ease-in-out;
  overflow: hidden;
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - #{$header-height});
  overflow: hidden;
}

.innerWrap {
  width: 100vw;
  height: calc(100vh - #{$header-height});
}
</style>
