<template>
  <div :class="$style.listButton">
    <a :href="listLink">いちらん</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ListButton',
  data() {
    return {
      listLink: '',
    }
  },
})
</script>

<style module lang="scss">
.listButton {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #929d49;
  border: 1px solid white;
}
.listButton a {
  display: inline-block;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #f3ebd8;
  font-size: 18px;
  vertical-align: middle;
}
</style>
