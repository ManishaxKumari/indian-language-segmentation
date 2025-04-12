// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { Download, SplitSquareVertical, Merge, MoveVertical, Wand2 } from "lucide-react"
// import SegmentList from "@/components/segment-list"
// import { segmentText, analyzeSegment } from "@/lib/segmentation"
// import type { Segment } from "@/lib/types"

// export default function SegmentationTool() {
//   const [language, setLanguage] = useState("hindi")
//   const [inputText, setInputText] = useState("")
//   const [segments, setSegments] = useState<Segment[]>([])
//   const [showAnnotations, setShowAnnotations] = useState(true)
//   const [selectedSegments, setSelectedSegments] = useState<number[]>([])
//   const [isProcessing, setIsProcessing] = useState(false)

//   useEffect(() => {
//     if (inputText.trim()) {
//       const newSegments = segmentText(inputText, language)
//       setSegments(newSegments)
//     } else {
//       setSegments([])
//     }
//   }, [inputText, language])

//   const handleSegment = () => {
//     if (inputText.trim()) {
//       setIsProcessing(true)
//       // Simulate processing delay for better UX
//       setTimeout(() => {
//         const newSegments = segmentText(inputText, language)
//         setSegments(newSegments)
//         setIsProcessing(false)
//       }, 600)
//     }
//   }

//   const handleMergeSegments = () => {
//     if (selectedSegments.length < 2) return

//     // Sort selected segments
//     const sortedIndices = [...selectedSegments].sort((a, b) => a - b)

//     // Create a new array of segments
//     const newSegments = [...segments]

//     // Get the first selected segment
//     const firstIndex = sortedIndices[0]

//     // Merge content into the first segment
//     for (let i = 1; i < sortedIndices.length; i++) {
//       const currentIndex = sortedIndices[i] - (i - 1) // Adjust for already removed segments
//       newSegments[firstIndex].text += " " + newSegments[currentIndex].text
//       newSegments.splice(currentIndex, 1)
//     }

//     // Re-analyze the merged segment
//     newSegments[firstIndex] = analyzeSegment(newSegments[firstIndex].text, language)

//     setSegments(newSegments)
//     setSelectedSegments([])
//   }

//   const handleSplitSegment = () => {
//     if (selectedSegments.length !== 1) return

//     const index = selectedSegments[0]
//     const segmentToSplit = segments[index]

//     // Simple split at the middle for demonstration
//     // In a real implementation, you would use NLP to find natural break points
//     const midpoint = Math.floor(segmentToSplit.text.length / 2)
//     const firstHalf = segmentToSplit.text.substring(0, midpoint)
//     const secondHalf = segmentToSplit.text.substring(midpoint)

//     const newSegments = [...segments]
//     newSegments[index] = analyzeSegment(firstHalf, language)
//     newSegments.splice(index + 1, 0, analyzeSegment(secondHalf, language))

//     setSegments(newSegments)
//     setSelectedSegments([])
//   }

//   const handleExport = (format: string) => {
//     let content = ""
//     let filename = `segmented-text-${new Date().toISOString().slice(0, 10)}`

//     if (format === "txt") {
//       content = segments.map((s) => s.text).join("\n\n")
//       filename += ".txt"
//     } else if (format === "csv") {
//       content = "Segment,Health Score,Gender Clear,Context Complete\n"
//       content += segments
//         .map((s) => `"${s.text.replace(/"/g, '""')}",${s.healthScore},${s.genderClear},${s.contextComplete}`)
//         .join("\n")
//       filename += ".csv"
//     } else if (format === "json") {
//       content = JSON.stringify(segments, null, 2)
//       filename += ".json"
//     }

//     const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
//     const url = URL.createObjectURL(blob)
//     const link = document.createElement("a")
//     link.href = url
//     link.download = filename
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">Input Text</h2>
//           <Select value={language} onValueChange={setLanguage}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select Language" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="hindi">Hindi</SelectItem>
//               <SelectItem value="tamil">Tamil</SelectItem>
//               <SelectItem value="telugu">Telugu</SelectItem>
//               <SelectItem value="bengali">Bengali</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <Textarea
//           placeholder={`Enter ${language} text here...`}
//           className="min-h-[300px] bg-background/50 border-border/50 focus:border-primary"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />

