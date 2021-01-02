import { MutationTree, GetterTree } from 'vuex'
import personality from '@/assets/personality.json'
import { Personality, PersonalityItem } from '@/extentions/personality'
import { RootState } from '.'

export type PhotoStore = {
  personality: Personality
  albamPositions: {
    [key: string]:
      | {
          position: [number, number]
          value: string
        }
      | undefined
  }
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

const getAlbamPositions: (
  imageSrcs: string[],
  currentPositions?: PhotoStore['albamPositions']
) => PhotoStore['albamPositions'] = (imageSrcs, currentPositions = {}) => {
  const calcedPositions = Object.assign({}, currentPositions)
  imageSrcs.forEach((src) => {
    if (!('2,2' in calcedPositions)) {
      calcedPositions['2,2'] = {
        position: [2, 2],
        value: src,
      }
    } else if (!('0,1' in calcedPositions)) {
      calcedPositions['0,1'] = {
        position: [1, 0],
        value: src,
      }
    } else if (!('0,3' in calcedPositions)) {
      calcedPositions['0,3'] = {
        position: [3, 0],
        value: src,
      }
    } else {
      while (true) {
        const columnPosition = Math.floor(Math.random() * 5)
        const rowPosition = Math.floor(Math.random() * 4)

        if (
          !(`${rowPosition},${columnPosition}` in calcedPositions) ||
          [columnPosition, rowPosition] !== [2, 0] ||
          [columnPosition, rowPosition] !== [2, 1]
        ) {
          calcedPositions[`${rowPosition},${columnPosition}`] = {
            position: [columnPosition, rowPosition],
            value: src,
          }
          break
        }
      }
    }
  })
  return calcedPositions
}

export const state = (): PhotoStore => {
  const imageSrcs = ['3.jpg', '4.jpg', '10.jpg']
  const personalitySum = getPersonalitySum(imageSrcs)
  const albamPositions = getAlbamPositions(imageSrcs)

  return {
    personality: personalitySum,
    albamPositions,
  }
}

export const mutations: MutationTree<PhotoStore> = {
  [ADD_IMAGES](state, imageSrcs: string[]) {
    const personalitySum = getPersonalitySum(imageSrcs, state.personality)
    const calcedPositions = getAlbamPositions(imageSrcs, state.albamPositions)
    state.personality = personalitySum
    state.albamPositions = calcedPositions
  },
  [REMOVE_IMAGE](state, albamPosition: [number, number]) {
    const currentPersonality = Object.assign({}, state.personality)
    const selectedAlbamImage =
      state.albamPositions[`${albamPosition[0]},${albamPosition[1]}`]
    if (!selectedAlbamImage) {
      return
    }
    if (!selectedAlbamImage) {
      return
    }
    const selectedPersonality = personality.find(
      (item) => item.fileName === selectedAlbamImage.value
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
    state.albamPositions[`${albamPosition[0]},${albamPosition[1]}`] = undefined
  },
}

export const GET_MAX_PERSONALITY = 'GET_MAX_PERSONALITY'

export const getters: GetterTree<PhotoStore, RootState> = {
  [GET_MAX_PERSONALITY](state): PersonalityItem {
    let maxItem: PersonalityItem = 'wise'
    const personality = state.personality

    if (personality[maxItem] < personality.easygoing) {
      maxItem = 'easygoing'
    }

    if (personality[maxItem] < personality.naughty) {
      maxItem = 'naughty'
    }

    if (personality[maxItem] < personality.energetic) {
      maxItem = 'energetic'
    }

    if (personality[maxItem] < personality.kindness) {
      maxItem = 'kindness'
    }

    if (personality[maxItem] < personality.affable) {
      maxItem = 'affable'
    }

    return maxItem
  },
}
