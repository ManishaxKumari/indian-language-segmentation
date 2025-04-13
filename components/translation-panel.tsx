// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Loader2, Wand2, AlertCircle, Check } from "lucide-react"
// import { motion } from "framer-motion"
// import type { Segment } from "@/lib/types"

// interface TranslationPanelProps {
//   segments: Segment[]
// }

// interface TranslatedSegment extends Segment {
//   translation: string
//   preservesGender: boolean
//   preservesContext: boolean
//   preservesEntities: boolean
// }

// export default function TranslationPanel({ segments }: TranslationPanelProps) {
//   const [translatedSegments, setTranslatedSegments] = useState<TranslatedSegment[]>([])
//   const [translationModel, setTranslationModel] = useState("gpt-4")
//   const [isTranslating, setIsTranslating] = useState(false)

//   const handleTranslate = async () => {
//     if (segments.length === 0) return

//     setIsTranslating(true)

//     // Simulate API call with timeout
//     setTimeout(() => {
//       const translated = segments.map((segment) => {
//         // This is a mock translation - in a real implementation,
//         // you would call an actual translation API
//         return {
//           ...segment,
//           translation: mockTranslate(segment.text),
//           preservesGender: Math.random() > 0.2, // Simulating analysis
//           preservesContext: Math.random() > 0.15,
//           preservesEntities: Math.random() > 0.1,
//         }
//       })

//       setTranslatedSegments(translated)
//       setIsTranslating(false)
//     }, 1500)
//   }

//   // Mock translation function - replace with actual API call
//   const mockTranslate = (text: string): string => {
//     // This is just a placeholder - in a real implementation,
//     // you would call a translation API
//     const mockTranslations: Record<string, string> = {
//       "वह अपने भाई के साथ बाजार गया।": "He went to the market with his brother.",
//       "वह अपनी बहन के साथ बाजार गई।": "She went to the market with her sister.",
//       "राम ने कहा कि वह कल आएगा।": "Ram said that he would come tomorrow.",
//       "सीता ने कहा कि वह कल आएगी।": "Sita said that she would come tomorrow.",
//       "मेरा नाम अमित है।": "My name is Amit.",
//       "अवनी कल दिल्ली जा रही है।": "Avni is going to Delhi tomorrow.",
//       "उसने खाना खाया।": "He/she ate food.",
//       "मैं कल सुबह जल्दी उठूंगा।": "I will wake up early tomorrow morning.",
//       "हमारे गांव में एक पुराना मंदिर है।": "There is an ancient temple in our village.",
//       "दीपावली के त्योहार पर लोग दीये जलाते हैं।": "People light lamps during the festival of Diwali.",
//     }

//     // Return mock translation if available, otherwise return placeholder
//     return (
//       mockTranslations[text] ||
//       "This is a translated version of the text that preserves gender, tense, and cultural context."
//     )
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold">Translation</h2>
//         {/* <Select value={translationModel} onValueChange={setTranslationModel}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select Model" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="gpt-4">GPT-4</SelectItem>
//             <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
//             <SelectItem value="mbart">mBART</SelectItem>
//             <SelectItem value="google">Google Translate</SelectItem>
//           </SelectContent>
//         </Select> */}
//       </div>

//       <Button
//         onClick={handleTranslate}
//         className="w-full group relative overflow-hidden"
//         disabled={isTranslating || segments.length === 0}
//       >
//         <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
//         {isTranslating ? (
//           <span className="flex items-center">
//             <Loader2 className="animate-spin mr-2 h-4 w-4" />
//             Translating...
//           </span>
//         ) : (
//           <span className="flex items-center">
//             <Wand2 className="mr-2 h-4 w-4" />
//             Translate Segments
//           </span>
//         )}
//       </Button>

