"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Clock, CheckCircle, TrendingUp, Code, FileText, Activity, Copy } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { toast } from "@/hooks/use-toast"

interface Tool {
  name: string
  description: string
  usageCount: number
  lastUsed: Date
  successRate: number
  avgResponseTime: number
  category: string
}

interface ToolDetailModalProps {
  tool: Tool | null
  isOpen: boolean
  onClose: () => void
}

// Mock performance data
const performanceData = [
  { date: "Jan 15", calls: 145, responseTime: 234, errors: 2 },
  { date: "Jan 16", calls: 189, responseTime: 245, errors: 1 },
  { date: "Jan 17", calls: 234, responseTime: 198, errors: 0 },
  { date: "Jan 18", calls: 298, responseTime: 267, errors: 3 },
  { date: "Jan 19", calls: 345, responseTime: 234, errors: 1 },
  { date: "Jan 20", calls: 267, responseTime: 189, errors: 2 },
  { date: "Jan 21", calls: 389, responseTime: 245, errors: 1 },
]

// Mock example usage
const exampleUsage = {
  request: `{
  "method": "POST",
  "endpoint": "/data-extensions/create",
  "headers": {
    "Authorization": "Bearer your-token",
    "Content-Type": "application/json"
  },
  "body": {
    "name": "Customer_Data",
    "description": "Customer information data extension",
    "fields": [
      {
        "name": "CustomerID",
        "type": "Text",
        "length": 50,
        "isPrimaryKey": true
      },
      {
        "name": "Email",
        "type": "EmailAddress",
        "length": 254
      },
      {
        "name": "FirstName",
        "type": "Text",
        "length": 50
      }
    ]
  }
}`,
  response: `{
  "success": true,
  "data": {
    "id": "12345678-1234-1234-1234-123456789012",
    "name": "Customer_Data",
    "description": "Customer information data extension",
    "createdDate": "2024-01-21T10:30:00Z",
    "modifiedDate": "2024-01-21T10:30:00Z",
    "fields": [
      {
        "name": "CustomerID",
        "type": "Text",
        "length": 50,
        "isPrimaryKey": true
      },
      {
        "name": "Email",
        "type": "EmailAddress",
        "length": 254
      },
      {
        "name": "FirstName",
        "type": "Text",
        "length": 50
      }
    ]
  }
}`,
}

export function ToolDetailModal({ tool, isOpen, onClose }: ToolDetailModalProps) {
  if (!tool) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 98) return "text-green-600"
    if (rate >= 95) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{tool.name}</DialogTitle>
              <DialogDescription className="mt-2">{tool.description}</DialogDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {tool.category}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage & Examples</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] mt-4">
            <TabsContent value="overview" className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tool.usageCount.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">API calls</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${getSuccessRateColor(tool.successRate)}`}>
                      {tool.successRate.toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Success rate</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tool.avgResponseTime}ms</div>
                    <p className="text-xs text-muted-foreground">Response time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Used</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-bold">{formatDate(tool.lastUsed)}</div>
                    <p className="text-xs text-muted-foreground">Last activity</p>
                  </CardContent>
                </Card>
              </div>

              {/* Tool Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {tool.description} This tool is part of the {tool.category} category and provides essential
                    functionality for managing your Salesforce Marketing Cloud operations. It has been used{" "}
                    {tool.usageCount.toLocaleString()} times with a success rate of {tool.successRate.toFixed(1)}%.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="h-5 w-5" />
                    <span>Example Request</span>
                  </CardTitle>
                  <CardDescription>Sample API request for this tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{exampleUsage.request}</code>
                    </pre>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-transparent"
                      onClick={() => copyToClipboard(exampleUsage.request)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Example Response</CardTitle>
                  <CardDescription>Sample API response from this tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{exampleUsage.response}</code>
                    </pre>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-transparent"
                      onClick={() => copyToClipboard(exampleUsage.response)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Performance Metrics (Last 7 Days)</span>
                  </CardTitle>
                  <CardDescription>API calls, response times, and error rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="date" className="text-xs" />
                        <YAxis yAxisId="left" className="text-xs" />
                        <YAxis yAxisId="right" orientation="right" className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="calls"
                          stroke="#0176D3"
                          strokeWidth={2}
                          name="API Calls"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="responseTime"
                          stroke="#10B981"
                          strokeWidth={2}
                          name="Response Time (ms)"
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="errors"
                          stroke="#EF4444"
                          strokeWidth={2}
                          name="Errors"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Tool Documentation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Purpose</h4>
                    <p className="text-gray-700">
                      {tool.description} This tool provides essential functionality for {tool.category.toLowerCase()}
                      operations within Salesforce Marketing Cloud.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Parameters</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Authentication token (required)</li>
                      <li>Request payload with tool-specific parameters</li>
                      <li>Optional configuration settings</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Response Format</h4>
                    <p className="text-gray-700">
                      Returns JSON response with success status, data payload, and any relevant metadata.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Error Handling</h4>
                    <p className="text-gray-700">
                      Standard HTTP status codes are returned. Common errors include authentication failures, invalid
                      parameters, and rate limiting.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Rate Limits</h4>
                    <p className="text-gray-700">
                      This tool is subject to standard SFMC API rate limits. Monitor your usage to avoid throttling.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
