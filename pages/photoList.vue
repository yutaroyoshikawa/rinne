<template>
  <div :class="$style.wrap">
    <button :class="$style.clearButton" @click="storeClear">
      localstorage clear
    </button>
    <div :class="$style.numberWrap">
      <p>{{ $store.state.photoStore.count }}/５件</p>
    </div>
    <div :class="$style.imageWraps">
      <div
        v-for="(imageSrc, index) in $store.state.photoStore.imageSrcs"
        :key="index"
        :class="[$style.imageWrap]"
      >
        <img :src="imageSrc" alt="image" />
      </div>
    </div>
    <div @click="openTab">
      <AddButton
        v-if="$store.state.photoStore.count < 5"
        :class="$style.addButton"
      />
    </div>

    <portal to="tab">
      <CameraRool />
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE, OPEN_TAB } from '@/store/index'
import CameraRool from '@/components/organisms/cameraRool.vue'
import AddButton from '@/components/atoms/addButton.vue'

export default Vue.extend({
  name: 'PhotoList',
  components: {
    AddButton,
    CameraRool,
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'いちらん')
  },
  methods: {
    storeClear() {
      localStorage.clear()
    },
    openTab() {
      this.$store.commit(OPEN_TAB, 'カメラロール')
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.wrap {
  padding-bottom: 20px;
  height: 100%;
}
.wrapPadding {
  padding-bottom: 70px;
}
.numberWrap {
  text-align: center;
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
  background: $secondary-color;
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
.clearButton {
  width: 50%;
  height: 50px;
  border-radius: 30px;
  display: block;
  margin: 0 auto;
  background-color: pink;
  text-align: center;
}
</style>
