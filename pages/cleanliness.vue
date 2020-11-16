<template>
  <div :class="$style.wrap">
    <ConditionCircle :class="$style.conditionCircle" :score="score" />
    <div :class="$style.conditionMessage">
      <p>{{ resultMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ConditionCircle from '@/components/atoms/conditionCircle.vue'

export default Vue.extend({
  name: 'Cleanliness',
  components: {
    ConditionCircle,
  },
  computed: {
    score() {
      return Math.floor(Math.random() * 100) + 1
    },
    resultMessage() {
      if (this.score >= 66) {
        return 'げんきいっぱい！'
      } else if (this.score < 66 && this.score > 33) {
        return 'まだまだげんき'
      } else {
        return 'そろそろあらってほしいな'
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'たいちょう')
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.wrap {
  padding-bottom: 20px;
  width: 100%;
  height: 40%;
  display: grid;
  align-items: center;
  justify-content: center;
}
.conditionMessage {
  text-align: center;
  font-size: 24px;
  margin-top: 40%;
  color: $dark-base-color;
}
.conditionCircle {
  margin-top: 40%;
}
</style>
