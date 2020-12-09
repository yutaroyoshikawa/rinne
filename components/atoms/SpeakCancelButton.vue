<template>
  <div :class="$style.wrap">
    <p :class="$style.cancelLabel">キャンセル</p>
    <button :class="$style.backButton" @click="$emit('click')">
      <fa :icon="['fa', 'times']" :class="$style.icon" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BackButton',
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.wrap {
  position: relative;
  width: 100%;
}

.cancelLabel {
  position: absolute;
  top: -20px;
  width: 100%;
  text-align: center;
}

.backButton {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 50%;
  background-color: $dark-base-color;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border: solid 3px #fff;
}

.icon {
  color: #fff;
  font-size: 15px;
}
</style>
