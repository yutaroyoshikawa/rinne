<template>
  <button :class="$style.backButton" @click="onClickButton">
    <fa :icon="['fa', 'chevron-left']" :class="$style.icon" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageTransitionState } from '@/extentions/pageTransitionState'

export default Vue.extend({
  name: 'BackButton',
  methods: {
    onClickButton() {
      const pageTransitionState = this.$store.state.pageTransitionState
      if (pageTransitionState === PageTransitionState.ENTERED) {
        this.$router.app.$router.back()
      }
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.backButton {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.icon {
  color: $dark-base-color;
  font-size: 15px;
  transform: translateX(-1px);
}
</style>
