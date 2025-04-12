"use client"
import { useState } from "react"
import type { Segment } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  const toggleSegmentSelection = (index: number) => {
    if (selectedSegments.includes(index)) {
      setSelectedSegments(selectedSegments.filter((i) => i !== index))
    } else {
      setSelectedSegments([...selectedSegments, index])
    }
  }

  return (
    <div className="space-y-4">
      {segments.map((segment, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={cn(
            "p-4 rounded-md border transition-all",
            selectedSegments.includes(index)
              ? "border-indigo-500 bg-indigo-500/10"
              : hoveredSegment === index
                ? "border-border/80 bg-background/80"
                : "border-border/30 bg-background/30 hover:border-border/50",
            "backdrop-blur-sm",
          )}
          onClick={() => toggleSegmentSelection(index)}
          onMouseEnter={() => setHoveredSegment(index)}
          onMouseLeave={() => setHoveredSegment(null)}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-muted-foreground">Segment {index + 1}</span>
            <div className="flex space-x-1">
              <Badge
                variant={segment.healthScore >= 80 ? "success" : segment.healthScore >= 50 ? "warning" : "destructive"}
                className="text-xs"
              >
                {segment.healthScore}%
              </Badge>

              {showAnnotations && (
                <>
                  <Badge variant={segment.contextComplete ? "outline" : "destructive"} className="text-xs">
                    {segment.contextComplete ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
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
          </div>

          <p className="text-sm">{segment.text}</p>

          {showAnnotations && segment.entities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 flex flex-wrap gap-1"
            >
              {segment.entities.map((entity, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {entity.type}: {entity.text}
                </Badge>
              ))}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
