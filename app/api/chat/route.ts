import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content
    
    // Simple mock response
    const response = `This is a mock response to: "${lastMessage}". The AI integration will be added later.`
    
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in chat route:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
