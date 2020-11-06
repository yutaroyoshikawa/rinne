<template>
  <div :class="$style.wrap">
    <img :class="$style.img" src="/img/characterImage.png" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CharacterImageCircle',
})
</script>
<style module lang="scss">
.wrap {
  width: 225px;
  height: 225px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 14px;
    color: #3c230d;
  }
}
.img {
  width: 100%;
  height: 100%;
}
</style>
