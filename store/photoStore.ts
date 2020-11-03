import { MutationTree, GetterTree } from 'vuex'
import { RootState } from '.'

type PhotoStore = {
  imageSrcs: string[]
  count: number
}

// Mutations
const ADD_IMAGES = 'ADD_IMAGES'
const IMAGES_COUNT = 'IMAGES_COUNT'

export const state = (): PhotoStore => ({
  imageSrcs: ['/img/0.jpg', '/img/1.jpg', '/img/2.jpg'],
  count: 3,
})

export const mutations: MutationTree<PhotoStore> = {
  [ADD_IMAGES](state, imageIndexes: number[]) {
    const addIndexes = imageIndexes.map((n) => '/img/' + n + '.jpg')
    state.imageSrcs = state.imageSrcs.concat(addIndexes)
  },
  [IMAGES_COUNT](state) {
    state.count = state.imageSrcs.length
  },
}
export const getters: GetterTree<PhotoStore, RootState> = {
  GetImageCount(state) {
    mutations.IMAGES_COUNT(state)
    return state.count
  },
}
