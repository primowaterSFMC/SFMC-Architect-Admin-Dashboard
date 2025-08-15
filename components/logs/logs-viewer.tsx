"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Search, RefreshCw, AlertTriangle, Info, AlertCircle, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const logLevels = {
  error: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  warn: { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50" },
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
  success: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
}

const mockLogs = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:25",
    level: "error",
    category: "API",
    message: "Failed to connect to SFMC API - Authentication failed",
    details: "Error: Invalid client credentials provided for customer ID: cust_123",
    source: "sfmc-connector.js:45",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:29:18",
    level: "warn",
    category: "Rate Limit",
    message: "Rate limit approaching for customer cust_456",
    details: "Current usage: 95/100 requests per minute",
    source: "rate-limiter.js:23",
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:28:42",
    level: "info",
    category: "Auth",
    message: "New token generated successfully",
    details: "Token ID: tok_789 for customer: cust_123",
    source: "token-manager.js:67",
  },
  {
    id: "4",
    timestamp: "2024-01-15 14:27:15",
    level: "success",
    category: "API",
    message: "Data extension created successfully",
    details: 'DE Name: "Customer_Preferences" for customer: cust_456',
    source: "data-extension.js:89",
  },
]

const auditLogs = [
  {
    id: "1",
    timestamp: "2024-01-15 14:25:30",
    user: "admin@company.com",
    action: "Token Revoked",
    resource: "Token: tok_456",
    ip: "192.168.1.100",
    details: "Token revoked due to security policy violation",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:20:15",
    user: "admin@company.com",
    action: "Customer Created",
    resource: "Customer: cust_789",
    ip: "192.168.1.100",
    details: "New customer account created for Acme Corp",
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:15:45",
    user: "manager@company.com",
    action: "Settings Updated",
    resource: "Rate Limiting Config",
    ip: "192.168.1.105",
    details: "Updated rate limit from 50 to 100 requests per minute",
  },
]

export default function LogsViewer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter

    return matchesSearch && matchesLevel && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
          <p className="text-gray-600 mt-1">Monitor system activity and troubleshoot issues</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList>
          <TabsTrigger value="system">System Logs</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter Logs</CardTitle>
              <CardDescription>Search and filter system logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Log Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="Auth">Authentication</SelectItem>
                    <SelectItem value="Rate Limit">Rate Limit</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Logs</CardTitle>
              <CardDescription>Latest system events and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs.map((log) => {
                  const LogIcon = logLevels[log.level as keyof typeof logLevels].icon
                  const iconColor = logLevels[log.level as keyof typeof logLevels].color
                  const bgColor = logLevels[log.level as keyof typeof logLevels].bg

                  return (
                    <div key={log.id} className={`p-4 rounded-lg border ${bgColor}`}>
                      <div className="flex items-start gap-3">
                        <LogIcon className={`w-5 h-5 mt-0.5 ${iconColor}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {log.level.toUpperCase()}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {log.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{log.timestamp}</span>
                          </div>
                          <p className="font-medium text-gray-900 mb-1">{log.message}</p>
                          <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                          <p className="text-xs text-gray-500">Source: {log.source}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Track all administrative actions and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-lg border bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="default" className="text-xs">
                            {log.action}
                          </Badge>
                          <span className="text-xs text-gray-500">{log.timestamp}</span>
                        </div>
                        <p className="font-medium text-gray-900 mb-1">{log.resource}</p>
                        <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>User: {log.user}</span>
                          <span>IP: {log.ip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
