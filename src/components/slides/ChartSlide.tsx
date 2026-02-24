"use client"

import { SlideHeader } from "./shared/SlideHeader"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"

// ── Interfaces ──────────────────────────────────────────

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

// ── Colors ──────────────────────────────────────────────

const CHART_COLORS = {
  primary: "#004B8D",
  secondary: "#48A9C5",
  accent: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const

const PIE_COLORS = ["#004B8D","#48A9C5","#10B981","#F59E0B","#EF4444","#8B5CF6","#EC4899","#14B8A6"] as const

const FONT = "Pretendard, -apple-system, sans-serif"

// ── Custom Tooltip ──────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        padding: "10px 16px",
        border: "1px solid #E5E7EB",
        fontFamily: FONT,
      }}
    >
      <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 18, fontWeight: 700, color: CHART_COLORS.primary }}>{payload[0].value.toLocaleString()}</p>
    </div>
  )
}

// ── Chart Renderers ─────────────────────────────────────

function RenderLineChart({ data, yAxisLabel }: { data: readonly ChartDataPoint[]; yAxisLabel?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={[...data]} margin={{ top: 20, right: 24, left: 16, bottom: 20 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={CHART_COLORS.primary} />
            <stop offset="100%" stopColor={CHART_COLORS.secondary} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="4 4" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 13, fill: "#6B7280", fontFamily: FONT }}
          axisLine={{ stroke: "#E5E7EB" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: FONT }}
          axisLine={false}
          tickLine={false}
          width={48}
          label={
            yAxisLabel
              ? { value: yAxisLabel, angle: -90, position: "insideLeft", offset: -4, style: { fontSize: 12, fill: "#9CA3AF", fontFamily: FONT } }
              : undefined
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="url(#lineGrad)"
          strokeWidth={3}
          dot={{ r: 5, fill: CHART_COLORS.primary, stroke: "#fff", strokeWidth: 2 }}
          activeDot={{ r: 7, fill: CHART_COLORS.secondary, stroke: "#fff", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function RenderBarChart({ data, yAxisLabel }: { data: readonly ChartDataPoint[]; yAxisLabel?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={[...data]} margin={{ top: 20, right: 24, left: 16, bottom: 20 }}>
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLORS.primary} />
            <stop offset="100%" stopColor={CHART_COLORS.secondary} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="4 4" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 13, fill: "#6B7280", fontFamily: FONT }}
          axisLine={{ stroke: "#E5E7EB" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: FONT }}
          axisLine={false}
          tickLine={false}
          width={48}
          label={
            yAxisLabel
              ? { value: yAxisLabel, angle: -90, position: "insideLeft", offset: -4, style: { fontSize: 12, fill: "#9CA3AF", fontFamily: FONT } }
              : undefined
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="url(#barGrad)" radius={[6, 6, 0, 0]} maxBarSize={60} />
      </BarChart>
    </ResponsiveContainer>
  )
}

function RenderPieChart({ data }: { data: readonly ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 12, fontFamily: FONT, color: "#6B7280" }}
        />
        <Pie
          data={[...data].map(d => ({ name: d.label, value: d.value }))}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={3}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

// ── Annotation Panel ────────────────────────────────────

function AnnotationPanel({
  highlight,
  description,
  data,
}: {
  highlight?: string
  description?: string
  data: readonly ChartDataPoint[]
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        fontFamily: FONT,
        height: "100%",
        justifyContent: "center",
      }}
    >
      {/* Highlight */}
      {highlight && (
        <div style={{ marginBottom: 24 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              color: "rgba(16,185,129,0.6)",
            }}
          >
            HIGHLIGHT
          </span>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#10B981", marginTop: 8, lineHeight: 1.3 }}>
            {highlight}
          </p>
          <div style={{ width: 32, height: 2, background: "#10B981", marginTop: 12, borderRadius: 1 }} />
        </div>
      )}

      {/* Data Summary */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.map((point, i) => (
          <div key={i}>
            <p style={{ fontSize: 18, fontWeight: 700, color: CHART_COLORS.primary, lineHeight: 1.2 }}>
              {point.value.toLocaleString()}
            </p>
            <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{point.label}</p>
            {point.annotation && point.annotation.length > 0 && (
              <p
                style={{
                  fontSize: 11,
                  marginTop: 2,
                  fontWeight: 600,
                  color: point.annotation.startsWith("-") ? CHART_COLORS.primary : "#10B981",
                }}
              >
                {point.annotation}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Description */}
      {description && description.length > 0 && (
        <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 16, lineHeight: 1.6 }}>
          {description}
        </p>
      )}
    </div>
  )
}

// ── Main Component ──────────────────────────────────────

export function ChartSlide({ title, chart, highlight, description }: ChartSlideProps) {
  // Calculate layout constants
  const CANVAS_W = 1280
  const CANVAS_H = 720
  const PAD_X = 64    // px-16 = 64px
  const PAD_TOP = 40
  const HEADER_H = 64 // approximate header height (accent bar + title)
  const GAP_AFTER_HEADER = 24 // mt-6
  const PAD_BOTTOM = 40
  const BODY_H = CANVAS_H - PAD_TOP - HEADER_H - GAP_AFTER_HEADER - PAD_BOTTOM
  const CONTENT_W = CANVAS_W - PAD_X * 2
  const GAP = 32
  const CHART_W = Math.floor(CONTENT_W * 0.7 - GAP / 2)
  const PANEL_W = CONTENT_W - CHART_W - GAP

  return (
    <div
      style={{
        width: CANVAS_W,
        height: CANVAS_H,
        background: "#F8FAFC",
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ padding: `${PAD_TOP}px ${PAD_X}px 0 ${PAD_X}px` }}>
        <SlideHeader title={title} align="left" />
      </div>

      {/* Body: Chart + Divider + Annotation */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          marginTop: GAP_AFTER_HEADER,
          paddingLeft: PAD_X,
          paddingRight: PAD_X,
          paddingBottom: PAD_BOTTOM,
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left: Chart (70%) */}
        <div
          style={{
            width: CHART_W,
            height: BODY_H,
            flexShrink: 0,
          }}
        >
          {chart.type === "line" && <RenderLineChart data={chart.data} yAxisLabel={chart.yAxisLabel} />}
          {chart.type === "bar" && <RenderBarChart data={chart.data} yAxisLabel={chart.yAxisLabel} />}
          {chart.type === "pie" && <RenderPieChart data={chart.data} />}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            alignSelf: "stretch",
            background: "#E5E7EB",
            marginLeft: GAP / 2,
            marginRight: GAP / 2,
            flexShrink: 0,
          }}
        />

        {/* Right: Annotation Panel (30%) */}
        <div
          style={{
            width: PANEL_W,
            height: BODY_H,
            flexShrink: 0,
            paddingLeft: 8,
            overflow: "hidden",
          }}
        >
          <AnnotationPanel highlight={highlight} description={description} data={chart.data} />
        </div>
      </div>
    </div>
  )
}
