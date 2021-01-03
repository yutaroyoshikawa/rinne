import PersonalityData from '@/assets/personality.json'

type ElementType<T> = T extends any[] ? T[number] : never

export type ImageData = ElementType<typeof PersonalityData>

export type Personality = ImageData['personality']

export type PersonalityItem = keyof Personality
