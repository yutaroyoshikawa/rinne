<template>
  <div :class="$style.imageWrap">
    <transition
      :enter-class="$style.enter"
      :leave-to-class="$style.leaveTo"
      :enter-active-class="$style.enterActive"
      :leave-active-class="$style.leaveActive"
      :appear="true"
    >
      <img
        v-show="!loading"
        :src="$props.src"
        :alt="$props.name"
        @load="onLoadImage"
      />
    </transition>
    <transition
      :leave-to-class="$style.leaveTo"
      :leave-active-class="$style.leaveActive"
      :appear="false"
    >
      <div v-if="loading" :class="$style.loading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.27 114.63">
          <path
            :class="$style.cls1"
            d="M177.31,265.18s-7.38-19.24,4.1-49.34c0,0-15.7-18.4,1.18-37.27s40.1-2.56,38.94-2.85,35.16-18.78,65,1.65c0,0,20-14.26,37.3,2.77,0,0,18.76,17.88,0,40.21,0,0,9.74,10.38,3.35,44.83"
            transform="translate(-172.34 -165.35)"
          />
          <path d="M0,111.31" transform="translate(-172.34 -165.35)" />
          <path
            :class="$style.cls2"
            d="M280.69,235.43c0-11.85-12.18-21.45-27.22-21.45s-27.22,9.6-27.22,21.45,11.23,16.17,26.27,16.17S280.69,247.27,280.69,235.43Z"
            transform="translate(-172.34 -165.35)"
          />
          <ellipse
            :class="$style.cls3"
            cx="81.13"
            cy="60.23"
            rx="5.91"
            ry="4.39"
          />
          <path
            :class="$style.cls3"
            d="M266,261.23c-4.88,0-10.16,4.73-12.5,7.1-2.34-2.37-7.62-7.1-12.5-7.1-5.87,0-9.37,3.5-9.37,9.37S235.1,280,241,280c4.88,0,10.16-4.73,12.5-7.1,2.34,2.37,7.62,7.1,12.5,7.1,5.87,0,9.37-3.51,9.37-9.38S271.84,261.23,266,261.23Zm-25,15.62c-4.14,0-6.25-2.1-6.25-6.25s2.11-6.25,6.25-6.25c3.44,0,8,3.88,10.36,6.25C249,273,244.42,276.85,241,276.85Zm25,0c-3.44,0-8-3.87-10.36-6.25,2.35-2.37,6.91-6.25,10.36-6.25,4.15,0,6.25,2.11,6.25,6.25S270.12,276.85,266,276.85Z"
            transform="translate(-172.34 -165.35)"
          />
        </svg>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  loading: boolean
}

export default Vue.extend({
  name: 'PhotoListImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'image',
    },
  },
  data(): Data {
    return {
      loading: true,
    }
  },
  methods: {
    onLoadImage() {
      this.loading = false
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.imageWrap {
  float: left;
  width: 140px;
  height: 140px;
  background: #fff;
  margin-top: 20px;
  position: relative;
  border-radius: 5px;

  & > img {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@keyframes flush {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}

.loading {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  animation: flush 0.1s infinite alternate;
  & > svg {
    width: 100%;
    height: 100%;
  }
}

.cls1,
.cls2 {
  fill: none;
  stroke: $dark-base-color;
  stroke-miterlimit: 10;
}

.cls1 {
  stroke-width: 4.86px;
}

.cls2 {
  stroke-width: 5px;
}

.cls3 {
  fill: $dark-base-color;
}

.enterActive,
.leaveActive {
  transition: opacity 0.5s;
}

.enter {
  opacity: 0;
}
.leaveTo {
  opacity: 0;
}
</style>
