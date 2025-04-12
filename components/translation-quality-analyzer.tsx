"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Search } from "lucide-react"

export default function TranslationQualityAnalyzer() {
  const [originalText, setOriginalText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    overallScore: number
    genderAccuracy: number
    contextPreservation: number
    entityPreservation: number
    culturalNuance: number
    issues: string[]
  } | null>(null)

  const handleAnalyze = () => {
    if (!originalText.trim() || !translatedText.trim()) return

    setIsAnalyzing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock analysis result
      setAnalysisResult({
        overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
        genderAccuracy: Math.floor(Math.random() * 30) + 70,
        contextPreservation: Math.floor(Math.random() * 30) + 70,
        entityPreservation: Math.floor(Math.random() * 30) + 70,
        culturalNuance: Math.floor(Math.random() * 30) + 70,
        issues: [
          "Potential gender ambiguity in segment 2",
          "Cultural reference 'Diwali' could be clarified",
          "Named entity 'Ganga' preserved but context may be unclear",
        ].filter(() => Math.random() > 0.5),
      })

      setIsAnalyzing(false)
    }, 1500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-blue-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Original Text</h3>
          <Textarea
            placeholder="Paste original Indian language text here..."
            className="min-h-[200px] bg-background/50 border-border/50"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Translated Text</h3>
          <Textarea
            placeholder="Paste English translation here..."
            className="min-h-[200px] bg-background/50 border-border/50"
            value={translatedText}
            onChange={(e) => setTranslatedText(e.target.value)}
          />
        </div>
      </div>

      <Button
        onClick={handleAnalyze}
        className="w-full"
        disabled={isAnalyzing || !originalText.trim() || !translatedText.trim()}
      >
        {isAnalyzing ? (
          <span className="flex items-center">
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Analyzing Translation Quality...
          </span>
        ) : (
          <span className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Analyze Translation Quality
          </span>
        )}
      </Button>

      {analysisResult && (
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Translation Quality Analysis</span>
              <Badge
                variant={
                  analysisResult.overallScore >= 90
                    ? "success"
                    : analysisResult.overallScore >= 80
                      ? "outline"
                      : analysisResult.overallScore >= 70
                        ? "warning"
                        : "destructive"
                }
                className="text-sm"
              >
                Overall Score: {analysisResult.overallScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Gender Accuracy</span>
                <span className={`text-sm font-medium ${getScoreColor(analysisResult.genderAccuracy)}`}>
                  {analysisResult.genderAccuracy}%
                </span>
              </div>
              <Progress value={analysisResult.genderAccuracy} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Context Preservation</span>
                <span className={`text-sm font-medium ${getScoreColor(analysisResult.contextPreservation)}`}>
                  {analysisResult.contextPreservation}%
                </span>
              </div>
              <Progress value={analysisResult.contextPreservation} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Entity Preservation</span>
                <span className={`text-sm font-medium ${getScoreColor(analysisResult.entityPreservation)}`}>
                  {analysisResult.entityPreservation}%
                </span>
              </div>
              <Progress value={analysisResult.entityPreservation} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Cultural Nuance</span>
                <span className={`text-sm font-medium ${getScoreColor(analysisResult.culturalNuance)}`}>
                  {analysisResult.culturalNuance}%
                </span>
              </div>
              <Progress value={analysisResult.culturalNuance} className="h-2" />
            </div>

            {analysisResult.issues.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Potential Issues</h4>
                <ul className="space-y-1">
                  {analysisResult.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
