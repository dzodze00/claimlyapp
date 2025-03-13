"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PointsDisplayProps {
  points: number
  onPurchase: () => void
}

export function PointsDisplay({ points, onPurchase }: PointsDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center bg-accent/10 px-3 py-1 rounded-full">
        <Sparkles className="h-4 w-4 text-accent mr-1.5" />
        <span className="text-sm font-medium">{points} Points</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onPurchase}
        className="h-8 text-xs border-accent/20 hover:bg-accent/5"
      >
        Buy Points
      </Button>
    </div>
  )
}

