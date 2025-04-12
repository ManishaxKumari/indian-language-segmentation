import type { Segment, Entity } from "./types"

// Sample data for demonstration
const genderedWords = {
  hindi: {
    male: ["वह", "उसका", "उसके", "उसने", "उसको", "भाई", "बेटा", "पिता"],
    female: ["वह", "उसकी", "उसने", "उसको", "बहन", "बेटी", "माता"],
  },
  tamil: {
    male: ["அவன்", "அவனுடைய", "அவனது"],
    female: ["அவள்", "அவளுடைய", "அவளது"],
  },
  telugu: {
    male: ["అతను", "అతని", "వాడు"],
    female: ["ఆమె", "ఆవిడ", "తను"],
  },
  bengali: {
    male: ["সে", "তার", "তাকে", "ছেলে"],
    female: ["সে", "তার", "তাকে", "মেয়ে"],
  },
}

const pronouns = {
  hindi: ["मैं", "हम", "तुम", "आप", "वह", "वे", "यह", "ये"],
  tamil: ["நான்", "நாங்கள்", "நீ", "நீங்கள்", "அவன்", "அவள்", "அவர்", "அவர்கள்", "அது", "அவை"],
  telugu: ["నేను", "మేము", "నువ్వు", "మీరు", "అతను", "ఆమె", "అది", "వారు"],
  bengali: ["আমি", "আমরা", "তুমি", "আপনি", "সে", "তারা", "এটা", "এগুলো"],
}

// Simple segmentation based on punctuation and sentence length
export function segmentText(text: string, language: string): Segment[] {
  // For demonstration, we'll use a simple rule-based approach
  // In a real implementation, you would use more sophisticated NLP techniques

  // Split by sentence-ending punctuation
  const rawSegments = text.split(/(?<=[।.!?])\s+/).filter((s) => s.trim().length > 0)

  // Further split long segments
  const segments: Segment[] = []

  for (const rawSegment of rawSegments) {
    if (rawSegment.length > 100) {
      // Split long segments at commas or other natural breaks
      const subSegments = rawSegment.split(/(?<=[,;:])\s+/).filter((s) => s.trim().length > 0)

      for (const subSegment of subSegments) {
        segments.push(analyzeSegment(subSegment, language))
      }
    } else {
      segments.push(analyzeSegment(rawSegment, language))
    }
  }

  return segments
}

export function analyzeSegment(text: string, language: string): Segment {
  const entities: Entity[] = []
  let contextComplete = true
  let genderClear = true

  // Check for pronouns
  const languagePronouns = pronouns[language as keyof typeof pronouns] || []
  for (const pronoun of languagePronouns) {
    const regex = new RegExp(`\\b${pronoun}\\b`, "g")
    let match

    while ((match = regex.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: "pronoun",
        position: [match.index, match.index + match[0].length],
      })
    }
  }

  // Check for gendered words
  const maleWords = genderedWords[language as keyof typeof genderedWords]?.male || []
  const femaleWords = genderedWords[language as keyof typeof genderedWords]?.female || []

  let hasMale = false
  let hasFemale = false

  for (const word of maleWords) {
    const regex = new RegExp(`\\b${word}\\b`, "g")
    let match

    while ((match = regex.exec(text)) !== null) {
      hasMale = true
      entities.push({
        text: match[0],
        type: "gender",
        position: [match.index, match.index + match[0].length],
      })
    }
  }

  for (const word of femaleWords) {
    const regex = new RegExp(`\\b${word}\\b`, "g")
    let match

    while ((match = regex.exec(text)) !== null) {
      hasFemale = true
      entities.push({
        text: match[0],
        type: "gender",
        position: [match.index, match.index + match[0].length],
      })
    }
  }

  // If we have both male and female references, gender might be unclear
  if (hasMale && hasFemale) {
    genderClear = false
  }

  // Simple heuristic for context completeness
  // In a real implementation, you would use more sophisticated NLP
  if (text.length < 20 || entities.length === 0) {
    contextComplete = false
  }

  // Calculate health score based on our analysis
  let healthScore = 100

  if (!contextComplete) healthScore -= 30
  if (!genderClear) healthScore -= 20
  if (entities.length === 0) healthScore -= 10
  if (text.length < 10) healthScore -= 20
  if (text.length > 200) healthScore -= 15 // Too long might be hard to translate

  return {
    text,
    healthScore: Math.max(0, healthScore),
    contextComplete,
    genderClear,
    entities,
  }
}
