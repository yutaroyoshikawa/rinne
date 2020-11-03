<template>
  <NuxtLink to="camerarool" :class="$style.pageLink">
    <button :class="$style.addButton">
      <fa :icon="['fa', 'plus']" :class="$style.plus" />
    </button>
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AddButton',
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
