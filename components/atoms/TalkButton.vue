<template>
  <transition
    :enter-class="$style.scaleEnter"
    :leave-to-class="$style.scaleLeaveTo"
    :enter-active-class="$style.scaleEnterActive"
    :leave-active-class="$style.scaleLeaveActive"
  >
    <div v-if="$props.in" :class="$style.wrap">
      <button :class="$style.talkButton" @click="$emit('click')">
        <fa :icon="['fa', 'comment']" :class="$style.icon" />
        おはなしする
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TalkButton',
  props: {
    in: {
      type: Boolean,
      default: true,
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.wrap {
  :active {
    transition: transform 0.1s linear;
    transform: scale(0.9);
  }
}

.talkButton {
  width: 150px;
  height: 45px;
  border-radius: 53px;
  text-align: center;
  background-color: $primary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $base-color;
  transition: transform 0.05s linear;

  :active {
    transition: transform 0.05s linear;
    transform: scale(0.9);
  }
}

.icon {
  color: $base-color;
  font-size: 20px;
  margin-right: 5px;
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
