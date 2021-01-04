<template>
  <div :class="$style.wrap">
    <div :class="$style.itemWrap">
      <transition
        :enter-class="$style.enter"
        :enter-to-class="$style.enterTo"
        :leave-class="$style.leave"
        :leave-to-class="$style.leaveTo"
        :enter-active-class="$style.enterActive"
        :leave-active-class="$style.leaveActive"
      >
        <button
          v-if="timeoutAnim && !$props.loading"
          :class="$style.startButton"
          @click="$emit('click')"
        >
          はじめる
        </button>
      </transition>
    </div>

    <div :class="$style.itemWrap">
      <transition
        :enter-class="$style.enter"
        :enter-to-class="$style.enterTo"
        :leave-class="$style.leave"
        :leave-to-class="$style.leaveTo"
        :enter-active-class="$style.enterActive"
        :leave-active-class="$style.leaveActive"
      >
        <div v-if="!timeoutAnim || $props.loading" :class="$style.loaderWrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            :class="$style.loader"
          >
            <circle cx="27.5" cy="57.5" r="5" fill="#fe718d">
              <animate
                attributeName="cy"
                calcMode="spline"
                keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                repeatCount="indefinite"
                values="57.5;42.5;57.5;57.5"
                keyTimes="0;0.3;0.6;1"
                dur="1s"
                begin="-0.6s"
              ></animate>
            </circle>
            <circle cx="42.5" cy="57.5" r="5" fill="#f47e60">
              <animate
                attributeName="cy"
                calcMode="spline"
                keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                repeatCount="indefinite"
                values="57.5;42.5;57.5;57.5"
                keyTimes="0;0.3;0.6;1"
                dur="1s"
                begin="-0.44999999999999996s"
              ></animate>
            </circle>
            <circle cx="57.5" cy="57.5" r="5" fill="#f8b26a">
              <animate
                attributeName="cy"
                calcMode="spline"
                keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                repeatCount="indefinite"
                values="57.5;42.5;57.5;57.5"
                keyTimes="0;0.3;0.6;1"
                dur="1s"
                begin="-0.3s"
              ></animate>
            </circle>
            <circle cx="72.5" cy="57.5" r="5" fill="#abbd81">
              <animate
                attributeName="cy"
                calcMode="spline"
                keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                repeatCount="indefinite"
                values="57.5;42.5;57.5;57.5"
                keyTimes="0;0.3;0.6;1"
                dur="1s"
                begin="-0.15s"
              ></animate>
            </circle>
          </svg>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  timeoutAnim: boolean
}

let timer: ReturnType<typeof setTimeout>

export default Vue.extend({
  name: 'SplashStartButton',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data(): Data {
    return {
      timeoutAnim: false,
    }
  },
  mounted() {
    timer = setTimeout(() => (this.timeoutAnim = true), 5000)
  },
  beforeDestroy() {
    if (timer) {
      clearTimeout(timer)
    }
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.wrap {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}

.itemWrap {
  position: absolute;
  width: 100%;
  max-width: 140px;
  display: flex;
  justify-content: center;
}

.loaderWrap {
  width: 60px;
  margin: auto;
}

.loader {
  width: 100%;
  transform: translateY(-20px);
}

.startButton {
  width: 140px;
  height: 35px;
  font-size: 15px;
  color: $logo-type-green;
  text-align: center;
  border: solid 1px rgba($logo-type-green, 0.7);
  border-radius: 5px;

  &:active {
    transform: scale(0.9);
    transition: transform 0.1s;
  }
}

.enter {
  opacity: 0;
}

.enterTo {
  opacity: 1;
}

.leave {
  opacity: 1;
}

.leaveTo {
  opacity: 0;
}

.enterActive {
  transition: opacity 600ms ease;
}

.leaveActive {
  transition: opacity 600ms ease;
}
</style>
