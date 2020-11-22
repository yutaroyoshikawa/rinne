<template>
  <div :class="$style.imageWrap">
    <img :src="$props.src" :alt="$props.name" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PhotoListImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'image',
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.imageWrap {
  float: left;
  width: 140px;
  height: 140px;
  background: $secondary-color;
  margin-top: 20px;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
