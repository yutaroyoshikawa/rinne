<template>
  <ScaleTransition :in="$props.in">
    <div :class="$style.wrap">
      <button :class="$style.talkButton" @click="onClick">
        <fa :icon="['fa', 'comment']" :class="$style.icon" />
        <span>おはなしする</span>
      </button>
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
  methods: {
    onClick() {
      const params = new URLSearchParams(location.search.slice(1))
      params.append('talkmode', '1')
      this.$router.replace(`${location.pathname}?${params}`)
      this.$emit('click')
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
