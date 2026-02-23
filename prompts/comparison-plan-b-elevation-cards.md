# Plan B: "Elevation Cards" — ComparisonSlide v0 Prompt

You are a 40-year veteran presentation designer who has designed for Apple, McKinsey, and Samsung Medical Center.

## ROLE
Design a single React component for a medical consulting proposal slide.
This is a "comparison" type slide — Before/After comparison used 5 times in a 49-slide deck for 정이안한의원 (Korean medicine clinic).

---

## ════════════════════════════════════════
## SECTION 1: FROZEN (절대 불변 — 수정 금지)
## ════════════════════════════════════════

### 1-1. Canvas
- Width: 1280px, Height: 720px
- Font: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif
- Background: #F8FAFC (light surface)

### 1-2. Component Interface (TypeScript)
```tsx
interface ComparisonSlideProps {
  readonly title: string
  readonly quote?: string
  readonly before: {
    readonly label: string
    readonly items: readonly string[]
  }
  readonly after: {
    readonly label: string
    readonly items: readonly string[]
  }
}
```

### 1-3. Color Palette (고정)
- Primary: #004B8D
- Accent: #48A9C5
- Dark: #002D5A
- Before side: gray-400, gray-500 계열
- After side: #004B8D, #48A9C5, #10B981(체크 아이콘)
- Background: #F8FAFC

### 1-4. SlideHeader (shared 컴포넌트 — 반드시 import)
```tsx
import { SlideHeader } from "./shared/SlideHeader"
// 사용: <SlideHeader title={title} align="center" />
```
SlideHeader 렌더링: w-12 h-1 gradient bar(#004B8D→#48A9C5) + title(text-3xl font-bold)
**절대로 SlideHeader를 직접 구현하지 마세요. import만 하세요.**

### 1-5. Rendering Rules
- items: 1~3개 per side (가변)
- quote: 있으면 표시, 없으면 영역 생략
- Before items: bullet dot (gray)
- After items: CheckCircle2 아이콘 (#10B981)
- Before=회색 톤, After=primary 톤 (방향성 절대 고정)

---

## ════════════════════════════════════════
## SECTION 2: CREATIVE FREEDOM (디자인 자유 영역)
## ════════════════════════════════════════

### 2-1. Design Direction: "Elevation Cards"
Material Design 3의 Elevation 개념. Before 카드는 바닥에 납작, After 카드는 떠올라 강조. 시각적 "높이 차이"로 변화의 가치를 표현.

### 2-2. Layout Structure
```
[SlideHeader - center]
[quote - optional, pill badge style]
[  Before Card (낮음)  ···gap···  After Card (높음)  ]
```

### 2-3. Before Card — "납작한 카드" ★
- rounded-2xl, bg-white, border border-gray-200
- shadow-sm (미미한 그림자 — 바닥에 붙은 느낌)
- padding: p-8
- Label 영역: 좌측 상단, border-b border-gray-200 pb-4
  - 아이콘: w-10 h-10 rounded-xl bg-gray-100, 안에 gray-400 dot or "B"
  - text-xl font-bold text-gray-400
- Items: bullet dot(w-2 h-2 bg-gray-300) + text-gray-500 leading-relaxed
- 전체 톤: desaturated, 조용함

### 2-4. After Card — "떠오른 카드" ★★★
- rounded-2xl, bg-white, border border-[#004B8D]/15
- shadow-xl shadow-[#004B8D]/8 (깊은 그림자 — 떠있는 느낌)
- transform: -translate-y-2 (실제로 위로 8px 올림)
- padding: p-8
- 상단에 4px gradient bar: h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-t-2xl
- Label 영역: border-b border-[#004B8D]/10 pb-4
  - 아이콘: w-10 h-10 rounded-xl bg-gradient(#004B8D→#48A9C5), shadow-md
  - text-xl font-bold text-[#004B8D]
- Items: CheckCircle2(#10B981) + text-gray-700 font-medium leading-relaxed
- 전체 톤: 생동감, 위로 솟은 느낌

### 2-5. 두 카드의 높이 대비
- grid md:grid-cols-2 gap-8 items-end (하단 정렬로 높이 차 강조)
- After 카드가 shadow + translate-y로 시각적으로 "더 높은" 위치

### 2-6. Quote (선택)
- SlideHeader 아래, 카드 위
- pill badge 스타일: inline-flex, px-4 py-2, rounded-full, bg-[#004B8D]/5, text-[#004B8D]
- text-sm font-medium, 앞에 ✦ 또는 small dot 장식
- 중앙 정렬

---

## ════════════════════════════════════════
## SECTION 3: PREVIEW DATA
## ════════════════════════════════════════

```tsx
{/* Case 1: 3 items/side, no quote */}
<ComparisonSlide
  title="모든 의료기관의 고민 해결"
  before={{ label: '고민', items: ['직원 관리 부담', '교육 시간 부족', '일관성 유지 어려움'] }}
  after={{ label: '해결', items: ['시스템이 가이드', '최소 인원 운영', '프로세스 표준화'] }}
/>

{/* Case 2: 1 item/side + quote */}
<ComparisonSlide
  title="스킬이 중요한가 의도가 중요한가"
  quote="마케팅은 사냥, 교육은 농사"
  before={{ label: '일반 교육', items: ['단순 스킬 전달'] }}
  after={{ label: '호원앤컴퍼니', items: ['마인드 + 체계 변화'] }}
/>
```

---

## TECHNICAL REQUIREMENTS
- React functional component, TypeScript
- `export function ComparisonSlide` (named export)
- Tailwind CSS only
- `import { SlideHeader } from "./shared/SlideHeader"` (반드시)
- `import { CheckCircle2 } from "lucide-react"`
- shadcn Card 사용하지 않음 (div + tailwind로 대체)
- No animations, no framer-motion
