// import type { Segment, Entity } from "./types"

// // Sample data for demonstration
// const genderedWords = {
//   hindi: {
//     male: ["वह", "उसका", "उसके", "उसने", "उसको", "भाई", "बेटा", "पिता"],
//     female: ["वह", "उसकी", "उसने", "उसको", "बहन", "बेटी", "माता"],
//   },
//   tamil: {
//     male: ["அவன்", "அவனுடைய", "அவனது"],
//     female: ["அவள்", "அவளுடைய", "அவளது"],
//   },
//   telugu: {
//     male: ["అతను", "అతని", "వాడు"],
//     female: ["ఆమె", "ఆవిడ", "తను"],
//   },
//   bengali: {
//     male: ["সে", "তার", "তাকে", "ছেলে"],
//     female: ["সে", "তার", "তাকে", "মেয়ে"],
//   },
// }

// const pronouns = {
//   hindi: ["मैं", "हम", "तुम", "आप", "वह", "वे", "यह", "ये"],
//   tamil: ["நான்", "நாங்கள்", "நீ", "நீங்கள்", "அவன்", "அவள்", "அவர்", "அவர்கள்", "அது", "அவை"],
//   telugu: ["నేను", "మేము", "నువ్వు", "మీరు", "అతను", "ఆమె", "అది", "వారు"],
//   bengali: ["আমি", "আমরা", "তুমি", "আপনি", "সে", "তারা", "এটা", "এগুলো"],
// }

// // Simple segmentation based on punctuation and sentence length
// export function segmentText(text: string, language: string): Segment[] {
//   // For demonstration, we'll use a simple rule-based approach
//   // In a real implementation, you would use more sophisticated NLP techniques

//   // Split by sentence-ending punctuation
//   const rawSegments = text.split(/(?<=[।.!?])\s+/).filter((s) => s.trim().length > 0)

//   // Further split long segments
//   const segments: Segment[] = []

//   for (const rawSegment of rawSegments) {
//     if (rawSegment.length > 100) {
//       // Split long segments at commas or other natural breaks
//       const subSegments = rawSegment.split(/(?<=[,;:])\s+/).filter((s) => s.trim().length > 0)

//       for (const subSegment of subSegments) {
//         segments.push(analyzeSegment(subSegment, language))
//       }
//     } else {
//       segments.push(analyzeSegment(rawSegment, language))
//     }
//   }

//   return segments
// }

// export function analyzeSegment(text: string, language: string): Segment {
//   const entities: Entity[] = []
//   let contextComplete = true
//   let genderClear = true

//   // Check for pronouns
//   const languagePronouns = pronouns[language as keyof typeof pronouns] || []
//   for (const pronoun of languagePronouns) {
//     const regex = new RegExp(`\\b${pronoun}\\b`, "g")
//     let match

//     while ((match = regex.exec(text)) !== null) {
//       entities.push({
//         text: match[0],
//         type: "pronoun",
//         position: [match.index, match.index + match[0].length],
//       })
//     }
//   }

//   // Check for gendered words
//   const maleWords = genderedWords[language as keyof typeof genderedWords]?.male || []
//   const femaleWords = genderedWords[language as keyof typeof genderedWords]?.female || []

//   let hasMale = false
//   let hasFemale = false

//   for (const word of maleWords) {
//     const regex = new RegExp(`\\b${word}\\b`, "g")
//     let match

//     while ((match = regex.exec(text)) !== null) {
//       hasMale = true
//       entities.push({
//         text: match[0],
//         type: "gender",
//         position: [match.index, match.index + match[0].length],
//       })
//     }
//   }

//   for (const word of femaleWords) {
//     const regex = new RegExp(`\\b${word}\\b`, "g")
//     let match

//     while ((match = regex.exec(text)) !== null) {
//       hasFemale = true
//       entities.push({
//         text: match[0],
//         type: "gender",
//         position: [match.index, match.index + match[0].length],
//       })
//     }
//   }

//   // If we have both male and female references, gender might be unclear
//   if (hasMale && hasFemale) {
//     genderClear = false
//   }

//   // Simple heuristic for context completeness
//   // In a real implementation, you would use more sophisticated NLP
//   if (text.length < 20 || entities.length === 0) {
//     contextComplete = false
//   }

//   // Calculate health score based on our analysis
//   let healthScore = 100

//   if (!contextComplete) healthScore -= 30
//   if (!genderClear) healthScore -= 20
//   if (entities.length === 0) healthScore -= 10
//   if (text.length < 10) healthScore -= 20
//   if (text.length > 200) healthScore -= 15 // Too long might be hard to translate

//   return {
//     text,
//     healthScore: Math.max(0, healthScore),
//     contextComplete,
//     genderClear,
//     entities,
//   }
// }
// This is a mock implementation for demonstration purposes
// In a real application, this would use NLP libraries or APIs

import type { Segment, Entity } from "@/lib/types"

