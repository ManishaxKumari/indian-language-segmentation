"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SegmentationTool from "@/components/segmentation-tool"
import TranslationPanel from "@/components/translation-panel"
import { useState } from "react"
import type { Segment } from "@/lib/types"

export default function Home() {
  const [segments, setSegments] = useState<Segment[]>([])
  return (
    <main className="container mx-auto py-10 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
           BhashaSplit
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg ">
          Retaining the soul of Indian languages in every translation – context, gender, and meaning intact
          </p>
        </div>

        <div className="backdrop-blur-sm bg-background/30 border border-border/40 rounded-xl shadow-lg overflow-hidden">
          <Tabs defaultValue="tool" className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="tool"> Magic Segmentation Tool</TabsTrigger>
                <TabsTrigger value="translation">Translation</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="tool" className="p-6">
              <SegmentationTool onSegmentsChange={setSegments} />
            </TabsContent>

            <TabsContent value="translation" className="p-6">
              <TranslationPanel segments={segments} />
            </TabsContent>

            <TabsContent value="about" className="p-6">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About This Tool</h2>
                <p>
                This tool is purpose-built for Indian languages to enhance translation quality through intelligent text segmentation:
                </p>
        

                <h3 className="text-2xl font-semibold mt-6 mb-3">Key Features</h3>
                <ul className="my-4 space-y-2">
                  <li>1. Preserving gender information and context</li>
                  <li>2. Creating segments that have complete meaning</li>
                  <li>3. Highlighting important linguistic elements</li>
                  <li>4. Providing health scores for each segment</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-6 mb-3"> Supported Languages</h3>
                <ul className="my-4 space-y-2">
                  <li>Hindi</li>
                  <li>Tamil</li>
                  <li>Telugu</li>
                  <li>Bengali</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-6 mb-3"> How It Works</h3>
                <p>
                Our tool uses language-specific linguistic rules to detect natural segment boundaries. It pays special attention to critical elements such as gender markers, context-bearing words, and named entities, ensuring translations stay faithful to the original meaning.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
