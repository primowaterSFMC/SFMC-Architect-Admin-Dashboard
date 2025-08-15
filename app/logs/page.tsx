import type { Metadata } from "next"
import LogsViewer from "@/components/logs/logs-viewer"

export const metadata: Metadata = {
  title: "System Logs - SFMC MCP Admin Portal",
  description: "View and analyze system logs and audit trails",
}

export default function LogsPage() {
  return <LogsViewer />
}
