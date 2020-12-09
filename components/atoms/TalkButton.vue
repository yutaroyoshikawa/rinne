<template>
  <ScaleTransition :in="$props.in">
    <div :class="$style.wrap">
      <NuxtLink
        :class="$style.talkButton"
        :to="{ name: '', query: { talkmode: 1 } }"
      >
        <fa :icon="['fa', 'comment']" :class="$style.icon" />
        <span>おはなしする</span>
      </NuxtLink>
    </div>
  </ScaleTransition>
</template>

<script lang="ts">
import Vue from 'vue'
import ScaleTransition from '@/components/atoms/transitions/ScaleTransition.vue'

export default Vue.extend({
  name: 'TalkButton',
  components: {
    ScaleTransition,
  },
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
  width: 180px;
  height: 45px;
  border-radius: 53px;
  text-align: center;
  background-color: $primary-color;
  display: flex;
  font-size: 15px;
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
  display: inline-block;
}
</style>
