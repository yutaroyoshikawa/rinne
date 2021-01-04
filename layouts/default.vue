<template>
  <div :class="$style.app">
    <div :class="[$style.mainContainer, { [$style.openTab]: isOpenTab }]">
      <Splash />

      <portal-target name="other" />

      <portal-target name="loader" :class="$style.loaderPortal" />

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
import ArAlbum from '@/components/templates/ArAlbum.vue'
import Splash from '@/components/templates/Splash.vue'

export default Vue.extend({
  name: 'App',
  components: {
    HeaderTitle,
    OverlayTab,
    ArAlbum,
    Splash,
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
  mounted() {
    let inDom = false
    const observer = new MutationObserver(() => {
      const arPromptRef = document.querySelector('.prompt-box-8w')
      if (arPromptRef instanceof Element) {
        if (!inDom) {
          const arPromptPRef = document.querySelector('.prompt-box-8w p')
          const arPromptButtonRef = document.querySelector('.prompt-button-8w')
          const arPromptPrimaryRef = document.querySelector(
            '.button-primary-8w'
          )
          if (arPromptPRef) {
            arPromptPRef.innerHTML =
              'サービスの利用にはモーションセンサーのアクセス許可が必要です'
          }
          if (arPromptButtonRef) {
            arPromptButtonRef.innerHTML = 'NG'
          }
          if (arPromptPrimaryRef) {
            arPromptPrimaryRef.innerHTML = 'OK'
          }
        }
        inDom = true
      } else if (inDom) {
        inDom = false
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true })
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
  height: 100%;
  max-height: calc(100% - #{$header-height});
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.loaderPortal {
  height: 100%;
  width: 100%;
}
</style>
