import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Claimly - Find Your Class Action Claims",
  description: "Automatically find and file class action claims you're eligible for",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
