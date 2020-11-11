<template>
  <div :class="$style.profileText">
    <p :class="$style.username">{{ userName }}のおともだち</p>
    <p :class="$style.dollname">{{ dollName }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProfileText',
  props: {
    userName: {
      type: String,
      default: 'さくらちゃん',
    },
    dollName: {
      type: String,
      default: 'レニー',
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.profileText {
  margin: 0 auto;
}
.username {
  text-align: center;
  color: $dark-base-color;
  font-size: 14px;
}
.dollname {
  text-align: center;
  color: $dark-base-color;
  font-size: 20px;
}
</style>
