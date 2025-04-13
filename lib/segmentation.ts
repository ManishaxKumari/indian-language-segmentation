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





//2



// import type { Segment, Entity } from "@/lib/types"

// export function segmentText(text: string, language: string): Segment[] {
//   // Simple segmentation by sentences for demonstration
//   // In a real implementation, this would use language-specific NLP
//   const sentenceDelimiters = [".", "।", "?", "!", "|"]

//   const segments: Segment[] = []
//   let currentSegment = ""

//   for (let i = 0; i < text.length; i++) {
//     currentSegment += text[i]

//     if (
//       sentenceDelimiters.includes(text[i]) &&
//       (i === text.length - 1 || text[i + 1] === " " || text[i + 1] === "\n")
//     ) {
//       if (currentSegment.trim()) {
//         segments.push(analyzeSegment(currentSegment.trim(), language))
//       }
//       currentSegment = ""
//     }
//   }

//   // Add any remaining text as a segment
//   if (currentSegment.trim()) {
//     segments.push(analyzeSegment(currentSegment.trim(), language))
//   }

//   return segments
// }

// export function analyzeSegment(text: string, language: string): Segment {
//   // Mock analysis - in a real implementation, this would use NLP
//   const entities: Entity[] = []

//   // Simple pattern matching for demonstration
//   // Hindi pronouns and gender markers
//   const patterns = {
//     hindi: {
//       pronouns: ["मैं", "हम", "तुम", "आप", "वह", "वे", "यह", "ये", "उसने", "उसको", "उसका", "उसकी"],
//       genderMarkers: ["ा", "ी", "े", "गया", "गई", "गए", "रहा", "रही", "रहे"],
//       names: ["राम", "सीता", "अमित", "अवनी", "प्रिया", "राहुल", "नेहा", "अनिल", "सुनीता"],
//     },
//     tamil: {
//       pronouns: ["நான்", "நாம்", "நீ", "நீங்கள்", "அவன்", "அவள்", "அவர்", "அது", "அவை"],
//       genderMarkers: ["ன்", "ள்", "ர்"],
//       names: ["ராம்", "சீதா", "அமித்", "அவனி", "பிரியா", "ராகுல்", "நேகா"],
//     },
//     telugu: {
//       pronouns: ["నేను", "మేము", "నువ్వు", "మీరు", "అతను", "ఆమె", "అది", "వారు"],
//       genderMarkers: ["డు", "రాలు", "గారు"],
//       names: ["రాము", "సీత", "అమిత్", "అవని", "ప్రియ", "రాహుల్", "నేహా"],
//     },
//     bengali: {
//       pronouns: ["আমি", "আমরা", "তুমি", "আপনি", "সে", "তারা", "এটা", "ওটা"],
//       genderMarkers: ["টি", "টা", "ইয়া", "ইনী"],
//       names: ["রাম", "সীতা", "অমিত", "অবনী", "প্রিয়া", "রাহুল", "নেহা"],
//     },
//   }

//   const langPatterns = patterns[language as keyof typeof patterns] || patterns.hindi

//   // Find pronouns
//   langPatterns.pronouns.forEach((pronoun) => {
//     let startPos = 0
//     while (startPos < text.length) {
//       const pos = text.indexOf(pronoun, startPos)
//       if (pos === -1) break

//       entities.push({
//         text: pronoun,
//         type: "pronoun",
//         position: [pos, pos + pronoun.length],
//       })

//       startPos = pos + pronoun.length
//     }
//   })

//   // Find gender markers
//   langPatterns.genderMarkers.forEach((marker) => {
//     let startPos = 0
//     while (startPos < text.length) {
//       const pos = text.indexOf(marker, startPos)
//       if (pos === -1) break

//       entities.push({
//         text: marker,
//         type: "gender",
//         position: [pos, pos + marker.length],
//       })

//       startPos = pos + marker.length
//     }
//   })

//   // Find names
//   langPatterns.names.forEach((name) => {
//     let startPos = 0
//     while (startPos < text.length) {
//       const pos = text.indexOf(name, startPos)
//       if (pos === -1) break

