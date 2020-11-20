<template>
  <transition
    :enter-class="$style.scaleEnter"
    :leave-to-class="$style.scaleLeaveTo"
    :enter-active-class="$style.scaleEnterActive"
    :leave-active-class="$style.scaleLeaveActive"
  >
    <div
      v-if="isLoadingTalkResponseText || talkResponseText"
      :class="$style.responseTalk"
    >
      <div v-if="!isLoadingTalkResponseText">{{ talkResponseText }}</div>
      <div v-else>かんがえ中...</div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'ResponseTalk',
  computed: {
    ...mapState('ar', ['isLoadingTalkResponseText', 'talkResponseText']),
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.responseTalk {
  width: 250px;
  height: 50px;
  border-radius: 30px;
  background-color: $base-color;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -15px;
    border: 15px solid transparent;
    border-top: 15px solid $base-color;
  }
}

@keyframes bounceIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes bounceOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}

.scaleEnterActive {
  animation: bounceIn 600ms cubic-bezier(0.89, -0.11, 0.07, 1.4);
}

.scaleLeaveActive {
  animation: bounceOut 600ms cubic-bezier(1, -0.46, 0.065, 1.005);
}
</style>
