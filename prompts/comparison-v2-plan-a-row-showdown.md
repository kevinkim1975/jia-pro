# Plan A: "Row Showdown" — ComparisonSlide v0 Prompt v2

You are a 40-year veteran presentation designer. You have designed decks for McKinsey, Bain, and Samsung Medical Center. You HATE empty space and generic card layouts. Your rule: every pixel must earn its place.

## ROLE
Design a Before/After comparison slide for 정이안한의원 (Korean medicine clinic) consulting proposal. 5 slides in a 49-slide deck.

## CRITICAL DESIGN CONSTRAINT
The data has only 1~3 items per side. If you use large cards, 80% of the canvas will be empty white space. **DO NOT USE 2-column card layout.** This is the #1 rule.

---

## SECTION 1: FROZEN (수정 금지)

### Canvas & Font
- Width: 1280px, Height: 720px, `w-full h-full`
- Font: Pretendard, -apple-system, sans-serif

### Interface
```tsx
interface ComparisonSlideProps {
  readonly title: string
  readonly quote?: string
  readonly before: { readonly label: string; readonly items: readonly string[] }
  readonly after: { readonly label: string; readonly items: readonly string[] }
}
```

### Colors
- Primary: #004B8D | Accent: #48A9C5 | Dark: #002D5A
- Success: #10B981 | Surface: #F8FAFC
- Before = gray muted | After = primary vibrant

### SlideHeader
```tsx
import { SlideHeader } from "./shared/SlideHeader"
// <SlideHeader title={title} align="center" />
```
**직접 구현 금지. import만.**

### Icons
- Before items: bullet dot (gray)
- After items: CheckCircle2 (#10B981)

---

## SECTION 2: DESIGN DIRECTION — "Row Showdown"

### 핵심 개념
McKinsey 비교표 스타일. **카드 없이, 행(row) 단위로 Before↔After를 직접 대비.** 각 행이 하나의 대결이다.

### 2-1. 전체 레이아웃
```
┌──────────────────────────────────────────┐
│         [SlideHeader - center]           │
│         [quote - optional]               │
│                                          │
│  ┌─ header row ────────────────────────┐ │
│  │  before.label    │   after.label    │ │
│  ├─ item row 1 ────────────────────────┤ │
│  │  before.items[0] │  after.items[0]  │ │
│  ├─ item row 2 ────────────────────────┤ │
│  │  before.items[1] │  after.items[1]  │ │
│  ├─ item row 3 ────────────────────────┤ │
│  │  before.items[2] │  after.items[2]  │ │
│  └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

### 2-2. Header Row (라벨 행)
- 전체 폭 사용, 2열 grid
- 좌: before.label — text-lg font-semibold text-gray-400, bg-gray-100/50, py-4 px-6, rounded-l-xl
- 우: after.label — text-lg font-semibold text-[#004B8D], bg-[#004B8D]/5, py-4 px-6, rounded-r-xl
- 가운데: 2px 수직 구분선 bg-gray-200

### 2-3. Item Rows (데이터 행)
- items 개수만큼 행 생성 (max(before.items.length, after.items.length))
- 각 행: 2열 grid, py-5 px-6, border-b border-gray-100
- 좌측 (Before): dot(w-2 h-2 bg-gray-300 rounded-full) + text text-gray-500 text-base
- 우측 (After): CheckCircle2(w-5 h-5 text-[#10B981]) + text text-gray-800 font-medium text-base
- 행 높이가 넉넉해서 **빈 공간 문제 해소** — 행 간격으로 리듬감
- items 수가 다르면 짧은 쪽은 빈 셀 (empty)

### 2-4. 테이블 컨테이너
- max-w-4xl mx-auto (좌우 여백으로 고급감)
- bg-white rounded-2xl shadow-sm border border-gray-100
- overflow-hidden

### 2-5. Quote (optional)
- SlideHeader 아래, 테이블 위
- text-center text-gray-500 italic text-base
- 앞뒤 " " 인용부호 (text-[#48A9C5])

---

## SECTION 3: PREVIEW DATA

```tsx
<ComparisonSlide
  title="모든 의료기관의 고민 해결"
  before={{ label: '고민', items: ['직원 관리 부담', '교육 시간 부족', '일관성 유지 어려움'] }}
  after={{ label: '해결', items: ['시스템이 가이드', '최소 인원 운영', '프로세스 표준화'] }}
/>

<ComparisonSlide
  title="스킬이 중요한가 의도가 중요한가"
  quote="마케팅은 사냥, 교육은 농사"
  before={{ label: '일반 교육', items: ['단순 스킬 전달'] }}
  after={{ label: '호원앤컴퍼니', items: ['마인드 + 체계 변화'] }}
/>
```

## TECHNICAL
- `export function ComparisonSlide` (named export)
- Tailwind CSS only, TypeScript
- `import { SlideHeader } from "./shared/SlideHeader"`
- `import { CheckCircle2 } from "lucide-react"`
- No Card component, No animation
