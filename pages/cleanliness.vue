<template>
  <div :class="$style.wrap">
    <ConditionCircle :class="$style.conditionCircle" />
    <div :class="$style.conditionMessage">
      <!-- 基準決めたら数字によって表示メッセージ変更導入する -->
      <p>そろそろ洗って欲しいな</p>
    </div>
  </div>
  <!-- <NuxtLink to="profile">プロフィールページ</NuxtLink> -->
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
  display: flex;
  text-align: center;
  font-size: 24px;
  margin-top: 40%;
  color: $dark-base-color;
}
.conditionCircle {
  margin-top: 40%;
}
</style>
