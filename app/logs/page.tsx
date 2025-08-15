import type { Metadata } from "next"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import LogsViewer from "@/components/logs/logs-viewer"

export const metadata: Metadata = {
  title: "System Logs - SFMC MCP Admin Portal",
  description: "View and analyze system logs and audit trails",
}

export default function LogsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <LogsViewer />
        </main>
      </div>
    </div>
  )
}
