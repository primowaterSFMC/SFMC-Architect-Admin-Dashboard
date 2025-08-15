import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Key, Users, Zap, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { PerformanceChart } from "./performance-chart"
import { ActivityFeed } from "./activity-feed"
import { StatsCard } from "./stats-card"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Welcome to your SFMC MCP Admin Portal. Monitor your server status and key metrics.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Status Banner */}
      <Card className="border-l-4 border-l-green-500 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium text-green-800">MCP Server is running normally</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Uptime: 99.9%
              </Badge>
            </div>
            <div className="text-sm text-green-700">Last restart: 3 days ago</div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Tokens"
          value="247"
          change="+12%"
          changeType="positive"
          icon={Key}
          description="from last month"
        />
        <StatsCard
          title="Total Customers"
          value="89"
          change="+3"
          changeType="positive"
          icon={Users}
          description="new this week"
        />
        <StatsCard
          title="API Calls Today"
          value="12,847"
          change="+8%"
          changeType="positive"
          icon={Activity}
          description="from yesterday"
        />
        <StatsCard
          title="Avg Response Time"
          value="142ms"
          change="-5%"
          changeType="positive"
          icon={Zap}
          description="improvement"
        />
      </div>

      {/* Performance Chart and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Performance Metrics (Last 24 Hours)</span>
              </CardTitle>
              <CardDescription>API calls, response times, and error rates</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time server metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm text-muted-foreground">23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "23%" }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm text-muted-foreground">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "67%" }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Disk Usage</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }} />
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-700">Database Connected</span>
                </div>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-700">SFMC API Healthy</span>
                </div>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-yellow-700">SSL Expires in 45 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-[#0176D3] hover:bg-[#014486]">
                <Key className="h-5 w-5" />
                <span className="text-sm">Generate Token</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-[#0176D3] text-[#0176D3] hover:bg-[#B0E7FF] bg-transparent"
              >
                <Users className="h-5 w-5" />
                <span className="text-sm">Add Customer</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-[#0176D3] text-[#0176D3] hover:bg-[#B0E7FF] bg-transparent"
              >
                <Activity className="h-5 w-5" />
                <span className="text-sm">View Analytics</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 border-[#0176D3] text-[#0176D3] hover:bg-[#B0E7FF] bg-transparent"
              >
                <Zap className="h-5 w-5" />
                <span className="text-sm">Health Check</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top SFMC Tools Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Top SFMC Tools (Last 7 Days)</CardTitle>
          <CardDescription>Most frequently used tools by your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Data Extension Create", category: "Data Extensions", usage: 1247, trend: "+15%" },
              { name: "Journey Builder Start", category: "Journey Builder", usage: 892, trend: "+8%" },
              { name: "Email Send", category: "Content Builder", usage: 756, trend: "+22%" },
              { name: "Subscriber Update", category: "Subscribers", usage: 634, trend: "-3%" },
              { name: "Automation Run", category: "Automation Studio", usage: 521, trend: "+12%" },
              { name: "Contact Retrieve", category: "Contacts", usage: 445, trend: "+5%" },
            ].map((tool, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{tool.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{tool.usage.toLocaleString()}</span>
                  <span className={`text-xs ${tool.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {tool.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
