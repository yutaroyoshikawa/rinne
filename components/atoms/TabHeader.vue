<template>
  <div :class="$style.container">
    <div :class="$style.cancelWrap">
      <CancelButton @click="$emit('close')" />
    </div>
    <h2 :class="$style.header">
      {{ tabTitle }}
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import CancelButton from '@/components/atoms/CancelButton.vue'

export default Vue.extend({
  components: {
    CancelButton,
  },
  props: {
    title: {
      type: String,
      default: 'タブ',
    },
  },
  computed: {
    ...mapState(['tabTitle']),
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.cancelWrap {
  position: absolute;
  left: 20px;
}

.container {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: $secondary-color;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.header {
  text-align: center;
  width: 100%;
  font-size: 24px;
  color: $dark-base-color;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
