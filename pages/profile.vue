<template>
  <div>
    <ScaleTransition>
      <div :class="$style.imageCircleWrap">
        <CharacterImageCircle :image-src="imageSrc" />
      </div>
      <ProfileText
        :user-name="userName"
        :doll-name="dollName"
        :class="$style.profileText"
      />
    </ScaleTransition>
    <div :class="$style.characterListWrap">
      <CharacterList />
    </div>
    <div :class="$style.links">
      <ScaleTransition>
        <div :class="$style.profileButtonWrap">
          <ProfileButton :class="$style.profileButton" src="/friend"
            >おともだち</ProfileButton
          >
        </div>
      </ScaleTransition>
      <ScaleTransition>
        <div :class="$style.profileButtonWrap">
          <ProfileButton :class="$style.profileButton" src="/cleanliness"
            >たいちょう</ProfileButton
          >
        </div>
      </ScaleTransition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ProfileText from '@/components/atoms/profileText.vue'
import CharacterImageCircle from '@/components/atoms/characterImageCircle.vue'
import ScaleTransition from '@/components/atoms/transitions/ScaleTransition.vue'
import ProfileButton from '../components/atoms/ProfileButton.vue'

export default Vue.extend({
  components: {
    ProfileButton,
    ProfileText,
    CharacterImageCircle,
    ScaleTransition,
  },
  data() {
    return {
      userName: 'さくらちゃん',
      dollName: 'レニー',
      imageSrc: '/img/reny.jpg',
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
.profileText {
  margin-bottom: 30px;
}
.profileButtonWrap {
  width: 120px;
  margin-top: 20px;
  padding-bottom: 20px;
}
.characterListWrap {
  width: 340px;
  height: 180px;
  margin: 0 auto;
}
.links {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