export function segmentText(text: string, language: string): Segment[] {
  // Simple segmentation by sentences for demonstration
  // In a real implementation, this would use language-specific NLP
  const sentenceDelimiters = [".", "।", "?", "!", "|"]

  const segments: Segment[] = []
  let currentSegment = ""

  for (let i = 0; i < text.length; i++) {
    currentSegment += text[i]

    if (
      sentenceDelimiters.includes(text[i]) &&
      (i === text.length - 1 || text[i + 1] === " " || text[i + 1] === "\n")
    ) {
      if (currentSegment.trim()) {
        segments.push(analyzeSegment(currentSegment.trim(), language))
      }
      currentSegment = ""
    }
  }

  // Add any remaining text as a segment
  if (currentSegment.trim()) {
    segments.push(analyzeSegment(currentSegment.trim(), language))
  }

  return segments
}

export function analyzeSegment(text: string, language: string): Segment {
  // Mock analysis - in a real implementation, this would use NLP
  const entities: Entity[] = []

  // Simple pattern matching for demonstration
  // Hindi pronouns and gender markers
  const patterns = {
    hindi: {
      pronouns: ["मैं", "हम", "तुम", "आप", "वह", "वे", "यह", "ये", "उसने", "उसको", "उसका", "उसकी"],
      genderMarkers: ["ा", "ी", "े", "गया", "गई", "गए", "रहा", "रही", "रहे"],
      names: ["राम", "सीता", "अमित", "अवनी", "प्रिया", "राहुल", "नेहा", "अनिल", "सुनीता"],
    },
    tamil: {
      pronouns: ["நான்", "நாம்", "நீ", "நீங்கள்", "அவன்", "அவள்", "அவர்", "அது", "அவை"],
      genderMarkers: ["ன்", "ள்", "ர்"],
      names: ["ராம்", "சீதா", "அமித்", "அவனி", "பிரியா", "ராகுல்", "நேகா"],
    },
    telugu: {
      pronouns: ["నేను", "మేము", "నువ్వు", "మీరు", "అతను", "ఆమె", "అది", "వారు"],
      genderMarkers: ["డు", "రాలు", "గారు"],
      names: ["రాము", "సీత", "అమిత్", "అవని", "ప్రియ", "రాహుల్", "నేహా"],
    },
    bengali: {
      pronouns: ["আমি", "আমরা", "তুমি", "আপনি", "সে", "তারা", "এটা", "ওটা"],
      genderMarkers: ["টি", "টা", "ইয়া", "ইনী"],
      names: ["রাম", "সীতা", "অমিত", "অবনী", "প্রিয়া", "রাহুল", "নেহা"],
    },
  }

  const langPatterns = patterns[language as keyof typeof patterns] || patterns.hindi

  // Find pronouns
  langPatterns.pronouns.forEach((pronoun) => {
    let startPos = 0
    while (startPos < text.length) {
      const pos = text.indexOf(pronoun, startPos)
      if (pos === -1) break

      entities.push({
        text: pronoun,
        type: "pronoun",
        position: [pos, pos + pronoun.length],
      })

      startPos = pos + pronoun.length
    }
  })

  // Find gender markers
  langPatterns.genderMarkers.forEach((marker) => {
    let startPos = 0
    while (startPos < text.length) {
      const pos = text.indexOf(marker, startPos)
      if (pos === -1) break

      entities.push({
        text: marker,
        type: "gender",
        position: [pos, pos + marker.length],
      })

      startPos = pos + marker.length
    }
  })

  // Find names
  langPatterns.names.forEach((name) => {
    let startPos = 0
    while (startPos < text.length) {
      const pos = text.indexOf(name, startPos)
      if (pos === -1) break

      entities.push({
        text: name,
        type: "name",
        position: [pos, pos + name.length],
      })

      startPos = pos + name.length
    }
  })

  // Find subjects (simplified)
  const words = text.split(/\s+/)
  if (words.length > 0 && !langPatterns.pronouns.includes(words[0])) {
    entities.push({
      text: words[0],
      type: "subject",
      position: [0, words[0].length],
    })
  }

  // Calculate health score based on various factors
  const hasPronouns = entities.some((e) => e.type === "pronoun")
  const hasGenderMarkers = entities.some((e) => e.type === "gender")
  const hasNames = entities.some((e) => e.type === "name")
  const hasSubject = entities.some((e) => e.type === "subject")
  const wordCount = words.length

  let healthScore = 50 // Base score

  // Adjust score based on various factors
  if (hasSubject) healthScore += 10
  if (hasPronouns) healthScore += 10
  if (hasGenderMarkers) healthScore += 10
  if (hasNames) healthScore += 10
  if (wordCount >= 5 && wordCount <= 20) healthScore += 10 // Ideal length
  if (wordCount > 20) healthScore -= 10 // Too long
  if (wordCount < 3) healthScore -= 10 // Too short

  // Randomize a bit for demonstration
  healthScore += Math.floor(Math.random() * 10) - 5

  // Clamp between 0-100
  healthScore = Math.max(0, Math.min(100, healthScore))

  return {
    text,
    healthScore,
    contextComplete: healthScore >= 70,
    genderClear: hasGenderMarkers || (hasPronouns && hasNames),
    entities,
  }
}

