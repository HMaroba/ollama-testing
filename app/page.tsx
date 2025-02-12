'use client'
import { useState } from 'react';

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
        }),
      });

      const data = await res.json();
      console.log(data); 
      setResponse(data?.choices?.[0]?.message?.content || 'No response');
    } catch (error) {
      console.error(error);
      setResponse('Error: Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">Chat with DeepSeek R1</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="w-full max-w-2xl p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-gray-900"
  
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className={`px-6 py-2 rounded-lg text-white font-semibold 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      <div className="mt-6 w-full max-w-2xl text-left">
        <h2 className="text-xl font-medium mb-2">Response:</h2>
        <p className="p-4 bg-white text-black rounded-lg shadow-md">{response}</p>
      </div>
    </div>
  );
}
