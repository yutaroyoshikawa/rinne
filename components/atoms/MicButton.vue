<template>
  <div :class="[$style.wrap, { [$style.loading]: $props.loading }]">
    <button
      :class="[$style.micButton, { [$style.holding]: isHolding }]"
      :disabled="$props.disabled || $props.loading"
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
    loading: {
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
  transition: border-width 0.4s, transform 0.1s linear, filter 0.3s;

  &:disabled {
    transition: border-width 0.4s, transform 0.1s linear, filter 0.3s;
    filter: grayscale(100%);
  }
}

.icon {
  color: #fff;
  font-size: 30px;
  pointer-events: none;
  user-select: none;
}

.loading {
  .micButton {
    border: 0.4em solid currentColor;
    border-top-color: rgba(102, 102, 102, 0.3);
    box-sizing: border-box;
    animation: rotate 0.7s linear infinite;
  }

  .icon {
    animation: rotate 0.7s linear reverse infinite;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
