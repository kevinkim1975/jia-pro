"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// 색상 팔레트
const CHART_COLORS = {
  primary: "#004B8D",
  secondary: "#48A9C5",
  accent: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
}

const PIE_COLORS = ["#004B8D", "#48A9C5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

// 차트 데이터 타입
interface ChartDataPoint {
  readonly label: string
  readonly value: number
  readonly annotation?: string
}

interface LineChartData {
  readonly type: "line"
  readonly data: readonly ChartDataPoint[]
  readonly yAxisLabel?: string
}

interface BarChartData {
  readonly type: "bar"
  readonly data: readonly ChartDataPoint[]
  readonly yAxisLabel?: string
}

interface PieChartData {
  readonly type: "pie"
  readonly data: readonly ChartDataPoint[]
}

type ChartData = LineChartData | BarChartData | PieChartData

interface ChartSlideProps {
  title: string
  chart: ChartData
  highlight?: string
  description?: string
}

function renderChart(chart: ChartData) {
  switch (chart.type) {
    case "line":
      return (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chart.data.map(d => ({ name: d.label, value: d.value, annotation: d.annotation }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
            <YAxis tick={{ fill: "#6B7280" }} label={{ value: chart.yAxisLabel, angle: -90, position: "insideLeft", fill: "#6B7280" }} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px" }}
              formatter={(value) => [value ?? 0, "값"]}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={CHART_COLORS.primary} 
              strokeWidth={3}
              dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: CHART_COLORS.secondary }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    
    case "bar":
      return (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chart.data.map(d => ({ name: d.label, value: d.value }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
            <YAxis tick={{ fill: "#6B7280" }} label={{ value: chart.yAxisLabel, angle: -90, position: "insideLeft", fill: "#6B7280" }} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "8px" }}
            />
            <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    
    case "pie":
      return (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chart.data.map(d => ({ name: d.label, value: d.value }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chart.data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )
    
    default:
      return null
  }
}

export function ChartSlide({ title, chart, highlight, description }: ChartSlideProps) {
  return (
    <div className="space-y-6">
      {/* 제목 */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      
      {/* 차트 */}
      <Card className="p-6">
        {renderChart(chart)}
      </Card>
      
      {/* 하이라이트 */}
      {highlight && (
        <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
          <p className="text-lg font-semibold text-accent">
            💡 {highlight}
          </p>
        </div>
      )}
      
      {/* 설명 */}
      {description && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
