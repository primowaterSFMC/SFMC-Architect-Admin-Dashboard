import { ToolsDashboard } from "@/components/tools/tools-dashboard"

export default function ToolsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <ToolsDashboard />
        </main>
      </div>
    </div>
  )
}
