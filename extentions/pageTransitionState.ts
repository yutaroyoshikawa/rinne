export const PageTransitionState = {
  EXITING: 'exiting',
  EXITED: 'exited',
  ENTERING: 'entering',
  ENTERED: 'entered',
} as const

export type PageTransitionState = typeof PageTransitionState[keyof typeof PageTransitionState]
