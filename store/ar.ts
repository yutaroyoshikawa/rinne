import { MutationTree, ActionTree } from 'vuex'
import { RootState } from './'

type ArStore = {
  isLoadedPresentationAframe: boolean
  isLoadedIndexAframe: boolean
  talkResponseText?: String
  isLoadingTalkResponseText: boolean
}

export const LOADEDND_PRESENTATION_AFRAME = 'LOADEDND_PRESENTATION_AFRAME'
export const LOADEDND_INDEX_AFRAME = 'LOADEDND_INDEX_AFRAME'
export const SET_TALK_RESPONSE = 'SET_TALK_RESPONSE'
export const SET_IS_LOADING_TALK_RESPONSE_TEXT =
  'SET_IS_LOADING_TALK_RESPONSE_TEXT'

export const REQUEST_TALK_TEXT = 'REQUEST_TALK_TEXT'

export const state = (): ArStore => ({
  isLoadedIndexAframe: false,
  isLoadedPresentationAframe: false,
  talkResponseText: undefined,
  isLoadingTalkResponseText: false,
})

export const mutations: MutationTree<ArStore> = {
  [LOADEDND_PRESENTATION_AFRAME](state) {
    state.isLoadedPresentationAframe = true
  },
  [LOADEDND_INDEX_AFRAME](state) {
    state.isLoadedIndexAframe = true
  },
  [SET_TALK_RESPONSE](state, payload: ArStore['talkResponseText']) {
    state.talkResponseText = payload
  },
  [SET_IS_LOADING_TALK_RESPONSE_TEXT](
    state,
    payload: ArStore['isLoadingTalkResponseText']
  ) {
    state.isLoadingTalkResponseText = payload
  },
}

export const actions: ActionTree<ArStore, RootState> = {
  [REQUEST_TALK_TEXT]({ commit }, talkText: ArStore['talkResponseText']) {
    if (talkText) {
      commit(SET_IS_LOADING_TALK_RESPONSE_TEXT, true)
      setTimeout(() => {
        if (talkText.includes('おはよう')) {
          const resTalkText = 'おはよう！！'
          commit(SET_TALK_RESPONSE, resTalkText)
        }
        commit(SET_IS_LOADING_TALK_RESPONSE_TEXT, false)
      }, 3000)
    }
  },
}
