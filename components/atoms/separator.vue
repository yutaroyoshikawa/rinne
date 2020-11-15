<template>
  <hr :class="$style.separator" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Separator',
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';
.separator {
  border: none;
  border-top: dashed 2px $secondary-color;
  height: 1px;
  width: 260px;
}
</style>
