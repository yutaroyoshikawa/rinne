<template>
  <div :class="$style.wrap">
    <div :id="$props.idName" :class="$style.talk">
      <div>{{ talkResponseText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'ResponseTalk',
  props: {
    idName: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('ar', ['talkResponseText']),
  },
})
</script>

<style lang="scss" module>
.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  overflow: hidden;
}

.talk {
  width: 1020px;
  height: 204px;
  border-radius: 204px;
  background-color: #f3ebd8;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 68px;
}
</style>
