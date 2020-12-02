import { MutationTree, ActionTree } from 'vuex'
import { RootState } from './'

type ArStore = {
  isLoadedAframe: boolean
  presenMode: boolean
  talkResponseText?: String
  isLoadingTalkResponseText: boolean
}

export const LOADEDND_AFRAME = 'LOADEDND_AFRAME'
export const SET_TALK_RESPONSE = 'SET_TALK_RESPONSE'
export const SET_IS_LOADING_TALK_RESPONSE_TEXT =
  'SET_IS_LOADING_TALK_RESPONSE_TEXT'

export const ENABLE_PRESEN_MODE = 'ENABLE_PRESEN_MODE'

export const REQUEST_TALK_TEXT = 'REQUEST_TALK_TEXT'

export const state = (): ArStore => ({
  isLoadedAframe: false,
  talkResponseText: undefined,
  isLoadingTalkResponseText: false,
  presenMode: false,
})

export const mutations: MutationTree<ArStore> = {
  [LOADEDND_AFRAME](state) {
    state.isLoadedAframe = true
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
  [ENABLE_PRESEN_MODE](state) {
    state.presenMode = true
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
        } else {
          commit(SET_TALK_RESPONSE, '何を言ってるのかわからないよ')
        }
        commit(SET_IS_LOADING_TALK_RESPONSE_TEXT, false)
      }, 3000)
    }
  },
}
