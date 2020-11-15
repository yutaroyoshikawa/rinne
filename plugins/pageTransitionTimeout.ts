import { Plugin } from '@nuxt/types'
import { PageTransitionState } from '@/extentions/pageTransitionState'
import { CHANGE_PAGE_TRANSITION_STATE, CLOSE_TAB } from '@/store/index'

const EXIT_TRANSITION_DURATION = 600
const ENTER_TRANSITION_DURATION = 600

const pageTransitionTimeout: Plugin = ({ app, store }) => {
  const router = app.router
  if (router) {
    let timer: ReturnType<typeof setTimeout>
    router.beforeEach((_to, from, next) => {
      clearTimeout(timer)
      store.commit(CLOSE_TAB)
      if (from.name) {
        store.dispatch(
          CHANGE_PAGE_TRANSITION_STATE,
          PageTransitionState.EXITING
        )
        timer = setTimeout(() => {
          store.dispatch(
            CHANGE_PAGE_TRANSITION_STATE,
            PageTransitionState.EXITED
          )
          next()
        }, EXIT_TRANSITION_DURATION)
      } else {
        next()
      }
    })

    router.afterEach((_to, _from) => {
      clearTimeout(timer)
      store.dispatch(CHANGE_PAGE_TRANSITION_STATE, PageTransitionState.ENTERING)
      timer = setTimeout(() => {
        store.dispatch(
          CHANGE_PAGE_TRANSITION_STATE,
          PageTransitionState.ENTERED
        )
      }, ENTER_TRANSITION_DURATION)
    })
  }
}

export default pageTransitionTimeout
