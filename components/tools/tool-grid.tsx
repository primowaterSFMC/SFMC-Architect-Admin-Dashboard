"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, TrendingUp, CheckCircle, Eye } from "lucide-react"

interface Tool {
  name: string
  description: string
  usageCount: number
  lastUsed: Date
  successRate: number
  avgResponseTime: number
  category: string
}

interface ToolGridProps {
  tools: Tool[]
  onToolSelect: (tool: Tool) => void
}

export function ToolGrid({ tools, onToolSelect }: ToolGridProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 98) return "text-green-600"
    if (rate >= 95) return "text-yellow-600"
    return "text-red-600"
  }

  const getUsageBadgeVariant = (count: number) => {
    if (count >= 5000) return "default"
    if (count >= 1000) return "secondary"
    return "outline"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg group-hover:text-[#0176D3] transition-colors">{tool.name}</CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">
                  {tool.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onToolSelect(tool)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-sm mt-2 line-clamp-2">{tool.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Usage Statistics */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Usage</span>
                </div>
                <Badge variant={getUsageBadgeVariant(tool.usageCount)}>{tool.usageCount.toLocaleString()}</Badge>
              </div>

              {/* Success Rate */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Success Rate</span>
                </div>
                <span className={`text-sm font-medium ${getSuccessRateColor(tool.successRate)}`}>
                  {tool.successRate.toFixed(1)}%
                </span>
              </div>

              {/* Last Used */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Last Used</span>
                </div>
                <span className="text-sm text-gray-500">{formatDate(tool.lastUsed)}</span>
              </div>

              {/* Response Time */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Response</span>
                <span className="text-sm font-medium">{tool.avgResponseTime}ms</span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent hover:bg-[#B0E7FF] border-[#0176D3] text-[#0176D3]"
              onClick={() => onToolSelect(tool)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
