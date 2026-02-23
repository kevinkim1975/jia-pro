# Plan B: "Statement First" — ComparisonSlide v0 Prompt v2

You are a 40-year veteran presentation designer. You have designed decks for McKinsey, Bain, and Samsung Medical Center. You HATE empty space and generic card layouts.

## ROLE
Design a Before/After comparison slide for 정이안한의원 (Korean medicine clinic) consulting proposal. 5 slides in a 49-slide deck.

## CRITICAL DESIGN CONSTRAINT
The data has only 1~3 items per side. Traditional 2-column cards create 80% empty space. **DO NOT USE 2-column card layout.** Instead: make the TITLE the hero, and the comparison a compact evidence bar at the bottom.

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
```
**직접 구현 금지. import만.** 단, 이 Plan에서는 SlideHeader를 **사용하지 않는다** — title을 직접 거대하게 렌더링하기 때문. SlideHeader import는 유지하되, 조건부로 사용하지 않음.

**수정: SlideHeader를 그대로 사용하되, align="center"로.**

### Icons
- Before items: XCircle or MinusCircle (gray-400)
- After items: CheckCircle2 (#10B981)

---

## SECTION 2: DESIGN DIRECTION — "Statement First"

### 핵심 개념
**타이틀이 슬라이드의 60%를 지배한다.** 비교 데이터는 하단 compact bar에 증거로 제시. TED 발표처럼 메시지가 먼저, 근거가 뒤따르는 구조.

### 2-1. 전체 레이아웃 (수직 3단)
```
┌──────────────────────────────────────────┐
│                                          │
│     [SlideHeader — center, 상단]         │  10%
│                                          │
│                                          │
│     [quote — 거대하게, 캔버스 중앙]       │  50%
│     (없으면 title이 이 영역을 차지)       │
│                                          │
│                                          │
│  ┌──────────────┬──────────────────────┐ │
│  │ Before 컴팩트 │  After 컴팩트        │ │  30%
│  └──────────────┴──────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### 2-2. 상단: SlideHeader
- `<SlideHeader title={title} align="center" />`
- 캔버스 상단 영역

### 2-3. 중앙: Quote Hero Zone (핵심 차별점 ★★★)
- quote가 있으면: **text-3xl~text-4xl font-light text-gray-700 italic**, 캔버스 중앙에 크게
  - 앞뒤 인용부호: text-6xl text-[#48A9C5]/20, font-serif
  - max-w-3xl mx-auto, text-center, leading-relaxed
- quote가 없으면: 이 영역에 title을 한 번 더 **text-5xl font-bold text-[#004B8D]/10** 워터마크처럼 깔아서 빈 공간 방지

### 2-4. 하단: Compact Comparison Bar (핵심 차별점 ★★★)
**카드가 아니다. 하나의 가로 바(bar)다.**

```
┌─────────────── full width ──────────────────┐
│                                             │
│  [Before.label]          →  [After.label]   │
│  · item1  · item2  · item3  ✓ item1  ✓ item2  ✓ item3 │
│                                             │
└─────────────────────────────────────────────┘
```

구현:
- 하단 영역: bg-white rounded-2xl border border-gray-100 shadow-sm, mx-8~mx-12
- 내부 2열 flex (gap-0, 구분선으로 나눔)
- 좌측 (Before):
  - label: text-sm font-semibold text-gray-400 uppercase tracking-wider
  - items: inline으로 나열, text-sm text-gray-500, 사이에 · 구분자
  - 또는 세로 나열이지만 text-sm으로 compact하게
- 우측 (After):
  - label: text-sm font-semibold text-[#004B8D] uppercase tracking-wider
  - items: inline 나열, text-sm text-gray-700 font-medium, CheckCircle2 작게(w-4 h-4)
- 가운데: 1px 세로 구분선 bg-gray-200, 높이 80%
- 전체 높이: compact (py-5~py-6), 화면의 25~30%만 사용

### 2-5. 밀도 전략
- items 1개일 때: 하단 바가 더 compact해지고, 중앙 quote zone이 넓어짐 → 우아함
- items 3개일 때: 하단 바가 약간 커지지만 여전히 compact → 정보 밀도 적절
- quote 없을 때: 중앙에 decorative element (큰 → 아이콘, 또는 title 워터마크)

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
