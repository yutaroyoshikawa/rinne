<template>
  <div :class="$style.wrap" @contextmenu.prevent>
    <button
      :class="[$style.micButton, { [$style.holding]: isHolding }]"
      :disabled="$props.disabled"
      @pointerdown="onHoldStart"
      @pointerup="onHoldEnd"
    >
      <figure v-if="!$props.loading">
        <template v-if="!isHolding">
          <fa :icon="['fa', 'microphone']" :class="$style.icon" />
        </template>
        <svg
          v-else
          id="Layer_1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="24px"
          height="30px"
          viewBox="0 0 24 30"
          style="enable-background: new 0 0 50 50"
          xml:space="preserve"
        >
          <rect x="0" y="10" width="4" height="10" fill="#fff" opacity="0.2">
            <animate
              attributeName="opacity"
              attributeType="XML"
              values="0.2; 1; .2"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              attributeType="XML"
              values="10; 20; 10"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="10; 5; 10"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="8" y="10" width="4" height="10" fill="#fff" opacity="0.2">
            <animate
              attributeName="opacity"
              attributeType="XML"
              values="0.2; 1; .2"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              attributeType="XML"
              values="10; 20; 10"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="10; 5; 10"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="16" y="10" width="4" height="10" fill="#fff" opacity="0.2">
            <animate
              attributeName="opacity"
              attributeType="XML"
              values="0.2; 1; .2"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              attributeType="XML"
              values="10; 20; 10"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="10; 5; 10"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </figure>
      <figure v-else>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="40px"
          height="40px"
          viewBox="0 0 40 40"
          enable-background="new 0 0 40 40"
          xml:space="preserve"
        >
          <path
            opacity="0.2"
            fill="#555"
            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
          />
          <path
            fill="#fff"
            d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </figure>
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
      if (this.$props.loading) {
        return
      }
      this.isHolding = true
      this.$emit('holdstart')
    },
    onHoldEnd() {
      if (this.$props.loading) {
        return
      }
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
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}

.holding {
  transform: scale(1.5);
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
  transition: border-width 0.4s,
    transform 0.1s cubic-bezier(0.8, 0.015, 0.135, 1.005), filter 0.3s;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  -webkit-touch-callout: none;
  -webkit-user-select: none;

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

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
