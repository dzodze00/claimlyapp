"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, CheckCircle2 } from "lucide-react"

interface TwoFactorAuthProps {
  email: string
  onVerified: () => void
  onCancel: () => void
}

export function TwoFactorAuth({ email, onVerified, onCancel }: TwoFactorAuthProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(60)
  const [attempts, setAttempts] = useState(0)

  // Generate a random 6-digit code for demo purposes
  const [dummyCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString())

  useEffect(() => {
    if (isCodeSent && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isCodeSent, countdown])

  const sendVerificationCode = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, this would send an email with the code
      console.log(`Dummy code for ${email}: ${dummyCode}`)

      setIsCodeSent(true)
      setCountdown(60)
    } catch (err) {
      setError("Failed to send verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyCode = async () => {
    if (!verificationCode) {
      setError("Please enter the verification code")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll accept the dummy code or "123456"
      if (verificationCode === dummyCode || verificationCode === "123456") {
        onVerified()
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (newAttempts >= 3) {
          setError("Too many failed attempts. Please request a new code.")
        } else {
          setError(`Invalid verification code. ${3 - newAttempts} attempts remaining.`)
        }
      }
    } catch (err) {
      setError("Failed to verify code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Automatically send the code when component mounts
    sendVerificationCode()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto border-accent/20">
      <CardHeader>
        <CardTitle className="gradient-text">Two-Factor Authentication</CardTitle>
        <CardDescription>
          For your security, we need to verify your identity. We've sent a verification code to {email}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
            <Mail className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="verificationCode">Verification Code</Label>
          <Input
            id="verificationCode"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            maxLength={6}
            className="border-accent/20 focus-visible:ring-accent"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="text-sm text-center text-muted-foreground">
          {isCodeSent && countdown > 0 ? (
            <p>You can request a new code in {countdown} seconds</p>
          ) : (
            <Button
              variant="link"
              onClick={sendVerificationCode}
              disabled={isLoading || countdown > 0}
              className="p-0 h-auto text-accent"
            >
              Didn't receive a code? Send again
            </Button>
          )}
        </div>

        {/* For demo purposes only - show the code */}
        <div className="text-xs text-center p-2 bg-muted rounded-md">
          <p className="font-medium">Demo Mode</p>
          <p>
            Use code: <span className="font-mono font-bold">{dummyCode}</span> or{" "}
            <span className="font-mono font-bold">123456</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isLoading} className="border-accent/20">
          Cancel
        </Button>
        <Button
          onClick={verifyCode}
          disabled={isLoading || verificationCode.length !== 6}
          className="gradient-bg hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Verify
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
