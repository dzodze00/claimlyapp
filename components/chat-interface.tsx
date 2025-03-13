"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, Upload, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { UserInfoForm, type UserDetails } from "@/components/user-info-form"
import { PointsDisplay } from "@/components/points-display"
import { PricingModal } from "@/components/pricing-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  isLoading?: boolean
}

type ClaimStatus = "idle" | "collecting_info" | "scanning" | "found" | "filing" | "completed"

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! I'm Claimly, your personal class action claim assistant. I can help you find and file for class action settlements you may be eligible for. Would you like to scan your digital footprint to find eligible claims?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [claimStatus, setClaimStatus] = useState<ClaimStatus>("idle")
  const [foundClaims, setFoundClaims] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [points, setPoints] = useState(0)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [requiredPoints, setRequiredPoints] = useState(0)

  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    consentToScan: false,
  })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Process the user's message and determine the next step
      if (input.toLowerCase().includes("scan") || input.toLowerCase().includes("yes")) {
        if (claimStatus === "idle") {
          setClaimStatus("collecting_info")
          setMessages((prev) => [
            ...prev.slice(0, prev.length - 1),
            {
              id: Date.now().toString(),
              role: "assistant",
              content:
                "Great! To scan for eligible claims, I'll need some basic information from you. This helps us match you with relevant settlements and file claims on your behalf. Please fill out the form below:",
            },
          ])
        } else if (claimStatus === "collecting_info") {
          await simulateScan()
        }
      } else {
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: input,
          system:
            "You are Claimly, an assistant that helps users find and file class action claims they're eligible for. Be helpful, informative, and guide users through the process of scanning their digital footprint and filing claims.",
        })

        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          {
            id: Date.now().toString(),
            role: "assistant",
            content: text,
          },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const simulateScan = async () => {
    setClaimStatus("scanning")

    // Add a message about starting the scan
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1]
      if (lastMessage.isLoading) {
        return [
          ...prev.slice(0, prev.length - 1),
          {
            id: Date.now().toString(),
            role: "assistant",
            content: `Thanks ${userDetails.firstName || ""}! I'll scan your digital footprint to find eligible class action claims. This may take a moment...`,
          },
        ]
      } else {
        return [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: `Thanks ${userDetails.firstName || ""}! I'll scan your digital footprint to find eligible class action claims. This may take a moment...`,
          },
        ]
      }
    })

    // Simulate scanning delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock found claims
    const mockClaims = [
      {
        id: "claim1",
        company: "TechCorp Data Breach",
        compensation: "$75-150",
        deadline: "June 30, 2025",
        description: "For users affected by the 2023 data breach exposing email addresses and passwords.",
        eligibility: "High",
        selected: true,
        pointsCost: 5,
      },
      {
        id: "claim2",
        company: "SocialApp Privacy Settlement",
        compensation: "$25-50",
        deadline: "August 15, 2025",
        description: "For users whose data was improperly shared with third parties between 2020-2022.",
        eligibility: "Medium",
        selected: true,
        pointsCost: 5,
      },
    ]

    setFoundClaims(mockClaims)
    setClaimStatus("found")

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: `Great news! I've found ${mockClaims.length} class action settlements you may be eligible for. Each claim requires 5 points to file. Would you like me to help you file these claims?`,
      },
    ])
  }

  const handleFileClaims = async () => {
    // Calculate total points needed
    const selectedClaims = foundClaims.filter((claim) => claim.selected)
    const totalPointsNeeded = selectedClaims.reduce((total, claim) => total + claim.pointsCost, 0)

    // Check if user has enough points
    if (points < totalPointsNeeded) {
      setRequiredPoints(totalPointsNeeded - points)
      setShowPricingModal(true)
      return
    }

    setClaimStatus("filing")

    // Deduct points
    setPoints((prevPoints) => prevPoints - totalPointsNeeded)

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: `I'm now filing your selected claims. This will use ${totalPointsNeeded} points from your account. This will only take a moment...`,
      },
    ])

    // Simulate filing delay
    await new Promise((resolve) => setTimeout(resolve, 4000))

    setClaimStatus("completed")

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Success! I've filed all your selected claims. You'll receive confirmation emails shortly, and we'll keep you updated on the status of your claims. Is there anything else you'd like help with?",
      },
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleUpload = () => {
    // In a real implementation, this would open a file picker
    // For this prototype, we'll simulate finding claims after "uploading"
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: "I'd like to upload my email history to scan for more claims.",
      },
    ])

    setTimeout(() => {
      simulateScan()
    }, 1000)
  }

  const handlePurchasePoints = (newPoints: number) => {
    setPoints((prevPoints) => prevPoints + newPoints)

    // If we were in the middle of filing claims, check if we now have enough points
    if (claimStatus === "found") {
      const selectedClaims = foundClaims.filter((claim) => claim.selected)
      const totalPointsNeeded = selectedClaims.reduce((total, claim) => total + claim.pointsCost, 0)

      if (points + newPoints >= totalPointsNeeded) {
        // We now have enough points, so we can proceed with filing
        setTimeout(() => {
          handleFileClaims()
        }, 500)
      }
    }
  }

  const toggleClaimSelection = (claimId: string) => {
    setFoundClaims((prevClaims) =>
      prevClaims.map((claim) => (claim.id === claimId ? { ...claim, selected: !claim.selected } : claim)),
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Chat with Claimly</h2>
        <PointsDisplay points={points} onPurchase={() => setShowPricingModal(true)} />
      </div>

      <Card className="flex flex-col h-[600px] p-4 shadow-lg border-accent/20">
        <ScrollArea className="flex-1 pr-4">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", {
                  "justify-end": message.role === "user",
                  "justify-start": message.role === "assistant",
                })}
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 gradient-bg">
                      <span className="text-xs font-medium text-white">AI</span>
                    </Avatar>
                  )}
                  <div
                    className={cn("rounded-lg px-4 py-2 text-sm", {
                      "gradient-bg text-white": message.role === "user",
                      "bg-muted": message.role === "assistant",
                    })}
                  >
                    {message.isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : message.content}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 bg-muted">
                      <span className="text-xs font-medium">You</span>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {claimStatus === "found" && (
          <div className="mb-4 mt-2 border border-accent/20 rounded-lg p-4 bg-accent/5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium gradient-text">Found Claims ({foundClaims.length})</h3>
              <div className="text-sm text-muted-foreground">5 points per claim</div>
            </div>

            <div className="space-y-3">
              {foundClaims.map((claim) => (
                <div key={claim.id} className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    id={`claim-${claim.id}`}
                    checked={claim.selected}
                    onChange={() => toggleClaimSelection(claim.id)}
                    className="mt-1 h-4 w-4 rounded border-accent text-accent focus:ring-accent"
                  />
                  <div className="flex-1">
                    <label htmlFor={`claim-${claim.id}`} className="font-medium cursor-pointer">
                      {claim.company}
                    </label>
                    <div className="text-muted-foreground">Potential compensation: {claim.compensation}</div>
                    <div className="text-muted-foreground">Deadline: {claim.deadline}</div>
                  </div>
                </div>
              ))}
            </div>

            {points < foundClaims.filter((c) => c.selected).length * 5 && (
              <Alert className="mt-3 mb-2 bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertTitle className="text-amber-800 text-sm font-medium">Not enough points</AlertTitle>
                <AlertDescription className="text-amber-700 text-xs">
                  You need {foundClaims.filter((c) => c.selected).length * 5} points to file the selected claims, but
                  you only have {points} points.
                </AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full mt-3 gradient-bg hover:opacity-90 transition-opacity"
              onClick={handleFileClaims}
              disabled={claimStatus === "filing" || foundClaims.filter((c) => c.selected).length === 0}
            >
              {claimStatus === "filing" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Filing Claims...
                </>
              ) : (
                `File ${foundClaims.filter((c) => c.selected).length} Selected Claims (${foundClaims.filter((c) => c.selected).length * 5} points)`
              )}
            </Button>
          </div>
        )}

        {claimStatus === "collecting_info" && (
          <div className="mb-4 mt-2 border border-accent/20 rounded-lg p-4 bg-accent/5">
            <h3 className="font-medium mb-3 gradient-text">Please provide your information</h3>
            <UserInfoForm
              onSubmit={(details) => {
                setUserDetails(details)

                // Add a user message showing they've submitted their information
                setMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now().toString(),
                    role: "user",
                    content: "I've submitted my personal information.",
                  },
                ])

                // Start the scan process
                simulateScan()
              }}
            />
          </div>
        )}

        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleUpload}
            disabled={isLoading}
            className="border-accent/20 hover:bg-accent/5"
          >
            <Upload className="h-4 w-4" />
            <span className="sr-only">Upload</span>
          </Button>
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || claimStatus === "filing" || claimStatus === "collecting_info"}
            className="flex-1 border-accent/20 focus-visible:ring-accent"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={isLoading || input.trim() === "" || claimStatus === "filing"}
            className="gradient-bg hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Your data is securely processed and never stored without your permission.</p>
        <p className="mt-1">
          Claimly uses AI to match your digital footprint with our database of over 500 class action settlements.
        </p>
      </div>

      <PricingModal
        open={showPricingModal}
        onOpenChange={setShowPricingModal}
        onPurchaseComplete={handlePurchasePoints}
        requiredPoints={requiredPoints}
      />
    </div>
  )
}
