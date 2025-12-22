import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { pytanie, odpowiedz, trudnosc, typBroni } = await request.json();

    const prompt = `Przeanalizuj odpowiedz ucznia na pytanie: "${pytanie}". Zachowaj dokładnie każde zdanie ucznia bez zmian. Nie przepisuj go ani nie modyfikuj. Podziel odpowiedz na trzy kategorie: "dobrze", "srednio" i "zle".
        Odpowiedz ucznia: "${odpowiedz}".

        Dla całej wypowiedzi daj określoną ilość punktów w skali 0-100, gdzie 100 to odpowiedz idealna, a 0 to brak odpowiedzi lub całkowicie błędna odpowiedz.
        Punkty powinna opierać się na podstawię ciężkości wybranej przez gracza ${trudnosc}.

        Dla każdego zdania zwróć:
        tekst: dokładne zdanie - zdanie zrób żeby się zaczynało z dużej litery i kończyło kropką
        wynik: "dobrze" | "srednio" | "zle"
        wytlumaczenie: krótkie wyjaśnienie DLACZEGO

        ZWRÓĆ TYLKO POPRAWNY JSON w formacie:

        {
          "analiza": [
            {
              "tekst": "zdanie",
              "wynik": "dobrze" | "srednio" | "zle",
              "wytlumaczenie": "wyjaśnienie"
            }
          ],
          "punkty": "ilosc punktów za to zadanie w skali 0-100",
          "nazwaBroni": "wymyśl nazwę broni na podstawie typu broni: ${typBroni} oraz na podstawie runy którą do niej dodał: 
          ${trudnosc} = Łatwy: runa ognia
          ${trudnosc} = Średni: runa wody
          ${trudnosc} = Trudny: runa powietrza
          ${trudnosc} = Bardzo trudny: runa ziemi
          np. dla typu broni 'miecz' i runy ognia może to być 'Płomienny Miecz'
        "
        }
        `;

    let content = "";

    try {
      const localClient = new OpenAI({
        apiKey: "ollama",
        baseURL: "http://localhost:11434/v1",
      });

      const localResponse = await localClient.chat.completions.create({
        model: "gemma3:4b",
        messages: [
          { role: "system", content: "Jesteś nauczycielem, który analizuje odpowiedzi ucznia i tłumaczy błędy." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      });

      content = localResponse.choices?.[0]?.message?.content ?? "";

      if (content) {
        const cleaned = content.replace(/```json/g, "").replace(/```/g, "").trim();
        return NextResponse.json(JSON.parse(cleaned));
      }
    } catch (errLocal) {
      console.warn("Lokalny Ollama nie działa, fallback do OpenRouter", errLocal);
    }

    const cloudClient = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const cloudResponse = await cloudClient.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [
        { role: "system", content: "Jesteś nauczycielem, który analizuje odpowiedzi ucznia i tłumaczy błędy." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    content = cloudResponse.choices?.[0]?.message?.content ?? "";
    if (!content) throw new Error("Brak odpowiedzi od AI");

    const cleaned = content.replace(/```json/g, "").replace(/```/g, "").trim();
    return NextResponse.json(JSON.parse(cleaned));

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Błąd analizy." }, { status: 500 });
  }
}
