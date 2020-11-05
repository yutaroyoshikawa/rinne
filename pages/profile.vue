<template>
  <div>
    <div>プロフィールページ</div>
    <NuxtLink to="cleanliness">清潔度ページ</NuxtLink>
    <ProfileText :userName="user_name" :dollName="doll_name" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ProfileText from '@/components/atoms/profileText.vue'

export default Vue.extend({
  components: {
    ProfileText,
  },
  data() {
    return {
      user_name: 'さくらちゃん',
      doll_name: 'レニー',
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'プロフィール')
  },
})
</script>
