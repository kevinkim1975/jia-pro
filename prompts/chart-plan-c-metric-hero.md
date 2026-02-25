# ChartSlide Plan C — "Metric Hero"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 청중이 가장 먼저 봐야 할 것은 숫자다. 거대한 히어로 수치가 메시지를 전달하고, 차트는 그 수치의 근거를 보여준다. Stripe Dashboard에서 차용.

## TASK
1280×720px 고정 캔버스에 "차트/그래프" 슬라이드를 React/TypeScript로 구현.
recharts 라이브러리로 line/bar/pie 3종 차트를 지원. 상단에 highlight 수치를 히어로로 배치, 하단에 차트.

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

### 핵심: 상단 히어로 수치 + 하단 차트

1. **전체 레이아웃**: SlideHeader 아래 flex-1, flex-col
   - 좌우 패딩: px-16
   - 상단: highlight 히어로 영역 (높이 ~120px)
   - 하단: 차트 영역 (나머지 전체)

2. **히어로 수치 영역** (highlight 존재 시):
   - highlight 텍스트를 그대로 표시 (파싱/추출 시도 금지)
   - text-4xl font-black text-[#004B8D]
   - 수치 아래 gradient underline: w-16 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5]
   - highlight 없으면 이 영역 생략, 차트가 위로 확장

3. **차트 영역**:
   - 카드/프레임 없음, 배경 투명
   - ResponsiveContainer: width 100%, height — highlight 있으면 300px, 없으면 380px
   - **Line 차트**: strokeWidth 3, dot r=5, CartesianGrid vertical={false}
     - gradient area fill (primary, opacity 0.1→0)
   - **Bar 차트**: gradient fill (primary→secondary), radius [6,6,0,0], maxBarSize 60
   - **Pie 차트**: donut (innerRadius 60, outerRadius 120), PIE_COLORS
   - 커스텀 Tooltip: 흰색 bg, rounded-lg, shadow-lg

4. **description** (존재하고 비어있지 않을 때):
   - 차트 아래 mt-3
   - text-sm text-gray-500

5. **수직 리듬**: SlideHeader → mt-4 → 히어로 → mt-6 → 차트 → description

### 참고: Stripe Dashboard, Linear analytics, Vercel analytics page

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
