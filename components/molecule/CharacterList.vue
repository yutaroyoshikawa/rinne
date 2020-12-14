<template>
  <ListTransition :class-name="$style.charactersWrap">
    <div
      v-for="(item, index) in renderList"
      :key="index"
      :style="{
        '--enterDelay': `${50 * index}ms`,
        '--leaveDelay': `${30 * (5 - index)}ms`,
        '--duration': `${600 - 6 * 50}ms`,
      }"
    >
      <CharacterCircle
        :character-name="item.label"
        :score="characterScore[item.key]"
        :class="$style.characterWrap"
      />
    </div>
  </ListTransition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import { Personality, PersonalityItem } from '@/extentions/personality'
import { PageTransitionState } from '@/extentions/pageTransitionState'
import ListTransition from '@/components/atoms/transitions/ListTransition.vue'
import CharacterCircle from '@/components/atoms/characterCircle.vue'

type Data = {
  characters: {
    label: string
    key: PersonalityItem
  }[]
}

export default Vue.extend({
  name: 'CharacterList',
  components: {
    CharacterCircle,
    ListTransition,
  },
  data(): Data {
    return {
      characters: [
        {
          label: 'げんき',
          key: 'energetic',
        },
        {
          label: 'やさしい',
          key: 'kindness',
        },
        {
          label: 'かしこい',
          key: 'wise',
        },
        {
          label: 'おっとり',
          key: 'easygoing',
        },
        {
          label: 'やんちゃ',
          key: 'affable',
        },
        {
          label: 'なつっこい',
          key: 'naughty',
        },
      ],
    }
  },
  computed: {
    ...mapState('photoStore', ['personality']),
    ...mapGetters('photoStore', ['getMaxPersonality']),
    renderList(): Data['characters'] {
      const pageTransitionState = (this.$store as any).state.pageTransitionState
      if (
        pageTransitionState === PageTransitionState.EXITING ||
        pageTransitionState === PageTransitionState.ENTERING
      ) {
        return []
      }
      return this.characters
    },
    characterScore(): Personality {
      const maxItemKey = this.getMaxPersonality as PersonalityItem
      const maxItemPersonality = (this.personality as Personality)[maxItemKey]
      const personality = this.personality as Personality

      return {
        wise: personality.wise / maxItemPersonality,
        easygoing: personality.easygoing / maxItemPersonality,
        naughty: personality.naughty / maxItemPersonality,
        energetic: personality.energetic / maxItemPersonality,
        kindness: personality.kindness / maxItemPersonality,
        affable: personality.affable / maxItemPersonality,
      }
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
