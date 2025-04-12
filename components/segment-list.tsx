// "use client"
// import { useState } from "react"
// import type { Segment } from "@/lib/types"
// import { Badge } from "@/components/ui/badge"
// import { Check, X, AlertCircle } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { motion } from "framer-motion"

// interface SegmentListProps {
//   segments: Segment[]
//   showAnnotations: boolean
//   selectedSegments: number[]
//   setSelectedSegments: (segments: number[]) => void
// }

// export default function SegmentList({
//   segments,
//   showAnnotations,
//   selectedSegments,
//   setSelectedSegments,
// }: SegmentListProps) {
//   const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

//   const toggleSegmentSelection = (index: number) => {
//     if (selectedSegments.includes(index)) {
//       setSelectedSegments(selectedSegments.filter((i) => i !== index))
//     } else {
//       setSelectedSegments([...selectedSegments, index])
//     }
//   }

//   return (
//     <div className="space-y-4">
//       {segments.map((segment, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: index * 0.05 }}
//           className={cn(
//             "p-4 rounded-md border transition-all",
//             selectedSegments.includes(index)
//               ? "border-indigo-500 bg-indigo-500/10"
//               : hoveredSegment === index
//                 ? "border-border/80 bg-background/80"
//                 : "border-border/30 bg-background/30 hover:border-border/50",
//             "backdrop-blur-sm",
//           )}
//           onClick={() => toggleSegmentSelection(index)}
//           onMouseEnter={() => setHoveredSegment(index)}
//           onMouseLeave={() => setHoveredSegment(null)}
//         >
//           <div className="flex justify-between items-start mb-2">
//             <span className="text-xs text-muted-foreground">Segment {index + 1}</span>
//             <div className="flex space-x-1">
//               <Badge
//                 variant={segment.healthScore >= 80 ? "success" : segment.healthScore >= 50 ? "warning" : "destructive"}
//                 className="text-xs"
//               >
//                 {segment.healthScore}%
//               </Badge>

//               {showAnnotations && (
//                 <>
//                   <Badge variant={segment.contextComplete ? "outline" : "destructive"} className="text-xs">
//                     {segment.contextComplete ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
//                     Context
//                   </Badge>

//                   <Badge variant={segment.genderClear ? "outline" : "destructive"} className="text-xs">
//                     {segment.genderClear ? (
//                       <Check className="h-3 w-3 mr-1" />
//                     ) : (
//                       <AlertCircle className="h-3 w-3 mr-1" />
//                     )}
//                     Gender
//                   </Badge>
//                 </>
//               )}
//             </div>
//           </div>

//           <p className="text-sm">{segment.text}</p>

//           {showAnnotations && segment.entities.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               className="mt-2 flex flex-wrap gap-1"
//             >
//               {segment.entities.map((entity, i) => (
//                 <Badge key={i} variant="secondary" className="text-xs">
//                   {entity.type}: {entity.text}
//                 </Badge>
//               ))}
//             </motion.div>
//           )}
//         </motion.div>
//       ))}
//     </div>
//   )
// }
"use client"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, Check, Info } from "lucide-react"
import { motion } from "framer-motion"
import type { Segment } from "@/lib/types"

interface SegmentListProps {
  segments: Segment[]
  showAnnotations: boolean
  selectedSegments: number[]
  setSelectedSegments: (segments: number[]) => void
}

export default function SegmentList({
  segments,
  showAnnotations,
  selectedSegments,
  setSelectedSegments,
}: SegmentListProps) {
  const toggleSegmentSelection = (index: number) => {
    if (selectedSegments.includes(index)) {
      setSelectedSegments(selectedSegments.filter((i) => i !== index))
    } else {
      setSelectedSegments([...selectedSegments, index])
    }
  }

  return (
    <div className="space-y-3">
      {segments.map((segment, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`rounded-md border p-3 flex items-start gap-3 ${
            selectedSegments.includes(index)
              ? "border-primary/50 bg-primary/5"
              : "border-border/30 bg-background/30 hover:border-border/50"
          }`}
        >
          <Checkbox
            checked={selectedSegments.includes(index)}
            onCheckedChange={() => toggleSegmentSelection(index)}
            className="mt-1"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">Segment {index + 1}</span>

              {showAnnotations && (
                <>
                  <Badge
                    variant={
                      segment.healthScore >= 80 ? "success" : segment.healthScore >= 50 ? "warning" : "destructive"
                    }
                    className="text-xs"
                  >
                    {segment.healthScore}%
                  </Badge>

                  <Badge variant={segment.contextComplete ? "outline" : "destructive"} className="text-xs">
                    {segment.contextComplete ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    Context
                  </Badge>

                  <Badge variant={segment.genderClear ? "outline" : "destructive"} className="text-xs">
                    {segment.genderClear ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    Gender
                  </Badge>
                </>
              )}
            </div>

            <p className="text-sm">{segment.text}</p>

            {showAnnotations && segment.entities.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                <TooltipProvider>
                  {segment.entities.map((entity, entityIndex) => (
                    <Tooltip key={entityIndex}>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="secondary"
                          className={`text-xs cursor-help ${
                            entity.type === "gender"
                              ? "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20"
                              : entity.type === "pronoun"
                                ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                                : entity.type === "name"
                                  ? "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
                                  : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          }`}
                        >
                          <Info className="h-3 w-3 mr-1" />
                          {entity.text}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          {entity.type.charAt(0).toUpperCase() + entity.type.slice(1)} at position {entity.position[0]}-
                          {entity.position[1]}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
