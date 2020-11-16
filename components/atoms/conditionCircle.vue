<template>
  <div>
    <div
      :class="{
        [$style.resultCircle]: true,
        [$style.highScore]: score >= 66,
        [$style.nomalScore]: 66 > score && score > 33,
        [$style.lowScore]: 33 >= score,
      }"
    >
      <p>
        <span :class="$style.resultNumber">{{ score }}</span>
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
  props: {
    score: { type: Number, default: 0 },
  },
})
</script>
<style module lang="scss">
@import '@/assets/scss/variables.scss';

.resultCircle {
  width: 270px;
  height: 270px;
  border-radius: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
}
.highScore {
  background-color: rgba(218, 153, 95, 0.2);
}
.nomalScore {
  background-color: rgba(218, 153, 95, 0.5);
}
.lowScore {
  background-color: rgba(218, 153, 95, 0.7);
}
.resultNumber {
  font-size: 64px;
  color: #fff;
}
.numberFormer {
  font-size: 24px;
  color: $dark-base-color;
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
