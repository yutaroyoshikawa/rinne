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
    <div v-if="isOpenTab" :class="$style.tabOveray" @click="closeTab" />
    <transition
      :enter-class="$style.slideEnter"
      :leave-to-class="$style.slideLeaveTo"
      :enter-active-class="$style.slideEnterActive"
      :leave-active-class="$style.slideLeaveActive"
    >
      <div v-if="isOpenTab" :class="$style.tabContainer">
        <TabHeader></TabHeader>
        <portal-target name="tab" :class="$style.portal"> </portal-target>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import 'destyle.css'
import HeaderTitle from '@/components/atoms/HeaderTitle.vue'
import TabHeader from '@/components/atoms/TabHeader.vue'
import { SET_IS_OPEN_TAB } from '@/store/index'

export default Vue.extend({
  name: 'App',
  components: {
    HeaderTitle,
    TabHeader,
  },
  computed: {
    ...mapState(['isOpenTab']),
  },
  methods: {
    closeTab() {
      this.$store.commit(SET_IS_OPEN_TAB, false)
    },
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

.tabContainer {
  width: 100%;
  height: 83vh;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 0;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  z-index: $header-zindex + 2;
}

.openTab {
  filter: blur(4px);
  transform: scale3d(0.9, 0.9, 0.9) rotate3d(1, 0, 0, 0);
}

.portal {
  height: 100%;
  width: 100%;
}

.header {
  position: sticky;
  top: 0;
  z-index: $header-zindex;
}

.tabOveray {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: $header-zindex + 1;
}

.slideEnterActive,
.slideLeaveActive {
  transition: transform 0.5s ease;
}

.slideEnter,
.slideLeaveTo {
  transform: translateY(100%);
}
</style>
