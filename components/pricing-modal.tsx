"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle2, CreditCard } from "lucide-react"

interface PricingOption {
  id: string
  points: number
  price: number
  claims: number
  popular?: boolean
}

interface PricingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPurchaseComplete: (points: number) => void
  requiredPoints?: number
}

export function PricingModal({ open, onOpenChange, onPurchaseComplete, requiredPoints }: PricingModalProps) {
  const [step, setStep] = useState<"select" | "payment" | "processing" | "complete">("select")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const pricingOptions: PricingOption[] = [
    {
      id: "basic",
      points: 5,
      price: 5,
      claims: 1,
    },
    {
      id: "standard",
      points: 15,
      price: 10,
      claims: 3,
      popular: true,
    },
    {
      id: "premium",
      points: 50,
      price: 25,
      claims: 10,
    },
  ]

  const handleSelectOption = (id: string) => {
    setSelectedOption(id)
  }

  const handleContinue = () => {
    if (selectedOption) {
      setStep("payment")
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("processing")

    // Simulate payment processing
    setTimeout(() => {
      setStep("complete")
      const option = pricingOptions.find((opt) => opt.id === selectedOption)
      if (option) {
        onPurchaseComplete(option.points)
      }
    }, 2000)
  }

  const handleClose = () => {
    if (step === "complete") {
      setStep("select")
      setSelectedOption(null)
      setCardDetails({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      })
      onOpenChange(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {step === "select" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl gradient-text">Purchase Claimly Points</DialogTitle>
              <DialogDescription>
                {requiredPoints ? (
                  <span>You need {requiredPoints} more points to file this claim. Select a package below:</span>
                ) : (
                  <span>Points are used to file claims. The more points you buy, the more you save!</span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <RadioGroup value={selectedOption || ""} onValueChange={handleSelectOption} className="space-y-3">
                {pricingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center space-x-2 rounded-lg border p-4 ${
                      option.popular ? "border-accent ring-1 ring-accent" : "border-border"
                    } ${selectedOption === option.id ? "bg-accent/5" : ""}`}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <div className="flex flex-1 justify-between items-center">
                      <div>
                        <Label htmlFor={option.id} className="text-base font-medium">
                          {option.points} Points
                        </Label>
                        <p className="text-sm text-muted-foreground">File up to {option.claims} claims</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">${option.price}</div>
                        <div className="text-xs text-muted-foreground">
                          ${(option.price / option.claims).toFixed(2)} per claim
                        </div>
                      </div>
                    </div>
                    {option.popular && (
                      <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                        Best Value
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
            <DialogFooter>
              <Button
                onClick={handleContinue}
                disabled={!selectedOption}
                className="w-full gradient-bg hover:opacity-90 transition-opacity"
              >
                Continue to Payment
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "payment" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl gradient-text">Payment Details</DialogTitle>
              <DialogDescription>Enter your payment information to complete your purchase.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePaymentSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="John Doe"
                  value={cardDetails.cardName}
                  onChange={handleInputChange}
                  required
                  className="border-accent/20 focus-visible:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="border-accent/20 focus-visible:ring-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="border-accent/20 focus-visible:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                    required
                    className="border-accent/20 focus-visible:ring-accent"
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" className="w-full gradient-bg hover:opacity-90 transition-opacity">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Complete Purchase
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === "processing" && (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="animate-pulse gradient-bg w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">Processing Payment</h3>
            <p className="text-muted-foreground text-center">Please wait while we process your payment...</p>
          </div>
        )}

        {step === "complete" && (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground text-center mb-6">Your points have been added to your account.</p>
            <Button onClick={handleClose} className="gradient-bg hover:opacity-90 transition-opacity">
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
