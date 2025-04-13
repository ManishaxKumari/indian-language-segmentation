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

// export interface Segment {
//   text: string
//   healthScore: number
//   contextComplete: boolean
//   genderClear: boolean
//   entities: Entity[]
// }

// export interface TranslationModel {
//   id: string
//   name: string
//   description: string
//   supportsGender: boolean
//   supportsContext: boolean
//   supportsEntities: boolean
// }

// Create this file at: /lib/types.ts
export interface Segment {
  id?: string | number;
  text: string;
  healthScore: number; // Score from 0-100 indicating text health/quality
  // Add any other properties your segments have
  contextComplete: boolean
  genderClear: boolean
  entities: Entity[];
}

