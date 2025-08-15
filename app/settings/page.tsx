import type { Metadata } from "next"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import SettingsManagement from "@/components/settings/settings-management"

export const metadata: Metadata = {
  title: "Settings - SFMC MCP Admin Portal",
  description: "System configuration and administration settings",
}

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <SettingsManagement />
        </main>
      </div>
    </div>
  )
}
