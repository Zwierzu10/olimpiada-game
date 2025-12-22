import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { przedmiot, temat, trudnosc, poprzedniePytania } = await request.json();

    const prompt = `Wygeneruj pytanie dotyczące ${przedmiot} na temat ${temat}. Pytanie powinno być ${trudnosc}.
      Podaj tylko jedno pytanie. Dostosuj język do tego który jest napisany tutaj ${temat}. 
      Ty nie dajesz mi odpowiedzi tylko pytania. Jedno zwięzłe pytanie.
      Ułóż pytanie, które musi być kompletnie inne niż poprzednie: ${poprzedniePytania.join(", ")}. 
      Pytanie nie może być zamknięte (tak/nie), musi wymagać rozwiniętej odpowiedzi. ZWROC TYLKO PYTANIE NIC INNEGO`;

    let text = "";
    try {
      const localClient = new OpenAI({
        apiKey: "ollama",
        baseURL: "http://localhost:11434/v1", 
      });

      const localResponse = await localClient.chat.completions.create({
        model: "gemma3:4b",
        messages: [
          { role: "system", content: "Jesteś asystentem pomagającym generować pytania." },
          { role: "user", content: prompt },
        ],
        max_tokens: 150,
      });

      text = localResponse.choices?.[0]?.message?.content ?? "";

      if (text) return NextResponse.json({ question: text });
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
        { role: "system", content: "Jesteś asystentem pomagającym generować pytania." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    text = cloudResponse.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ question: text });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Błąd generowania pytania. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
