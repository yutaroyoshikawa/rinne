<template>
  <div :class="$style.wrap">
    <button
      :class="$style.micButton"
      :disabled="$props.disabled"
      @pointerdown="$emit('holdstart')"
      @pointerup="$emit('holdend')"
    >
      <fa :icon="['fa', 'microphone']" :class="$style.icon" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MicButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.wrap {
  transition: transform 0.1s linear;

  &:active {
    transition: transform 0.1s linear;
    transform: scale(1.1);
  }
}

.micButton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: $primary-color;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    transition: filter 0.5s;
    filter: grayscale(100%);
  }
}

.icon {
  color: #fff;
  font-size: 30px;
  pointer-events: none;
}
</style>
