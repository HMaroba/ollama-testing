import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";

export  async function POST(req :NextRequest, res: NextResponse) {


  try {
    const { message } = await req.json();

    const response = await ollama.chat({
        model: 'deepseek-r1',
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({ message: response.message.content });
  } catch (error) {
    console.error("Ollama API error:", error);
    return NextResponse.json({ error: "Failed to get response from LLM" });
  }
}