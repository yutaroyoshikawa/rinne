<template>
  <div>
    <div>プロフィールページ</div>
    <NuxtLink to="cleanliness">清潔度ページ</NuxtLink>
    <div :class="$style.charactersWrap">
      <div
        v-for="(characterName, index) in characterNames"
        :key="index"
        :class="$style.characterWrap"
      >
        <CharacterCircle :character-name="characterName" />
      </div>
    </div>
    <button :class="$style.button">{{ button }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import CharacterCircle from '../components/atoms/characterCircle.vue'

export default Vue.extend({
  components: {
    CharacterCircle,
  },
  data() {
    return {
      characterNames: [
        'げんき',
        'やさしい',
        'かしこい',
        'おっとり',
        'やんちゃ',
        'なつっこい',
      ],
      button: 'おともだち',
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'プロフィール')
  },
})
</script>

<style lang="scss" module>
.charactersWrap {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.characterWrap {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.button {
  width: 200px; /* 横 */
  height: 40px; /* 高さ */
  border: solid 1px #929d49;
  border-radius: 30px; /* 丸み */
  background-color: #929d49;
  font-size: 12px;
  color: #f3ebd8;
  text-align: center;
  margin: 0 auto;
  display: block;
}
</style>
