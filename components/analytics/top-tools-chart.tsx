"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface TopToolsChartProps {
  type: "usage" | "category" | "performance"
}

const topToolsData = [
  { name: "Data Extension Row Retrieve", usage: 8934, responseTime: 145, successRate: 99.2 },
  { name: "Data Extension Row Create", usage: 5678, responseTime: 312, successRate: 96.8 },
  { name: "Subscriber Retrieve", usage: 4567, responseTime: 89, successRate: 99.5 },
  { name: "Data Extension Row Update", usage: 3421, responseTime: 278, successRate: 97.5 },
  { name: "Email Send", usage: 2345, responseTime: 678, successRate: 95.4 },
  { name: "Data Extension Retrieve", usage: 2156, responseTime: 98, successRate: 99.8 },
  { name: "Journey Start", usage: 1892, responseTime: 234, successRate: 98.7 },
  { name: "Contact Retrieve", usage: 1567, responseTime: 78, successRate: 99.7 },
  { name: "Data Extension Create", usage: 1247, responseTime: 245, successRate: 98.5 },
  { name: "Subscriber Create", usage: 1234, responseTime: 198, successRate: 97.6 },
]

const categoryData = [
  { name: "Data Extensions", value: 21537, color: "#0176D3" },
  { name: "Subscribers", value: 6124, color: "#10B981" },
  { name: "Journey Builder", value: 4567, color: "#F59E0B" },
  { name: "Content Builder", value: 3456, color: "#EF4444" },
  { name: "Contacts", value: 2890, color: "#8B5CF6" },
  { name: "Automation Studio", value: 1876, color: "#06B6D4" },
]

export function TopToolsChart({ type }: TopToolsChartProps) {
  if (type === "category") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (type === "performance") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topToolsData.slice(0, 5)} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" className="text-xs" />
            <YAxis dataKey="name" type="category" className="text-xs" width={150} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="successRate" fill="#10B981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topToolsData.slice(0, 8)}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={100} />
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
