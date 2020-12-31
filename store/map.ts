import { MutationTree } from 'vuex'

type MapStore = {
  isLoadedMap: boolean
}

export const LOADEDND_MAP = 'LOADEDND_MAP'

export const state = (): MapStore => ({
  isLoadedMap: false,
})

export const mutations: MutationTree<MapStore> = {
  [LOADEDND_MAP](state) {
    state.isLoadedMap = true
  },
}
