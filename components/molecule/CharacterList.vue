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
import { GET_MAX_PERSONALITY } from '@/store/photoStore'
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
          key: 'naughty',
        },
        {
          label: 'なつっこい',
          key: 'affable',
        },
      ],
    }
  },
  computed: {
    ...mapState('photoStore', ['personality']),
    ...mapGetters('photoStore', [GET_MAX_PERSONALITY]),
    renderList(): Data['characters'] {
      const pageTransitionState = this.$store.state.pageTransitionState
      if (
        pageTransitionState === PageTransitionState.EXITING ||
        pageTransitionState === PageTransitionState.ENTERING
      ) {
        return []
      }
      return this.characters
    },
    characterScore(): Personality {
      const maxItemKey = this[GET_MAX_PERSONALITY] as PersonalityItem
      const maxItemPersonality = (this.personality as Personality)[maxItemKey]
      const personality = this.personality as Personality

      const score = {
        wise: (personality.wise / maxItemPersonality) * 100,
        easygoing: (personality.easygoing / maxItemPersonality) * 100,
        naughty: (personality.naughty / maxItemPersonality) * 100,
        energetic: (personality.energetic / maxItemPersonality) * 100,
        kindness: (personality.kindness / maxItemPersonality) * 100,
        affable: (personality.affable / maxItemPersonality) * 100,
      }

      return score
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
