import { NextResponse } from "next/server"

// This is a placeholder API route for sending 2FA codes
// In a real implementation, this would connect to an email service

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // In a real implementation, we would send an email with the code
    console.log(`Code for ${email}: ${code}`)

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully",
    })
  } catch (error) {
    console.error("Error sending code:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send verification code",
      },
      { status: 500 },
    )
  }
}

