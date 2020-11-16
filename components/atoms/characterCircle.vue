<template>
  <div
    :class="{
      [$style.wrap]: true,
      [$style.highScore]: score >= 66,
      [$style.nomalScore]: 66 > score && score > 33,
      [$style.lowScore]: 33 >= score,
    }"
  >
    <p>{{ characterName }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CharacterCircle',
  props: {
    characterName: { type: String, default: 'name' },
  },
  computed: {
    score() {
      return Math.floor(Math.random() * 100) + 1
    },
  },
})
</script>
<style module lang="scss">
@import '@/assets/scss/variables.scss';

.wrap {
  width: 80px;
  height: 80px;
  border-radius: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 14px;
    color: $dark-base-color;
  }
}
.highScore {
  background-color: rgba(246, 197, 33, 1);
}
.nomalScore {
  background-color: rgba(246, 197, 33, 0.7);
}
.lowScore {
  background-color: rgba(246, 197, 33, 0.3);
}
</style>
