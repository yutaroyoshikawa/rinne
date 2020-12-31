<template>
  <OpacityTransition>
    <portal to="loader">
      <div v-if="!close" :class="$style.loader">
        <div :class="$style.logoWrap">
          <ScaleTransition :in="$props.in">
            <Logo :repeat-animation="true" />
          </ScaleTransition>
        </div>
      </div>
    </portal>
  </OpacityTransition>
</template>

<script lang="ts">
import Vue from 'vue'
import ScaleTransition from '@/components/atoms/transitions/ScaleTransition.vue'
import OpacityTransition from '@/components/atoms/transitions/OpacityTransition.vue'
import Logo from '@/components/atoms/Logo.vue'

type Data = {
  close: boolean
}

let timer: ReturnType<typeof setTimeout>

export default Vue.extend({
  components: {
    ScaleTransition,
    Logo,
    OpacityTransition,
  },
  props: {
    in: {
      type: Boolean,
      default: true,
    },
  },
  data(): Data {
    return {
      close: false,
    }
  },
  watch: {
    '$props.in': {
      handler(value) {
        if (!value) {
          timer = setTimeout(() => (this.close = true), 600)
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    if (timer) {
      clearTimeout(timer)
    }
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.loader {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: $header-zindex - 1;
  top: 0;
  left: 0;
  background-color: $base-color;
}

.logoWrap {
  width: 50vw;
  max-width: 200px;
}
</style>
