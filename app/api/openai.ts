
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { env } from 'process';

const openai = new OpenAI({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  apiKey: process.env.API_KEY, 
});

export async function POST(req :NextRequest, res:NextResponse) {

    const { messages } =   await req.json();

    try {
      // Send a chat completion request
      const chatCompletion = await openai.chat.completions.create({
        model: "gemini-1.5-flash",
        messages: messages || [{ role: 'user', content: 'Say this is a test' }],
      });

      // Respond with the result
      return NextResponse.json(chatCompletion);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to process the request' });
    }

}
