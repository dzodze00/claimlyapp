import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="mr-4 flex">
            <a className="flex items-center space-x-2" href="/">
              <span className="text-xl font-bold text-blue-600">Claimly</span>
            </a>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <a className="text-sm font-medium hover:text-blue-600" href="#">
              How It Works
            </a>
            <a className="text-sm font-medium hover:text-blue-600" href="#">
              About
            </a>
            <a className="text-sm font-medium hover:text-blue-600" href="#">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto flex-1 items-center px-4 py-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] text-blue-600">
              Find & Claim Your Settlement Money
            </h1>
            <p className="mt-4 text-lg text-gray-600 md:text-xl">
              Our AI assistant scans your digital footprint to match you with eligible class action settlements and
              files claims on your behalf.
            </p>
          </div>

          <ChatInterface />
        </div>
      </div>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-600 md:text-left">
            © 2025 Claimly. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a className="text-sm text-gray-600 hover:text-blue-600" href="#">
              Privacy
            </a>
            <a className="text-sm text-gray-600 hover:text-blue-600" href="#">
              Terms
            </a>
            <a className="text-sm text-gray-600 hover:text-blue-600" href="#">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
