"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Mail, Phone } from "lucide-react"

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

interface CustomerListProps {
  customers: Customer[]
  onCustomerSelect: (customerId: string) => void
}

export function CustomerList({ customers, onCustomerSelect }: CustomerListProps) {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>API Usage</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium">{customer.companyName}</div>
                    <div className="text-sm text-gray-500">{customer.id}</div>
                    <div className="text-xs text-gray-400">{customer.industry}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{customer.primaryContact.name}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Mail className="h-3 w-3 mr-1" />
                      {customer.primaryContact.email}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Phone className="h-3 w-3 mr-1" />
                      {customer.primaryContact.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(customer.accountStatus)}</TableCell>
                <TableCell>
                  <div className="text-center">
                    <div className="text-lg font-bold">{customer.tokens}</div>
                    <div className="text-xs text-gray-500">tokens</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <div className="font-medium">{customer.totalApiUsage.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">total calls</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {customer.plan}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(customer.lastActivity)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCustomerSelect(customer.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
