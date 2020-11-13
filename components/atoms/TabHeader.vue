<template>
  <div :class="$style.container">
    <h2 :class="$style.header">
      {{ title }}
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: 'タブ',
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.container {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: $secondary-color;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.header {
  text-align: center;
  width: 100%;
  font-size: 24px;
  color: $base-color;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
