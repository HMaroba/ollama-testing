
// import { NextRequest, NextResponse } from 'next/server';
// import { OpenAI } from 'openai';

// const openai = new OpenAI({
//   baseURL: 'http://localhost:11434/v1/',
//   apiKey: 'ollama', // This is the API key for Ollama; change if needed
// });

// export async function POST(req :NextRequest, res:NextResponse) {

//     const { messages } =   await req.json();

//     try {
//       // Send a chat completion request
//       const chatCompletion = await openai.chat.completions.create({
//         model: 'deepseek-r1', // Default to llama3.2 model if not provided
//         messages: messages || [{ role: 'user', content: 'Say this is a test' }],
//       });

//       // Respond with the result
//       return NextResponse.json(chatCompletion);
//     } catch (error) {
//       console.error(error);
//       return NextResponse.json({ error: 'Failed to process the request' });
//     }

// }



import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { env } from 'process';

const openai = new OpenAI({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  apiKey: process.env.API_KEY, 
});

export async function POST(req :NextRequest, res:NextResponse) {

    const { message } =   await req.json();

    console.log(message)

    try {
      // Send a chat completion request
      const chatCompletion = await openai.chat.completions.create({
        model: "gemini-1.5-flash",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
              role: "user",
              content: message,
          },
        ]

      });

      // Respond with the result
      
      return NextResponse.json(chatCompletion.choices[0].message);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to process the request' });
    }

}
