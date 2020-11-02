import { MutationTree } from 'vuex'
type PhotoStore = {
  imageSrcs: string[]
}

// Mutations
const ADD_IMAGES = 'ADD_IMAGES'

export const state = (): PhotoStore => ({
  imageSrcs: ['/img/0.jpg', '/img/1.jpg', '/img/2.jpg'],
})

export const mutations: MutationTree<PhotoStore> = {
  [ADD_IMAGES](state, imageIndexes: number[]) {
    const addIndexes = imageIndexes.map((n) => '/img/' + n + '.jpg')
    state.imageSrcs = state.imageSrcs.concat(addIndexes)
  },
}
