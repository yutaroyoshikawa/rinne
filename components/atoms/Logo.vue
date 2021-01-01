<template>
  <div>
    <div
      :class="[
        $style.useWrap,
        { [$style.repeat]: $props.repeatAnimation },
        { [$style.once]: !$props.repeatAnimation },
      ]"
    >
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
      <div v-if="$props.showLogoType" :class="$style.useTypeWrap">
        <svg>
          <use
            xlink:href="#type-r"
            :class="$style.typeAnim"
            :style="{ '--delay': `${500 + $props.logoTypeDelay}ms` }"
          ></use>
          <use
            xlink:href="#type-i"
            :class="$style.greenTypeAnim"
            :style="{ '--delay': `${700 + $props.logoTypeDelay}ms` }"
          ></use>
          <use
            xlink:href="#type-n"
            :class="$style.typeAnim"
            :style="{ '--delay': `${900 + $props.logoTypeDelay}ms` }"
          ></use>
          <use
            xlink:href="#type-n2"
            :class="$style.typeAnim"
            :style="{ '--delay': `${1100 + $props.logoTypeDelay}ms` }"
          ></use>
          <use
            xlink:href="#type-e"
            :class="$style.typeAnim"
            :style="{ '--delay': `${1300 + $props.logoTypeDelay}ms` }"
          ></use>
        </svg>
      </div>
    </div>
    <svg style="display: none" xmlns="http://www.w3.org/2000/svg">
      <symbol
        id="svg-loader-face"
        :viewBox="
          $props.showLogoType ? '0 0 162.27 156.78' : '0 0 162.27 75.78'
        "
      >
        <g>
          <path
            :class="$style.pathLine"
            d="M177.31,265.18s-7.38-19.24,4.1-49.34c0,0-15.7-18.4,1.18-37.27s40.1-2.56,38.94-2.85,35.16-18.78,65,1.65c0,0,20-14.26,37.3,2.77,0,0,18.76,17.88,0,40.21,0,0,9.74,10.38,3.35,44.83"
            transform="translate(-172.34 -165.35)"
          />
        </g>
      </symbol>
      <symbol
        id="svg-loader-mouse"
        :viewBox="
          $props.showLogoType ? '0 0 162.27 156.78' : '0 0 162.27 75.78'
        "
      >
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
      <symbol
        id="svg-loader-infinity"
        :viewBox="
          $props.showLogoType ? '0 0 162.27 156.78' : '0 0 162.27 75.78'
        "
      >
        <g>
          <path
            :class="$style.fillShape"
            d="M266,261.23c-4.88,0-10.16,4.73-12.5,7.1-2.34-2.37-7.62-7.1-12.5-7.1-5.87,0-9.37,3.5-9.37,9.37S235.1,280,241,280c4.88,0,10.16-4.73,12.5-7.1,2.34,2.37,7.62,7.1,12.5,7.1,5.87,0,9.37-3.51,9.37-9.38S271.84,261.23,266,261.23Zm-25,15.62c-4.14,0-6.25-2.1-6.25-6.25s2.11-6.25,6.25-6.25c3.44,0,8,3.88,10.36,6.25C249,273,244.42,276.85,241,276.85Zm25,0c-3.44,0-8-3.87-10.36-6.25,2.35-2.37,6.91-6.25,10.36-6.25,4.15,0,6.25,2.11,6.25,6.25S270.12,276.85,266,276.85Z"
            transform="translate(-172.34 -165.35)"
          />
        </g>
      </symbol>
      <symbol
        v-if="$props.showLogoType"
        id="svg-loader-type"
        viewBox="0 0 312.27 156.78"
      >
        <g id="type">
          <path
            id="type-r"
            :class="$style.typeLine"
            d="M216.72,320.71a.7.7,0,0,1,.18.46,1,1,0,0,1-.15.5,1.12,1.12,0,0,1-1,.46,3.64,3.64,0,0,1-1.68-.39,3.16,3.16,0,0,1-1.25-1.06l-5.42-8.11a.64.64,0,0,0-.54-.25h-4.16c-.24,0-.36.11-.36.31v8a1.35,1.35,0,0,1-.5,1.05,2,2,0,0,1-2.46,0,1.33,1.33,0,0,1-.51-1.05v-19a2.4,2.4,0,0,1,.92-1.89,3.31,3.31,0,0,1,2.23-.79h5.38q9.47,0,9.47,6.51a5.86,5.86,0,0,1-1.54,4.18,8.41,8.41,0,0,1-4.24,2.26.26.26,0,0,0-.2.14.18.18,0,0,0,0,.2Zm-14-19.36q-.36,0-.36.3v8c0,.21.12.31.36.31h4.19q6.59,0,6.58-4.47a3.4,3.4,0,0,0-1.64-3.18,10,10,0,0,0-4.94-.95Z"
            transform="translate(-178.34 -178.35)"
          />
          <path
            id="type-i"
            :class="$style.greenTypeLine"
            d="M223.72,320.65v-20.2a1.33,1.33,0,0,1,.51-1.05,2,2,0,0,1,2.45,0,1.33,1.33,0,0,1,.51,1.05v20.2a1.33,1.33,0,0,1-.51,1.05,2,2,0,0,1-2.45,0A1.33,1.33,0,0,1,223.72,320.65Z"
            transform="translate(-178.34 -178.35)"
          />
          <path
            id="type-n"
            :class="$style.typeLine"
            d="M235.89,320.74V300.51a1.39,1.39,0,0,1,.53-1.09,1.89,1.89,0,0,1,1.28-.45,3.36,3.36,0,0,1,1.52.36,2.73,2.73,0,0,1,1.12,1l9,13.26,2.86,4.71c0,.05.06.07.13.07s.09,0,.09-.07Q252,312.75,252,311V300.36a1.28,1.28,0,0,1,.47-1,1.67,1.67,0,0,1,1.16-.42,1.65,1.65,0,0,1,1.15.42,1.24,1.24,0,0,1,.47,1v20.26a1.34,1.34,0,0,1-.52,1.08,2,2,0,0,1-1.25.43,3.25,3.25,0,0,1-1.5-.36,3,3,0,0,1-1.13-.94l-9-13.32-2.89-4.72a.13.13,0,0,0-.11-.06s-.07,0-.07.06c0,.4.08,1.13.16,2.19s.15,2,.2,2.76.07,1.52.07,2.24v10.76a1.23,1.23,0,0,1-.49,1,1.79,1.79,0,0,1-1.15.4,1.81,1.81,0,0,1-1.16-.4A1.26,1.26,0,0,1,235.89,320.74Z"
            transform="translate(-178.34 -178.35)"
          />
          <path
            id="type-n2"
            :class="$style.typeLine"
            d="M263.93,320.74V300.51a1.38,1.38,0,0,1,.52-1.09,1.91,1.91,0,0,1,1.28-.45,3.36,3.36,0,0,1,1.52.36,2.66,2.66,0,0,1,1.12,1l9,13.26,2.85,4.71a.14.14,0,0,0,.13.07c.06,0,.09,0,.09-.07Q280,312.75,280,311V300.36a1.24,1.24,0,0,1,.47-1,1.65,1.65,0,0,1,1.15-.42,1.69,1.69,0,0,1,1.16.42,1.28,1.28,0,0,1,.47,1v20.26a1.35,1.35,0,0,1-.53,1.08,1.93,1.93,0,0,1-1.24.43,3.25,3.25,0,0,1-1.5-.36,3.1,3.1,0,0,1-1.14-.94l-9-13.32L267,302.79a.11.11,0,0,0-.11-.06s-.07,0-.07.06c0,.4.08,1.13.16,2.19s.15,2,.2,2.76.08,1.52.08,2.24v10.76a1.26,1.26,0,0,1-.49,1,1.81,1.81,0,0,1-1.16.4,1.79,1.79,0,0,1-1.15-.4A1.23,1.23,0,0,1,263.93,320.74Z"
            transform="translate(-178.34 -178.35)"
          />
          <path
            id="type-e"
            :class="$style.typeLine"
            d="M295.1,322.13a3.3,3.3,0,0,1-2.22-.79,2.4,2.4,0,0,1-.92-1.89v-17.8a2.4,2.4,0,0,1,.92-1.89,3.3,3.3,0,0,1,2.22-.79h11.1a1.5,1.5,0,0,1,1,.37,1.12,1.12,0,0,1,.43.88,1.06,1.06,0,0,1-.43.86,1.54,1.54,0,0,1-1,.36H295.79c-.24,0-.36.1-.36.31v6.66c0,.2.12.31.36.31h8.46a1.52,1.52,0,0,1,1,.35,1.13,1.13,0,0,1,.41.88,1.15,1.15,0,0,1-.41.89,1.48,1.48,0,0,1-1,.37h-8.46c-.24,0-.36.11-.36.31v7.8c0,.21.12.31.36.31h10.77a1.55,1.55,0,0,1,1.05.37,1.12,1.12,0,0,1,0,1.76,1.6,1.6,0,0,1-1.05.37Z"
            transform="translate(-178.34 -178.35)"
          />
        </g>
      </symbol>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Logo',
  props: {
    repeatAnimation: {
      type: Boolean,
      default: false,
    },
    showLogoType: {
      type: Boolean,
      default: false,
    },
    logoTypeDelay: {
      type: Number,
      default: 0,
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.typeLine {
  stroke: $dark-base-color;
  stroke-width: 1px;
  stroke-miterlimit: 10;
}

.fixLogoPosition {
  transform: translateY(10px);
}

.greenTypeLine {
  stroke: $logo-type-green;
  stroke-width: 1px;
  stroke-miterlimit: 10;
}

.typeAnim {
  animation-direction: alternate;
  animation-name: typeFill;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: var(--delay);
  fill: rgba($dark-base-color, 0);
  animation-fill-mode: forwards;
}

.greenTypeAnim {
  animation-direction: alternate;
  animation-name: greenTypeFill;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: var(--delay);
  fill: rgba($logo-type-green, 0);
  animation-fill-mode: forwards;
}

.pathLine {
  fill: none;
  stroke: $dark-base-color;
  stroke-miterlimit: 10;
  stroke-width: 4.86px;
}

.greenPathLine {
  fill: none;
  stroke: $logo-type-green;
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

.useTypeWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 116.52924138781043% -16.38346727898966%;
}

.infinity {
  width: 100%;
  height: 100%;
  animation-direction: alternate;
  animation-name: infinity;
  animation-duration: 2s;
  animation-timing-function: ease;
  transform-origin: bottom;
}

.repeat {
  .faceAnim {
    animation-iteration-count: infinite;
  }

  .mouse {
    animation-iteration-count: infinite;
  }

  .infinity {
    animation-iteration-count: infinite;
  }
}

.once {
  .faceAnim {
    animation-iteration-count: 1;
  }

  .mouse {
    animation-iteration-count: 1;
  }

  .infinity {
    animation-iteration-count: 1;
  }
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

@keyframes typeFill {
  0% {
    fill: rgba($dark-base-color, 0);
  }
  100% {
    fill: rgba($dark-base-color, 1);
  }
}

@keyframes greenTypeFill {
  0% {
    fill: rgba($logo-type-green, 0);
  }
  100% {
    fill: rgba($logo-type-green, 1);
  }
}
</style>
