<template>
  <div :class="$style.container">
    <h2 :class="$style.header">
      {{ title }}
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  firstTitle: string
  secondTitle: string
  currentPosition: 'first' | 'second' | null
}

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
.container {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: #f6c521;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.header {
  text-align: center;
  font-size: 24px;
  color: #f3ebd8;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
