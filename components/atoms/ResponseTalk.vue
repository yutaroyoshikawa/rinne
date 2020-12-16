<template>
  <div :class="$style.wrap">
    <div :id="$props.idName" :class="$style.targetWrap">
      <div :class="$style.talk">
        <div v-if="!isLoadingTalkResponseText">{{ talkResponseText }}</div>
        <div v-else>かんがえ中...</div>
      </div>
      <div :class="$style.triangle" />
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
    ...mapState('ar', ['isLoadingTalkResponseText', 'talkResponseText']),
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

.targetWrap {
  width: 1020px;
  height: 284px;
  position: relative;
}

.talk {
  width: 1020px;
  height: 204px;
  border-radius: 104px;
  background-color: #f3ebd8;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 68px;
}

.triangle {
  border-top: 80px solid #f3ebd8;
  border-right: 80px solid transparent;
  border-bottom: 80px solid transparent;
  border-left: 80px solid transparent;
  position: absolute;
  top: calc(100% - 80px);
  left: 50%;
  margin-left: -80px;
}
</style>
