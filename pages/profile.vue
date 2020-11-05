<template>
  <div>
    <div>プロフィールページ</div>
    <NuxtLink to="cleanliness">清潔度ページ</NuxtLink>
    <ProfileText :user-name="userName" :doll-name="dollName" />
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
      userName: 'さくらちゃん',
      dollName: 'レニー',
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'プロフィール')
  },
})
</script>