//       entities.push({
//         text: name,
//         type: "name",
//         position: [pos, pos + name.length],
//       })

//       startPos = pos + name.length
//     }
//   })

//   // Find subjects (simplified)
//   const words = text.split(/\s+/)
//   if (words.length > 0 && !langPatterns.pronouns.includes(words[0])) {
//     entities.push({
//       text: words[0],
//       type: "subject",
//       position: [0, words[0].length],
//     })
//   }

//   // Calculate health score based on various factors
//   const hasPronouns = entities.some((e) => e.type === "pronoun")
//   const hasGenderMarkers = entities.some((e) => e.type === "gender")
//   const hasNames = entities.some((e) => e.type === "name")
//   const hasSubject = entities.some((e) => e.type === "subject")
//   const wordCount = words.length

//   let healthScore = 50 // Base score

//   // Adjust score based on various factors
//   if (hasSubject) healthScore += 10
//   if (hasPronouns) healthScore += 10
//   if (hasGenderMarkers) healthScore += 10
//   if (hasNames) healthScore += 10
//   if (wordCount >= 5 && wordCount <= 20) healthScore += 10 // Ideal length
//   if (wordCount > 20) healthScore -= 10 // Too long
//   if (wordCount < 3) healthScore -= 10 // Too short

//   // Randomize a bit for demonstration
//   healthScore += Math.floor(Math.random() * 10) - 5

//   // Clamp between 0-100
//   healthScore = Math.max(0, Math.min(100, healthScore))

//   return {
//     text,
//     healthScore,
//     contextComplete: healthScore >= 70,
//     genderClear: hasGenderMarkers || (hasPronouns && hasNames),
//     entities,
//   }
// }






//3



// import type { Segment, Entity } from "@/lib/types"

// // Set of Hindi pronouns that often indicate reference dependency
// const HINDI_REFERENTIAL_PRONOUNS = new Set([
//   "उसने", "उन्होंने", "वह", "उनका", "उसका", "उसकी", "उन्हें", "उसको", "उसके", "उनके", "उनकी", 
//   "ये", "यह", "इसका", "इसकी", "इसके", "इनका", "इनकी", "इनके", "इसने", "इन्होंने", "इन्हें", "इसको"
// ]);

// // Gender markers for dependency detection
// const HINDI_GENDER_MARKERS = {
//   male: ["उसका", "उसके", "उसने", "उनका", "उन्होंने", "वह", "उनके"],
//   female: ["उसकी", "उसने", "उनकी", "उन्होंने", "वह", "उनकी"]
// };

// // Enhanced segmentation function with context awareness
// export function segmentText(text: string, language: string): Segment[] {
//   // Initial segmentation using basic delimiters
//   const initialSegments = performInitialSegmentation(text);
  
//   // For languages other than Hindi, return basic segmentation
//   if (language !== "hindi") {
//     return initialSegments.map(segText => analyzeSegment(segText, language));
//   }
  
//   // Apply context-aware merging for Hindi
//   const mergedSegments = mergeContextDependentSegments(initialSegments, language);
  
//   // Analyze each segment for health score and entities
//   return mergedSegments.map(segText => analyzeSegment(segText, language));
// }

// function performInitialSegmentation(text: string): string[] {
//   // Initial split by sentence-ending delimiters
//   const segments: string[] = [];
//   let currentSegment = "";
//   const sentenceDelimiters = [".", "।", "?", "!", "|"];
  
//   for (let i = 0; i < text.length; i++) {
//     currentSegment += text[i];
    
//     if (
//       sentenceDelimiters.includes(text[i]) && 
//       (i === text.length - 1 || text[i + 1] === " " || text[i + 1] === "\n")
//     ) {
//       if (currentSegment.trim()) {
//         segments.push(currentSegment.trim());
//       }
//       currentSegment = "";
//     }
//   }
  
//   // Add any remaining text
//   if (currentSegment.trim()) {
//     segments.push(currentSegment.trim());
//   }
  
