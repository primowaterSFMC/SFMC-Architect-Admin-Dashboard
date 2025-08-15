import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { TokenManagement } from "@/components/tokens/token-management"

export default function TokensPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <TokenManagement />
        </main>
      </div>
    </div>
  )
}
