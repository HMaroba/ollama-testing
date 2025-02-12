// 'use client'

// import { useState, FormEvent } from "react";

// // Define the structure of the message object
// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function Chat() {
//   // Define state with appropriate types
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   // Handle form submission
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage: Message = { role: "user", content: input };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to get response");
//       }

//       const data = await response.json();
//       const aiMessage: Message = {
//         role: "assistant",
//         content: data.message,
//       };
//       setMessages((prevMessages) => [...prevMessages, aiMessage]);
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage: Message = {
//         role: "assistant",
//         content: "Sorry, I encountered an error while processing your request.",
//       };
//       setMessages((prevMessages) => [...prevMessages, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 bg-white text-gray-800">
//       <div className="bg-white min-h-[400px] p-4 mb-4 rounded-xl border-2 border-gray-500 overflow-y-auto">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`mb-4 ${
//               message.role === "user" ? "text-right" : "text-left"
//             }`}
//           >
//             <div
//               className={`inline-block p-3 rounded-2xl max-w-[80%] ${
//                 message.role === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {message.content}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="text-left">
//             <div className="inline-block p-3 rounded-2xl bg-gray-100 text-gray-400">
//               Thinking...
//             </div>
//           </div>
//         )}
//       </div>
//       <form onSubmit={handleSubmit} className="flex gap-3">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-3 rounded-xl border-2 border-gray-500 text-gray-800"
//           placeholder="Type your message..."
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

"use client"

import { useState, type FormEvent, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"

// Define the structure of the message object
interface Message {
  role: "user" | "assistant"
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef]) // Updated dependency

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      const aiMessage: Message = {
        role: "assistant",
        content: data.message,
      }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request.",
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 ">AI Chat Assistant</h1>
      <div
        ref={scrollAreaRef}
        className="flex-grow mb-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
            <div
              className={`flex items-start gap-2 max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={message.role === "user" ? "/user-avatar.png" : "/ai-avatar.png"}
                  alt={message.role === "user" ? "User" : "AI Assistant"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center gap-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img src="/ai-avatar.png" alt="AI Assistant" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          <span className="sr-only">Send message</span>
        </button>
      </form>
    </div>
  )
}