//   return segments;
// }

// function mergeContextDependentSegments(segments: string[], language: string): string[] {
//   if (segments.length <= 1) return segments;
  
//   const result: string[] = [segments[0]];
  
//   for (let i = 1; i < segments.length; i++) {
//     const currentSegment = segments[i];
//     const prevSegment = result[result.length - 1];
    
//     // Check if this segment starts with a referential pronoun
//     if (shouldMergeWithPrevious(currentSegment, prevSegment, language)) {
//       // Merge with previous segment
//       result[result.length - 1] = `${prevSegment} ${currentSegment}`;
//     } else {
//       result.push(currentSegment);
//     }
//   }
  
//   return result;
// }

// function shouldMergeWithPrevious(currentSegment: string, prevSegment: string, language: string): boolean {
//   // Only apply these rules for Hindi
//   if (language !== "hindi") return false;
  
//   // 1. Check if segment starts with a referential pronoun
//   const words = currentSegment.trim().split(/\s+/);
//   const firstWord = words[0];
  
//   if (HINDI_REFERENTIAL_PRONOUNS.has(firstWord)) {
//     return true;
//   }
  
//   // 2. Check for gender dependency - if the previous segment introduced a gendered entity
//   // and this segment continues with gendered pronouns
//   const prevHasMaleMarker = containsAnyWord(prevSegment, HINDI_GENDER_MARKERS.male);
//   const prevHasFemaleMarker = containsAnyWord(prevSegment, HINDI_GENDER_MARKERS.female);
//   const currentHasMaleMarker = containsAnyWord(currentSegment, HINDI_GENDER_MARKERS.male);
//   const currentHasFemaleMarker = containsAnyWord(currentSegment, HINDI_GENDER_MARKERS.female);
  
//   // If previous segment established gender and current segment continues it
//   if ((prevHasMaleMarker && currentHasMaleMarker) || (prevHasFemaleMarker && currentHasFemaleMarker)) {
//     return true;
//   }
  
//   // 3. Check for semantic completeness - if the current segment is too short, might be dependent
//   if (words.length < 3 && !endsWithFinalMarker(prevSegment)) {
//     return true;
//   }
  
//   return false;
// }

// function containsAnyWord(text: string, wordList: string[]): boolean {
//   for (const word of wordList) {
//     // Use word boundary to match whole words
//     const pattern = new RegExp(`\\b${word}\\b`, 'i');
//     if (pattern.test(text)) {
//       return true;
//     }
//   }
//   return false;
// }

// function endsWithFinalMarker(text: string): boolean {
//   // Check if the segment ends with a strong concluding marker
//   const conclusionMarkers = ["है।", "हैं।", "था।", "थी।", "थे।", "गया।", "गई।", "गए।"];
//   for (const marker of conclusionMarkers) {
//     if (text.trim().endsWith(marker)) {
//       return true;
//     }
//   }
//   return false;
// }

// export function analyzeSegment(text: string, language: string): Segment {
//   // Enhanced segment analysis with better entity detection
//   const entities: Entity[] = [];

//   // Dictionary of patterns for different languages
//   const patterns = {
//     hindi: {
//       pronouns: ["मैं", "हम", "तुम", "आप", "वह", "वे", "यह", "ये", "उसने", "उसको", "उसका", "उसकी", 
//                 "उन्होंने", "उनका", "उनकी", "उन्हें", "इसने", "इसका", "इसकी", "इसको", "इन्होंने", "इनका", "इनकी"],
//       genderMarkers: ["ा", "ी", "े", "गया", "गई", "गए", "रहा", "रही", "रहे", "ता", "ती", "ते"],
//       names: ["राम", "सीता", "अमित", "अवनी", "प्रिया", "राहुल", "नेहा", "अनिल", "सुनीता"],
//     },
//     tamil: {
//       pronouns: ["நான்", "நாம்", "நீ", "நீங்கள்", "அவன்", "அவள்", "அவர்", "அது", "அவை"],
//       genderMarkers: ["ன்", "ள்", "ர்"],
//       names: ["ராம்", "சீதா", "அமித்", "அவனி", "பிரியா", "ராகுல்", "நேகா"],
//     },
//     telugu: {
//       pronouns: ["నేను", "మేము", "నువ్వు", "మీరు", "అతను", "ఆమె", "అది", "వారు"],
//       genderMarkers: ["డు", "రాలు", "గారు"],
//       names: ["రాము", "సీత", "అమిత్", "అవని", "ప్రియ", "రాహుల్", "నేహా"],
//     },
//     bengali: {
//       pronouns: ["আমি", "আমরা", "তুমি", "আপনি", "সে", "তারা", "এটা", "ওটা"],
//       genderMarkers: ["টি", "টা", "ইয়া", "ইনী"],
//       names: ["রাম", "সীতা", "অমিত", "অবনী", "প্রিয়া", "রাহুল", "নেহা"],
//     },
//   };

