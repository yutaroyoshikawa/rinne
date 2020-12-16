import PersonalityData from '@/assets/personality.json'

type ElementType<T> = T extends any[] ? T[number] : never

export type Personality = ElementType<typeof PersonalityData>['personality']

export type PersonalityItem = keyof Personality
