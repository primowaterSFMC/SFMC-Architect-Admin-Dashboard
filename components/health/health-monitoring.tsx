"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemMetricsChart } from "./system-metrics-chart"
import { ServiceStatusGrid } from "./service-status-grid"
import { ErrorTrackingDashboard } from "./error-tracking-dashboard"
import {
  Database,
  Wifi,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
} from "lucide-react"

export function HealthMonitoring() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock real-time system metrics
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 23,
    memory: 67,
    disk: 45,
    network: 12,
    connections: 156,
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) => ({
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        disk: Math.max(20, Math.min(80, prev.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(5, Math.min(50, prev.network + (Math.random() - 0.5) * 8)),
        connections: Math.max(100, Math.min(300, prev.connections + Math.floor((Math.random() - 0.5) * 20))),
      }))
      setLastUpdated(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getMetricColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return "text-red-600"
    if (value >= thresholds.warning) return "text-yellow-600"
    return "text-green-600"
  }

  const getProgressColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return "bg-red-500"
    if (value >= thresholds.warning) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Health Monitoring</h2>
          <p className="text-gray-600 mt-2">
            Real-time monitoring of your SFMC MCP server health and performance metrics.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <Card className="border-l-4 border-l-green-500 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">All Systems Operational</h3>
                <p className="text-sm text-green-700">All services are running normally</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Healthy</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Real-time System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getMetricColor(systemMetrics.cpu, { warning: 70, critical: 85 })}`}>
              {systemMetrics.cpu.toFixed(1)}%
            </div>
            <Progress
              value={systemMetrics.cpu}
              className="mt-2"
              style={
                {
                  "--progress-background": getProgressColor(systemMetrics.cpu, { warning: 70, critical: 85 }),
                } as React.CSSProperties
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getMetricColor(systemMetrics.memory, { warning: 80, critical: 90 })}`}
            >
              {systemMetrics.memory.toFixed(1)}%
            </div>
            <Progress
              value={systemMetrics.memory}
              className="mt-2"
              style={
                {
                  "--progress-background": getProgressColor(systemMetrics.memory, { warning: 80, critical: 90 }),
                } as React.CSSProperties
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getMetricColor(systemMetrics.disk, { warning: 75, critical: 90 })}`}>
              {systemMetrics.disk.toFixed(1)}%
            </div>
            <Progress
              value={systemMetrics.disk}
              className="mt-2"
              style={
                {
                  "--progress-background": getProgressColor(systemMetrics.disk, { warning: 75, critical: 90 }),
                } as React.CSSProperties
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.network.toFixed(1)} MB/s</div>
            <p className="text-xs text-muted-foreground mt-2">Combined in/out</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DB Connections</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.connections}</div>
            <p className="text-xs text-muted-foreground mt-2">Active connections</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Monitoring Tabs */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Service Status</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="errors">Error Tracking</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <ServiceStatusGrid />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance (Last 24 Hours)</CardTitle>
                <CardDescription>CPU, Memory, and Disk usage trends</CardDescription>
              </CardHeader>
              <CardContent>
                <SystemMetricsChart type="system" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network & Database Metrics</CardTitle>
                <CardDescription>Network I/O and database connection trends</CardDescription>
              </CardHeader>
              <CardContent>
                <SystemMetricsChart type="network" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Response Time Distribution</CardTitle>
              <CardDescription>API response time percentiles over time</CardDescription>
            </CardHeader>
            <CardContent>
              <SystemMetricsChart type="response" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <ErrorTrackingDashboard />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Current system alerts and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-yellow-50">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium text-yellow-800">SSL Certificate Expiring Soon</p>
                      <p className="text-sm text-yellow-700">Certificate expires in 45 days</p>
                    </div>
                    <Badge variant="secondary">Warning</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-blue-50">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-blue-800">High Memory Usage</p>
                      <p className="text-sm text-blue-700">Memory usage above 65% for 2 hours</p>
                    </div>
                    <Badge variant="outline">Info</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert History</CardTitle>
                <CardDescription>Recent alerts and their resolution status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      type: "resolved",
                      title: "Database Connection Pool Full",
                      time: "2 hours ago",
                      duration: "15 minutes",
                    },
                    {
                      type: "resolved",
                      title: "High CPU Usage",
                      time: "6 hours ago",
                      duration: "45 minutes",
                    },
                    {
                      type: "resolved",
                      title: "API Rate Limit Exceeded",
                      time: "1 day ago",
                      duration: "5 minutes",
                    },
                  ].map((alert, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-gray-500">
                          {alert.time} • Duration: {alert.duration}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
