<template>
  <div>
    <div :class="$style.imageCircleWrap">
      <CharacterImageCircle :image-src="imageSrc" />
    </div>
    <ProfileText
      :user-name="userName"
      :doll-name="dollName"
      :class="$style.profileText"
    />
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

    <ProfileText :user-name="userName" :doll-name="dollName" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ProfileText from '@/components/atoms/profileText.vue'
import CharacterImageCircle from '@/components/atoms/characterImageCircle.vue'
import CharacterCircle from '@/components/atoms/characterCircle.vue'
import ProfileButton from '../components/atoms/ProfileButton.vue'

export default Vue.extend({
  components: {
    CharacterCircle,
    ProfileButton,
    ProfileText,
    CharacterImageCircle,
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
      userName: 'さくらちゃん',
      dollName: 'レニー',
      imageSrc: '/img/1.jpg',
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'プロフィール')
  },
})
</script>

<style lang="scss" module>
.imageCircleWrap {
  margin: 30px 0;
  text-align: center;
}
.charactersWrap {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.profileText {
  margin-bottom: 30px;
}
.characterWrap {
  width: 80px;
  height: 80px;
  margin: 0 10px 10px 0;
}
</style>
