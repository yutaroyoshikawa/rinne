<template>
  <div
    :class="[
      $style.wrap,
      { [$style.highScore]: $props.score * 100 >= 66 },
      {
        [$style.nomalScore]: 66 > $props.score * 100 && $props.score * 100 > 33,
      },
      { [$style.lowScore]: 33 >= $props.score * 100 },
    ]"
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
    score: {
      type: Number,
      default: 0,
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
