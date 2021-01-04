<template>
  <div :class="$style.wrap">
    <img :class="$style.img" src="/img/logo.svg" />
    <h1 :class="$style.text">{{ error.statusCode }}</h1>
    <h2 :class="$style.sentence">ページが見つからないよ！</h2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
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
  width: 17%;
  margin-top: 10%;
}
.text {
  margin-top: 6%;
  font-size: 140%;
  font-family: 'Changa One', cursive;
}
.sentence {
  margin-top: 3%;
  font-size: 100%;
}
</style>
