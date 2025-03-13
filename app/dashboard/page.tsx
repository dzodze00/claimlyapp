import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard - Claimly",
  description: "Track your class action claims and settlements",
}

export default function Dashboard() {
  return (
    <main className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold gradient-text">Your Claims Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-accent/10 px-4 py-2 rounded-full">
            <Sparkles className="h-5 w-5 text-accent mr-2" />
            <span className="font-medium">15 Points</span>
          </div>
          <Button className="gradient-bg hover:opacity-90 transition-opacity">Buy Points</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="border-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl gradient-text">2</CardTitle>
            <CardDescription>Active Claims</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl gradient-text">$100-200</CardTitle>
            <CardDescription>Potential Compensation</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl gradient-text">1</CardTitle>
            <CardDescription>Completed Settlements</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4 gradient-text">Your Claims</h2>

      <div className="space-y-4">
        <Card className="border-accent/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>TechCorp Data Breach</CardTitle>
              <div className="flex items-center text-sm font-medium text-green-500">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Filed
              </div>
            </div>
            <CardDescription>Claim ID: TC-2023-45678</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="mb-2">Potential compensation: $75-150</p>
              <p>For users affected by the 2023 data breach exposing email addresses and passwords.</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs">
                  <Sparkles className="mr-1 h-3 w-3" />5 points used
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              Filed on March 10, 2025 • Expected payout: July 2025
            </div>
          </CardFooter>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>SocialApp Privacy Settlement</CardTitle>
              <div className="flex items-center text-sm font-medium text-amber-500">
                <Clock className="mr-1 h-4 w-4" />
                Processing
              </div>
            </div>
            <CardDescription>Claim ID: SA-2022-98765</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="mb-2">Potential compensation: $25-50</p>
              <p>For users whose data was improperly shared with third parties between 2020-2022.</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs">
                  <Sparkles className="mr-1 h-3 w-3" />5 points used
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              Filed on March 10, 2025 • Expected payout: September 2025
            </div>
          </CardFooter>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>RetailCo Overcharging Settlement</CardTitle>
              <div className="flex items-center text-sm font-medium text-blue-500">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Paid
              </div>
            </div>
            <CardDescription>Claim ID: RC-2022-12345</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="mb-2">Compensation received: $42.50</p>
              <p>For customers who were overcharged on shipping fees between 2019-2021.</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs">
                  <Sparkles className="mr-1 h-3 w-3" />5 points used
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle2 className="mr-1 h-4 w-4" />
              Payment received on February 15, 2025
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 flex gap-4">
        <Button className="gradient-bg hover:opacity-90 transition-opacity">Scan for New Claims</Button>
        <Button variant="outline" className="border-accent/20 hover:bg-accent/5">
          View Claim History
        </Button>
      </div>
    </main>
  )
}
