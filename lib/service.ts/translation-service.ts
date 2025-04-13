// Create this file at: /lib/services/translation-service.ts
// This provides a reusable service for translation that can be used anywhere in your app

const LINGVA_BASE_URL = "https://lingva.ml";

export interface TranslationResult {
  translation: string;
  detectedSource?: string;
  error?: string;
}

/**
 * Translate text using Lingva API (Google Translate underneath)
 */
export async function translateText(
  text: string, 
  source: string = "auto", 
  target: string = "en"
): Promise<TranslationResult> {
  // Use the internal API route to avoid CORS issues
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        source,
        target,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Translation failed');
    }

    const data = await response.json();
    
    return {
      translation: data.translation,
      detectedSource: data.info?.detectedSource,
    };
  } catch (error: any) {
    console.error("Translation error:", error);
    return {
      translation: "",
      error: error.message || "Failed to translate",
    };
  }
}

/**
 * Call Lingva API directly without the internal API route
 * Note: This may cause CORS issues if called from the browser
 */
export async function translateTextDirect(
  text: string, 
  source: string = "auto", 
  target: string = "en"
): Promise<TranslationResult> {
  try {
    const lingvaUrl = `${LINGVA_BASE_URL}/api/v1/${source}/${target}/${encodeURIComponent(text)}`;
    
    const response = await fetch(lingvaUrl);
    
    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.translation) {
      throw new Error("No translation returned");
    }
    
    return {
      translation: data.translation,
      detectedSource: data.info?.detectedSource,
    };
  } catch (error: any) {
    console.error("Translation error:", error);
    return {
      translation: "",
      error: error.message || "Failed to translate",
    };
  }
}