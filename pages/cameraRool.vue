<template>
  <div :class="$style.wrap">
    <div
      v-for="(imageDatum, index) in imageData"
      :key="index"
      :class="{ [$style.imageWrap]: true, [$style.active]: isSelected(index) }"
    >
      <fa
        v-if="isSelected(index)"
        :icon="['fa', 'check-circle']"
        :class="$style.selectedIcon"
      />
      <img :src="imageDatum.url" alt="image" @click="onImageSelect(index)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
        { url: '/img/sample1.jpg' },
        { url: '/img/sample2.jpg' },
        { url: '/img/sample3.jpg' },
        { url: '/img/sample1.jpg' },
      ],
      selectedIndexes: [],
    }
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
  },
})
</script>

<style module lang="scss">
.wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #f3ebd8;
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
</style>
