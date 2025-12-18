import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { pytanie, odpowiedz } = await request.json();

    const client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1", 
    });

    const prompt = `Przeanalizuj odpowiedz ucznia na pytanie: "${pytanie}". Podziel odpowiedz na trzy kategorie: "dobrze", "srednio" i "zle".
    Odpowiedz ucznia: "${odpowiedz}".
    Dla każdego zdania zwróć:
    tekst: dokładne zdanie
    wynik: "dobrze" | "srednio" | "zle"
    wytlumaczenie: krótkie wyjaśnienie DLACZEGO

    Znaczenie ocen:
    dobrze - zdanie poprawne, pełne i zgodne z pytaniem
    srednio - częściowo poprawne, ale niepełne
    zle - błędne lub nie na temat

    ZWRÓĆ TYLKO POPRAWNY JSON w formacie:

      {
        "analiza": [
          {
            "tekst": "zdanie",
            "wynik": "dobrze" | "srednio" | "zle",
            "wytlumaczenie": "wyjaśnienie"
          }
        ]
      }
      `;

    const response = await client.chat.completions.create({
      model: "openai/gpt-4o", 
      messages: [
        { role: "system", content: "Jesteś nauczycielem, który analizuje odpowiedzi ucznia i tłumaczy błędy." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Brak odpowiedzi od AI");
    }
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

const parsed = JSON.parse(cleaned);


    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Błąd analizy." },
      { status: 500 }
    );
  }
}
