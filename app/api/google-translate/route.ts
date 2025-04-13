// // 1. API Route Implementation - Create this file at: /app/api/translate/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// // Configure with your preferred Lingva instance
// const LINGVA_BASE_URL = "https://lingva.ml";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { text, source, target } = body;
    
//     if (!text || !target) {
//       return NextResponse.json(
//         { error: "Missing required parameters" },
//         { status: 400 }
//       );
//     }

//     // Validate inputs
//     if (typeof text !== 'string' || text.length > 5000) {
//       return NextResponse.json(
//         { error: "Text must be a string with maximum 5000 characters" },
//         { status: 400 }
//       );
//     }

//     const sourceParam = source || "auto";
    
//     // Call Lingva API
//     const lingvaUrl = `${LINGVA_BASE_URL}/api/v1/${sourceParam}/${target}/${encodeURIComponent(text)}`;
    
//     const response = await fetch(lingvaUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return NextResponse.json(
//         { error: `Translation API error: ${errorText}` },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
    
//   } catch (error) {
//     console.error('Translation error:', error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// File: /app/api/google-translate/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, source, target } = await request.json();
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!text || !target) {
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
    
    const body: { q: string; target: string; format: string; source?: string } = {
      q: text,
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
    if (!data.data?.translations?.[0]) {
      throw new Error('Invalid response from translation API');
    }

    const translation = data.data.translations[0];
    
    // Analyze quality metrics
    const originalLength = text.length;
    const translatedLength = translation.translatedText.length;
    const lengthRatio = translatedLength / originalLength;
    
    // Simple heuristic for confidence
    let estimatedConfidence = 0.85;
    if (lengthRatio < 0.3 || lengthRatio > 3) {
      estimatedConfidence = 0.6; // Suspicious length ratio
    }
    
    return NextResponse.json({
      translation: translation.translatedText,
      detectedSourceLanguage: translation.detectedSourceLanguage,
      confidence: estimatedConfidence,
    });
  } catch (error: any) {
    console.error('Google Translate API error:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to translate text' },
      { status: 500 }
    );
  }
}