//   const langPatterns = patterns[language as keyof typeof patterns] || patterns.hindi;

//   // Find pronouns
//   langPatterns.pronouns.forEach((pronoun) => {
//     let startPos = 0;
//     while (startPos < text.length) {
//       const pos = text.indexOf(pronoun, startPos);
//       if (pos === -1) break;

//       // Check for word boundaries to ensure we're matching whole words
//       const isWordStart = pos === 0 || /\s/.test(text[pos - 1]);
//       const isWordEnd = pos + pronoun.length === text.length || /\s/.test(text[pos + pronoun.length]);
      
//       if (isWordStart && isWordEnd) {
//         entities.push({
//           text: pronoun,
//           type: "pronoun",
//           position: [pos, pos + pronoun.length],
//         });
//       }

//       startPos = pos + pronoun.length;
//     }
//   });

//   // Find gender markers
//   langPatterns.genderMarkers.forEach((marker) => {
//     let startPos = 0;
//     while (startPos < text.length) {
//       const pos = text.indexOf(marker, startPos);
//       if (pos === -1) break;

//       entities.push({
//         text: marker,
//         type: "gender",
//         position: [pos, pos + marker.length],
//       });

//       startPos = pos + marker.length;
//     }
//   });

//   // Find names
//   langPatterns.names.forEach((name) => {
//     let startPos = 0;
//     while (startPos < text.length) {
//       const pos = text.indexOf(name, startPos);
//       if (pos === -1) break;

//       // Check for word boundaries
//       const isWordStart = pos === 0 || /\s/.test(text[pos - 1]);
//       const isWordEnd = pos + name.length === text.length || /\s/.test(text[pos + name.length]);
      
//       if (isWordStart && isWordEnd) {
//         entities.push({
//           text: name,
//           type: "name",
//           position: [pos, pos + name.length],
//         });
//       }

//       startPos = pos + name.length;
//     }
//   });

//   // Find subjects (more advanced detection)
//   const words = text.split(/\s+/);
//   let subjectFound = false;
  
//   // Try to find a noun as subject
//   for (let i = 0; i < Math.min(3, words.length); i++) {
//     // Simple heuristic: if it's not a pronoun and not a common verb ending, it might be a subject
//     const word = words[i];
//     if (!langPatterns.pronouns.includes(word) && 
//         !word.endsWith("है") && !word.endsWith("हैं") && 
//         !word.endsWith("था") && !word.endsWith("थी") && 
//         !word.endsWith("थे") && word.length > 2) {
      
//       entities.push({
//         text: word,
//         type: "subject",
//         position: [text.indexOf(word), text.indexOf(word) + word.length],
//       });
//       subjectFound = true;
//       break;
//     }
//   }
  
//   // More sophisticated health score calculation
//   const hasPronouns = entities.some((e) => e.type === "pronoun");
//   const hasGenderMarkers = entities.some((e) => e.type === "gender");
//   const hasNames = entities.some((e) => e.type === "name");
//   const hasSubject = subjectFound || entities.some((e) => e.type === "subject");
//   const wordCount = words.length;

