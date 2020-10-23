<template>
  <a :href="listLink">
    <Button :class="$style.listButton">いちらん</Button>
  </a>
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
.listButton{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #929D49;
  color: #F3EBD8;
  font-size: 18px;
  text-align: center;
  border: 1px solid white;
}
</style>