//         <Button
//           onClick={handleSegment}
//           className="w-full group relative overflow-hidden"
//           disabled={isProcessing || !inputText.trim()}
//         >
//           <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
//           {isProcessing ? (
//             <span className="flex items-center">
//               <svg
//                 className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Processing...
//             </span>
//           ) : (
//             <span className="flex items-center">
//               <Wand2 className="mr-2 h-4 w-4" />
//               Segment Text
//             </span>
//           )}
//         </Button>
//       </div>

//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">Segmented Output</h2>
//           <div className="flex items-center space-x-2">
//             <Switch id="annotations" checked={showAnnotations} onCheckedChange={setShowAnnotations} />
//             <Label htmlFor="annotations">Show Annotations</Label>
//           </div>
//         </div>

//         <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
//           <CardContent className="p-4">
//             {segments.length > 0 ? (
//               <SegmentList
//                 segments={segments}
//                 showAnnotations={showAnnotations}
//                 selectedSegments={selectedSegments}
//                 setSelectedSegments={setSelectedSegments}
//               />
//             ) : (
//               <div className="text-center py-12 text-muted-foreground">
//                 Enter text and click &quot;Segment Text&quot; to see results
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex flex-wrap gap-2">
//           <Button
//             variant="secondary"
//             size="sm"
//             onClick={handleMergeSegments}
//             disabled={selectedSegments.length < 2}
//             className="bg-background/50 hover:bg-background/80"
//           >
//             <Merge className="h-4 w-4 mr-2" />
//             Merge Segments
//           </Button>

//           <Button
//             variant="secondary"
//             size="sm"
//             onClick={handleSplitSegment}
//             disabled={selectedSegments.length !== 1}
//             className="bg-background/50 hover:bg-background/80"
//           >
//             <SplitSquareVertical className="h-4 w-4 mr-2" />
//             Split Segment
//           </Button>

//           <Button variant="secondary" size="sm" disabled={true} className="bg-background/50 hover:bg-background/80">
//             <MoveVertical className="h-4 w-4 mr-2" />
//             Rearrange
//           </Button>

//           <Separator orientation="vertical" className="h-8" />

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleExport("txt")}
//             disabled={segments.length === 0}
//             className="border-border/50 hover:bg-background/80"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export TXT
//           </Button>

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleExport("csv")}
//             disabled={segments.length === 0}
//             className="border-border/50 hover:bg-background/80"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export CSV
//           </Button>

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleExport("json")}
//             disabled={segments.length === 0}
//             className="border-border/50 hover:bg-background/80"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export JSON
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Download, SplitSquareVertical, Merge, MoveVertical, Wand2 } from "lucide-react"
import SegmentList from "@/components/segment-list"
import { segmentText, analyzeSegment } from "@/lib/segmentation"
import type { Segment } from "@/lib/types"

interface SegmentationToolProps {
  onSegmentsChange?: (segments: Segment[]) => void
}

