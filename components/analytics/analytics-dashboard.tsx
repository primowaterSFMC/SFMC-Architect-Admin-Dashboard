"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiMetricsChart } from "./api-metrics-chart"
import { TopToolsChart } from "./top-tools-chart"
import { CustomerBreakdownChart } from "./customer-breakdown-chart"
import { ErrorAnalysisChart } from "./error-analysis-chart"
import { Download, Calendar, TrendingUp, AlertTriangle, Clock, Users } from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("calls")

  const handleExport = (format: "csv" | "pdf") => {
    console.log(`Exporting analytics data as ${format.toUpperCase()}`)
    // Implement export functionality
  }

  // Mock summary data
  const summaryData = {
    totalCalls: 156789,
    avgResponseTime: 234,
    errorRate: 2.3,
    activeCustomers: 89,
    topTool: "Data Extension Row Retrieve",
    peakHour: "2:00 PM",
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">API Analytics</h2>
          <p className="text-gray-600 mt-2">
            Comprehensive analytics and insights for your SFMC MCP server performance.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">-5% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summaryData.errorRate}%</div>
            <p className="text-xs text-muted-foreground">+0.1% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.activeCustomers}</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Tool</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{summaryData.topTool}</div>
            <p className="text-xs text-muted-foreground">8,934 calls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.peakHour}</div>
            <p className="text-xs text-muted-foreground">Daily average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Tools Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer Breakdown</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Calls Over Time</CardTitle>
                <CardDescription>API call volume and response times for the selected time period</CardDescription>
              </CardHeader>
              <CardContent>
                <ApiMetricsChart timeRange={timeRange} metric="calls" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <CardDescription>Average response times and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ApiMetricsChart timeRange={timeRange} metric="response" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hourly Distribution</CardTitle>
              <CardDescription>API usage patterns throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ApiMetricsChart timeRange={timeRange} metric="hourly" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Most Used Tools</CardTitle>
                <CardDescription>Tools ranked by API call volume</CardDescription>
              </CardHeader>
              <CardContent>
                <TopToolsChart type="usage" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tools by Category</CardTitle>
                <CardDescription>Usage distribution across tool categories</CardDescription>
              </CardHeader>
              <CardContent>
                <TopToolsChart type="category" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tool Performance Comparison</CardTitle>
              <CardDescription>Success rates and response times by tool</CardDescription>
            </CardHeader>
            <CardContent>
              <TopToolsChart type="performance" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage by Customer</CardTitle>
                <CardDescription>API calls breakdown by customer</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerBreakdownChart type="usage" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Activity Timeline</CardTitle>
                <CardDescription>Customer engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerBreakdownChart type="timeline" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Customers by Usage</CardTitle>
              <CardDescription>Customers ranked by total API consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Acme Corporation", usage: 45678, percentage: 29.1 },
                  { name: "Gamma Industries", usage: 34567, percentage: 22.0 },
                  { name: "Beta LLC", usage: 23456, percentage: 15.0 },
                  { name: "Delta Solutions", usage: 18901, percentage: 12.1 },
                  { name: "Echo Enterprises", usage: 15432, percentage: 9.8 },
                ].map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.usage.toLocaleString()} calls</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{customer.percentage}%</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-[#0176D3] h-2 rounded-full" style={{ width: `${customer.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Rate Trends</CardTitle>
                <CardDescription>Error rates over time by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ErrorAnalysisChart type="trends" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>Breakdown of error types</CardDescription>
              </CardHeader>
              <CardContent>
                <ErrorAnalysisChart type="distribution" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Errors</CardTitle>
              <CardDescription>Latest error occurrences and details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    timestamp: "2024-01-21T16:45:00Z",
                    error: "Rate limit exceeded",
                    customer: "Acme Corporation",
                    tool: "Data Extension Row Create",
                    count: 12,
                  },
                  {
                    timestamp: "2024-01-21T15:30:00Z",
                    error: "Authentication failed",
                    customer: "Beta LLC",
                    tool: "Journey Start",
                    count: 3,
                  },
                  {
                    timestamp: "2024-01-21T14:20:00Z",
                    error: "Invalid parameters",
                    customer: "Gamma Industries",
                    tool: "Email Send",
                    count: 8,
                  },
                  {
                    timestamp: "2024-01-21T13:15:00Z",
                    error: "Service unavailable",
                    customer: "Delta Solutions",
                    tool: "Subscriber Update",
                    count: 2,
                  },
                ].map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <div>
                        <p className="font-medium text-red-700">{error.error}</p>
                        <p className="text-sm text-gray-500">
                          {error.customer} • {error.tool}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">{error.count} occurrences</Badge>
                      <p className="text-xs text-gray-500 mt-1">{new Date(error.timestamp).toLocaleString()}</p>
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
