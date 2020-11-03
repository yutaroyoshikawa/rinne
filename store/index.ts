import { MutationTree, ActionTree } from 'vuex'
import { PageTransitionState } from '@/extentions/pageTransitionState'

export type RootState = {
  headerTitle?: string
  pageTransitionState: PageTransitionState | null
  isOpenTab: boolean
}

// Mutations
const SET_HEADER_TITLE = 'SET_HEADER_TITLE'
const SET_PAGE_TRANSITION_STATE = 'SET_PAGE_TRANSITION_STATE'
export const SET_IS_OPEN_TAB = 'SET_IS_OPEN_TAB'

// Actions
export const CHANGE_HEADER_TITLE = 'CHANGE_HEADER_TITLE'
export const CHANGE_PAGE_TRANSITION_STATE = 'CHANGE_PAGE_TRANSITION_STATE'

export const state = (): RootState => ({
  headerTitle: '',
  pageTransitionState: null,
  isOpenTab: false,
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
  [SET_IS_OPEN_TAB](state, payload: RootState['isOpenTab']) {
    state.isOpenTab = payload
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
