<template>
  <div :class="[$style.wrap]">
    <div :class="$style.imageWraps">
      <div
        v-for="(imageDatum, index) in imageData"
        :key="index"
        :class="[$style.imageWrap]"
      >
        <img :src="imageDatum.url" alt="image" />
      </div>
    </div>
    <AddButton :class="$style.addButton" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import AddButton from '../components/atoms/addButton.vue'

type Data = {
  imageData: {
    url: string
  }[]
}

export default Vue.extend({
  name: 'PhotoList',
  components: {
    AddButton,
  },
  data(): Data {
    return {
      imageData: [
        { url: '/img/sample1.jpg' },
        { url: '/img/sample2.jpg' },
        { url: '/img/sample3.jpg' },
        { url: '/img/sample1.jpg' },
        { url: '/img/sample2.jpg' },
        { url: '/img/sample3.jpg' },
        { url: '/img/sample1.jpg' },
        { url: '/img/sample2.jpg' },
        { url: '/img/sample3.jpg' },
        { url: '/img/sample1.jpg' },
        { url: '/img/sample2.jpg' },
        { url: '/img/sample3.jpg' },
      ],
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'いちらん')
  },
})
</script>

<style module lang="scss">
.wrap {
  background-color: #f3ebd8;
  padding-bottom: 20px;
}
.wrapPadding {
  padding-bottom: 70px;
}
.imageWraps {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.imageWrap {
  float: left;
  width: 140px;
  height: 140px;
  background: #f6c521;
  margin-top: 20px;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.addButton {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
