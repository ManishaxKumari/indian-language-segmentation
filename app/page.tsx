import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SegmentationTool from "@/components/segmentation-tool"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
            Indian Language Segmentation Tool
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Segment Indian language text while preserving context, gender information, and meaning for better
            translations.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-background/30 border border-border/40 rounded-xl shadow-lg overflow-hidden">
          <Tabs defaultValue="tool" className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="tool">Segmentation Tool</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="tool" className="p-6">
              <SegmentationTool />
            </TabsContent>

            <TabsContent value="about" className="p-6">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About This Tool</h2>
                <p>
                  This segmentation tool is designed specifically for Indian languages to improve translation quality
                  by:
                </p>
                <ul className="my-4 space-y-2">
                  <li>Preserving gender information and context</li>
                  <li>Creating segments that have complete meaning</li>
                  <li>Highlighting important linguistic elements</li>
                  <li>Providing health scores for each segment</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Supported Languages</h3>
                <ul className="my-4 space-y-2">
                  <li>Hindi</li>
                  <li>Tamil</li>
                  <li>Telugu</li>
                  <li>Bengali</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">How It Works</h3>
                <p>
                  The tool analyzes text using linguistic rules specific to Indian languages to identify natural segment
                  boundaries. It pays special attention to gender markers, pronouns, and named entities to ensure these
                  elements are preserved within appropriate contexts.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
