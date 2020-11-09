<template>
  <a href="#">
    <button :class="$style.listButton">いちらん</button>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ListButton',
  data() {
    return {}
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.listButton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: $primary-color;
  color: $base-color;
  font-size: 18px;
  border: none;
}
</style>
