"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CustomerList } from "./customer-list"
import { CustomerDetail } from "./customer-detail"
import { CustomerForm } from "./customer-form"
import { Plus, Search } from "lucide-react"

// Mock data for customers
const mockCustomers = [
  {
    id: "cust_001",
    companyName: "Acme Corporation",
    primaryContact: {
      name: "John Smith",
      email: "john.smith@acme.com",
      phone: "+1 (555) 123-4567",
    },
    tokens: 3,
    totalApiUsage: 45678,
    accountStatus: "active" as const,
    createdAt: new Date("2024-01-15"),
    lastActivity: new Date("2024-01-21"),
    industry: "Technology",
    plan: "Enterprise",
  },
  {
    id: "cust_002",
    companyName: "Beta LLC",
    primaryContact: {
      name: "Sarah Johnson",
      email: "sarah@beta.com",
      phone: "+1 (555) 234-5678",
    },
    tokens: 1,
    totalApiUsage: 12345,
    accountStatus: "suspended" as const,
    createdAt: new Date("2024-01-10"),
    lastActivity: new Date("2024-01-18"),
    industry: "Marketing",
    plan: "Professional",
  },
  {
    id: "cust_003",
    companyName: "Gamma Industries",
    primaryContact: {
      name: "Mike Wilson",
      email: "mike@gamma.com",
      phone: "+1 (555) 345-6789",
    },
    tokens: 5,
    totalApiUsage: 89012,
    accountStatus: "active" as const,
    createdAt: new Date("2024-01-05"),
    lastActivity: new Date("2024-01-20"),
    industry: "Retail",
    plan: "Enterprise",
  },
  {
    id: "cust_004",
    companyName: "Delta Solutions",
    primaryContact: {
      name: "Lisa Brown",
      email: "lisa@delta.com",
      phone: "+1 (555) 456-7890",
    },
    tokens: 2,
    totalApiUsage: 23456,
    accountStatus: "terminated" as const,
    createdAt: new Date("2024-01-20"),
    lastActivity: new Date("2024-01-21"),
    industry: "Healthcare",
    plan: "Professional",
  },
]

export function CustomerManagement() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [view, setView] = useState<"list" | "detail">("list")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.primaryContact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.primaryContact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || customer.accountStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomer(customerId)
    setView("detail")
  }

  const handleBackToList = () => {
    setView("list")
    setSelectedCustomer(null)
  }

  const handleAddCustomer = () => {
    setEditingCustomer(null)
    setIsFormOpen(true)
  }

  const handleEditCustomer = (customerId: string) => {
    setEditingCustomer(customerId)
    setIsFormOpen(true)
  }

  const handleCustomerSaved = (customerData: any) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(customers.map((c) => (c.id === editingCustomer ? { ...c, ...customerData } : c)))
    } else {
      // Add new customer
      const newCustomer = {
        ...customerData,
        id: `cust_${Math.random().toString(36).substr(2, 9)}`,
        tokens: 0,
        totalApiUsage: 0,
        createdAt: new Date(),
        lastActivity: new Date(),
      }
      setCustomers([...customers, newCustomer])
    }
    setIsFormOpen(false)
    setEditingCustomer(null)
  }

  if (view === "detail" && selectedCustomer) {
    const customer = customers.find((c) => c.id === selectedCustomer)
    if (customer) {
      return (
        <CustomerDetail customer={customer} onBack={handleBackToList} onEdit={() => handleEditCustomer(customer.id)} />
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600 mt-2">Manage your SFMC MCP server customers and their accounts.</p>
        </div>
        <Button onClick={handleAddCustomer} className="bg-[#0176D3] hover:bg-[#014486]">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find customers by name, email, or company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by company name, contact name, email, or customer ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
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
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.accountStatus === "active").length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((customers.filter((c) => c.accountStatus === "active").length / customers.length) * 100)}% of
              total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.reduce((sum, c) => sum + c.totalApiUsage, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(customers.reduce((sum, c) => sum + c.tokens, 0) / customers.length)}
            </div>
            <p className="text-xs text-muted-foreground">Per customer</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <CustomerList customers={filteredCustomers} onCustomerSelect={handleCustomerSelect} />

      {/* Customer Form Modal */}
      <CustomerForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingCustomer(null)
        }}
        onSave={handleCustomerSaved}
        customer={editingCustomer ? customers.find((c) => c.id === editingCustomer) : null}
      />
    </div>
  )
}
