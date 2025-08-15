"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface ErrorAnalysisChartProps {
  type: "trends" | "distribution"
}

const errorTrendsData = [
  { date: "Jan 15", authentication: 12, rateLimit: 8, validation: 5, server: 2 },
  { date: "Jan 16", authentication: 8, rateLimit: 15, validation: 3, server: 1 },
  { date: "Jan 17", authentication: 6, rateLimit: 12, validation: 8, server: 3 },
  { date: "Jan 18", authentication: 15, rateLimit: 20, validation: 6, server: 4 },
  { date: "Jan 19", authentication: 10, rateLimit: 18, validation: 4, server: 2 },
  { date: "Jan 20", authentication: 7, rateLimit: 22, validation: 7, server: 1 },
  { date: "Jan 21", authentication: 9, rateLimit: 25, validation: 5, server: 3 },
]

const errorDistributionData = [
  { name: "Rate Limit Exceeded", value: 120, color: "#EF4444" },
  { name: "Authentication Failed", value: 67, color: "#F59E0B" },
  { name: "Invalid Parameters", value: 38, color: "#8B5CF6" },
  { name: "Server Error", value: 16, color: "#6B7280" },
  { name: "Timeout", value: 12, color: "#06B6D4" },
]

export function ErrorAnalysisChart({ type }: ErrorAnalysisChartProps) {
  if (type === "distribution") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={errorDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {errorDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
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
          <Line type="monotone" dataKey="authentication" stroke="#F59E0B" strokeWidth={2} name="Authentication" />
          <Line type="monotone" dataKey="rateLimit" stroke="#EF4444" strokeWidth={2} name="Rate Limit" />
          <Line type="monotone" dataKey="validation" stroke="#8B5CF6" strokeWidth={2} name="Validation" />
          <Line type="monotone" dataKey="server" stroke="#6B7280" strokeWidth={2} name="Server Error" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
