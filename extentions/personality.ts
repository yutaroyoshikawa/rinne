export const PersonalityItem = {
  wise: 'wise',
  easygoing: 'easygoing',
  naughty: 'naughty',
  energetic: 'energetic',
  kindness: 'kindness',
  affable: 'affable',
} as const

export type PersonalityItem = typeof PersonalityItem[keyof typeof PersonalityItem]

export type Personality = {
  wise: number
  easygoing: number
  naughty: number
  energetic: number
  kindness: number
  affable: number
}

export const getMaxPersonality = (
  personality: Personality
): PersonalityItem => {
  let maxItem: PersonalityItem = PersonalityItem.wise

  if (personality[maxItem] < personality[PersonalityItem.easygoing]) {
    maxItem = PersonalityItem.easygoing
  }

  if (personality[maxItem] < personality[PersonalityItem.naughty]) {
    maxItem = PersonalityItem.naughty
  }

  if (personality[maxItem] < personality[PersonalityItem.energetic]) {
    maxItem = PersonalityItem.energetic
  }

  if (personality[maxItem] < personality[PersonalityItem.kindness]) {
    maxItem = PersonalityItem.kindness
  }

  if (personality[maxItem] < personality[PersonalityItem.affable]) {
    maxItem = PersonalityItem.affable
  }

  return maxItem
}
