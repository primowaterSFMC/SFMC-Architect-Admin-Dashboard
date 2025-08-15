"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Edit, Mail, Phone, Building, Calendar, Activity, Key, BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Customer {
  id: string
  companyName: string
  primaryContact: {
    name: string
    email: string
    phone: string
  }
  tokens: number
  totalApiUsage: number
  accountStatus: "active" | "suspended" | "terminated"
  createdAt: Date
  lastActivity: Date
  industry: string
  plan: string
}

interface CustomerDetailProps {
  customer: Customer
  onBack: () => void
  onEdit: () => void
}

// Mock data for customer tokens
const mockTokens = [
  {
    id: "tok_1a2b3c4d5e6f",
    status: "active" as const,
    createdAt: new Date("2024-01-15"),
    lastUsedAt: new Date("2024-01-20"),
    usageCount: 1247,
  },
  {
    id: "tok_2b3c4d5e6f7g",
    status: "active" as const,
    createdAt: new Date("2024-01-10"),
    lastUsedAt: new Date("2024-01-18"),
    usageCount: 892,
  },
  {
    id: "tok_3c4d5e6f7g8h",
    status: "suspended" as const,
    createdAt: new Date("2024-01-05"),
    lastUsedAt: new Date("2024-01-12"),
    usageCount: 2156,
  },
]

// Mock usage data for chart
const usageData = [
  { date: "Jan 15", usage: 245 },
  { date: "Jan 16", usage: 189 },
  { date: "Jan 17", usage: 298 },
  { date: "Jan 18", usage: 567 },
  { date: "Jan 19", usage: 789 },
  { date: "Jan 20", usage: 923 },
  { date: "Jan 21", usage: 1045 },
]

// Mock audit log
const auditLog = [
  {
    id: 1,
    action: "Token generated",
    timestamp: new Date("2024-01-20T10:30:00"),
    details: "New API token created",
    admin: "Admin User",
  },
  {
    id: 2,
    action: "Account updated",
    timestamp: new Date("2024-01-18T14:15:00"),
    details: "Contact information updated",
    admin: "Admin User",
  },
  {
    id: 3,
    action: "Token suspended",
    timestamp: new Date("2024-01-15T09:45:00"),
    details: "Token tok_3c4d5e6f7g8h suspended due to rate limit exceeded",
    admin: "System",
  },
]

export function CustomerDetail({ customer, onBack, onEdit }: CustomerDetailProps) {
  const getStatusBadge = (status: Customer["accountStatus"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Suspended</Badge>
      case "terminated":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Terminated</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTokenStatusBadge = (status: "active" | "suspended" | "revoked") => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Suspended</Badge>
      case "revoked":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Revoked</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{customer.companyName}</h2>
            <p className="text-gray-600 mt-1">Customer ID: {customer.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(customer.accountStatus)}
          <Button onClick={onEdit} className="bg-[#0176D3] hover:bg-[#014486]">
            <Edit className="h-4 w-4 mr-2" />
            Edit Customer
          </Button>
        </div>
      </div>

      {/* Customer Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Primary Contact</label>
              <p className="font-medium">{customer.primaryContact.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p>{customer.primaryContact.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <p>{customer.primaryContact.phone}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Industry</label>
              <p>{customer.industry}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Plan</label>
              <Badge variant="outline">{customer.plan}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Account Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Total Tokens</span>
              <span className="text-2xl font-bold">{customer.tokens}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">API Usage</span>
              <span className="text-2xl font-bold">{customer.totalApiUsage.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Created</span>
              <span>{formatDate(customer.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Last Activity</span>
              <span>{formatDate(customer.lastActivity)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-[#0176D3] hover:bg-[#014486]">
              <Key className="h-4 w-4 mr-2" />
              Generate New Token
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Activity className="h-4 w-4 mr-2" />
              View Usage Analytics
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Review
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>API Usage (Last 7 Days)</CardTitle>
          <CardDescription>Daily API call volume for this customer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#0176D3"
                  strokeWidth={2}
                  dot={{ fill: "#0176D3", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Associated Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Associated Tokens</CardTitle>
          <CardDescription>All API tokens belonging to this customer</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Usage Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {token.id.slice(0, 12)}...{token.id.slice(-4)}
                    </code>
                  </TableCell>
                  <TableCell>{getTokenStatusBadge(token.status)}</TableCell>
                  <TableCell>{formatDate(token.createdAt)}</TableCell>
                  <TableCell>{formatDate(token.lastUsedAt)}</TableCell>
                  <TableCell>{token.usageCount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>Recent activities and changes for this customer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditLog.map((entry) => (
              <div key={entry.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{entry.action}</p>
                    <span className="text-sm text-gray-500">{formatDateTime(entry.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{entry.details}</p>
                  <p className="text-xs text-gray-500 mt-1">by {entry.admin}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
