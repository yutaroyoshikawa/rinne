<template>
  <div :class="$style.app">
    <div
      :class="[$style.mainContainer, isOpenTab ? $style.openTab : undefined]"
    >
      <header :class="$style.header">
        <HeaderTitle />
      </header>
      <Nuxt />
    </div>
    <OverlayTab />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import 'destyle.css'
import HeaderTitle from '@/components/atoms/HeaderTitle.vue'
import OverlayTab from '@/components/molecule/OverlayTab.vue'

export default Vue.extend({
  name: 'App',
  components: {
    HeaderTitle,
    OverlayTab,
  },
  computed: {
    ...mapState(['isOpenTab']),
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.app {
  perspective: 2000px;
  background-color: #555;
  height: 100%;
}

.mainContainer {
  min-height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background-color: $base-color;
  transition: filter 300ms, transform 300ms;
}

.openTab {
  filter: blur(4px);
  transform: scale3d(0.9, 0.9, 0.9) rotate3d(1, 0, 0, 0);
}

.header {
  position: sticky;
  top: 0;
  z-index: $header-zindex;
}
</style>
