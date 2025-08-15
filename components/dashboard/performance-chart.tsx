"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { time: "00:00", apiCalls: 245, responseTime: 120, errors: 2 },
  { time: "02:00", apiCalls: 189, responseTime: 135, errors: 1 },
  { time: "04:00", apiCalls: 156, responseTime: 142, errors: 0 },
  { time: "06:00", apiCalls: 298, responseTime: 128, errors: 3 },
  { time: "08:00", apiCalls: 567, responseTime: 145, errors: 5 },
  { time: "10:00", apiCalls: 789, responseTime: 152, errors: 8 },
  { time: "12:00", apiCalls: 923, responseTime: 148, errors: 6 },
  { time: "14:00", apiCalls: 1045, responseTime: 156, errors: 12 },
  { time: "16:00", apiCalls: 1156, responseTime: 162, errors: 9 },
  { time: "18:00", apiCalls: 987, responseTime: 158, errors: 7 },
  { time: "20:00", apiCalls: 756, responseTime: 145, errors: 4 },
  { time: "22:00", apiCalls: 534, responseTime: 138, errors: 2 },
]

export function PerformanceChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs" />
          <YAxis yAxisId="left" className="text-xs" />
          <YAxis yAxisId="right" orientation="right" className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="apiCalls"
            stroke="#0176D3"
            strokeWidth={2}
            name="API Calls"
            dot={{ fill: "#0176D3", strokeWidth: 2, r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="responseTime"
            stroke="#10B981"
            strokeWidth={2}
            name="Response Time (ms)"
            dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="errors"
            stroke="#EF4444"
            strokeWidth={2}
            name="Errors"
            dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
