import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { pytanie, odpowiedz, trudnosc, typBroni } = await request.json();

    const client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1", 
    });

    const prompt = `Przeanalizuj odpowiedz ucznia na pytanie: "${pytanie}". Podziel odpowiedz na trzy kategorie: "dobrze", "srednio" i "zle".
    Odpowiedz ucznia: "${odpowiedz}".

    Dla całej wypowiedzi daj określoną ilość punktów w skali 0-100, gdzie 100 to odpowiedz idealna, a 0 to brak odpowiedzi lub całkowicie błędna odpowiedz.
    Punkty powinna opierać się na podstawię ciężkości wybranej przez gracza ${trudnosc}, czyli jak ciężkość jest łatwa to dajesz więcej punktów i z przymróżeniem oka sprawdzasz tą prace,
    ale jak cięzkość jest trudniejsza to bądź bardziej surowy w ocenie.

    Dla każdego zdania zwróć:
    tekst: dokładne zdanie - zdanie zrób żeby się zaczynało z dużej litery i kończyło kropką
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
            "wytlumaczenie": "wyjaśnienie",
          }
        ],
        "punkty": "ilosc punktów za to zadanie w skali 0-100",
        "nazwaBroni": "wymyśl nazwę broni na podstawie typu broni: ${typBroni} oraz na podstawie runy którą do niej dodał: 
        ${trudnosc} = Łatwy: runa ognia
        ${trudnosc} = Średni: runa wody
        ${trudnosc} = Trudny: runa powietrza
        ${trudnosc} = Bardzo trudny: runa ziemi
        "
      }
      `;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free", 
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
