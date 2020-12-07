<template>
  <NuxtLink :to="$props.src" :class="$style.profileButton">
    <slot>リンク</slot>
  </NuxtLink>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProfileButton',
  props: {
    src: {
      type: String,
      default: '/',
    },
  },
})
</script>
<style module lang="scss">
.profileButton {
  max-width: 200px;
  width: 100%;
  height: 40px;
  border-radius: 30px;
  background-color: #929d49;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #f3ebd8;
}
</style>
