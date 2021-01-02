<template>
  <div :class="$style.wrap">
    <div :class="$style.imageWraps">
      <div
        v-for="(item, index) in imageData"
        :key="index"
        :class="[$style.imageWrap, { [$style.active]: isSelected(item.url) }]"
        @click="onImageSelect(item.url)"
      >
        <transition
          :enter-class="$style.enter"
          :enter-to-class="$style.enterTo"
          :leave-class="$style.leave"
          :leave-to-class="$style.leaveTo"
          :enter-active-class="$style.enterActive"
          :leave-active-class="$style.leaveActive"
        >
          <fa
            v-if="isSelected(item.url)"
            :icon="['fa', 'check-circle']"
            :class="$style.selectedIcon"
          />
        </transition>
        <div :class="$style.image">
          <PhotoListImage :src="item.url" :name="item.name" />
        </div>
      </div>
    </div>
    <div :class="$style.footer">
      <div :class="$style.footerMessageWrap">
        <p
          v-if="selectableNumber - selectedSrcs.length > 0"
          :class="$style.footerMessage"
        >
          あと<span>{{ selectableNumber - selectedSrcs.length }}枚</span
          >選択できます
        </p>
        <p v-else :class="$style.footerMessage">これ以上選択できません</p>
      </div>
      <div :class="$style.functions">
        <div :class="$style.innerFunctions">
          <button :class="$style.clearButton" @click="clear">クリア</button>
          <button
            :class="$style.addButton"
            :disabled="selectedSrcs.length === 0"
            @click="addImages"
          >
            ついか
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CLOSE_TAB } from '@/store/index'
import { PhotoStore } from '@/store/photoStore'
import personalityData from '@/assets/personality.json'
import PhotoListImage from '@/components/atoms/PhotoListImage.vue'

type Data = {
  imageData: {
    url: string
    name: string
  }[]
  selectedSrcs: string[]
  count: number
}

export default Vue.extend({
  name: 'CameraRool',
  components: {
    PhotoListImage,
  },
  data(): Data {
    const imageData: Data['imageData'] = personalityData.map(
      ({ fileName, name }) => ({
        url: fileName,
        name,
      })
    )

    return {
      imageData,
      selectedSrcs: [],
      count: 0,
    }
  },
  computed: {
    selectableNumber(): number {
      const albamImageCount = Object.keys(
        (this.$store.state.photoStore as PhotoStore).albamPositions
      ).length
      return 5 - albamImageCount
    },
  },
  methods: {
    isSelected(src: string) {
      return this.selectedSrcs.includes(src)
    },
    onImageSelect(imageSrc: string) {
      if (this.isSelected(imageSrc)) {
        this.selectedSrcs = this.selectedSrcs.filter((src) => {
          return src !== imageSrc
        })
      } else {
        if (this.selectableNumber - this.selectedSrcs.length === 0) {
          return
        }
        this.selectedSrcs.push(imageSrc)
      }
    },
    clear() {
      this.selectedSrcs = []
    },
    addImages() {
      this.$store.commit('photoStore/ADD_IMAGES', this.selectedSrcs)
      this.$store.commit(CLOSE_TAB)
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.wrap {
  background-color: $base-color;
  padding: 40px 0 159px 0;
}
.imageWraps {
  display: grid;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 16px;
  justify-items: center;
  align-items: center;
}
.imageWrap {
  width: 140px;
  height: 140px;
  background: $secondary-color;
  position: relative;
  box-sizing: border-box;
  transition: padding 0.1s linear;
}
.image {
  width: 100%;
  height: 100%;
}
.active {
  width: 140px;
  height: 140px;
  padding: 5px;
}
.selectedIcon {
  position: absolute;
  z-index: 20;
  top: 10px;
  left: 10px;
  font-size: 25px;
  color: $secondary-color;
  background-color: #fff;
  border-radius: 50%;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}
.footerMessageWrap {
  width: 100%;
  height: 29px;
  background-color: rgba(230, 230, 230, 0.9);
  display: flex;
  align-items: center;
}
.footerMessage {
  width: 100%;
  text-align: center;
  color: $primary-color;
  font-size: 14px;

  & > span {
    color: $dark-base-color;
    font-size: 17px;
    padding: 0 5px;
  }
}
.functions {
  width: 100%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
.innerFunctions {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.clearButton {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  color: $dark-base-color;
  border: 1px solid $dark-base-color;
  background-color: rgba(255, 255, 255, 0.7);
}
.addButton {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  color: $base-color;
  background-color: $primary-color;
  border: none;

  &:disabled {
    transition: filter 0.2s ease;
    filter: grayscale(100%);
  }
}

.enter {
  transform: scale(0) rotate(180deg);
}

.enterTo {
  transform: scale(1);
}

.leave {
  transform: scale(1);
}

.leaveTo {
  transform: scale(0) rotate(180deg);
}

.enterActive {
  transition: transform cubic-bezier(0.89, -0.11, 0.07, 1.4);
  transition-duration: 0.3s;
}

.leaveActive {
  transition: transform cubic-bezier(1, -0.46, 0.065, 1.005);
  transition-duration: 0.3s;
}
</style>
