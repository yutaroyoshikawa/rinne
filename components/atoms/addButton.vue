<template>
  <ScaleTransition>
    <button :class="$style.addButton">
      <fa :icon="['fa', 'plus']" :class="$style.plus" />
    </button>
  </ScaleTransition>
</template>

<script lang="ts">
import Vue from 'vue'
import ScaleTransition from '@/components/atoms/transitions/ScaleTransition.vue'

export default Vue.extend({
  name: 'AddButton',
  components: {
    ScaleTransition,
  },
  data() {
    return {}
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.addButton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: $primary-color;
  color: $base-color;
  border: none;
  text-align: center;
}
.plus {
  color: $base-color;
  font-size: 30px;
}
</style>
