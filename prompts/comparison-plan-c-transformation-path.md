# Plan C: "Transformation Path" — ComparisonSlide v0 Prompt

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

### 2-1. Design Direction: "Transformation Path"
Stripe/Linear 스타일. 좌에서 우로 흐르는 "전환의 여정". 가운데 화살표가 Before→After의 변화를 시각적으로 연결. 깔끔하고 현대적.

### 2-2. Layout Structure
```
[SlideHeader - center]
[quote - optional, blockquote accent bar]
[  Before Zone  →  Transition  →  After Zone  ]
```

### 2-3. 3-Column Flow Layout ★★★
전체를 3영역으로 나눔 (grid-cols-[5fr_auto_5fr] 또는 flex):

#### Left: Before Zone
- 배경: rounded-2xl bg-gray-50/80 border border-gray-200/60
- padding: p-6~p-8
- Label: 상단, flex items-center gap-3
  - 아이콘: w-8 h-8 rounded-full bg-gray-200, text-gray-500 font-bold "B" or X icon
  - text-lg font-semibold text-gray-400
- Items: space-y-3, bullet dot(w-1.5 h-1.5 bg-gray-400 rounded-full) + text-gray-500
- 느낌: 흐릿하고 지나간 과거

#### Center: Transition Bridge
- 폭: w-16~w-20
- 수직 중앙에 화살표 요소:
  - 배경: w-12 h-12 rounded-full bg-gradient-to-r from-[#004B8D] to-[#48A9C5] shadow-lg
  - 안에: ChevronRight 또는 ArrowRight 아이콘, text-white
- 화살표 위아래로 점선 연결선: border-dashed border-gray-300
- 이 요소가 "전환"을 물리적으로 보여줌

#### Right: After Zone
- 배경: rounded-2xl bg-white border border-[#004B8D]/15
- 좌측에 4px accent bar: absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-[#004B8D] to-[#48A9C5] rounded-full
- padding: p-6~p-8 pl-8 (accent bar 여유)
- Label: 상단, flex items-center gap-3
  - 아이콘: w-8 h-8 rounded-full bg-gradient(#004B8D→#48A9C5), text-white font-bold "A" or Check
  - text-lg font-semibold text-[#004B8D]
- Items: space-y-3, CheckCircle2(#10B981) + text-gray-700 font-medium
- 느낌: 선명하고 확신에 찬 미래

### 2-4. Quote (선택)
- SlideHeader 바로 아래
- 좌측에 얇은 accent bar(3px, #48A9C5/40) 붙은 blockquote 스타일
- text-gray-600 italic, pl-4
- 중앙 정렬 (blockquote 자체를 mx-auto max-w-md로 중앙 배치)

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
- `import { CheckCircle2, ChevronRight } from "lucide-react"`
- shadcn Card 사용하지 않음 (div + tailwind로 대체)
- No animations, no framer-motion
