"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface SystemMetricsChartProps {
  type: "system" | "network" | "response"
}

const systemData = [
  { time: "00:00", cpu: 25, memory: 65, disk: 45 },
  { time: "02:00", cpu: 20, memory: 62, disk: 45 },
  { time: "04:00", cpu: 18, memory: 60, disk: 46 },
  { time: "06:00", cpu: 30, memory: 68, disk: 46 },
  { time: "08:00", cpu: 45, memory: 72, disk: 47 },
  { time: "10:00", cpu: 55, memory: 75, disk: 47 },
  { time: "12:00", cpu: 60, memory: 78, disk: 48 },
  { time: "14:00", cpu: 65, memory: 80, disk: 48 },
  { time: "16:00", cpu: 58, memory: 77, disk: 49 },
  { time: "18:00", cpu: 50, memory: 74, disk: 49 },
  { time: "20:00", cpu: 40, memory: 70, disk: 50 },
  { time: "22:00", cpu: 30, memory: 67, disk: 50 },
]

const networkData = [
  { time: "00:00", networkIn: 12, networkOut: 8, dbConnections: 145 },
  { time: "02:00", networkIn: 8, networkOut: 6, dbConnections: 120 },
  { time: "04:00", networkIn: 6, networkOut: 4, dbConnections: 110 },
  { time: "06:00", networkIn: 15, networkOut: 12, dbConnections: 160 },
  { time: "08:00", networkIn: 25, networkOut: 20, dbConnections: 200 },
  { time: "10:00", networkIn: 35, networkOut: 28, dbConnections: 250 },
  { time: "12:00", networkIn: 40, networkOut: 32, dbConnections: 280 },
  { time: "14:00", networkIn: 45, networkOut: 36, dbConnections: 300 },
  { time: "16:00", networkIn: 38, networkOut: 30, dbConnections: 270 },
  { time: "18:00", networkIn: 30, networkOut: 24, dbConnections: 230 },
  { time: "20:00", networkIn: 22, networkOut: 18, dbConnections: 190 },
  { time: "22:00", networkIn: 16, networkOut: 12, dbConnections: 160 },
]

const responseData = [
  { time: "00:00", p50: 120, p95: 280, p99: 450 },
  { time: "02:00", p50: 115, p95: 270, p99: 420 },
  { time: "04:00", p50: 110, p95: 260, p99: 400 },
  { time: "06:00", p50: 125, p95: 290, p99: 480 },
  { time: "08:00", p50: 140, p95: 320, p99: 520 },
  { time: "10:00", p50: 155, p95: 350, p99: 580 },
  { time: "12:00", p50: 165, p95: 370, p99: 620 },
  { time: "14:00", p50: 170, p95: 380, p99: 650 },
  { time: "16:00", p50: 160, p95: 360, p99: 600 },
  { time: "18:00", p50: 150, p95: 340, p99: 560 },
  { time: "20:00", p50: 135, p95: 310, p99: 500 },
  { time: "22:00", p50: 125, p95: 285, p99: 460 },
]

export function SystemMetricsChart({ type }: SystemMetricsChartProps) {
  if (type === "network") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={networkData}>
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="networkIn"
              stroke="#0176D3"
              strokeWidth={2}
              name="Network In (MB/s)"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="networkOut"
              stroke="#10B981"
              strokeWidth={2}
              name="Network Out (MB/s)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="dbConnections"
              stroke="#F59E0B"
              strokeWidth={2}
              name="DB Connections"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (type === "response") {
    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={responseData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Area type="monotone" dataKey="p99" stackId="1" stroke="#EF4444" fill="#FEE2E2" name="99th Percentile" />
            <Area type="monotone" dataKey="p95" stackId="1" stroke="#F59E0B" fill="#FEF3C7" name="95th Percentile" />
            <Area type="monotone" dataKey="p50" stackId="1" stroke="#0176D3" fill="#DBEAFE" name="50th Percentile" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={systemData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Line type="monotone" dataKey="cpu" stroke="#EF4444" strokeWidth={2} name="CPU %" />
          <Line type="monotone" dataKey="memory" stroke="#F59E0B" strokeWidth={2} name="Memory %" />
          <Line type="monotone" dataKey="disk" stroke="#0176D3" strokeWidth={2} name="Disk %" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
