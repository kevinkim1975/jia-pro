# ChartSlide Plan B — "Annotated Insight"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 데이터에는 항상 맥락이 필요하다. 차트 옆에 주석을 배치하면 청중이 "그래서 뭐?"를 묻지 않는다. Bloomberg Terminal 레이아웃에서 차용.

## TASK
1280×720px 고정 캔버스에 "차트/그래프" 슬라이드를 React/TypeScript로 구현.
recharts 라이브러리로 line/bar/pie 3종 차트를 지원. 좌측 70% 차트 + 우측 30% 주석 패널.

## ── FROZEN (절대 변경 금지) ────────────────────

### 파일 상단
```tsx
"use client"
```

### Import (반드시 사용)
```tsx
import { SlideHeader } from "./shared/SlideHeader"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
```

### Interface (정확히 이 타입)
```tsx
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
```

### Export
```tsx
export function ChartSlide({ title, chart, highlight, description }: ChartSlideProps)
```

### Canvas
- 루트 div: width 1280px, height 720px 고정, inline style
- 배경: #F8FAFC
- fontFamily: "Pretendard, -apple-system, sans-serif"
- 반응형 클래스(md:, lg:) 사용 금지

### Header
- `<SlideHeader title={title} align="left" />` 호출
- 직접 타이틀 구현 금지

### SlideHeader 내부 구조 (참고용, 수정 불가)
```tsx
<div className="space-y-2">
  <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
  <h2 className="text-3xl font-bold text-gray-900 leading-tight">{title}</h2>
</div>
```

### Chart Colors (이 팔레트만 사용)
```tsx
const CHART_COLORS = {
  primary: "#004B8D",
  secondary: "#48A9C5",
  accent: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const
const PIE_COLORS = ["#004B8D","#48A9C5","#10B981","#F59E0B","#EF4444","#8B5CF6","#EC4899","#14B8A6"] as const
```

### 금지사항
- shadcn Card, shadcn UI 컴포넌트 일체 사용 금지
- default export 금지
- sampleData / Preview 컴포넌트 금지
- lucide-react 아이콘 금지
- 빨간색 계열을 UI 장식에 사용 금지 (차트 데이터 색상으로만 허용)

## ── FREE (v0 자유도) ────────────────────────────

### 핵심: 좌측 차트 70% + 우측 주석 패널 30%

1. **전체 레이아웃**: SlideHeader 아래 flex-1
   - 좌우 패딩: px-16
   - flex flex-row, gap-8
   - 좌측 70%: 차트 영역
   - 우측 30%: 주석 패널 (border-l 1px #E5E7EB, pl-6)

2. **좌측 차트 영역** (70%):
   - 카드/프레임 없음, 배경 투명
   - ResponsiveContainer: width 100%, height 350~380px
   - **Line 차트**: strokeWidth 3, dot r=5, CartesianGrid vertical={false}
   - **Bar 차트**: gradient fill, radius [6,6,0,0], maxBarSize 60
   - **Pie 차트**: donut (innerRadius 60, outerRadius 120), PIE_COLORS
   - 커스텀 Tooltip: 흰색 bg, rounded-lg, shadow-lg

3. **우측 주석 패널** (30%):
   - 상단: highlight (존재 시)
     - 라벨 "HIGHLIGHT" — text-xs font-bold uppercase tracking-widest text-[#10B981]/60
     - 본문: text-xl font-bold text-[#10B981], mt-2
     - 하단 accent bar: w-8 h-0.5 bg-[#10B981], mt-3
   - 중단: 데이터 요약 (chart.data에서 자동 추출)
     - 각 데이터 포인트의 label + value를 수직 나열
     - value: text-lg font-bold text-[#004B8D]
     - label: text-xs text-gray-500
     - annotation 있으면 text-xs로 표시 (값에 따라 #10B981 또는 #004B8D)
   - 하단: description (존재하고 비어있지 않을 때)
     - text-sm text-gray-500, mt-4

4. **수직 리듬**: SlideHeader → mt-6 → 좌우 레이아웃

### 참고: Bloomberg Terminal, Stripe Dashboard analytics, Datadog

## ── SAMPLE DATA (3안 비교용 — 반드시 이 데이터 사용) ──

```tsx
<ChartSlide
  title="그러나 22년 이후, 흐름이 바뀌었습니다"
  chart={{
    type: "line",
    data: [
      { label: "22년", value: 344, annotation: "" },
      { label: "23년", value: 221, annotation: "-35.8%" },
      { label: "24년", value: 193, annotation: "-12.7%" },
      { label: "25년", value: 193, annotation: "" },
    ],
    yAxisLabel: "신환수",
  }}
  highlight="피크 대비 -43.9% (151건 감소)"
  description=""
/>
```
