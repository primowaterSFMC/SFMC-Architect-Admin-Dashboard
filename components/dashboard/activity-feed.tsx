import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Key, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    action: "Token generated",
    customer: "Acme Corp",
    time: "2 minutes ago",
    type: "success",
    icon: Key,
    details: "New API token created for production environment",
  },
  {
    id: 2,
    action: "Customer suspended",
    customer: "Beta LLC",
    time: "15 minutes ago",
    type: "warning",
    icon: AlertTriangle,
    details: "Account suspended due to payment issues",
  },
  {
    id: 3,
    action: "API limit reached",
    customer: "Gamma Inc",
    time: "1 hour ago",
    type: "error",
    icon: XCircle,
    details: "Daily API limit of 10,000 calls exceeded",
  },
  {
    id: 4,
    action: "New customer added",
    customer: "Delta Co",
    time: "3 hours ago",
    type: "success",
    icon: Users,
    details: "Customer onboarding completed successfully",
  },
  {
    id: 5,
    action: "System maintenance",
    customer: "System",
    time: "6 hours ago",
    type: "info",
    icon: CheckCircle,
    details: "Scheduled maintenance completed without issues",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>Latest actions in your MCP server</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    item.type === "success"
                      ? "bg-green-100 text-green-600"
                      : item.type === "warning"
                        ? "bg-yellow-100 text-yellow-600"
                        : item.type === "error"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.customer}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.details}</p>
                </div>
                <Badge
                  variant={
                    item.type === "success"
                      ? "default"
                      : item.type === "warning"
                        ? "secondary"
                        : item.type === "error"
                          ? "destructive"
                          : "outline"
                  }
                  className="text-xs"
                >
                  {item.type}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
