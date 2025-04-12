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
