"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface CustomerBreakdownChartProps {
  type: "usage" | "timeline"
}

const customerUsageData = [
  { name: "Acme Corp", usage: 45678, tokens: 3 },
  { name: "Gamma Industries", usage: 34567, tokens: 5 },
  { name: "Beta LLC", usage: 23456, tokens: 1 },
  { name: "Delta Solutions", usage: 18901, tokens: 2 },
  { name: "Echo Enterprises", usage: 15432, tokens: 4 },
]

const timelineData = [
  { date: "Jan 15", acme: 2450, gamma: 1890, beta: 1200, delta: 980 },
  { date: "Jan 16", acme: 2100, gamma: 2100, beta: 1100, delta: 1200 },
  { date: "Jan 17", acme: 2800, gamma: 2300, beta: 1300, delta: 1100 },
  { date: "Jan 18", acme: 3200, gamma: 2800, beta: 1500, delta: 1400 },
  { date: "Jan 19", acme: 3800, gamma: 3200, beta: 1800, delta: 1600 },
  { date: "Jan 20", acme: 4200, gamma: 3600, beta: 2100, delta: 1800 },
  { date: "Jan 21", acme: 4800, gamma: 4100, beta: 2400, delta: 2000 },
]

export function CustomerBreakdownChart({ type }: CustomerBreakdownChartProps) {
  if (type === "timeline") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timelineData}>
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
            <Line type="monotone" dataKey="acme" stroke="#0176D3" strokeWidth={2} name="Acme Corp" />
            <Line type="monotone" dataKey="gamma" stroke="#10B981" strokeWidth={2} name="Gamma Industries" />
            <Line type="monotone" dataKey="beta" stroke="#F59E0B" strokeWidth={2} name="Beta LLC" />
            <Line type="monotone" dataKey="delta" stroke="#EF4444" strokeWidth={2} name="Delta Solutions" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={customerUsageData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="usage" fill="#0176D3" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
