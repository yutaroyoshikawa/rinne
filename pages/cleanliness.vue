<template>
  <div>
    <div>清潔度ページ</div>
    <NuxtLink to="profile">プロフィールページ</NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'

export default Vue.extend({
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'たいちょう')
  },
})
</script>
