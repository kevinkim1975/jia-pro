# ChartSlide Plan A — "Data Theatre"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 차트가 무대의 주인공이다. 프레임, 카드, 장식을 모두 제거하고 데이터 자체가 말하게 한다. FT(Financial Times) 데이터 시각화에서 차용.

## TASK
1280×720px 고정 캔버스에 "차트/그래프" 슬라이드를 React/TypeScript로 구현.
recharts 라이브러리로 line/bar/pie 3종 차트를 지원하되, 차트가 캔버스의 70%를 차지하는 몰입형 레이아웃.

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

### 핵심: 프레임 없는 풀사이즈 차트 + 하단 accent highlight

1. **전체 레이아웃**: SlideHeader 아래 flex-1, flex-col
   - 좌우 패딩: px-16
   - 차트 영역이 가용 공간의 70% 이상 차지

2. **차트 영역** (카드/프레임 없음):
   - 배경: 투명 (캔버스 #F8FAFC 위에 직접)
   - ResponsiveContainer: width 100%, height 350~400px
   - **Line 차트**: 
     - strokeWidth 3, dot r=5 white stroke
     - CartesianGrid vertical={false}, strokeDasharray="3 3", stroke="#E5E7EB"
     - XAxis/YAxis tick fill="#6B7280" fontSize 12
     - gradient fill 아래 영역 (linearGradient, primary→transparent)
   - **Bar 차트**:
     - gradient fill (primary→secondary), radius [6,6,0,0]
     - maxBarSize 60
   - **Pie 차트**:
     - donut 형태 (innerRadius 60, outerRadius 120)
     - PIE_COLORS 사용, white stroke 2px
     - 퍼센트 라벨 내부 표시
   - **공통**: 커스텀 Tooltip (흰색 bg, rounded-lg, shadow-lg, border gray-100)

3. **highlight 영역** (존재 시):
   - 차트 바로 아래, mt-4
   - 좌측 accent bar: w-1 h-full bg-[#10B981]
   - 텍스트: text-lg font-semibold text-[#10B981], pl-4
   - 카드/배경 없음. accent bar + 텍스트만.

4. **description 영역** (존재 시, 비어있지 않을 때):
   - highlight 아래, mt-2
   - text-sm text-gray-500, pl-5 (accent bar 정렬)

5. **수직 리듬**: SlideHeader → mt-6 → 차트 → mt-4 → highlight → description

### 참고: FT data visualization, The Economist charts, minimal data journalism

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
