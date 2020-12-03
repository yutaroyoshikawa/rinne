<template>
  <div :class="$style.wrap">
    <img :class="$style.img" :src="imageSrc" />
    <h1 :class="$style.text">{{ error.statusCode }}</h1>
    <h2 :class="$style.sentence">ページが見つからないよ！</h2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    imageSrc: { type: String, default: '/img/logo_transparent.png' },
    error: {
      type: Object,
      default() {
        return {}
      },
    },
  },
})
</script>

<style module lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Changa+One&family=Roboto&display=swap');
@import '@/assets/scss/variables.scss';

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: $dark-base-color;
}
.img {
  width: 550px;
  height: 550px;
  margin-top: -3%;
}
.text {
  margin-top: -10%;
  font-size: 2.2em;
  font-family: 'Changa One', cursive;
}
.sentence {
  margin-top: 3%;
  font-size: 1.3em;
}
</style>
