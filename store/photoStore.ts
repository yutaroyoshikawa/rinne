import { MutationTree, GetterTree } from 'vuex'
import personality from '@/assets/personality.json'
import { RootState } from '.'

type Personality = {
  wise: number
  easygoing: number
  naughty: number
  energetic: number
  kindness: number
  affable: number
}

type PhotoStore = {
  imageSrcs: string[]
  count: number
  personality: Personality
}

// Mutations
const ADD_IMAGES = 'ADD_IMAGES'
export const REMOVE_IMAGE = 'REMOVE_IMAGE'

const getPersonalitySum: (
  imageSrcs: string[],
  currentPersonality?: Personality
) => Personality = (
  imageSrcs,
  currentPersonality = {
    wise: 0,
    easygoing: 0,
    naughty: 0,
    energetic: 0,
    kindness: 0,
    affable: 0,
  }
) => {
  const calcedPersonality = Object.assign({}, currentPersonality)
  imageSrcs.forEach((src) => {
    const selectedPersonality = personality.find(
      (item) => item.fileName === src
    )
    if (selectedPersonality) {
      calcedPersonality.wise += selectedPersonality.personality.wise
      calcedPersonality.easygoing += selectedPersonality.personality.easygoing
      calcedPersonality.naughty += selectedPersonality.personality.naughty
      calcedPersonality.energetic += selectedPersonality.personality.energetic
      calcedPersonality.kindness += selectedPersonality.personality.kindness
      calcedPersonality.affable += selectedPersonality.personality.affable
    }
  })
  return calcedPersonality
}

export const state = (): PhotoStore => {
  const imageSrcs = ['0.jpg', '1.jpg', '2.jpg']
  const personalitySum = getPersonalitySum(imageSrcs)

  return {
    imageSrcs,
    count: 3,
    personality: personalitySum,
  }
}

export const mutations: MutationTree<PhotoStore> = {
  [ADD_IMAGES](state, imageSrcs: string[]) {
    state.imageSrcs = state.imageSrcs.concat(imageSrcs)
    state.count = state.imageSrcs.length
    const personalitySum = getPersonalitySum(imageSrcs, state.personality)
    state.personality = personalitySum
  },
  [REMOVE_IMAGE](state, imageIndex: number) {
    state.imageSrcs = state.imageSrcs.filter(
      (_imageSrc, index) => index !== imageIndex
    )
    state.count = state.imageSrcs.length

    const currentPersonality = Object.assign({}, state.personality)
    const selectedPersonality = personality.find(
      (item) => item.fileName === state.imageSrcs[imageIndex]
    )
    if (selectedPersonality) {
      currentPersonality.wise -= selectedPersonality.personality.wise
      currentPersonality.easygoing -= selectedPersonality.personality.easygoing
      currentPersonality.naughty -= selectedPersonality.personality.naughty
      currentPersonality.energetic -= selectedPersonality.personality.energetic
      currentPersonality.kindness -= selectedPersonality.personality.kindness
      currentPersonality.affable -= selectedPersonality.personality.affable
    }
    state.personality = currentPersonality
  },
}
export const getters: GetterTree<PhotoStore, RootState> = {
  GetImageCount(state) {
    mutations.IMAGES_COUNT(state)
    return state.count
  },
}
