<template>
  <NuxtLink to="friend">
    <button :class="$style.profileButton">おともだち</button>
  </NuxtLink>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProfileButton',
  data() {
    return {}
  },
})
</script>
<style module lang="scss">
.profileButton {
  width: 200px; /* 横 */
  height: 40px; /* 高さ */
  border: none;
  border-radius: 30px; /* 丸み */
  background-color: #929d49;
  font-size: 14px;
  color: #f3ebd8;
  text-align: center;
  margin: 0 auto;
  display: block;
}
</style>
