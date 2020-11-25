<template>
  <ListTransition :class-name="$style.charactersWrap">
    <div
      v-for="(item, index) in renderList"
      :key="index"
      :style="{
        '--enterDelay': `${50 * index}ms`,
        '--leaveDelay': `${50 * (5 - index)}ms`,
        '--duration': `${600 - 6 * 50}ms`,
      }"
    >
      <CharacterCircle :character-name="item" :class="$style.characterWrap" />
    </div>
  </ListTransition>
</template>

<script lang="ts">
import Vue from 'vue'
import { PageTransitionState } from '@/extentions/pageTransitionState'
import ListTransition from '@/components/atoms/transitions/ListTransition.vue'
import CharacterCircle from '@/components/atoms/characterCircle.vue'

export default Vue.extend({
  name: 'CharacterList',
  components: {
    CharacterCircle,
    ListTransition,
  },
  data() {
    return {
      characterNames: [
        'げんき',
        'やさしい',
        'かしこい',
        'おっとり',
        'やんちゃ',
        'なつっこい',
      ],
    }
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
      return this.characterNames
    },
  },
})
</script>

<style lang="scss" module>
.charactersWrap {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.characterWrap {
  width: 80px;
  height: 80px;
  margin: 0 10px 10px 0;
}
</style>
