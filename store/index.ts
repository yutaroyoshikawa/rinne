import { MutationTree, ActionTree } from 'vuex'
import { PageTransitionState } from '@/extentions/pageTransitionState'

export type RootState = {
  headerTitle?: string
  tabTitle: string
  pageTransitionState: PageTransitionState | null
  isOpenTab: boolean
  developMode: boolean
  closeSplash: boolean
}

// Mutations
const SET_HEADER_TITLE = 'SET_HEADER_TITLE'
const SET_PAGE_TRANSITION_STATE = 'SET_PAGE_TRANSITION_STATE'
export const OPEN_TAB = 'OPEN_TAB'
export const CLOSE_TAB = 'CLOSE_TAB'
export const ENABLE_DEVELOP_MODE = 'ENABLE_DEVELOP_MODE'
export const CLOSE_SPLASH = 'CLOSE_SPLASH'

// Actions
export const CHANGE_HEADER_TITLE = 'CHANGE_HEADER_TITLE'
export const CHANGE_PAGE_TRANSITION_STATE = 'CHANGE_PAGE_TRANSITION_STATE'

export const state = (): RootState => ({
  headerTitle: '',
  tabTitle: '',
  pageTransitionState: null,
  isOpenTab: false,
  developMode: false,
  closeSplash: false,
})

export const mutations: MutationTree<RootState> = {
  [SET_HEADER_TITLE](state, payload: RootState['headerTitle']) {
    state.headerTitle = payload
  },
  [SET_PAGE_TRANSITION_STATE](
    state,
    payload: RootState['pageTransitionState']
  ) {
    state.pageTransitionState = payload
  },
  [OPEN_TAB](state, payload: RootState['tabTitle']) {
    state.tabTitle = payload
    state.isOpenTab = true
  },
  [CLOSE_TAB](state) {
    state.isOpenTab = false
  },
  [ENABLE_DEVELOP_MODE](state) {
    state.developMode = true
  },
  [CLOSE_SPLASH](state) {
    state.closeSplash = true
  },
}

export const actions: ActionTree<RootState, RootState> = {
  [CHANGE_HEADER_TITLE]({ commit }, newTitle: RootState['headerTitle']) {
    commit(SET_HEADER_TITLE, newTitle)
  },
  [CHANGE_PAGE_TRANSITION_STATE](
    { commit },
    transitionState: PageTransitionState
  ) {
    commit(SET_PAGE_TRANSITION_STATE, transitionState)
  },
}
