<template>
  <ListTransition :class-name="$style.imageWraps">
    <div
      v-for="(item, index) in renderList"
      :key="index"
      :style="{
        '--enterDelay': `${50 * index}ms`,
        '--leaveDelay': `${50 * (renderList.length - index)}ms`,
        '--duration': `${400}ms`,
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
      const pageTransitionState = (this.$store as any).state.pageTransitionState
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
</style>
