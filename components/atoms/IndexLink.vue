<template>
  <transition
    :enter-class="$style.scaleEnter"
    :leave-to-class="$style.scaleLeaveTo"
    :enter-active-class="$style.scaleEnterActive"
    :leave-active-class="$style.scaleLeaveActive"
  >
    <NuxtLink :to="to" :class="$style.link">
      <slot />
    </NuxtLink>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexLink',
  props: {
    to: {
      type: String,
      default: '',
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.link {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: $secondary-color;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: $dark-base-color;
}

@keyframes bounceIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes bounceOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}

.scaleEnterActive {
  animation: bounceIn 600ms cubic-bezier(0.89, -0.11, 0.07, 1.4);
}

.scaleLeaveActive {
  animation: bounceOut 600ms cubic-bezier(1, -0.46, 0.065, 1.005);
}
</style>
