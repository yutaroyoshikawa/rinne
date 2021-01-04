<template>
  <div :class="$style.wrap">
    <template v-if="developMode">
      <button :class="$style.clearButton" @click="storeClear">
        localstorage clear
      </button>
      <div :class="$style.numberWrap">
        <p>{{ albamImageCount }}/9件</p>
      </div>
    </template>

    <AlbumList />
    <div :class="$style.addButton" @click="openTab">
      <AddButton v-if="albamImageCount < 9" />
    </div>

    <portal to="tab">
      <CameraRool />
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { CHANGE_HEADER_TITLE, OPEN_TAB } from '@/store/index'
import { PhotoStore } from '@/store/photoStore'
import CameraRool from '@/components/organisms/cameraRool.vue'
import AddButton from '@/components/atoms/addButton.vue'
import AlbumList from '@/components/molecule/AlbumList.vue'

export default Vue.extend({
  name: 'PhotoList',
  components: {
    AddButton,
    CameraRool,
    AlbumList,
  },
  computed: {
    ...mapState(['developMode']),
    albamImageCount(): number {
      return Object.keys(
        (this.$store.state.photoStore as PhotoStore).albamPositions
      ).length
    },
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
  padding: 40px 0 170px;
  height: 100%;
}
.numberWrap {
  text-align: center;
}
.addButton {
  position: fixed;
  z-index: $add-button-zindex;
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
