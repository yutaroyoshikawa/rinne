<template>
  <div :class="$style.wrap">
    <button
      :class="[$style.micButton, { [$style.holding]: isHolding }]"
      :disabled="$props.disabled"
      @pointerdown="onHoldStart"
      @pointerup="onHoldEnd"
    >
      <fa :icon="['fa', 'microphone']" :class="$style.icon" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  isHolding: boolean
}

export default Vue.extend({
  name: 'MicButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data(): Data {
    return {
      isHolding: false,
    }
  },
  methods: {
    onHoldStart() {
      this.isHolding = true
      this.$emit('holdstart')
    },
    onHoldEnd() {
      this.isHolding = false
      this.$emit('holdend')
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.wrap {
  transition: transform 0.1s linear;
}

.holding {
  transition: transform 0.1s linear;
  transform: scale(1.1);
}

.micButton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: $primary-color;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  &:disabled {
    transition: filter 0.5s;
    filter: grayscale(100%);
  }
}

.icon {
  color: #fff;
  font-size: 30px;
  pointer-events: none;
  user-select: none;
}
</style>
