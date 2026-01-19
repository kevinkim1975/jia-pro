"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Info } from "lucide-react"
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

// 디자인 시스템 색상
const CHART_COLORS = {
  primary: "#004B8D",
  secondary: "#48A9C5",
  accent: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const

const PIE_COLORS = [
  "#004B8D",
  "#48A9C5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6"
] as const

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
  readonly title: string
  readonly chart: ChartData
  readonly highlight?: string
  readonly description?: string
}

// 커스텀 툴팁 컴포넌트
function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
        <p className="text-lg font-bold text-[#004B8D]">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

// 파이 차트 라벨 렌더러
function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: {
  cx?: number
  cy?: number
  midAngle?: number
  innerRadius?: number
  outerRadius?: number
  percent?: number
  name?: string
}) {
  // undefined 체크
  if (cx === undefined || cy === undefined || midAngle === undefined || 
      innerRadius === undefined || outerRadius === undefined || percent === undefined) {
    return null
  }
  
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (percent < 0.05) return null

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-sm font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function renderChart(chart: ChartData) {
  switch (chart.type) {
    case "line":
      return (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={chart.data.map(d => ({
              name: d.label,
              value: d.value,
              annotation: d.annotation
            }))}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={chart.yAxisLabel ? {
                value: chart.yAxisLabel,
                angle: -90,
                position: "insideLeft",
                fill: "#6B7280",
                fontSize: 12
              } : undefined}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={CHART_COLORS.primary}
              strokeWidth={3}
              dot={{
                fill: CHART_COLORS.primary,
                strokeWidth: 2,
                r: 5,
                stroke: "white"
              }}
              activeDot={{
                r: 8,
                fill: CHART_COLORS.secondary,
                stroke: "white",
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )

    case "bar":
      return (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chart.data.map(d => ({
              name: d.label,
              value: d.value
            }))}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.primary} />
                <stop offset="100%" stopColor={CHART_COLORS.secondary} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={chart.yAxisLabel ? {
                value: chart.yAxisLabel,
                angle: -90,
                position: "insideLeft",
                fill: "#6B7280",
                fontSize: 12
              } : undefined}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      )

    case "pie":
      return (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chart.data.map(d => ({
                name: d.label,
                value: d.value
              }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={2}
              stroke="white"
            >
              {chart.data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | undefined) => {
                const safeValue = value ?? 0
                return [safeValue.toLocaleString(), "값"]
              }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={10}
              formatter={(value: string) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )

    default:
      return null
  }
}

export function ChartSlide({ title, chart, highlight, description }: ChartSlideProps) {
  return (
    <div className="min-h-[800px] max-h-[800px] overflow-y-auto py-8 space-y-6">
      {/* 타이틀 */}
      <div className="space-y-2">
        <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
      </div>

      {/* 차트 컨테이너 */}
      <Card className="p-6 border-2 border-gray-100 bg-white shadow-sm">
        {renderChart(chart)}
      </Card>

      {/* 하이라이트 */}
      {highlight && (
        <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-[#10B981]/10 to-[#48A9C5]/10 border-l-4 border-[#10B981]">
          <TrendingUp className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
          <p className="text-lg font-semibold text-[#10B981]">
            {highlight}
          </p>
        </div>
      )}

      {/* 설명 */}
      {description && (
        <div className="flex items-start gap-3 text-gray-600">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
          <p className="text-base leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  )
}
