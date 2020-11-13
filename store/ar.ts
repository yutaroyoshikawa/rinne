import { MutationTree } from 'vuex'

type ArStore = {
  isLoadedPresentationAframe: boolean
  isLoadedIndexAframe: boolean
}

export const LOADEDND_PRESENTATION_AFRAME = 'LOADEDND_PRESENTATION_AFRAME'
export const LOADEDND_INDEX_AFRAME = 'LOADEDND_INDEX_AFRAME'

export const state = (): ArStore => ({
  isLoadedIndexAframe: false,
  isLoadedPresentationAframe: false,
})

export const mutations: MutationTree<ArStore> = {
  [LOADEDND_PRESENTATION_AFRAME](state) {
    state.isLoadedPresentationAframe = true
  },
  [LOADEDND_INDEX_AFRAME](state) {
    state.isLoadedIndexAframe = true
  },
}
