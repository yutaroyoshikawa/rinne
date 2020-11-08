<template>
  <div :class="$style.loader">
    <div :class="$style.logoWrap">
      <ScaleTransition>
        <div :class="$style.useWrap">
          <div :class="$style.face">
            <svg :class="$style.faceAnim">
              <use xlink:href="#svg-loader-face"></use>
            </svg>
          </div>
          <div :class="$style.useMouseWrap">
            <svg :class="$style.mouse">
              <use xlink:href="#svg-loader-mouse"></use>
            </svg>
          </div>
          <div :class="$style.useInfinityWrap">
            <svg :class="$style.infinity">
              <use xlink:href="#svg-loader-infinity"></use>
            </svg>
          </div>
        </div>
      </ScaleTransition>
      <svg style="display: none" xmlns="http://www.w3.org/2000/svg">
        <symbol id="svg-loader-face" viewBox="0 0 162.27 156.78">
          <g>
            <path
              :class="$style.pathLine"
              d="M177.31,265.18s-7.38-19.24,4.1-49.34c0,0-15.7-18.4,1.18-37.27s40.1-2.56,38.94-2.85,35.16-18.78,65,1.65c0,0,20-14.26,37.3,2.77,0,0,18.76,17.88,0,40.21,0,0,9.74,10.38,3.35,44.83"
              transform="translate(-172.34 -165.35)"
            />
          </g>
        </symbol>
        <symbol id="svg-loader-mouse" viewBox="0 0 162.27 156.78">
          <g>
            <path
              :class="$style.pathLine"
              d="M280.69,235.43c0-11.85-12.18-21.45-27.22-21.45s-27.22,9.6-27.22,21.45,11.23,16.17,26.27,16.17S280.69,247.27,280.69,235.43Z"
              transform="translate(-172.34 -165.35)"
            />
            <ellipse
              :class="$style.fillShape"
              cx="81.13"
              cy="60.23"
              rx="5.91"
              ry="4.39"
            />
          </g>
        </symbol>
        <symbol id="svg-loader-infinity" viewBox="0 0 162.27 156.78">
          <g>
            <path
              :class="$style.fillShape"
              d="M266,261.23c-4.88,0-10.16,4.73-12.5,7.1-2.34-2.37-7.62-7.1-12.5-7.1-5.87,0-9.37,3.5-9.37,9.37S235.1,280,241,280c4.88,0,10.16-4.73,12.5-7.1,2.34,2.37,7.62,7.1,12.5,7.1,5.87,0,9.37-3.51,9.37-9.38S271.84,261.23,266,261.23Zm-25,15.62c-4.14,0-6.25-2.1-6.25-6.25s2.11-6.25,6.25-6.25c3.44,0,8,3.88,10.36,6.25C249,273,244.42,276.85,241,276.85Zm25,0c-3.44,0-8-3.87-10.36-6.25,2.35-2.37,6.91-6.25,10.36-6.25,4.15,0,6.25,2.11,6.25,6.25S270.12,276.85,266,276.85Z"
              transform="translate(-172.34 -165.35)"
            />
          </g>
        </symbol>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ScaleTransition from '@/components/atoms/transitions/ScaleTransition.vue'

export default Vue.extend({
  components: {
    ScaleTransition,
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.loader {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logoWrap {
  width: 50vw;
  max-width: 200px;
}

.pathLine {
  fill: none;
  stroke: $dark-base-color;
  stroke-miterlimit: 10;
  stroke-width: 4.86px;
}

.fillShape {
  fill: $dark-base-color;
}

.useWrap {
  position: relative;
  padding-top: 96.6167498613422%;
}

.faceAnim {
  width: 100%;
  height: 100%;
  animation-name: lineStroke;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  stroke-dasharray: 500;
  stroke-dashoffset: 2000;
}

.face {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 156.22111295988165% -80.82663605051664%;
}

.useMouseWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 155.9129845319529% -70.30233448143896%;
}

.mouse {
  width: 100%;
  height: 100%;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-name: mouseRotate;
  animation-duration: 2s;
  animation-timing-function: ease;
}

.useInfinityWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 156.52924138781043% -46.38346727898966%;
}

.infinity {
  width: 100%;
  height: 100%;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-name: infinity;
  animation-duration: 2s;
  animation-timing-function: ease;
  transform-origin: bottom;
}

@keyframes lineStroke {
  0% {
    stroke-dashoffset: 1500;
  }
  10% {
    stroke-dashoffset: 1500;
  }
  100% {
    stroke-dashoffset: 2000;
  }
}

@keyframes mouseRotate {
  0% {
    transform: rotate(0);
  }
  85% {
    transform: rotate(0);
  }
  95% {
    transform: rotate(5deg) scaleY(0.94);
  }
  100% {
    transform: rotate(-5deg) scaleY(0.95);
  }
}

@keyframes infinity {
  0% {
    transform: rotate(0);
  }
  85% {
    transform: rotate(0);
  }
  95% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(1deg);
  }
}
</style>
