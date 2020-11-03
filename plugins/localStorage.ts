import { Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'
const localStorage: Plugin = ({ store }) => {
  createPersistedState({
    paths: ['photoStore'],
  })(store)
}
export default localStorage