//   // Gender clarity check - if we have both male and female indicators
//   const maleWords = new Set(HINDI_GENDER_MARKERS.male);
//   const femaleWords = new Set(HINDI_GENDER_MARKERS.female);
  
//   let hasMaleIndicator = false;
//   let hasFemaleIndicator = false;
  
//   // Check if we have clear gender indicators
//   for (const word of words) {
//     if (maleWords.has(word)) hasMaleIndicator = true;
//     if (femaleWords.has(word)) hasFemaleIndicator = true;
//   }
  
//   // If we have both gender indicators, it might be unclear
//   const genderClear = !(hasMaleIndicator && hasFemaleIndicator) || hasNames;
  
//   // Context completeness check
//   const pronounStart = HINDI_REFERENTIAL_PRONOUNS.has(words[0]);
//   const contextComplete = hasSubject && (!pronounStart || hasNames);
  
//   // Calculate health score
//   let healthScore = 50; // Base score

//   // Adjust score based on various factors
//   if (hasSubject) healthScore += 15;
//   if (!pronounStart || hasNames) healthScore += 10; // Doesn't start with pronoun or has names
//   if (hasGenderMarkers) healthScore += 10;
//   if (genderClear) healthScore += 10;
//   if (contextComplete) healthScore += 10;
//   if (wordCount >= 5 && wordCount <= 25) healthScore += 10; // Ideal length
//   if (wordCount > 25) healthScore -= 5; // Too long
//   if (wordCount < 3) healthScore -= 15; // Too short

//   // Clamp between 0-100
//   healthScore = Math.max(0, Math.min(100, healthScore));

//   return {
//     text,
//     healthScore,
//     contextComplete,
//     genderClear,
//     entities,
//   };
// }





//4


import type { Segment, Entity } from "@/lib/types"

// Set of Hindi pronouns that often indicate reference dependency
const HINDI_REFERENTIAL_PRONOUNS = new Set([
  "उसने", "उन्होंने", "वह", "उनका", "उसका", "उसकी", "उन्हें", "उसको", "उसके", "उनके", "उनकी", 
  "ये", "यह", "इसका", "इसकी", "इसके", "इनका", "इनकी", "इनके", "इसने", "इन्होंने", "इन्हें", "इसको"
]);

// Gender markers for dependency detection
const HINDI_GENDER_MARKERS = {
  male: ["उसका", "उसके", "उसने", "उनका", "उन्होंने", "वह", "उनके"],
  female: ["उसकी", "उसने", "उनकी", "उन्होंने", "वह", "उनकी"]
};

// Regex patterns for name detection
const NAME_PATTERNS = {
  // Pattern for abbreviated initials (works for Latin script)
  initialsPattern: /([A-Z]\.){1,5}\s+[A-Za-z]+/g,
  // Extended pattern for Hindi names with English initials
  // This will catch patterns like "A.P.J. अब्दुल कलाम" or "डॉ. ए.पी.जे. अब्दुल कलाम"
  mixedInitialsPattern: /([A-Za-zऀ-ॿ]\.){1,5}\s+[A-Za-zऀ-ॿ]+/g,
  // Pattern for Hindi abbreviations
  hindiInitialsPattern: /([ऀ-ॿ]\.){1,5}\s+[ऀ-ॿ]+/g
};

// Enhanced segmentation function with context awareness
export function segmentText(text: string, language: string): Segment[] {
  // Before initial segmentation, mark positions of abbreviated names to protect them
  const { protectedText, namePositions } = protectNamedEntities(text);
  
  // Initial segmentation using basic delimiters, respecting protected areas
  const initialSegments = performInitialSegmentation(protectedText, namePositions);
  
  // For languages other than Hindi, return basic segmentation
  if (language !== "hindi") {
    return initialSegments.map(segText => analyzeSegment(segText, language));
  }
  
  // Apply context-aware merging for Hindi
  const mergedSegments = mergeContextDependentSegments(initialSegments, language);
  
  // Analyze each segment for health score and entities
  return mergedSegments.map(segText => analyzeSegment(segText, language));
}

