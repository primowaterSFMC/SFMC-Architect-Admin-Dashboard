import type { Metadata } from "next"
import SettingsManagement from "@/components/settings/settings-management"

export const metadata: Metadata = {
  title: "Settings - SFMC MCP Admin Portal",
  description: "System configuration and administration settings",
}

export default function SettingsPage() {
  return <SettingsManagement />
}
