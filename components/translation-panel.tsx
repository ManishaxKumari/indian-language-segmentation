"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Wand2, AlertCircle, Check } from "lucide-react"
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
}

export default function TranslationPanel({ segments }: TranslationPanelProps) {
  const [translatedSegments, setTranslatedSegments] = useState<TranslatedSegment[]>([])
  const [translationModel, setTranslationModel] = useState("gpt-4")
  const [isTranslating, setIsTranslating] = useState(false)

  const handleTranslate = async () => {
    if (segments.length === 0) return

    setIsTranslating(true)

    // Simulate API call with timeout
    setTimeout(() => {
      const translated = segments.map((segment) => {
        // This is a mock translation - in a real implementation,
        // you would call an actual translation API
        return {
          ...segment,
          translation: mockTranslate(segment.text),
          preservesGender: Math.random() > 0.2, // Simulating analysis
          preservesContext: Math.random() > 0.15,
          preservesEntities: Math.random() > 0.1,
        }
      })

      setTranslatedSegments(translated)
      setIsTranslating(false)
    }, 1500)
  }

  // Mock translation function - replace with actual API call
  const mockTranslate = (text: string): string => {
    // This is just a placeholder - in a real implementation,
    // you would call a translation API
    const mockTranslations: Record<string, string> = {
      "वह अपने भाई के साथ बाजार गया।": "He went to the market with his brother.",
      "वह अपनी बहन के साथ बाजार गई।": "She went to the market with her sister.",
      "राम ने कहा कि वह कल आएगा।": "Ram said that he would come tomorrow.",
      "सीता ने कहा कि वह कल आएगी।": "Sita said that she would come tomorrow.",
      "मेरा नाम अमित है।": "My name is Amit.",
      "अवनी कल दिल्ली जा रही है।": "Avni is going to Delhi tomorrow.",
      "उसने खाना खाया।": "He/she ate food.",
      "मैं कल सुबह जल्दी उठूंगा।": "I will wake up early tomorrow morning.",
      "हमारे गांव में एक पुराना मंदिर है।": "There is an ancient temple in our village.",
      "दीपावली के त्योहार पर लोग दीये जलाते हैं।": "People light lamps during the festival of Diwali.",
    }

    // Return mock translation if available, otherwise return placeholder
    return (
      mockTranslations[text] ||
      "This is a translated version of the text that preserves gender, tense, and cultural context."
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Translation</h2>
        <Select value={translationModel} onValueChange={setTranslationModel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
            <SelectItem value="mbart">mBART</SelectItem>
            <SelectItem value="google">Google Translate</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
                  <span className="text-xs text-muted-foreground">Original Segment {index + 1}</span>
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
                  <span className="text-xs text-muted-foreground">Translation</span>
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
