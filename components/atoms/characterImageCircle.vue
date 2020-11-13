<template>
  <img :class="$style.img" :src="imageSrc" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CharacterImageCircle',
  props: {
    imageSrc: { type: String, default: '/img/1.jpg' },
  },
})
</script>
<style module lang="scss">
.img {
  width: 225px;
  height: 225px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
