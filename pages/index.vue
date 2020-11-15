<template>
  <div :class="$style.container">
    <div :class="$style.links">
      <p :class="$style.contentsTitle">page</p>
      <ScaleTransition>
        <NuxtLink to="presentation" :class="$style.pageLink">プレゼン</NuxtLink>
      </ScaleTransition>
      <NuxtLink to="cleanliness" :class="$style.pageLink">たいちょう</NuxtLink>
      <NuxtLink to="photolist" :class="$style.pageLink">いちらん</NuxtLink>
      <NuxtLink to="profile" :class="$style.pageLink">プロフィール</NuxtLink>
      <NuxtLink to="locate" :class="$style.pageLink">いばしょ</NuxtLink>
      <NuxtLink to="testpage" :class="$style.pageLink">テストページ</NuxtLink>
    </div>
    <hr />
    <p :class="$style.contentsTitle">component</p>
    <div :class="$style.componentWrap">
      <ListButton />
      <CharacterCircle
        :character-name="characterName"
        :class="$style.characterCircle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageTransitionState } from '@/extentions/pageTransitionState'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ScaleTransition from '@/components/atoms/transitions/ScaleTransition.vue'
import ListButton from '../components/atoms/listButton.vue'
import CharacterCircle from '../components/atoms/characterCircle.vue'

type Data = {
  characterName: string
}

export default Vue.extend({
  components: {
    ListButton,
    CharacterCircle,
    ScaleTransition,
  },
  data(): Data {
    return {
      characterName: 'せいかく',
    }
  },
  computed: {
    isExiting() {
      return (
        this.$store.state.pageTransitionState === PageTransitionState.EXITING
      )
    },
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, undefined)
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

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
  color: $dark-base-color;
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
  background-color: $secondary-color;
  color: #fff;
}
hr {
  margin: 50px 0;
}
.componentWrap {
  display: flex;
  flex-direction: column;
}
.characterCircle {
  margin: 0 auto;
}
.scaleEnterActive {
  transition: transform 0.6s cubic-bezier(0.89, -0.11, 0.07, 1.4);
}
.scaleLeaveActive {
  transition: transform 0.6s cubic-bezier(0.77, -0.595, 0.6, 1.025);
}
.scaleEnter,
.scaleLeaveTo {
  transform: scale(0);
}
</style>
