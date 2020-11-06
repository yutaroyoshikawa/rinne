<template>
  <div :class="$style.wrap">
    <div :class="$style.resultCircle">
      <p>
        <span :class="$style.resultNumber">{{ resultNumber }}</span>
        <span :class="$style.numberFormer">/100</span>
      </p>
    </div>
    <div :class="$style.dollWrap">
      <CharacterImageCircle />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ConditionCircle',
  computed: {
    resultNumber() {
      return Math.floor(Math.random() * 100) + 1
    },
  },
})
</script>
<style module lang="scss">
.resultCircle {
  width: 270px;
  height: 270px;
  border-radius: 270px;
  background-color: rgba(218, 153, 95, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
}
.resultNumber {
  font-size: 64px;
  color: #fff;
}
.numberFormer {
  font-size: 24px;
  color: #000;
}
.dollWrap {
  width: 270px;
  height: 270px;
  border-radius: 270px;
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
