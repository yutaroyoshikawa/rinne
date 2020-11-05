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
      default: 'さくらちゃん'
    },
    dollName: {
      type: String,
      default: 'レニー'
    },
  },
})
</script>

<style module lang="scss">
.profileText {
  margin: 0 auto;
}

.username {
  text-align: center;
  color: #3c230d;
  font-size: 14px;
  font-family: 'Kosugi Maru', sans-serif;
}

.dollname {
  text-align: center;
  color: #3c230d;
  font-size: 20px;
  font-family: 'Kosugi Maru', sans-serif;
}
</style>
