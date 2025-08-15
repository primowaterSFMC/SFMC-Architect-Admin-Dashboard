"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, XCircle, Clock, Database, Server, Shield, Wifi } from "lucide-react"

const services = [
  {
    name: "MCP Server",
    status: "healthy",
    uptime: "99.9%",
    lastCheck: "30 seconds ago",
    description: "Main MCP server process",
    icon: Server,
    details: {
      version: "v2.1.0",
      port: "3000",
      pid: "12345",
    },
  },
  {
    name: "Database",
    status: "healthy",
    uptime: "99.8%",
    lastCheck: "1 minute ago",
    description: "PostgreSQL database connection",
    icon: Database,
    details: {
      connections: "156/200",
      responseTime: "12ms",
      version: "14.2",
    },
  },
  {
    name: "SFMC API",
    status: "healthy",
    uptime: "98.5%",
    lastCheck: "45 seconds ago",
    description: "Salesforce Marketing Cloud API connectivity",
    icon: Wifi,
    details: {
      endpoint: "https://api.salesforce.com",
      responseTime: "234ms",
      rateLimit: "80%",
    },
  },
  {
    name: "SSL Certificate",
    status: "warning",
    uptime: "100%",
    lastCheck: "5 minutes ago",
    description: "SSL certificate status and validity",
    icon: Shield,
    details: {
      issuer: "Let's Encrypt",
      expires: "45 days",
      algorithm: "RSA-2048",
    },
  },
  {
    name: "Redis Cache",
    status: "healthy",
    uptime: "99.7%",
    lastCheck: "2 minutes ago",
    description: "Redis caching service",
    icon: Database,
    details: {
      memory: "45MB",
      keys: "1,234",
      hitRate: "94.2%",
    },
  },
  {
    name: "Background Jobs",
    status: "healthy",
    uptime: "99.9%",
    lastCheck: "1 minute ago",
    description: "Background job processing queue",
    icon: Clock,
    details: {
      pending: "3",
      completed: "15,678",
      failed: "12",
    },
  },
]

export function ServiceStatusGrid() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Healthy</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = service.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-6 w-6 text-gray-600" />
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </div>
                {getStatusIcon(service.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  {getStatusBadge(service.status)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uptime</span>
                  <span className="text-sm text-gray-600">{service.uptime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Check</span>
                  <span className="text-sm text-gray-600">{service.lastCheck}</span>
                </div>

                <div className="border-t pt-3 space-y-2">
                  {Object.entries(service.details).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 capitalize">{key}</span>
                      <span className="text-xs font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
