<template>
  <transition
    :enter-class="$style.slideEnter"
    :leave-to-class="$style.slideLeaveTo"
    :enter-active-class="$style.slideEnterActive"
    :leave-active-class="$style.slideLeaveActive"
  >
    <div v-if="isOpenTab" :class="$style.tabOveray" @click.self="closeTab">
      <div v-if="isOpenTab" :class="$style.tabContainer">
        <TabHeader @close="closeTab" />
        <div :class="$style.contentWrap">
          <portal-target name="tab" :class="$style.portal"> </portal-target>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { CLOSE_TAB } from '@/store/index'
import TabHeader from '@/components/atoms/TabHeader.vue'

export default Vue.extend({
  name: 'OverlayTab',
  components: {
    TabHeader,
  },
  computed: {
    ...mapState(['isOpenTab']),
  },
  methods: {
    closeTab() {
      this.$store.commit(CLOSE_TAB)
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.tabOveray {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: $header-zindex + 1;
}

.tabContainer {
  width: 100%;
  height: 83%;
  background-color: $base-color;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: $header-zindex + 2;
  bottom: 0;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.contentWrap {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.portal {
  height: 100%;
  width: 100%;
}

.slideEnterActive,
.slideLeaveActive {
  transition: transform 0.5s ease;
  .tabContainer {
    transition: transform 0.5s ease;
  }
}

.slideEnter,
.slideLeaveTo {
  .tabContainer {
    transform: translateY(100%);
  }
}
</style>
