export default function Dashboard() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Your Claims Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="border rounded-lg p-4">
          <div className="pb-2">
            <div className="text-2xl">2</div>
            <div className="text-sm text-gray-500">Active Claims</div>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="pb-2">
            <div className="text-2xl">$100-200</div>
            <div className="text-sm text-gray-500">Potential Compensation</div>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="pb-2">
            <div className="text-2xl">1</div>
            <div className="text-sm text-gray-500">Completed Settlements</div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Claims</h2>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="pb-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">TechCorp Data Breach</div>
              <div className="flex items-center text-sm font-medium text-green-500">
                Filed
              </div>
            </div>
            <div className="text-sm text-gray-500">Claim ID: TC-2023-45678</div>
          </div>
          <div className="py-4">
            <div className="text-sm">
              <p className="mb-2">Potential compensation: $75-150</p>
              <p>For users affected by the 2023 data breach exposing email addresses and passwords.</p>
            </div>
          </div>
          <div className="border-t pt-4 text-sm text-gray-500">
            <div className="flex items-center">
              Filed on March 10, 2025 • Expected payout: July 2025
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="pb-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">SocialApp Privacy Settlement</div>
              <div className="flex items-center text-sm font-medium text-amber-500">
                Processing
              </div>
            </div>
            <div className="text-sm text-gray-500">Claim ID: SA-2022-98765</div>
          </div>
          <div className="py-4">
            <div className="text-sm">
              <p className="mb-2">Potential compensation: $25-50</p>
              <p>For users whose data was improperly shared with third parties between 2020-2022.</p>
            </div>
          </div>
          <div className="border-t pt-4 text-sm text-gray-500">
            <div className="flex items-center">
              Filed on March 10, 2025 • Expected payout: September 2025
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Scan for New Claims</button>
      </div>
    </main>
  )
}
