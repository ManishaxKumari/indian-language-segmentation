// 1. API Route Implementation - Create this file at: /app/api/translate/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Configure with your preferred Lingva instance
const LINGVA_BASE_URL = "https://lingva.ml";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, source, target } = body;
    
    if (!text || !target) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Validate inputs
    if (typeof text !== 'string' || text.length > 5000) {
      return NextResponse.json(
        { error: "Text must be a string with maximum 5000 characters" },
        { status: 400 }
      );
    }

    const sourceParam = source || "auto";
    
    // Call Lingva API
    const lingvaUrl = `${LINGVA_BASE_URL}/api/v1/${sourceParam}/${target}/${encodeURIComponent(text)}`;
    
    const response = await fetch(lingvaUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Translation API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}