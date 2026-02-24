# FlowSteps v2 Plan B — "Horizontal Bands"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 색면(color field)이 공간을 지배한다. 각 단계가 하나의 수평 밴드로 존재하며, 색상 점진 변화로 진행감을 표현.

## TASK
1280×720px 고정 캔버스에 "단계별 프로세스" 슬라이드를 React/TypeScript로 구현.

**컨셉: 전폭 수평 밴드**
각 스텝이 캔버스 전체 너비를 차지하는 수평 밴드(바).
밴드 안에 번호 + title + description이 한 줄로 배치.
밴드 배경색이 단계별로 점진 변화하여 흐름 표현.
화살표, 라인, 아이콘 없음. 색면의 농도 변화만으로 진행 방향을 암시.

## ── FROZEN (절대 변경 금지) ────────────────────

### Import (반드시 사용, 직접 구현 금지)
```tsx
import { SlideHeader } from "./shared/SlideHeader"
import { SlideBottomMessage } from "./shared/SlideBottomMessage"
```

### Interface (정확히 이 타입)
```tsx
interface FlowStepsSlideProps {
  readonly title: string
  readonly steps: readonly {
    readonly step: number
    readonly title: string
    readonly description?: string
  }[]
  readonly bottomMessage?: string
}
```

### Export
```tsx
export function FlowStepsSlide({ title, steps, bottomMessage }: FlowStepsSlideProps)
```

### Canvas
- 루트 div: width 1280px, height 720px 고정, inline style
- 배경: #F8FAFC
- fontFamily: "Pretendard, -apple-system, sans-serif"
- 반응형 클래스(md:, lg:) 사용 금지

### Header
- `<SlideHeader title={title} align="left" />` 호출
- 직접 타이틀 구현 금지

### Bottom Message
- bottomMessage 존재 시 `<SlideBottomMessage>{bottomMessage}</SlideBottomMessage>` 호출
- 직접 구현 금지

### Colors (이 값만 사용)
- Primary: #004B8D
- Accent: #48A9C5
- Gray 계열: Tailwind gray-100~900

### 금지사항
- shadcn Card 사용 금지
- default export 금지
- sampleData / Preview 컴포넌트 금지
- hover/transition/animation 금지
- lucide-react 아이콘 금지
- SVG 도형, 화살표, 연결선 금지

## ── FREE (v0 자유도) ────────────────────────────

### 핵심: 수평 밴드의 색상 점진 변화

1. **밴드 구조**: 각 step = 전폭 수평 바
   - 높이: 가용 영역을 steps 수로 균등 분할 (flex-1)
   - 좌우 패딩: px-16
   - 밴드 사이 gap: 4~8px (배경색 #F8FAFC가 보임)
   - 각 밴드 border-radius: rounded-lg 또는 rounded-xl

2. **밴드 배경색**: 단계별 점진 변화
   - Step 1: #004B8D opacity 0.06 (가장 연함)
   - Step 2: #004B8D opacity 0.10
   - Step 3: #004B8D opacity 0.16
   - Step 4: #004B8D opacity 0.22 (가장 진함)
   - → 진행할수록 색이 짙어져 "도달" 느낌

3. **밴드 내부 레이아웃**: 한 줄 수평 배치
   - 좌측: step 번호 (text-3xl font-black, #004B8D)
   - 중앙: step.title (text-xl font-bold, #1F2937)
   - 우측 또는 title 옆: step.description (text-base, #6B7280)
   - 수직 중앙 정렬 (items-center)

4. **빈 공간 관리**:
   - flex-1로 밴드가 가용 공간 전체 차지
   - 3개 스텝: 밴드 높이 넓음 → 여유로운 느낌
   - 4개 스텝: 밴드 높이 자동 축소

### 참고: Stripe 가격 페이지 tier 밴드, Bloomberg terminal 섹션

## ── SAMPLE DATA (테스트용) ─────────────────────
4개 스텝 (최대 케이스):
```
title: "이론은 의도를 배양하고 실전에서 역량을"
steps: [
  { step: 1, title: "형태", description: "맞춤형 교육 (조직 진단 기반)" },
  { step: 2, title: "이론교육", description: "의도와 마인드 배양" },
  { step: 3, title: "행동교정", description: "실전 역량 강화" },
  { step: 4, title: "혼합형 교육 시스템", description: "이론 + 실전의 통합" },
]
bottomMessage: "방식: 이론교육 + 행동교정 → 혼합형 교육 시스템"
```
