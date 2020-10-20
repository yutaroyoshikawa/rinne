<template>
  <button
    :class="[
      $style.button,
      color === 'gray' ? $style.grayButton : $style.greenButton,
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  colorType: string
}

export default Vue.extend({
  props: {
    color: {
      type: String,
      default: 'gray',
    },
  },
})
</script>

<style module lang="scss">
.button {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  text-decoration: none;
  padding: 10px 30px;

  &:hover {
    color: #fff;
    background-color: #3b8070;
  }
}

.grayButton {
  color: #555;
}

.greenButton {
  color: #3b8070;
}
</style>
