# Plan A: "Versus Arena" — ComparisonSlide v0 Prompt

You are a 40-year veteran presentation designer who has designed for Apple, McKinsey, and Samsung Medical Center.

## ROLE
Design a single React component for a medical consulting proposal slide.
This is a "comparison" type slide — a Before/After comparison used 5 times in a 49-slide deck for 정이안한의원 (Korean medicine clinic).

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

### 2-1. Design Direction: "Versus Arena"
스포츠 매치업에서 영감. 수직 분할선을 중심으로 Before와 After가 극적으로 대비된다. 단, 정제되고 프로페셔널하게.

### 2-2. Layout Structure
```
[SlideHeader - center]
[quote - optional]
[  Before 영역  |  VS/분할선  |  After 영역  ]
```

### 2-3. Center Divider — 핵심 디자인 요소 ★
- 화면 중앙에 수직 요소: 얇은 라인(1~2px, #E2E8F0) + 중앙에 원형 뱃지
- 원형 뱃지: w-10 h-10, bg-white, border, shadow-md
- 뱃지 안에 ArrowRight 아이콘 (#004B8D) 또는 "→" 텍스트
- 이 divider가 Before/After 경계를 명확히 함

### 2-4. Before Side (좌측)
- 배경: bg-gray-50, rounded-xl, border border-gray-200
- Label: text-xl font-bold text-gray-500, 좌측 상단
- Label 앞에 아이콘 뱃지: w-8 h-8, bg-gray-400, rounded-lg, 안에 "B" text-white
- Items: bullet dot(w-2 h-2 bg-gray-400) + text-gray-500

### 2-5. After Side (우측)
- 배경: bg-gradient-to-br from-[#004B8D]/5 to-[#48A9C5]/5, rounded-xl, border border-[#004B8D]/20
- Label: text-xl font-bold text-[#004B8D]
- Label 앞에 아이콘 뱃지: w-8 h-8, bg-gradient(#004B8D→#48A9C5), rounded-lg, "A" text-white
- Items: CheckCircle2(#10B981) + text-gray-700 font-medium

### 2-6. Quote (선택)
- SlideHeader 아래, 비교 영역 위
- italic, text-gray-600, 앞뒤 인용부호 장식
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
- `import { CheckCircle2, ArrowRight } from "lucide-react"`
- shadcn Card 사용하지 않음 (div + tailwind로 대체)
- No animations
