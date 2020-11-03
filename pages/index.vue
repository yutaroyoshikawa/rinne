<template>
  <div :class="$style.container">
    <div :class="$style.links">
      <p :class="$style.contentsTitle">page</p>
      <NuxtLink to="presentation" :class="$style.pageLink">プレゼン</NuxtLink>
      <NuxtLink to="cleanliness" :class="$style.pageLink">たいちょう</NuxtLink>
      <NuxtLink to="camerarool" :class="$style.pageLink">カメラロール</NuxtLink>
      <NuxtLink to="photolist" :class="$style.pageLink">いちらん</NuxtLink>
    </div>
    <hr />
    <p :class="$style.contentsTitle">component</p>
    <div :class="$style.componentWrap">
      <ListButton />
      <CharacterCircle :character-name="characterName" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ListButton from '../components/atoms/listButton.vue'
import CharacterCircle from '../components/atoms/characterCircle.vue'

export default Vue.extend({
  components: {
    ListButton,
    CharacterCircle,
  },
  data() {
    return {
      characterName: 'sample',
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, undefined)
  },
})
</script>

<style lang="scss" module>
.container {
  margin: 0 auto;
  min-height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  text-align: center;
}
.contentsTitle {
  font-size: 1.5em;
  color: #3c230d;
  margin-bottom: 20px;
}
.links {
  display: flex;
  flex-direction: column;
}
.pageLink {
  width: 200px;
  padding: 10px 0;
  border-radius: 30px;
  margin: 0 auto 10px auto;
  background-color: #f6c521;
  color: #fff;
}
hr {
  margin: 50px 0;
}
.componentWrap {
  display: flex;
  justify-content: center;
}
</style>
