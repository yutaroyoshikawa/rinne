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
.addButton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #929d49;
  color: #f3ebd8;
  border: none;
  text-align: center;
}
.plus {
  color: #f3ebd8;
  font-size: 30px;
}
</style>
