<template>
  <transition
    :enter-class="$style.scaleEnter"
    :leave-to-class="$style.scaleLeaveTo"
    :enter-active-class="$style.scaleEnterActive"
    :leave-active-class="$style.scaleLeaveActive"
    appear=""
    :style="styles"
    :duration="duration"
    @before-enter="beforeEnter"
  >
    <slot v-if="!isExiting" />
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageTransitionState } from '@/extentions/pageTransitionState'

export default Vue.extend({
  props: {
    duration: {
      type: Number,
      default: 600,
    },
    delay: {
      type: Number,
      default: 0,
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
  methods: {
    beforeEnter(el: any) {
      el.style.transitionDelay = this.$props.delay
    },
  },
})
</script>

<style module lang="scss">
.scaleEnterActive {
  transition: transform 600ms cubic-bezier(0.89, -0.11, 0.07, 1.4);
}

.scaleLeaveActive {
  transition: transform 600ms cubic-bezier(1, -0.46, 0.065, 1.005);
}

.scaleEnter,
.scaleLeaveTo {
  transform: scale(0);
}
</style>
