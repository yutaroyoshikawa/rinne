import { MutationTree, ActionTree } from 'vuex'
import { RootState } from './'

type ArStore = {
  isLoadedAframe: boolean
  isPausedAr: boolean
  arMode?: 'presen' | 'nomal'
  talkResponseText?: String
  isLoadingTalkResponseText: boolean
}

export const LOADEDND_AFRAME = 'LOADEDND_AFRAME'
export const SET_TALK_RESPONSE = 'SET_TALK_RESPONSE'
export const SET_IS_LOADING_TALK_RESPONSE_TEXT =
  'SET_IS_LOADING_TALK_RESPONSE_TEXT'

export const PAUSE_AR = 'PAUSE_AR'
export const PLAY_AR = 'PLAY_AR'

export const ENABLE_PRESEN_MODE = 'ENABLE_PRESEN_MODE'
export const ENABLE_NOMAL_MODE = 'ENABLE_NOMAL_MODE'

export const REQUEST_TALK_TEXT = 'REQUEST_TALK_TEXT'

export const state = (): ArStore => ({
  isLoadedAframe: false,
  isPausedAr: false,
  talkResponseText: undefined,
  isLoadingTalkResponseText: false,
  arMode: undefined,
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
    state.arMode = 'presen'
  },
  [ENABLE_NOMAL_MODE](state) {
    state.arMode = 'nomal'
  },
  [PAUSE_AR](state) {
    state.isPausedAr = true
  },
  [PLAY_AR](state) {
    state.isPausedAr = false
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
