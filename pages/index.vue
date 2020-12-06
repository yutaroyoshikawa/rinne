<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import { ENABLE_PRESEN_MODE, ENABLE_NOMAL_MODE } from '@/store/ar'

export default Vue.extend({
  name: 'Top',
  created() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, undefined)
  },
  beforeCreate() {
    if (typeof window !== 'undefined') {
      const presenParam = this.$route.query.presen
      if (presenParam || presenParam === '1') {
        this.$store.commit(`ar/${ENABLE_PRESEN_MODE}`)
      } else {
        this.$store.commit(`ar/${ENABLE_NOMAL_MODE}`)
      }
    }
  },
})
</script>