export default function SegmentationTool({ onSegmentsChange }: SegmentationToolProps) {
  const [language, setLanguage] = useState("hindi")
  const [inputText, setInputText] = useState("")
  const [segments, setSegments] = useState<Segment[]>([])
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [selectedSegments, setSelectedSegments] = useState<number[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (inputText.trim()) {
      const newSegments = segmentText(inputText, language)
      setSegments(newSegments)
      if (onSegmentsChange) {
        onSegmentsChange(newSegments)
      }
    } else {
      setSegments([])
      if (onSegmentsChange) {
        onSegmentsChange([])
      }
    }
  }, [inputText, language, onSegmentsChange])

  const handleSegment = () => {
    if (inputText.trim()) {
      setIsProcessing(true)
      // Simulate processing delay for better UX
      setTimeout(() => {
        const newSegments = segmentText(inputText, language)
        setSegments(newSegments)
        if (onSegmentsChange) {
          onSegmentsChange(newSegments)
        }
        setIsProcessing(false)
      }, 600)
    }
  }

  const handleMergeSegments = () => {
    if (selectedSegments.length < 2) return

    // Sort selected segments
    const sortedIndices = [...selectedSegments].sort((a, b) => a - b)

    // Create a new array of segments
    const newSegments = [...segments]

    // Get the first selected segment
    const firstIndex = sortedIndices[0]

    // Merge content into the first segment
    for (let i = 1; i < sortedIndices.length; i++) {
      const currentIndex = sortedIndices[i] - (i - 1) // Adjust for already removed segments
      newSegments[firstIndex].text += " " + newSegments[currentIndex].text
      newSegments.splice(currentIndex, 1)
    }

    // Re-analyze the merged segment
    newSegments[firstIndex] = analyzeSegment(newSegments[firstIndex].text, language)

    setSegments(newSegments)
    if (onSegmentsChange) {
      onSegmentsChange(newSegments)
    }
    setSelectedSegments([])
  }

  const handleSplitSegment = () => {
    if (selectedSegments.length !== 1) return

    const index = selectedSegments[0]
    const segmentToSplit = segments[index]

    // Simple split at the middle for demonstration
    // In a real implementation, you would use NLP to find natural break points
    const midpoint = Math.floor(segmentToSplit.text.length / 2)
    const firstHalf = segmentToSplit.text.substring(0, midpoint)
    const secondHalf = segmentToSplit.text.substring(midpoint)

    const newSegments = [...segments]
    newSegments[index] = analyzeSegment(firstHalf, language)
    newSegments.splice(index + 1, 0, analyzeSegment(secondHalf, language))

    setSegments(newSegments)
    if (onSegmentsChange) {
      onSegmentsChange(newSegments)
    }
    setSelectedSegments([])
  }

  const handleExport = (format: string) => {
    let content = ""
    let filename = `segmented-text-${new Date().toISOString().slice(0, 10)}`

    if (format === "txt") {
      content = segments.map((s) => s.text).join("\n\n")
      filename += ".txt"
    } else if (format === "csv") {
      content = "Segment,Health Score,Gender Clear,Context Complete\n"
      content += segments
        .map((s) => `"${s.text.replace(/"/g, '""')}",${s.healthScore},${s.genderClear},${s.contextComplete}`)
        .join("\n")
      filename += ".csv"
    } else if (format === "json") {
      content = JSON.stringify(segments, null, 2)
      filename += ".json"
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Input Text</h2>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="tamil">Tamil</SelectItem>
              <SelectItem value="telugu">Telugu</SelectItem>
              <SelectItem value="bengali">Bengali</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Textarea
          placeholder={`Enter ${language} text here...`}
          className="min-h-[300px] bg-background/50 border-border/50 focus:border-primary"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <Button
          onClick={handleSegment}
          className="w-full group relative overflow-hidden"
          disabled={isProcessing || !inputText.trim()}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
          {isProcessing ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <Wand2 className="mr-2 h-4 w-4" />
              Segment Text
            </span>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Segmented Output</h2>
          <div className="flex items-center space-x-2">
            <Switch id="annotations" checked={showAnnotations} onCheckedChange={setShowAnnotations} />
            <Label htmlFor="annotations">Show Annotations</Label>
          </div>
        </div>

        <Card className="border border-border/50 bg-background/50 backdrop-blur-sm">
          <CardContent className="p-4">
            {segments.length > 0 ? (
              <SegmentList
                segments={segments}
                showAnnotations={showAnnotations}
                selectedSegments={selectedSegments}
                setSelectedSegments={setSelectedSegments}
              />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Enter text and click &quot;Segment Text&quot; to see results
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMergeSegments}
            disabled={selectedSegments.length < 2}
            className="bg-background/50 hover:bg-background/80"
          >
            <Merge className="h-4 w-4 mr-2" />
            Merge Segments
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleSplitSegment}
            disabled={selectedSegments.length !== 1}
            className="bg-background/50 hover:bg-background/80"
          >
            <SplitSquareVertical className="h-4 w-4 mr-2" />
            Split Segment
          </Button>

          <Button variant="secondary" size="sm" disabled={true} className="bg-background/50 hover:bg-background/80">
            <MoveVertical className="h-4 w-4 mr-2" />
            Rearrange
          </Button>

          <Separator orientation="vertical" className="h-8" />

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("txt")}
            disabled={segments.length === 0}
            className="border-border/50 hover:bg-background/80"
          >
            <Download className="h-4 w-4 mr-2" />
            Export TXT
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
            disabled={segments.length === 0}
            className="border-border/50 hover:bg-background/80"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("json")}
            disabled={segments.length === 0}
            className="border-border/50 hover:bg-background/80"
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>
    </div>
  )
}

