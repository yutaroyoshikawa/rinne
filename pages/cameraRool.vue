<template>
  <div
    :class="{
      [$style.wrap]: true,
      [$style.wrapPadding]: selectedIndexes.length,
    }"
  >
    <div :class="$style.imageWraps">
      <div
        v-for="(imageDatum, index) in imageData"
        :key="index"
        :class="{
          [$style.imageWrap]: true,
          [$style.active]: isSelected(index),
        }"
      >
        <fa
          v-if="isSelected(index)"
          :icon="['fa', 'check-circle']"
          :class="$style.selectedIcon"
        />
        <img :src="imageDatum.url" alt="image" @click="onImageSelect(index)" />
      </div>
    </div>
    <div v-if="selectedIndexes.length" :class="$style.functions">
      <div :class="$style.innerFunctions">
        <button :class="$style.clearButton" @click="clear">クリア</button>
        <button :class="$style.addButton" @click="addImages">ついか</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'

type Data = {
  imageData: {
    url: string
  }[]
  selectedIndexes: number[]
}

export default Vue.extend({
  name: 'CameraRool',
  data(): Data {
    return {
      imageData: [
        { url: '/img/0.jpg' },
        { url: '/img/1.jpg' },
        { url: '/img/2.jpg' },
      ],
      selectedIndexes: [],
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'カメラロール')
  },
  methods: {
    isSelected(index: number) {
      return this.selectedIndexes.includes(index)
    },
    onImageSelect(imageIndex: number) {
      if (this.isSelected(imageIndex)) {
        this.selectedIndexes = this.selectedIndexes.filter((selectedIndex) => {
          return selectedIndex !== imageIndex
        })
      } else {
        this.selectedIndexes.push(imageIndex)
      }
    },
    imageCss(imageIndex: number) {
      const classes = ['$style.image_wrap']
      if (this.isSelected(imageIndex)) {
        classes.push('$style.active')
      }
      return classes
    },
    clear() {
      this.selectedIndexes = []
    },
    addImages() {
      this.$store.commit('photoStore/ADD_IMAGES', this.selectedIndexes)
      this.$router.push('/photolist')
    },
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
.active {
  width: 140px;
  height: 140px;
  padding: 5px;
}
.selectedIcon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 25px;
  color: #f6c521;
  background-color: #fff;
  border-radius: 50%;
}
.functions {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
}
.innerFunctions {
  width: 90%;
  margin: 10px auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.clearButton {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  color: #3c230d;
  border: 1px solid #3c230d;
  background-color: rgba(255, 255, 255, 0.7);
}
.addButton {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  color: #f3ebd8;
  background-color: #929d49;
  border: none;
}
</style>
