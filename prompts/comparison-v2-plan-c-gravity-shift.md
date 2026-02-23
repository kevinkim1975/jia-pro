# Plan C: "Gravity Shift" — ComparisonSlide v0 Prompt v2

You are a 40-year veteran presentation designer. You have designed decks for McKinsey, Bain, and Samsung Medical Center. You HATE empty space and generic card layouts.

## ROLE
Design a Before/After comparison slide for 정이안한의원 (Korean medicine clinic) consulting proposal. 5 slides in a 49-slide deck.

## CRITICAL DESIGN CONSTRAINT
Data has only 1~3 items per side. Traditional 2-column cards = 80% empty. **DO NOT USE 2-column card layout.** This plan uses vertical stacking with visual weight shift.

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
**직접 구현 금지.**

### Icons
- Before items: bullet dot (gray)
- After items: CheckCircle2 (#10B981)

---

## SECTION 2: DESIGN DIRECTION — "Gravity Shift"

### 핵심 개념
Before는 위에서 가볍게, After는 아래에서 무겁게. **수직 무게 이동**으로 변화를 표현. Before는 작고 흐리게 스쳐 지나가고, After가 캔버스를 지배한다.

### 2-1. 전체 레이아웃 (수직 구조, 위→아래)
```
┌──────────────────────────────────────────┐
│  [SlideHeader - center]                  │  8%
│  [quote - optional, small]               │  5%
│                                          │
│  ┌── Before Strip (가볍고 작음) ────────┐ │
│  │  label: 고민                          │ │  15%
│  │  · item1  · item2  · item3 (한 줄)   │ │
│  └──────────────────────────────────────┘ │
│                                          │
│  ──── ↓ transition indicator ↓ ────────  │  5%
│                                          │
│  ┌── After Block (크고 강렬) ───────────┐ │
│  │                                      │ │
│  │  label: 해결                          │ │
│  │                                      │ │  55%
│  │  ✓ 시스템이 가이드                    │ │
│  │  ✓ 최소 인원 운영                     │ │
│  │  ✓ 프로세스 표준화                    │ │
│  │                                      │ │
│  └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

### 2-2. Before Strip — "스쳐 지나가는 과거" ★
- **한 줄짜리 얇은 스트립** (높이 ~60px)
- bg-gray-100 rounded-xl, mx-12, py-3 px-6
- 내부: flex items-center gap-6, 가로 한 줄 배치
- label: text-sm font-semibold text-gray-400 uppercase tracking-wider, flex-shrink-0
- label 오른쪽에 세로 구분선 (w-px h-6 bg-gray-300)
- items: 가로로 나열, text-sm text-gray-400, 사이에 · 또는 | 구분
- 전체 느낌: **지나간 과거, 가볍고 작고 흐림**
- items 1개여도 3개여도 한 줄에 다 들어감

### 2-3. Transition Indicator — "전환의 순간"
- 중앙에 작은 아이콘: w-10 h-10 rounded-full
- bg-gradient-to-b from-gray-300 to-[#004B8D]
- 안에 ChevronDown (white, w-5 h-5)
- 위아래로 짧은 점선 연결 (before/after 시각적 연결)

### 2-4. After Block — "도착한 미래, 무게감" ★★★
- **캔버스의 55%를 차지하는 큰 영역**
- bg-white rounded-2xl border border-[#004B8D]/10 shadow-lg shadow-[#004B8D]/5
- mx-12, p-10~p-12
- 좌측에 accent bar: absolute left-0 top-6 bottom-6 w-1.5 bg-gradient-to-b from-[#004B8D] to-[#48A9C5] rounded-full
- label: text-2xl font-bold text-[#004B8D], mb-6
- items: space-y-5, 각 item이 큼
  - CheckCircle2 (w-6 h-6 text-[#10B981])
  - text-xl text-gray-800 font-medium
  - 각 item 아래에 subtle 구분선 (last:hidden)
- 전체 느낌: **확신, 안정, 미래**

### 2-5. Quote (optional)
- SlideHeader 바로 아래, Before Strip 위
- text-sm italic text-gray-500, text-center
- " " 인용부호 text-[#48A9C5]/30

### 2-6. 밀도 전략
- items 1개: Before strip 1줄 + After block에 큰 텍스트 1개 → 미니멀 임팩트
- items 3개: Before strip 1줄 + After block에 3개 행 → 적절한 밀도
- Before가 작으니 빈 공간이 After에 할당 → 비어보이지 않음

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
- `import { CheckCircle2, ChevronDown } from "lucide-react"`
- No Card component, No animation
