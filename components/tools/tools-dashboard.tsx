"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ToolGrid } from "./tool-grid"
import { ToolDetailModal } from "./tool-detail-modal"
import { Search, Filter, BarChart3, Clock, CheckCircle } from "lucide-react"

// Mock data for SFMC tools organized by category
const toolCategories = {
  "Data Extensions": [
    {
      name: "Data Extension Create",
      description: "Create new data extensions with custom fields and properties",
      usageCount: 1247,
      lastUsed: new Date("2024-01-21T10:30:00"),
      successRate: 98.5,
      avgResponseTime: 245,
      category: "Data Extensions",
    },
    {
      name: "Data Extension Update",
      description: "Update existing data extension structure and properties",
      usageCount: 892,
      lastUsed: new Date("2024-01-20T15:45:00"),
      successRate: 97.2,
      avgResponseTime: 189,
      category: "Data Extensions",
    },
    {
      name: "Data Extension Delete",
      description: "Delete data extensions and all associated data",
      usageCount: 234,
      lastUsed: new Date("2024-01-19T09:15:00"),
      successRate: 99.1,
      avgResponseTime: 156,
      category: "Data Extensions",
    },
    {
      name: "Data Extension Retrieve",
      description: "Retrieve data extension metadata and configuration",
      usageCount: 2156,
      lastUsed: new Date("2024-01-21T14:20:00"),
      successRate: 99.8,
      avgResponseTime: 98,
      category: "Data Extensions",
    },
    {
      name: "Data Extension Row Create",
      description: "Insert new rows into existing data extensions",
      usageCount: 5678,
      lastUsed: new Date("2024-01-21T16:10:00"),
      successRate: 96.8,
      avgResponseTime: 312,
      category: "Data Extensions",
    },
    {
      name: "Data Extension Row Update",
      description: "Update existing rows in data extensions",
      usageCount: 3421,
      lastUsed: new Date("2024-01-21T11:25:00"),
      successRate: 97.5,
      avgResponseTime: 278,
      category: "Data Extensions",
    },
    {
      name: "Data Extension Row Delete",
      description: "Delete specific rows from data extensions",
      usageCount: 1089,
      lastUsed: new Date("2024-01-20T13:40:00"),
      successRate: 98.9,
      avgResponseTime: 201,
      category: "Data Extensions",
    },
    {
      name: "Data Extension Row Retrieve",
      description: "Query and retrieve rows from data extensions",
      usageCount: 8934,
      lastUsed: new Date("2024-01-21T17:05:00"),
      successRate: 99.2,
      avgResponseTime: 145,
      category: "Data Extensions",
    },
  ],
  "Journey Builder": [
    {
      name: "Journey Create",
      description: "Create new customer journeys with multiple touchpoints",
      usageCount: 456,
      lastUsed: new Date("2024-01-21T12:15:00"),
      successRate: 94.2,
      avgResponseTime: 567,
      category: "Journey Builder",
    },
    {
      name: "Journey Start",
      description: "Activate and start customer journeys",
      usageCount: 892,
      lastUsed: new Date("2024-01-21T09:30:00"),
      successRate: 98.7,
      avgResponseTime: 234,
      category: "Journey Builder",
    },
    {
      name: "Journey Stop",
      description: "Stop active customer journeys",
      usageCount: 234,
      lastUsed: new Date("2024-01-20T16:45:00"),
      successRate: 99.5,
      avgResponseTime: 123,
      category: "Journey Builder",
    },
    {
      name: "Journey Update",
      description: "Modify existing journey configurations",
      usageCount: 345,
      lastUsed: new Date("2024-01-21T08:20:00"),
      successRate: 96.1,
      avgResponseTime: 445,
      category: "Journey Builder",
    },
    {
      name: "Journey Retrieve",
      description: "Get journey details and current status",
      usageCount: 1567,
      lastUsed: new Date("2024-01-21T15:10:00"),
      successRate: 99.3,
      avgResponseTime: 167,
      category: "Journey Builder",
    },
  ],
  "Content Builder": [
    {
      name: "Email Create",
      description: "Create new email templates and content",
      usageCount: 756,
      lastUsed: new Date("2024-01-21T13:25:00"),
      successRate: 97.8,
      avgResponseTime: 389,
      category: "Content Builder",
    },
    {
      name: "Email Send",
      description: "Send emails to subscribers and lists",
      usageCount: 2345,
      lastUsed: new Date("2024-01-21T16:40:00"),
      successRate: 95.4,
      avgResponseTime: 678,
      category: "Content Builder",
    },
    {
      name: "Email Update",
      description: "Update existing email content and settings",
      usageCount: 567,
      lastUsed: new Date("2024-01-21T10:15:00"),
      successRate: 98.2,
      avgResponseTime: 234,
      category: "Content Builder",
    },
    {
      name: "Email Delete",
      description: "Delete email templates and content",
      usageCount: 123,
      lastUsed: new Date("2024-01-20T14:30:00"),
      successRate: 99.7,
      avgResponseTime: 145,
      category: "Content Builder",
    },
    {
      name: "Content Block Create",
      description: "Create reusable content blocks",
      usageCount: 445,
      lastUsed: new Date("2024-01-21T11:50:00"),
      successRate: 96.9,
      avgResponseTime: 267,
      category: "Content Builder",
    },
  ],
  Subscribers: [
    {
      name: "Subscriber Create",
      description: "Add new subscribers to lists and data extensions",
      usageCount: 1234,
      lastUsed: new Date("2024-01-21T14:45:00"),
      successRate: 97.6,
      avgResponseTime: 198,
      category: "Subscribers",
    },
    {
      name: "Subscriber Update",
      description: "Update subscriber information and preferences",
      usageCount: 634,
      lastUsed: new Date("2024-01-21T12:30:00"),
      successRate: 98.1,
      avgResponseTime: 156,
      category: "Subscribers",
    },
    {
      name: "Subscriber Delete",
      description: "Remove subscribers from lists and system",
      usageCount: 289,
      lastUsed: new Date("2024-01-20T11:20:00"),
      successRate: 99.2,
      avgResponseTime: 134,
      category: "Subscribers",
    },
    {
      name: "Subscriber Retrieve",
      description: "Get subscriber details and status",
      usageCount: 2567,
      lastUsed: new Date("2024-01-21T17:15:00"),
      successRate: 99.5,
      avgResponseTime: 89,
      category: "Subscribers",
    },
  ],
  "Automation Studio": [
    {
      name: "Automation Create",
      description: "Create new automation workflows",
      usageCount: 345,
      lastUsed: new Date("2024-01-21T09:45:00"),
      successRate: 95.8,
      avgResponseTime: 456,
      category: "Automation Studio",
    },
    {
      name: "Automation Run",
      description: "Execute automation workflows",
      usageCount: 521,
      lastUsed: new Date("2024-01-21T15:30:00"),
      successRate: 97.3,
      avgResponseTime: 234,
      category: "Automation Studio",
    },
    {
      name: "Automation Stop",
      description: "Stop running automation workflows",
      usageCount: 156,
      lastUsed: new Date("2024-01-20T13:15:00"),
      successRate: 99.1,
      avgResponseTime: 123,
      category: "Automation Studio",
    },
    {
      name: "Automation Update",
      description: "Modify existing automation configurations",
      usageCount: 234,
      lastUsed: new Date("2024-01-21T10:40:00"),
      successRate: 96.7,
      avgResponseTime: 345,
      category: "Automation Studio",
    },
  ],
  Contacts: [
    {
      name: "Contact Create",
      description: "Create new contact records",
      usageCount: 789,
      lastUsed: new Date("2024-01-21T13:50:00"),
      successRate: 98.4,
      avgResponseTime: 167,
      category: "Contacts",
    },
    {
      name: "Contact Update",
      description: "Update existing contact information",
      usageCount: 445,
      lastUsed: new Date("2024-01-21T11:35:00"),
      successRate: 97.9,
      avgResponseTime: 145,
      category: "Contacts",
    },
    {
      name: "Contact Delete",
      description: "Delete contact records",
      usageCount: 123,
      lastUsed: new Date("2024-01-20T15:20:00"),
      successRate: 99.6,
      avgResponseTime: 112,
      category: "Contacts",
    },
    {
      name: "Contact Retrieve",
      description: "Get contact details and history",
      usageCount: 1567,
      lastUsed: new Date("2024-01-21T16:25:00"),
      successRate: 99.7,
      avgResponseTime: 78,
      category: "Contacts",
    },
  ],
}

