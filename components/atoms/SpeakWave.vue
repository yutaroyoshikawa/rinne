<template>
  <div :class="$style.circle">
    <div
      :class="[
        $style.wave,
        { [$style.activeWave]: $props.active },
        { [$style.inactiveWave]: !$props.active },
      ]"
    ></div>
    <div
      :class="[
        $style.two,
        { [$style.activeWave]: $props.active },
        { [$style.inactiveWave]: !$props.active },
      ]"
    ></div>
    <div
      :class="[
        $style.three,
        { [$style.activeWave]: $props.active },
        { [$style.inactiveWave]: !$props.active },
      ]"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SpeakWave',
  props: {
    in: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.circle {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.activeWave {
  top: 70%;
}

.inactiveWave {
  top: 80%;
}

.wave {
  opacity: 0.4;
  position: absolute;
  left: 50%;
  width: 200vw;
  height: 200vw;
  margin-left: -100vw;
  margin-bottom: -155px;
  transform-origin: 50% 48%;
  border-radius: 43%;
  animation: humming 2.5s infinite linear;
  background: linear-gradient(to left top, $primary-color, $success-color);
  transition: top 0.5s cubic-bezier(0.425, 0.105, 0, 0.645);
}

.three {
  @extend .wave;

  animation: humming 5000ms infinite linear;
}

.two {
  @extend .wave;

  animation: humming 9000ms infinite linear;
  opacity: 1;
}

@keyframes humming {
  from {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}
</style>
