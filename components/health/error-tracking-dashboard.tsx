"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, TrendingDown, TrendingUp, Clock, User, Code } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const errorTrendsData = [
  { date: "Jan 15", errors: 23, warnings: 45, critical: 2 },
  { date: "Jan 16", errors: 18, warnings: 38, critical: 1 },
  { date: "Jan 17", errors: 31, warnings: 52, critical: 4 },
  { date: "Jan 18", errors: 27, warnings: 41, critical: 2 },
  { date: "Jan 19", errors: 19, warnings: 35, critical: 1 },
  { date: "Jan 20", errors: 25, warnings: 48, critical: 3 },
  { date: "Jan 21", errors: 21, warnings: 39, critical: 1 },
]

const errorsByTypeData = [
  { type: "Authentication", count: 45, percentage: 32.1 },
  { type: "Rate Limiting", count: 38, percentage: 27.1 },
  { type: "Validation", count: 28, percentage: 20.0 },
  { type: "Server Error", count: 18, percentage: 12.9 },
  { type: "Timeout", count: 11, percentage: 7.9 },
]

const recentErrors = [
  {
    id: 1,
    timestamp: "2024-01-21T16:45:23Z",
    level: "error",
    message: "Rate limit exceeded for customer acme_corp",
    source: "api/tokens/validate",
    customer: "Acme Corporation",
    count: 12,
    resolved: false,
  },
  {
    id: 2,
    timestamp: "2024-01-21T16:42:15Z",
    level: "warning",
    message: "High memory usage detected",
    source: "system/monitor",
    customer: null,
    count: 1,
    resolved: false,
  },
  {
    id: 3,
    timestamp: "2024-01-21T16:38:07Z",
    level: "error",
    message: "SFMC API authentication failed",
    source: "sfmc/auth",
    customer: "Beta LLC",
    count: 3,
    resolved: true,
  },
  {
    id: 4,
    timestamp: "2024-01-21T16:35:42Z",
    level: "critical",
    message: "Database connection pool exhausted",
    source: "database/pool",
    customer: null,
    count: 1,
    resolved: true,
  },
]

export function ErrorTrackingDashboard() {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
      case "error":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>
      default:
        return <Badge variant="secondary">{level}</Badge>
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Error Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors (24h)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">164</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
              -12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">14</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-red-600" />
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23m</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
              -5m improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-muted-foreground">Of total requests</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Error Trends</TabsTrigger>
          <TabsTrigger value="types">Error Types</TabsTrigger>
          <TabsTrigger value="recent">Recent Errors</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Trends (Last 7 Days)</CardTitle>
              <CardDescription>Error occurrences by severity level over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={errorTrendsData}>
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
                    <Line type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={2} name="Critical" />
                    <Line type="monotone" dataKey="errors" stroke="#F59E0B" strokeWidth={2} name="Errors" />
                    <Line type="monotone" dataKey="warnings" stroke="#10B981" strokeWidth={2} name="Warnings" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Errors by Type</CardTitle>
                <CardDescription>Distribution of error types in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={errorsByTypeData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="type" className="text-xs" angle={-45} textAnchor="end" height={80} />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Type Breakdown</CardTitle>
                <CardDescription>Detailed breakdown with percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorsByTypeData.map((error, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div>
                          <p className="font-medium">{error.type}</p>
                          <p className="text-sm text-gray-500">{error.count} occurrences</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{error.percentage}%</p>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${error.percentage}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Error Log</CardTitle>
              <CardDescription>Latest error occurrences with details and resolution status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentErrors.map((error) => (
                  <div key={error.id} className={`p-4 border rounded-lg ${error.resolved ? "bg-gray-50" : "bg-white"}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getLevelIcon(error.level)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getLevelBadge(error.level)}
                            {error.resolved && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>
                            )}
                            {error.count > 1 && <Badge variant="outline">{error.count}x</Badge>}
                          </div>
                          <p className="font-medium text-gray-900">{error.message}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Code className="h-3 w-3" />
                              <span>{error.source}</span>
                            </div>
                            {error.customer && (
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{error.customer}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(error.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Details
                      </Button>
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
