"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TokenTable } from "./token-table"
import { TokenModal } from "./token-modal"
import { Plus, Download, Trash2, Pause, Play } from "lucide-react"

// Mock data for tokens
const mockTokens = [
  {
    id: "tok_1a2b3c4d5e6f",
    customerId: "cust_001",
    customerName: "Acme Corporation",
    customerEmail: "admin@acme.com",
    status: "active" as const,
    createdAt: new Date("2024-01-15"),
    lastUsedAt: new Date("2024-01-20"),
    usageCount: 1247,
    expiresAt: new Date("2024-12-31"),
    rateLimits: {
      requestsPerMinute: 100,
      requestsPerDay: 10000,
    },
  },
  {
    id: "tok_2b3c4d5e6f7g",
    customerId: "cust_002",
    customerName: "Beta LLC",
    customerEmail: "tech@beta.com",
    status: "suspended" as const,
    createdAt: new Date("2024-01-10"),
    lastUsedAt: new Date("2024-01-18"),
    usageCount: 892,
    expiresAt: new Date("2024-11-30"),
    rateLimits: {
      requestsPerMinute: 50,
      requestsPerDay: 5000,
    },
  },
  {
    id: "tok_3c4d5e6f7g8h",
    customerId: "cust_003",
    customerName: "Gamma Industries",
    customerEmail: "api@gamma.com",
    status: "revoked" as const,
    createdAt: new Date("2024-01-05"),
    lastUsedAt: new Date("2024-01-12"),
    usageCount: 2156,
    expiresAt: new Date("2024-10-31"),
    rateLimits: {
      requestsPerMinute: 200,
      requestsPerDay: 20000,
    },
  },
  {
    id: "tok_4d5e6f7g8h9i",
    customerId: "cust_004",
    customerName: "Delta Solutions",
    customerEmail: "dev@delta.com",
    status: "active" as const,
    createdAt: new Date("2024-01-20"),
    lastUsedAt: new Date("2024-01-21"),
    usageCount: 456,
    expiresAt: new Date("2025-01-20"),
    rateLimits: {
      requestsPerMinute: 75,
      requestsPerDay: 7500,
    },
  },
]

export function TokenManagement() {
  const [tokens, setTokens] = useState(mockTokens)
  const [selectedTokens, setSelectedTokens] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || token.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTokens(filteredTokens.map((token) => token.id))
    } else {
      setSelectedTokens([])
    }
  }

  const handleSelectToken = (tokenId: string, checked: boolean) => {
    if (checked) {
      setSelectedTokens([...selectedTokens, tokenId])
    } else {
      setSelectedTokens(selectedTokens.filter((id) => id !== tokenId))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on tokens:`, selectedTokens)
    // Implement bulk actions here
    setSelectedTokens([])
  }

  const handleTokenAction = (tokenId: string, action: string) => {
    console.log(`Action: ${action} on token: ${tokenId}`)
    // Implement individual token actions here
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Token Management</h2>
          <p className="text-gray-600 mt-2">Manage API tokens for your SFMC MCP server customers.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#0176D3] hover:bg-[#014486]">
          <Plus className="h-4 w-4 mr-2" />
          Generate Token
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and search through your tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by customer name, email, or token ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedTokens.length > 0 && (
        <Card className="border-[#0176D3] bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#014486]">
                {selectedTokens.length} token{selectedTokens.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("suspend")}
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                >
                  <Pause className="h-4 w-4 mr-1" />
                  Suspend
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("activate")}
                  className="border-green-500 text-green-700 hover:bg-green-50"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Activate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("delete")}
                  className="border-red-500 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Token Table */}
      <TokenTable
        tokens={filteredTokens}
        selectedTokens={selectedTokens}
        onSelectAll={handleSelectAll}
        onSelectToken={handleSelectToken}
        onTokenAction={handleTokenAction}
      />

      {/* Token Generation Modal */}
      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTokenGenerated={(tokenData) => {
          console.log("New token generated:", tokenData)
          setIsModalOpen(false)
          // Add new token to the list
        }}
      />
    </div>
  )
}