function protectNamedEntities(text: string): { protectedText: string, namePositions: [number, number][] } {
  // Find all abbreviated name patterns
  const namePositions: [number, number][] = [];
  const patterns = [NAME_PATTERNS.initialsPattern, NAME_PATTERNS.mixedInitialsPattern, NAME_PATTERNS.hindiInitialsPattern];
  
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match.index !== undefined) {
        namePositions.push([match.index, match.index + match[0].length]);
      }
    }
  }
  
  // Sort positions by start position
  namePositions.sort((a, b) => a[0] - b[0]);
  
  // Create a deep copy of the text
  let protectedText = text;
  
  // We return the original text but with name positions marked
  return { protectedText, namePositions };
}

function isPositionWithinProtectedName(position: number, namePositions: [number, number][]): boolean {
  for (const [start, end] of namePositions) {
    if (position > start && position < end) {
      return true;
    }
  }
  return false;
}

function performInitialSegmentation(text: string, namePositions: [number, number][]): string[] {
  // Initial split by sentence-ending delimiters, while respecting protected names
  const segments: string[] = [];
  let currentSegment = "";
  const sentenceDelimiters = [".", "।", "?", "!", "|"];
  
  for (let i = 0; i < text.length; i++) {
    currentSegment += text[i];
    
    // Check if this is a potential split point (delimiter followed by space)
    if (
      sentenceDelimiters.includes(text[i]) && 
      (i === text.length - 1 || text[i + 1] === " " || text[i + 1] === "\n")
    ) {
      // Only split if we're not inside a protected name area
      if (!isPositionWithinProtectedName(i, namePositions)) {
        if (currentSegment.trim()) {
          segments.push(currentSegment.trim());
        }
        currentSegment = "";
      }
      // Otherwise continue building the current segment
    }
  }
  
  // Add any remaining text
  if (currentSegment.trim()) {
    segments.push(currentSegment.trim());
  }
  
  return segments;
}

function mergeContextDependentSegments(segments: string[], language: string): string[] {
  if (segments.length <= 1) return segments;
  
  const result: string[] = [segments[0]];
  
  for (let i = 1; i < segments.length; i++) {
    const currentSegment = segments[i];
    const prevSegment = result[result.length - 1];
    
    // Check if this segment should be merged with the previous one
    if (shouldMergeWithPrevious(currentSegment, prevSegment, language)) {
      // Merge with previous segment
      result[result.length - 1] = `${prevSegment} ${currentSegment}`;
    } else {
      result.push(currentSegment);
    }
  }
  
  return result;
}

function shouldMergeWithPrevious(currentSegment: string, prevSegment: string, language: string): boolean {
  // Only apply these rules for Hindi
  if (language !== "hindi") return false;
  
  // 1. Check if segment starts with a referential pronoun
  const words = currentSegment.trim().split(/\s+/);
  const firstWord = words[0];
  
  if (HINDI_REFERENTIAL_PRONOUNS.has(firstWord)) {
    return true;
  }
  
  // 2. Check for gender dependency - if the previous segment introduced a gendered entity
  // and this segment continues with gendered pronouns
  const prevHasMaleMarker = containsAnyWord(prevSegment, HINDI_GENDER_MARKERS.male);
  const prevHasFemaleMarker = containsAnyWord(prevSegment, HINDI_GENDER_MARKERS.female);
  const currentHasMaleMarker = containsAnyWord(currentSegment, HINDI_GENDER_MARKERS.male);
  const currentHasFemaleMarker = containsAnyWord(currentSegment, HINDI_GENDER_MARKERS.female);
  
  // If previous segment established gender and current segment continues it
  if ((prevHasMaleMarker && currentHasMaleMarker) || (prevHasFemaleMarker && currentHasFemaleMarker)) {
    return true;
  }
  
  // 3. Check for semantic completeness - if the current segment is too short, might be dependent
  if (words.length < 3 && !endsWithFinalMarker(prevSegment)) {
    return true;
  }
  
  // 4. Check if the segments might have been improperly split due to name handling
  // This is a backup in case our protection mechanism missed something
  const combinedText = `${prevSegment} ${currentSegment}`;
  if (hasAbbreviatedName(combinedText) && !hasAbbreviatedName(prevSegment) && !hasAbbreviatedName(currentSegment)) {
    return true;
  }
  
  return false;
}

