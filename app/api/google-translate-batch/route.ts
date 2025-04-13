// File: /app/api/google-translate-batch/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { texts, source, target } = await request.json();
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!texts || !texts.length || !target) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Direct call to Google Translate API using API key
    const url = new URL('https://translation.googleapis.com/language/translate/v2');
    url.searchParams.append('key', apiKey);
    
    const body: { q: string[]; target: string; format: string; source?: string } = {
      q: texts, // Send multiple texts in an array for batch processing
      target: target,
      format: 'text',
    };
    
    // Add source language only if specified (not "auto")
    if (source && source !== "auto") {
      body.source = source;
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Translation API error');
    }

    const data = await response.json();
    
    // Check if we have a valid response
    if (!data.data?.translations) {
      throw new Error('Invalid response from translation API');
    }

    // Map translation results to include detected languages and quality metrics
    const translations = data.data.translations.map((translation: { translatedText: string; detectedSourceLanguage?: string }, index: number) => {
      // Analyze quality metrics based on length ratios and other heuristics
      const originalLength = texts[index].length;
      const translatedLength = translation.translatedText.length;
      const lengthRatio = translatedLength / originalLength;
      
      // Simple heuristic for confidence - this could be more sophisticated
      let estimatedConfidence = 0.85;
      if (lengthRatio < 0.3 || lengthRatio > 3) {
        estimatedConfidence = 0.6; // Suspicious length ratio
      }
      
      return {
        translation: translation.translatedText,
        detectedSourceLanguage: translation.detectedSourceLanguage,
        confidence: estimatedConfidence,
      };
    });

    return NextResponse.json({ translations });
  } catch (error: any) {
    console.error('Google Translate API error:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to translate text' },
      { status: 500 }
    );
  }
}