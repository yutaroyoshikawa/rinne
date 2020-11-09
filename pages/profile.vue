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
    <ProfileButton />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ProfileButton from '../components/atoms/ProfileButton.vue'
import CharacterCircle from '../components/atoms/characterCircle.vue'

export default Vue.extend({
  components: {
    CharacterCircle,
    ProfileButton,
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
</style>
