"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TwoFactorAuth } from "@/components/two-factor-auth"
import { Loader2 } from "lucide-react"

export type UserDetails = {
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  dateOfBirth: string
  firstName: string
  lastName: string
  consentToScan: boolean
}

interface UserInfoFormProps {
  onSubmit: (userDetails: UserDetails) => void
}

export function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    consentToScan: false,
  })
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setUserDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real implementation, we would validate the form data here
    // and then send it to the server

    // For now, we'll just show the 2FA verification
    setTimeout(() => {
      setIsSubmitting(false)
      setShowTwoFactor(true)
    }, 1000)
  }

  const handleVerified = () => {
    setShowTwoFactor(false)
    onSubmit(userDetails)
  }

  if (showTwoFactor) {
    return (
      <TwoFactorAuth email={userDetails.email} onVerified={handleVerified} onCancel={() => setShowTwoFactor(false)} />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleInputChange}
            placeholder="John"
            required
            className="border-accent/20 focus-visible:ring-accent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            required
            className="border-accent/20 focus-visible:ring-accent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={userDetails.email}
          onChange={handleInputChange}
          placeholder="your@email.com"
          required
          className="border-accent/20 focus-visible:ring-accent"
        />
        <p className="text-xs text-muted-foreground">
          We'll scan this email for receipts and notifications related to eligible claims.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={userDetails.phone}
          onChange={handleInputChange}
          placeholder="(123) 456-7890"
          required
          className="border-accent/20 focus-visible:ring-accent"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium">
          Street Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="address"
          name="address"
          value={userDetails.address}
          onChange={handleInputChange}
          placeholder="123 Main St"
          required
          className="border-accent/20 focus-visible:ring-accent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium">
            City <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            name="city"
            value={userDetails.city}
            onChange={handleInputChange}
            placeholder="New York"
            required
            className="border-accent/20 focus-visible:ring-accent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium">
            State <span className="text-destructive">*</span>
          </Label>
          <Input
            id="state"
            name="state"
            value={userDetails.state}
            onChange={handleInputChange}
            placeholder="NY"
            required
            className="border-accent/20 focus-visible:ring-accent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode" className="text-sm font-medium">
            ZIP Code <span className="text-destructive">*</span>
          </Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={userDetails.zipCode}
            onChange={handleInputChange}
            placeholder="10001"
            required
            className="border-accent/20 focus-visible:ring-accent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="text-sm font-medium">
          Date of Birth
        </Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={userDetails.dateOfBirth}
          onChange={handleInputChange}
          className="border-accent/20 focus-visible:ring-accent"
        />
        <p className="text-xs text-muted-foreground">Some settlements require age verification.</p>
      </div>

      <div className="flex items-start space-x-2 pt-2">
        <Checkbox
          id="consentToScan"
          name="consentToScan"
          checked={userDetails.consentToScan}
          onCheckedChange={(checked) => setUserDetails((prev) => ({ ...prev, consentToScan: checked as boolean }))}
          required
          className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="consentToScan"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I consent to Claimly scanning my digital footprint to find eligible claims
          </Label>
          <p className="text-xs text-muted-foreground">
            By checking this box, you authorize Claimly to scan your email, purchase history, and check data breach
            databases to find eligible class action settlements.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-4 gradient-bg hover:opacity-90 transition-opacity"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Submit and Start Scan"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Your information is securely processed and only used to match and file claims on your behalf.
        <br />
        We never sell your data or use it for marketing purposes.
      </p>
    </form>
  )
}
