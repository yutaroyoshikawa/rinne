<template>
  <hr :class="$style.splitLine" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SplitLine',
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.splitLine {
  width: 260px;
  size: 3px;
  color: $secondary-color;
  border-style: dotted;
  margin: 0 auto;
}
</style>