export function ToolsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [sortBy, setSortBy] = useState<string>("usage")

  // Flatten all tools for filtering and searching
  const allTools = Object.values(toolCategories).flat()

  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case "usage":
        return b.usageCount - a.usageCount
      case "name":
        return a.name.localeCompare(b.name)
      case "success":
        return b.successRate - a.successRate
      case "recent":
        return b.lastUsed.getTime() - a.lastUsed.getTime()
      default:
        return 0
    }
  })

  const totalTools = allTools.length
  const totalUsage = allTools.reduce((sum, tool) => sum + tool.usageCount, 0)
  const avgSuccessRate = allTools.reduce((sum, tool) => sum + tool.successRate, 0) / allTools.length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">SFMC Tools Dashboard</h2>
        <p className="text-gray-600 mt-2">
          Monitor and manage all 80+ Salesforce Marketing Cloud tools available through your MCP server.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTools}</div>
            <p className="text-xs text-muted-foreground">Across 10 categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">API calls this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Across all tools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Data Extension Row Retrieve</div>
            <p className="text-xs text-muted-foreground">
              {allTools.find((t) => t.name === "Data Extension Row Retrieve")?.usageCount.toLocaleString()} calls
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter & Search Tools</span>
          </CardTitle>
          <CardDescription>Find specific SFMC tools by category, name, or functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tools by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.keys(toolCategories).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category} ({toolCategories[category as keyof typeof toolCategories].length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usage">Most Used</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="success">Success Rate</SelectItem>
                <SelectItem value="recent">Recently Used</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Category Overview</CardTitle>
          <CardDescription>Usage statistics by tool category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(toolCategories).map(([category, tools]) => {
              const categoryUsage = tools.reduce((sum, tool) => sum + tool.usageCount, 0)
              const categorySuccessRate = tools.reduce((sum, tool) => sum + tool.successRate, 0) / tools.length

              return (
                <div
                  key={category}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="text-sm font-medium text-gray-900">{category}</div>
                  <div className="text-xs text-gray-500 mt-1">{tools.length} tools</div>
                  <div className="text-lg font-bold mt-2">{categoryUsage.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{categorySuccessRate.toFixed(1)}% success rate</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedCategory === "all" ? "All Tools" : selectedCategory}
            <Badge variant="secondary" className="ml-2">
              {sortedTools.length} tools
            </Badge>
          </CardTitle>
          <CardDescription>
            {selectedCategory === "all"
              ? "Complete list of available SFMC tools"
              : `Tools in the ${selectedCategory} category`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToolGrid tools={sortedTools} onToolSelect={setSelectedTool} />
        </CardContent>
      </Card>

      {/* Tool Detail Modal */}
      <ToolDetailModal tool={selectedTool} isOpen={!!selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  )
}