function hasAbbreviatedName(text: string): boolean {
  const patterns = [NAME_PATTERNS.initialsPattern, NAME_PATTERNS.mixedInitialsPattern, NAME_PATTERNS.hindiInitialsPattern];
  
  for (const pattern of patterns) {
    if (pattern.test(text)) {
      return true;
    }
  }
  return false;
}

function containsAnyWord(text: string, wordList: string[]): boolean {
  for (const word of wordList) {
    // Use word boundary to match whole words
    const pattern = new RegExp(`\\b${word}\\b`, 'i');
    if (pattern.test(text)) {
      return true;
    }
  }
  return false;
}

function endsWithFinalMarker(text: string): boolean {
  // Check if the segment ends with a strong concluding marker
  const conclusionMarkers = ["है।", "हैं।", "था।", "थी।", "थे।", "गया।", "गई।", "गए।"];
  for (const marker of conclusionMarkers) {
    if (text.trim().endsWith(marker)) {
      return true;
    }
  }
  return false;
}

export function analyzeSegment(text: string, language: string): Segment {
  // Enhanced segment analysis with better entity detection
  const entities: Entity[] = [];

  // Dictionary of patterns for different languages
  const patterns = {
    hindi: {
      pronouns: ["मैं", "हम", "तुम", "आप", "वह", "वे", "यह", "ये", "उसने", "उसको", "उसका", "उसकी", 
                "उन्होंने", "उनका", "उनकी", "उन्हें", "इसने", "इसका", "इसकी", "इसको", "इन्होंने", "इनका", "इनकी"],
      genderMarkers: ["ा", "ी", "े", "गया", "गई", "गए", "रहा", "रही", "रहे", "ता", "ती", "ते"],
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
  };

  const langPatterns = patterns[language as keyof typeof patterns] || patterns.hindi;

  // First detect abbreviated names
  const abbreviatedNames: Entity[] = [];
  const patterns2Check = [NAME_PATTERNS.initialsPattern, NAME_PATTERNS.mixedInitialsPattern, NAME_PATTERNS.hindiInitialsPattern];
  
  for (const pattern of patterns2Check) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match.index !== undefined) {
        abbreviatedNames.push({
          text: match[0],
          type: "name",
          position: [match.index, match.index + match[0].length],
        });
      }
    }
  }
  
  // Add abbreviated names to entities
  entities.push(...abbreviatedNames);

  // Find pronouns
  langPatterns.pronouns.forEach((pronoun) => {
    let startPos = 0;
    while (startPos < text.length) {
      const pos = text.indexOf(pronoun, startPos);
      if (pos === -1) break;

      // Check for word boundaries to ensure we're matching whole words
      const isWordStart = pos === 0 || /\s/.test(text[pos - 1]);
      const isWordEnd = pos + pronoun.length === text.length || /\s/.test(text[pos + pronoun.length]);
      
      // Skip if this position is already part of a detected name
      const isPartOfName = abbreviatedNames.some(
        entity => pos >= entity.position[0] && pos <= entity.position[1]
      );
      
      if (isWordStart && isWordEnd && !isPartOfName) {
        entities.push({
          text: pronoun,
          type: "pronoun",
          position: [pos, pos + pronoun.length],
        });
      }

      startPos = pos + pronoun.length;
    }
  });

  // Find gender markers
  langPatterns.genderMarkers.forEach((marker) => {
    let startPos = 0;
    while (startPos < text.length) {
      const pos = text.indexOf(marker, startPos);
      if (pos === -1) break;

      // Skip if this position is already part of a detected name
      const isPartOfName = abbreviatedNames.some(
        entity => pos >= entity.position[0] && pos <= entity.position[1]
      );
      
      if (!isPartOfName) {
        entities.push({
          text: marker,
          type: "gender",
          position: [pos, pos + marker.length],
        });
      }

      startPos = pos + marker.length;
    }
  });

  // Find standard names (not abbreviated)
  langPatterns.names.forEach((name) => {
    let startPos = 0;
    while (startPos < text.length) {
      const pos = text.indexOf(name, startPos);
      if (pos === -1) break;

      // Check for word boundaries
      const isWordStart = pos === 0 || /\s/.test(text[pos - 1]);
      const isWordEnd = pos + name.length === text.length || /\s/.test(text[pos + name.length]);
      
      // Skip if this position is already part of a detected name
      const isPartOfName = abbreviatedNames.some(
        entity => pos >= entity.position[0] && pos <= entity.position[1]
      );
      
      if (isWordStart && isWordEnd && !isPartOfName) {
        entities.push({
          text: name,
          type: "name",
          position: [pos, pos + name.length],
        });
      }

      startPos = pos + name.length;
    }
  });

  // Find subjects (more advanced detection)
  const words = text.split(/\s+/);
  let subjectFound = false;
  
  // Try to find a noun as subject
  for (let i = 0; i < Math.min(3, words.length); i++) {
    // Simple heuristic: if it's not a pronoun and not a common verb ending, it might be a subject
    const word = words[i];
    if (!langPatterns.pronouns.includes(word) && 
        !word.endsWith("है") && !word.endsWith("हैं") && 
        !word.endsWith("था") && !word.endsWith("थी") && 
        !word.endsWith("थे") && word.length > 2) {
      
      // Check if this word is already detected as a name or other entity
      const isAlreadyDetected = entities.some(entity => entity.text === word);
      
      if (!isAlreadyDetected) {
        entities.push({
          text: word,
          type: "subject",
          position: [text.indexOf(word), text.indexOf(word) + word.length],
        });
        subjectFound = true;
        break;
      }
    }
  }
  
  // More sophisticated health score calculation
  const hasPronouns = entities.some((e) => e.type === "pronoun");
  const hasGenderMarkers = entities.some((e) => e.type === "gender");
  const hasNames = entities.some((e) => e.type === "name");
  const hasSubject = subjectFound || entities.some((e) => e.type === "subject");
  const wordCount = words.length;

  // Gender clarity check - if we have both male and female indicators
  const maleWords = new Set(HINDI_GENDER_MARKERS.male);
  const femaleWords = new Set(HINDI_GENDER_MARKERS.female);
  
  let hasMaleIndicator = false;
  let hasFemaleIndicator = false;
  
  // Check if we have clear gender indicators
  for (const word of words) {
    if (maleWords.has(word)) hasMaleIndicator = true;
    if (femaleWords.has(word)) hasFemaleIndicator = true;
  }
  
  // If we have both gender indicators, it might be unclear
  const genderClear = !(hasMaleIndicator && hasFemaleIndicator) || hasNames;
  
  // Context completeness check
  const pronounStart = HINDI_REFERENTIAL_PRONOUNS.has(words[0]);
  const contextComplete = hasSubject && (!pronounStart || hasNames);
  
  // Calculate health score
  let healthScore = 50; // Base score

  // Adjust score based on various factors
  if (hasSubject) healthScore += 15;
  if (!pronounStart || hasNames) healthScore += 10; // Doesn't start with pronoun or has names
  if (hasGenderMarkers) healthScore += 10;
  if (genderClear) healthScore += 10;
  if (contextComplete) healthScore += 10;
  if (wordCount >= 5 && wordCount <= 25) healthScore += 10; // Ideal length
  if (wordCount > 25) healthScore -= 5; // Too long
  if (wordCount < 3) healthScore -= 15; // Too short
  
  // Bonus for having complete names with initials
  if (abbreviatedNames.length > 0) healthScore += 5;

  // Clamp between 0-100
  healthScore = Math.max(0, Math.min(100, healthScore));

  return {
    text,
    healthScore,
    contextComplete,
    genderClear,
    entities,
  };
}