"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Database,
  FileText,
  Home,
  Key,
  Monitor,
  Settings,
  Users,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Tokens", href: "/tokens", icon: Key },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "SFMC Tools", href: "/tools", icon: Wrench },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Health", href: "/health", icon: Monitor },
  { name: "System Logs", href: "/logs", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo and Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0176D3] rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">SFMC MCP</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-[#0176D3] text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Status Indicator */}
      <div className="p-4 border-t border-gray-200">
        <div className={cn("flex items-center space-x-2 text-sm", collapsed ? "justify-center" : "")}>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {!collapsed && <span className="text-gray-600">Server Online</span>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
