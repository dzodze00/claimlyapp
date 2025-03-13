import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const lastMessage = messages[messages.length - 1].content

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: lastMessage,
      system:
        "You are Claimly, an assistant that helps users find and file class action claims they're eligible for. Be helpful, informative, and guide users through the process of scanning their digital footprint and filing claims.",
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat route:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
