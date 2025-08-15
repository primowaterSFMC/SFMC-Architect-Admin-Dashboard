"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ApiMetricsChartProps {
  timeRange: string
  metric: "calls" | "response" | "hourly"
}

// Mock data for different chart types
const callsData = [
  { time: "Jan 15", calls: 2450, responseTime: 234 },
  { time: "Jan 16", calls: 1890, responseTime: 245 },
  { time: "Jan 17", calls: 2980, responseTime: 198 },
  { time: "Jan 18", calls: 5670, responseTime: 267 },
  { time: "Jan 19", calls: 7890, responseTime: 234 },
  { time: "Jan 20", calls: 9230, responseTime: 189 },
  { time: "Jan 21", calls: 10450, responseTime: 245 },
]

const hourlyData = [
  { hour: "00:00", calls: 245 },
  { hour: "02:00", calls: 189 },
  { hour: "04:00", calls: 156 },
  { hour: "06:00", calls: 298 },
  { hour: "08:00", calls: 567 },
  { hour: "10:00", calls: 789 },
  { hour: "12:00", calls: 923 },
  { hour: "14:00", calls: 1045 },
  { hour: "16:00", calls: 1156 },
  { hour: "18:00", calls: 987 },
  { hour: "20:00", calls: 756 },
  { hour: "22:00", calls: 534 },
]

export function ApiMetricsChart({ timeRange, metric }: ApiMetricsChartProps) {
  if (metric === "hourly") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="hour" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="calls" fill="#0176D3" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={callsData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs" />
          <YAxis yAxisId="left" className="text-xs" />
          {metric === "calls" && <YAxis yAxisId="right" orientation="right" className="text-xs" />}
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
            dataKey={metric === "calls" ? "calls" : "responseTime"}
            stroke="#0176D3"
            strokeWidth={2}
            dot={{ fill: "#0176D3", strokeWidth: 2, r: 4 }}
            name={metric === "calls" ? "API Calls" : "Response Time (ms)"}
          />
          {metric === "calls" && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="responseTime"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
              name="Response Time (ms)"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
