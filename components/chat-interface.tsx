"use client"

import { useState } from "react"

export function ChatInterface() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm Claimly, your personal class action claim assistant. I can help you find and file for class action settlements you may be eligible for."
    }
  ])

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: input
      }
    ])

    // Clear input
    setInput("")

    // Add mock response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "This is a placeholder response. The full chat functionality will be implemented soon."
        }
      ])
    }, 1000)
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="mb-4 h-80 overflow-y-auto border-b pb-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-3 ${message.role === "user" ? "text-right" : "text-left"}`}
          >
            <div 
              className={`inline-block px-3 py-2 rounded-lg ${
                message.role === "user" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSend}
          disabled={input.trim() === ""}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}
