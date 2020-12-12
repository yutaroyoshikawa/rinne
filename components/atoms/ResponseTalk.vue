<template>
  <div
    style="
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: -1;
      overflow: hidden;
    "
  >
    <div
      :id="$props.idName"
      style="
        width: 250px;
        height: 50px;
        border-radius: 30px;
        background-color: #f3ebd8;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
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
