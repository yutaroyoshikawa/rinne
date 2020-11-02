import { MutationTree, ActionTree } from 'vuex'

export type RootState = {
  headerTitle?: string
}

// Mutations
const SET_HEADER_TITLE = 'SET_HEADER_TITLE'

// Actions
export const CHANGE_HEADER_TITLE = 'CHANGE_HEADER_TITLE'

export const state = (): RootState => ({
  headerTitle: '',
})

export const mutations: MutationTree<RootState> = {
  [SET_HEADER_TITLE]: (state, payload: RootState['headerTitle']) => {
    state.headerTitle = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  [CHANGE_HEADER_TITLE]: ({ commit }, newTitle: RootState['headerTitle']) => {
    commit(SET_HEADER_TITLE, newTitle)
  },
}
