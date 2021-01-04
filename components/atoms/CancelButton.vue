<template>
  <button :class="$style.backButton" @click="$emit('click')">
    <fa :icon="['fa', 'times']" :class="$style.icon" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackButton',
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
  background-color: $dark-base-color;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.icon {
  color: #fff;
  font-size: 15px;
}
</style>
