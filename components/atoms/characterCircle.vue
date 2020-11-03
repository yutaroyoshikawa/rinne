<template>
  <div :class="$style.wrap">
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
})
</script>
<style module lang="scss">
.wrap {
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: rgba(246, 197, 33, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 14px;
    color: #3c230d;
  }
}
</style>
