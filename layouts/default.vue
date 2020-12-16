<template>
  <div :class="$style.app">
    <div :class="[$style.mainContainer, { [$style.openTab]: isOpenTab }]">
      <header :class="$style.header">
        <HeaderTitle />
      </header>

      <ArAlbum :in="isIndexPage" />

      <div :class="$style.pageWrap">
        <Nuxt />
      </div>
    </div>
    <OverlayTab />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { ENABLE_DEVELOP_MODE } from '@/store/index'
import HeaderTitle from '@/components/atoms/HeaderTitle.vue'
import OverlayTab from '@/components/molecule/OverlayTab.vue'
import ArAlbum from '@/components/organisms/ArAlbum.vue'

export default Vue.extend({
  name: 'App',
  components: {
    HeaderTitle,
    OverlayTab,
    ArAlbum,
  },
  computed: {
    ...mapState(['isOpenTab']),
    isIndexPage(): boolean {
      return this.$route.path === '/'
    },
  },
  beforeMount() {
    const developModeQuery = this.$route.query.develop
    if (developModeQuery && developModeQuery === '1') {
      this.$store.commit(ENABLE_DEVELOP_MODE)
    }
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.app {
  perspective: 2000;
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

.arWrap {
  position: absolute;
  z-index: 40;
  width: 100%;
  height: 100%;
  top: 0;
}

.pageWrap {
  position: absolute;
  z-index: 99;
  width: 100%;
  max-height: calc(100% - #{$header-height});
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