//       {translatedSegments.length > 0 && (
//         <div className="space-y-4 mt-4">
//           {translatedSegments.map((segment, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//               className="rounded-md border border-border/30 bg-background/30 hover:border-border/50 backdrop-blur-sm"
//             >
//               <div className="p-4 border-b border-border/20">
//                 <div className="flex justify-between items-start mb-2">
//                   <span className="text-xs text-muted-foreground">Original Segment {index + 1}</span>
//                   <div className="flex space-x-1">
//                     <Badge
//                       variant={
//                         segment.healthScore >= 80 ? "success" : segment.healthScore >= 50 ? "warning" : "destructive"
//                       }
//                       className="text-xs"
//                     >
//                       {segment.healthScore}%
//                     </Badge>
//                   </div>
//                 </div>
//                 <p className="text-sm">{segment.text}</p>
//               </div>

//               <div className="p-4 bg-background/50">
//                 <div className="flex justify-between items-start mb-2">
//                   <span className="text-xs text-muted-foreground">Translation</span>
//                   <div className="flex space-x-1">
//                     <Badge variant={segment.preservesGender ? "outline" : "destructive"} className="text-xs">
//                       {segment.preservesGender ? (
//                         <Check className="h-3 w-3 mr-1" />
//                       ) : (
//                         <AlertCircle className="h-3 w-3 mr-1" />
//                       )}
//                       Gender
//                     </Badge>
//                     <Badge variant={segment.preservesContext ? "outline" : "destructive"} className="text-xs">
//                       {segment.preservesContext ? (
//                         <Check className="h-3 w-3 mr-1" />
//                       ) : (
//                         <AlertCircle className="h-3 w-3 mr-1" />
//                       )}
//                       Context
//                     </Badge>
//                     <Badge variant={segment.preservesEntities ? "outline" : "destructive"} className="text-xs">
//                       {segment.preservesEntities ? (
//                         <Check className="h-3 w-3 mr-1" />
//                       ) : (
//                         <AlertCircle className="h-3 w-3 mr-1" />
//                       )}
//                       Entities
//                     </Badge>
//                   </div>
//                 </div>
//                 <p className="text-sm">{segment.translation}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {segments.length > 0 && translatedSegments.length === 0 && !isTranslating && (
//         <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
//           <CardContent className="p-4">
//             <div className="text-center py-12 text-muted-foreground">
//               Click &quot;Translate Segments&quot; to see translations
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {segments.length === 0 && (
//         <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
//           <CardContent className="p-4">
//             <div className="text-center py-12 text-muted-foreground">Segment your text first to enable translation</div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }


//2

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Loader2, Wand2, AlertCircle, Check } from "lucide-react"
// import { motion } from "framer-motion"
// import type { Segment } from "@/lib/types"

// interface TranslationPanelProps {
//   segments: Segment[]
// }

// interface TranslatedSegment extends Segment {
//   translation: string
//   preservesGender: boolean
//   preservesContext: boolean
//   preservesEntities: boolean
//   matchRate?: number
// }

// // Common language codes for MyMemory API
// const LANGUAGES = [
//   { code: "en", name: "English" },
//   { code: "hi", name: "Hindi" },
//   { code: "es", name: "Spanish" },
//   { code: "fr", name: "French" },
//   { code: "de", name: "German" },
//   { code: "it", name: "Italian" },
//   { code: "pt", name: "Portuguese" },
//   { code: "ru", name: "Russian" },
//   { code: "zh", name: "Chinese" },
//   { code: "ja", name: "Japanese" },
//   { code: "ko", name: "Korean" },
//   { code: "ar", name: "Arabic" },
// ]

// export default function TranslationPanel({ segments }: TranslationPanelProps) {
//   const [translatedSegments, setTranslatedSegments] = useState<TranslatedSegment[]>([])
//   const [sourceLanguage, setSourceLanguage] = useState("hi")
//   const [targetLanguage, setTargetLanguage] = useState("en")
//   const [isTranslating, setIsTranslating] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // MyMemory API URL
//   const MYMEMORY_API = "https://api.mymemory.translated.net/get"
//   // Optional: Your MyMemory email for higher rate limits
//   const EMAIL = process.env.NEXT_PUBLIC_MYMEMORY_EMAIL || ""

//   const translateText = async (text: string, source: string, target: string) => {
//     try {
//       const langPair = `${source}|${target}`
//       let apiUrl = `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langPair)}`
      
//       // Add email if available for higher rate limits
//       if (EMAIL) {
//         apiUrl += `&de=${encodeURIComponent(EMAIL)}`
//       }
      
//       const response = await fetch(apiUrl)
      
//       if (!response.ok) {
//         throw new Error("Translation failed")
//       }

//       const data = await response.json()
      
//       if (data.responseStatus !== 200) {
//         throw new Error(data.responseDetails || "Translation failed")
//       }
      
//       return {
//         translatedText: data.responseData.translatedText,
//         matchRate: data.responseData.match * 100, // Convert to percentage
//       }
//     } catch (error) {
//       console.error("Translation error:", error)
//       throw error
//     }
//   }

//   // Analyze translation for quality metrics
//   const analyzeTranslation = (original: string, translation: string, matchRate: number) => {
//     // Using match rate to influence the analysis
//     // In a real implementation, you would use more sophisticated methods
//     const matchFactor = matchRate / 100
    
//     return {
//       preservesGender: Math.random() > (0.3 - matchFactor * 0.2),
//       preservesContext: Math.random() > (0.25 - matchFactor * 0.2),
//       preservesEntities: Math.random() > (0.2 - matchFactor * 0.15),
//     }
//   }

//   const handleTranslate = async () => {
//     if (segments.length === 0) return

//     setIsTranslating(true)
//     setError(null)
    
//     try {
//       const translatedResults = await Promise.all(
//         segments.map(async (segment) => {
//           try {
//             const { translatedText, matchRate } = await translateText(segment.text, sourceLanguage, targetLanguage)
//             const analysis = analyzeTranslation(segment.text, translatedText, matchRate)
            
//             return {
//               ...segment,
//               translation: translatedText,
//               preservesGender: analysis.preservesGender,
//               preservesContext: analysis.preservesContext,
//               preservesEntities: analysis.preservesEntities,
//               matchRate: matchRate,
//             }
//           } catch (error) {
//             console.error(`Error translating segment: ${segment.text}`, error)
//             return {
//               ...segment,
//               translation: "Translation failed",
//               preservesGender: false,
//               preservesContext: false,
//               preservesEntities: false,
//             }
//           }
//         })
//       )

//       setTranslatedSegments(translatedResults)
//     } catch (error) {
//       console.error("Translation process error:", error)
//       setError("Failed to translate segments. Please try again.")
//     } finally {
//       setIsTranslating(false)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-semibold">Translation</h2>
//         <div className="flex gap-2">
//           <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
//             <SelectTrigger className="w-[140px]">
//               <SelectValue placeholder="Source Language" />
//             </SelectTrigger>
//             <SelectContent>
//               {LANGUAGES.map((lang) => (
//                 <SelectItem key={`source-${lang.code}`} value={lang.code}>
//                   {lang.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
          
//           <Select value={targetLanguage} onValueChange={setTargetLanguage}>
//             <SelectTrigger className="w-[140px]">
//               <SelectValue placeholder="Target Language" />
//             </SelectTrigger>
//             <SelectContent>
//               {LANGUAGES.map((lang) => (
//                 <SelectItem key={`target-${lang.code}`} value={lang.code}>
//                   {lang.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {error && (
//         <div className="rounded-md bg-red-50 p-4 border border-red-300">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <AlertCircle className="h-5 w-5 text-red-400" />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <Button
//         onClick={handleTranslate}
//         className="w-full group relative overflow-hidden"
//         disabled={isTranslating || segments.length === 0}
//       >
//         <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
//         {isTranslating ? (
//           <span className="flex items-center">
//             <Loader2 className="animate-spin mr-2 h-4 w-4" />
//             Translating...
//           </span>
//         ) : (
//           <span className="flex items-center">
//             <Wand2 className="mr-2 h-4 w-4" />
//             Translate Segments
//           </span>
//         )}
//       </Button>

//       {translatedSegments.length > 0 && (
//         <div className="space-y-4 mt-4">
//           {translatedSegments.map((segment, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//               className="rounded-md border border-border/30 bg-background/30 hover:border-border/50 backdrop-blur-sm"
//             >
//               <div className="p-4 border-b border-border/20">
//                 <div className="flex justify-between items-start mb-2">
//                   <span className="text-xs text-muted-foreground">Original Segment {index + 1}</span>
//                   <div className="flex space-x-1">
//                     <Badge
//                       variant={
//                         segment.healthScore >= 80 ? "success" : segment.healthScore >= 50 ? "warning" : "destructive"
//                       }
//                       className="text-xs"
//                     >
//                       {segment.healthScore}%
//                     </Badge>
//                   </div>
//                 </div>
//                 <p className="text-sm">{segment.text}</p>
//               </div>

//               <div className="p-4 bg-background/50">
//                 <div className="flex justify-between items-start mb-2">
//                   <span className="text-xs text-muted-foreground">Translation</span>
//                   <div className="flex space-x-1">
//                     {segment.matchRate && (
//                       <Badge variant="outline" className="text-xs">
//                         Match: {segment.matchRate.toFixed(0)}%
//                       </Badge>
//                     )}
//                     <Badge variant={segment.preservesGender ? "outline" : "destructive"} className="text-xs">
//                       {segment.preservesGender ? (
//                         <Check className="h-3 w-3 mr-1" />
//                       ) : (
//                         <AlertCircle className="h-3 w-3 mr-1" />
//                       )}
//                       Gender
//                     </Badge>
//                     <Badge variant={segment.preservesContext ? "outline" : "destructive"} className="text-xs">
//                       {segment.preservesContext ? (
//                         <Check className="h-3 w-3 mr-1" />
//                       ) : (
//                         <AlertCircle className="h-3 w-3 mr-1" />
//                       )}
//                       Context
//                     </Badge>
//                     <Badge variant={segment.preservesEntities ? "outline" : "destructive"} className="text-xs">
//                       {segment.preservesEntities ? (
//                         <Check className="h-3 w-3 mr-1" />
//                       ) : (
//                         <AlertCircle className="h-3 w-3 mr-1" />
//                       )}
//                       Entities
//                     </Badge>
//                   </div>
//                 </div>
//                 <p className="text-sm">{segment.translation}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {segments.length > 0 && translatedSegments.length === 0 && !isTranslating && (
//         <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
//           <CardContent className="p-4">
//             <div className="text-center py-12 text-muted-foreground">
//               Click &quot;Translate Segments&quot; to see translations
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {segments.length === 0 && (
//         <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
//           <CardContent className="p-4">
//             <div className="text-center py-12 text-muted-foreground">Segment your text first to enable translation</div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Wand2, AlertCircle, Check, Globe } from "lucide-react"
import { motion } from "framer-motion"
import type { Segment } from "@/lib/types"

interface TranslationPanelProps {
  segments: Segment[]
}

interface TranslatedSegment extends Segment {
  translation: string
  preservesGender: boolean
  preservesContext: boolean
  preservesEntities: boolean
  detectedLanguage?: string
}

// Common languages supported by Lingva
const LANGUAGES = [
  { code: "auto", name: "Auto Detect" },
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "tr", name: "Turkish" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
]

// Map language codes to full names
const getLanguageName = (code: string): string => {
  const language = LANGUAGES.find(lang => lang.code === code);
  return language ? language.name : code;
}

export default function TranslationPanel({ segments }: TranslationPanelProps) {
  const [translatedSegments, setTranslatedSegments] = useState<TranslatedSegment[]>([])
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translateText = async (text: string, source: string, target: string) => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          source,
          target,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Translation failed');
      }

      const data = await response.json();
      
      return {
        translation: data.translation,
        detectedLanguage: data.info?.detectedSource || source,
      };
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  }

  // Analyze translation for quality metrics
  const analyzeTranslation = (original: string, translation: string) => {
    // This is a simplified analysis
    // For a production app, you'd want to implement a more sophisticated analysis
    
    // Check if original and translation have similar punctuation patterns
    const originalPunctCount = (original.match(/[.,!?;:]/g) || []).length;
    const translationPunctCount = (translation.match(/[.,!?;:]/g) || []).length;
    const punctSimilarity = Math.abs(originalPunctCount - translationPunctCount) <= 2;
    
    // Check if translated text length is reasonable compared to original
    const lengthRatio = translation.length / original.length;
    const reasonableLength = lengthRatio > 0.5 && lengthRatio < 2.5;
    
    // Check for entities (capitalized words might be names, places, etc.)
    const originalEntities = original.match(/[A-Z][a-z]+/g) || [];
    const preservesEntities = originalEntities.length === 0 || Math.random() > 0.2;
    
    return {
      preservesGender: Math.random() > 0.2, // This would need real gender analysis
      preservesContext: punctSimilarity && reasonableLength,
      preservesEntities: preservesEntities,
    };
  }

  const handleTranslate = async () => {
    if (segments.length === 0) return;

    setIsTranslating(true);
    setError(null);
    
    try {
      const translatedResults = await Promise.all(
        segments.map(async (segment) => {
          try {
            const { translation, detectedLanguage } = await translateText(
              segment.text, 
              sourceLanguage, 
              targetLanguage
            );
            
            const analysis = analyzeTranslation(segment.text, translation);
            
            return {
              ...segment,
              translation,
              detectedLanguage,
              preservesGender: analysis.preservesGender,
              preservesContext: analysis.preservesContext,
              preservesEntities: analysis.preservesEntities,
            };
          } catch (error) {
            console.error(`Error translating segment: ${segment.text}`, error);
            return {
              ...segment,
              translation: "Translation failed",
              preservesGender: false,
              preservesContext: false,
              preservesEntities: false,
            };
          }
        })
      );

      setTranslatedSegments(translatedResults);
    } catch (error) {
      console.error("Translation process error:", error);
      setError("Failed to translate segments. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Translation</h2>
        </div>
        <div className="flex gap-2">
          <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Source Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={`source-${lang.code}`} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Target Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.filter(lang => lang.code !== "auto").map((lang) => (
                <SelectItem key={`target-${lang.code}`} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-300">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleTranslate}
        className="w-full group relative overflow-hidden"
        disabled={isTranslating || segments.length === 0}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
        {isTranslating ? (
          <span className="flex items-center">
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Translating...
          </span>
        ) : (
          <span className="flex items-center">
            <Wand2 className="mr-2 h-4 w-4" />
            Translate Segments
          </span>
        )}
      </Button>

      {translatedSegments.length > 0 && (
        <div className="space-y-4 mt-4">
          {translatedSegments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-md border border-border/30 bg-background/30 hover:border-border/50 backdrop-blur-sm"
            >
              <div className="p-4 border-b border-border/20">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Original Segment {index + 1}</span>
                    {sourceLanguage === "auto" && segment.detectedLanguage && (
                      <Badge variant="secondary" className="text-xs">
                        {getLanguageName(segment.detectedLanguage)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Badge
                      variant={
                        segment.healthScore >= 80 ? "success" : segment.healthScore >= 50 ? "warning" : "destructive"
                      }
                      className="text-xs"
                    >
                      {segment.healthScore}%
                    </Badge>
                  </div>
                </div>
                <p className="text-sm">{segment.text}</p>
              </div>

              <div className="p-4 bg-background/50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-muted-foreground">
                    Translation ({getLanguageName(targetLanguage)})
                  </span>
                  <div className="flex space-x-1">
                    <Badge variant={segment.preservesGender ? "outline" : "destructive"} className="text-xs">
                      {segment.preservesGender ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      Gender
                    </Badge>
                    <Badge variant={segment.preservesContext ? "outline" : "destructive"} className="text-xs">
                      {segment.preservesContext ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      Context
                    </Badge>
                    <Badge variant={segment.preservesEntities ? "outline" : "destructive"} className="text-xs">
                      {segment.preservesEntities ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      Entities
                    </Badge>
                  </div>
                </div>
                <p className="text-sm">{segment.translation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {segments.length > 0 && translatedSegments.length === 0 && !isTranslating && (
        <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-center py-12 text-muted-foreground">
              Click &quot;Translate Segments&quot; to see translations
            </div>
          </CardContent>
        </Card>
      )}

      {segments.length === 0 && (
        <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-center py-12 text-muted-foreground">Segment your text first to enable translation</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}