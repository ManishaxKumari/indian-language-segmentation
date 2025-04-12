// export interface Entity {
//   text: string
//   type: "pronoun" | "gender" | "name" | "subject"
//   position: [number, number]
// }

// export interface Segment {
//   text: string
//   healthScore: number
//   contextComplete: boolean
//   genderClear: boolean
//   entities: Entity[]
// }
export interface Entity {
  text: string
  type: "pronoun" | "gender" | "name" | "subject"
  position: [number, number]
}

export interface Segment {
  text: string
  healthScore: number
  contextComplete: boolean
  genderClear: boolean
  entities: Entity[]
}

export interface TranslationModel {
  id: string
  name: string
  description: string
  supportsGender: boolean
  supportsContext: boolean
  supportsEntities: boolean
}

