<template>
  <div :class="$style.wrap">
    <div
      v-for="(dollDatum, key) in dollData"
      :key="key"
      :class="$style.friendWrap"
    >
      <characterImageCircle :image-src="dollDatum.image" />
      <div :class="$style.textWrap">
        <ProfileText
          :doll-name="dollDatum.dollName"
          :user-name="dollDatum.userName"
        />
      </div>
      <div
        :class="{
          [$style.separator]: true,
          [$style.none]: key >= 2,
        }"
      >
        <Separator />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ProfileText from '@/components/atoms/profileText.vue'
import CharacterImageCircle from '@/components/atoms/characterImageCircle.vue'
import Separator from '@/components/atoms/separator.vue'

interface dollDatum {
  image: String
  dollName: String
  userName: String
}

type Data = {
  dollData: Array<dollDatum>
}

export default Vue.extend({
  name: 'Cleanliness',
  components: {
    ProfileText,
    CharacterImageCircle,
    Separator,
  },
  data(): Data {
    return {
      dollData: [
        {
          image: '/img/koji.jpg',
          userName: 'かえで',
          dollName: 'こじ',
        },
        {
          image: '/img/usa.jpg',
          userName: 'ゆい',
          dollName: 'うさ',
        },
        {
          image: '/img/baku.jpg',
          userName: 'まさる',
          dollName: 'バクくん',
        },
      ],
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'おともだち')
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.wrap {
  padding-bottom: 20px;
  width: 100%;
  height: 40%;
  display: grid;
  align-items: center;
  justify-content: center;
}
.friendWrap {
  margin-top: 30px;
  text-align: center;
}
.textWrap {
  margin-top: 20px;
}
.separator {
  margin-top: 20px;
}
.none {
  display: none;
}
</style>
