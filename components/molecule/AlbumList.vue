<template>
  <ListTransition :class-name="$style.imageWraps">
    <div
      v-for="(item, index) in renderList"
      :key="index"
      :class="$style.imageWrap"
      :style="{
        '--enterDelay': `${50 * index}ms`,
        '--leaveDelay': `${50 * (renderList.length - index - 1)}ms`,
        '--duration': `${600 - renderList.length * 50}ms`,
      }"
    >
      <PhotoListImage :src="item" />
    </div>
  </ListTransition>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageTransitionState } from '@/extentions/pageTransitionState'
import PhotoListImage from '@/components/atoms/PhotoListImage.vue'
import ListTransition from '@/components/atoms/transitions/ListTransition.vue'

export default Vue.extend({
  name: 'AlbumList',
  components: {
    PhotoListImage,
    ListTransition,
  },
  computed: {
    renderList(): string[] {
      const pageTransitionState = this.$store.state.pageTransitionState
      if (
        pageTransitionState === PageTransitionState.EXITING ||
        pageTransitionState === PageTransitionState.ENTERING
      ) {
        return []
      }
      return this.$store.state.photoStore.imageSrcs
    },
  },
})
</script>

<style lang="scss" module>
.imageWraps {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.imageWrap {
  width: 140px;
  height: 140px;
}
</style>
