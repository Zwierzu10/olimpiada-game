import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { przedmiot, temat, trudnosc, poprzedniePytania } = await request.json();

    const client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1", 
    });

    const prompt = `Wygeneruj pytanie dotyczące ${przedmiot} na temat ${temat}. Pytanie powinno być ${trudnosc}.
     Podaj tylko jedno pytanie. Dostosuj język do tego który jest napisany tutaj ${temat}. Ty nie dajesz mi odpowiedzi tylko pytania. Jedno zwięzłe pytanie.
     Ułóż pytanie inne niz poprzednie: ${poprzedniePytania.join(", ")}. Pytanie nie może być zamknięte (tak/nie), musi wymagać rozwiniętej odpowiedzi. ZWROC TYLKO PYTANIE NIC INNEGO`;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free", 
      messages: [
        { role: "system", content: "Jesteś asystentem pomagającym generować pytania." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const text = response.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ question: text });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Blad generowania pytania. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
