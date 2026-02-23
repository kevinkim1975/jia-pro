# CardsSlide — Plan A: "Clean Metrics"
# 숫자가 말한다 — 거대한 타이틀과 여백이 만드는 Swiss 권위

---

## ROLE & CONTEXT

You are a **35-year veteran UI designer** who has designed presentation systems
for Samsung Medical Center, Seoul National University Hospital, and leading
pharmaceutical companies. Your work has won Red Dot and iF Design awards.

This is a **TEMPLATE** that renders **8 different slides** (16.3% of a 49-slide
medical proposal). The card count varies: **3 cards** on 5 slides, **4 cards**
on 3 slides. Every design decision must work for both counts.

Content ranges from clinic history timelines ("2003", "2004", "현재") to
abstract concepts ("PTD", "교육", "CRM") to market data ("냉증 -36%", "80개 업체").

---

## DESIGN CONCEPT: "Clean Metrics"

**Philosophy**: "The number IS the design. Everything else supports it."

Each card is an open zone — no card background, no rounded corners, no shadow.
The only boundary is a **3px accent line at the top** of each card zone.
The title text (often a number or short keyword) is rendered at **enormous size**
(text-5xl to text-6xl), becoming the visual centerpiece.

Subtitle and description are quiet companions — structured, small, precise.
White space between cards creates the rhythm. The grid breathes.

Think of a Bloomberg terminal's key metrics display, or the statistics page
of a medical research paper where "p < 0.001" speaks louder than any graphic.

**Visual Reference**: Swiss International Style, Dieter Rams, Bloomberg Terminal,
medical journal statistics tables.

**Key Traits**:
- NO card background — zones defined by top accent line only
- Title is HERO size (text-5xl~6xl), bold, primary color
- Subtitle is medium (text-lg), secondary tone
- Description is small (text-sm), neutral gray
- White space is the primary separator between cards
- Geometric elements are mathematical: dots, hairlines, small crosses
- The whole slide feels like a premium research document

---

## MANDATORY DESIGN TOKENS (FROZEN — DO NOT MODIFY)

```
Colors:
  primary:      #004B8D    ← card title color (positive tone)
  primaryLight: #E8F4FC
  primaryDark:  #003366
  secondary:    #48A9C5    ← subtitle accent color
  accent:       #10B981    ← accent bar gradient end
  neutral.50:   #F8FAFC
  neutral.100:  #F1F5F9
  neutral.200:  #E2E8F0
  neutral.300:  #CBD5E1
  neutral.400:  #94A3B8
  neutral.500:  #64748B    ← description text color
  neutral.600:  #475569
  neutral.700:  #334155
  neutral.800:  #1E293B
  neutral.900:  #0F172A

Typography:
  fontFamily: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif

ABSOLUTE PROHIBITION:
  ❌ No red colors (#DC2626, #EF4444, etc.) — medical context
  ❌ No shadcn/ui imports — pure Tailwind + inline styles only
  ❌ No external icon library
  ❌ No Card component import
```

---

## FIXED TYPE CONTRACT (FROZEN — DO NOT MODIFY)

```tsx
// Boris Cherny: "타입은 코드의 첫 번째 설계 문서다."

interface CardItem {
  readonly title: string        // "2003", "33년", "PTD", "시장 변화"
  readonly subtitle?: string    // "서울대 분당병원", "경력", "경영진단"
  readonly description?: string // "CRM 개발", "", "한의학박사" ← 빈 문자열 가능!
}

interface CardsSlideProps {
  readonly title: string
  readonly cards: readonly CardItem[]   // length: 3 or 4
  readonly bottomMessage?: string
  readonly tone?: 'positive' | 'negative' | 'neutral'
}
```

**CRITICAL INVARIANTS**:
1. `cards.length` is 3 or 4 — grid must adapt dynamically
2. `description` can be empty string `""` — must not render empty space
3. `subtitle` is always present in current data but typed optional — handle absence
4. `bottomMessage` is absent on 1 of 8 slides — no orphan space when absent
5. `tone` defaults to 'positive' if undefined

---

## FIXED SAMPLE DATA (p.28 — Maximum complexity)

```tsx
const sampleData: CardsSlideProps = {
  title: "호원앤컴퍼니 CRM 연혁",
  cards: [
    { title: "2003", subtitle: "서울대 분당병원", description: "CRM 개발" },
    { title: "2004", subtitle: "초이스피부과", description: "로컬 최초" },
    { title: "현재", subtitle: "150개 기관", description: "운영" },
    { title: "2025.12", subtitle: "AI CRM", description: "개발 5개 시범" },
  ],
  bottomMessage: '"20년간 의료기관 CRM을 만들어 왔습니다"',
  tone: 'positive',
}
```

---

## LAYOUT SKELETON (FROZEN)

```
┌─────────────────────────────────────────────────────────┐
│  ZONE A: Header                                         │
│  ┌─ accent-bar (w-12 gradient) ─┐                       │
│  └─ title text ─────────────────┘                       │
│                                                         │
│  ZONE B: Card Grid (adaptive: 3col or 4col)             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │▓▓ 3px ▓▓│  │▓▓ 3px ▓▓│  │▓▓ 3px ▓▓│  │▓▓ 3px ▓▓│   │
│  │         │  │         │  │         │  │         │   │
│  │  TITLE  │  │  TITLE  │  │  TITLE  │  │  TITLE  │   │
│  │ (huge)  │  │ (huge)  │  │ (huge)  │  │ (huge)  │   │
│  │subtitle │  │subtitle │  │subtitle │  │subtitle │   │
│  │  desc   │  │  desc   │  │  desc   │  │  desc   │   │
│  │         │  │         │  │         │  │         │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
│  ← 4th card only when cards.length === 4 →              │
│                                                         │
│  ZONE C: Bottom Message (optional)                      │
│  ┌─ border-l-4 + gradient-bg ───────────────────────┐   │
│  │  message text                                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Grid Logic**:
```tsx
// Dynamic grid based on card count
const gridCols = cards.length <= 3
  ? 'grid-cols-3'    // 3 cards: equal thirds
  : 'grid-cols-4'    // 4 cards: equal quarters
```

---

## PLAN A SPECIFIC — CARD TREATMENT

### Card Container
- **NO background color** — card sits on pure white
- **Top accent border**: 3px solid, gradient from #004B8D to #48A9C5
  (same gradient on every card — unified identity)
- **No rounded corners** — sharp edges, precision
- **No shadow** — completely flat
- **Internal padding**: pt-6 (below accent line), px-2 (minimal horizontal)
- Each card zone is a clean vertical stack

### Card Title (HERO ELEMENT)
- Font size: **text-5xl to text-6xl** (48~60px) — THIS IS THE DESIGN
- Font weight: 800 (extra-bold)
- Color: #004B8D (primary)
- Letter-spacing: -0.02em (tight, authoritative)
- The title IS the card. Everything else is annotation.

### Card Subtitle
- Font size: text-base to text-lg (16~18px)
- Font weight: 500 (medium)
- Color: #48A9C5 (secondary)
- Margin-top: 8~12px below title
- Simple text, no decoration

### Card Description
- Font size: text-sm (14px)
- Font weight: 400 (regular)
- Color: #64748B (neutral.500)
- Margin-top: 4~6px below subtitle
- When empty string: **do not render** (check `description && description.trim()`)
- Optional: thin top-border separator (1px, neutral.200) before description

### Tone Handling
- `positive`: title color = #004B8D (primary), accent line gradient = primary→secondary
- `neutral`: title color = #475569 (neutral.600), accent line = neutral.400→neutral.500
- `negative`: title color = #475569, accent line = neutral.500→neutral.600
  (NO red — medical context prohibition)

---

## PLAN A SPECIFIC — GEOMETRIC ELEMENTS (4 max)

Mathematical precision — every element feels plotted on a coordinate grid:

1. **Dot cluster** (top-right):
   - 6 dots (3px each) in a 2×3 grid pattern, 8px spacing
   - Color: rgba(0, 75, 141, 0.08)
   - Static — no animation
   - Position: top 3%, right 3%

2. **Hairline cross** (bottom-left):
   - Two perpendicular lines (50px each, 1px stroke)
   - Color: rgba(72, 169, 197, 0.10)
   - Static
   - Position: bottom 4%, left 2%

3. **Single horizontal rule** (right edge, mid-height):
   - 80px wide, 1px
   - Color: rgba(0, 75, 141, 0.06)
   - Slow pulse: opacity 0.06→0.12, 10s cycle
   - Position: top 55%, right 1%

4. **Small outlined square** (bottom-right):
   - 14px, 1px stroke, rgba(72, 169, 197, 0.12)
   - Rotated 15deg, static
   - Position: bottom 5%, right 4%

**Safe Zone**: All elements within x<4% or x>96%, y<4% or y>92%

---

## ENTRANCE ANIMATION

Ultra-minimal, matches Swiss precision:

1. Zone A accent-bar: width 0→100%, 0.4s ease-out
2. Zone A title: opacity 0→1, 0.5s, delay 0.1s
3. Card accent lines: each card's top line draws left→right, 0.3s
   - Card 1: delay 0.2s, Card 2: delay 0.3s, Card 3: delay 0.4s, Card 4: delay 0.5s
4. Card content (title+subtitle+desc): fade in-place (opacity only, NO translateY)
   - Same stagger as accent lines, delay +0.1s after each line
5. Zone C bottom message: opacity 0→1, 0.4s, delay 0.7s

**Key**: NO vertical movement on any element. Everything reveals in-place.

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

| Area | Freedom |
|------|---------|
| Hero title exact size | text-5xl vs text-6xl |
| Hero title letter-spacing | -0.01em vs -0.02em vs -0.03em |
| Top accent line width | 2px vs 3px vs 4px |
| Top accent line: gradient vs solid primary | Gradient / Solid |
| Subtitle placement | Directly below title vs with small gap |
| Description separator | None vs 1px line vs small gap only |
| Grid gap between cards | 16px vs 24px vs 32px |
| Card internal alignment | Left-aligned vs center-aligned |
| Zone B vertical centering | Top-aligned vs center within zone |
| Bottom message style | border-l only vs full gradient bg bar |
| Overall vertical rhythm (zone gaps) | space-y-8 vs space-y-10 vs space-y-12 |
| Dot cluster arrangement | 2×3 vs 3×2 vs diagonal |
| Whether description has a subtle bg tint | Yes / No |

---

## TECHNICAL REQUIREMENTS (MANDATORY — DO NOT SKIP)

1. First line: `"use client"`
2. Named export: `export function CardsSlide({ title, cards, bottomMessage, tone = 'positive' }: CardsSlideProps)`
3. Tailwind CSS + inline styles only (NO component imports)
4. NO import of Card, SlideHeader, or any component
5. All animations via `<style>` tag with `@keyframes`
6. Decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Content: `position: relative`, `z-index: 10`
8. Root: `relative w-full overflow-hidden`, fontFamily and bg inline
9. **Dynamic grid**: `cards.length <= 3 ? 'grid-cols-3' : 'grid-cols-4'`
10. Handle `description` empty string: `description && description.trim() !== ''`
11. Handle `subtitle` absence: no empty element
12. Handle `bottomMessage` absence: no orphan space
13. Handle `tone` variants: positive (primary colors), neutral (gray colors)
14. Include sampleData for v0 preview
15. No red colors anywhere
16. Korean text must render correctly with Pretendard

---

## QUALITY CHECKLIST

- [ ] Cards have NO background — only top accent line defines them
- [ ] Title is enormous (5xl~6xl) and dominates each card visually
- [ ] Grid adapts: 3 cards → 3 columns, 4 cards → 4 columns
- [ ] Empty description ("") produces NO empty space or orphan elements
- [ ] 4 geometric elements maximum, all mathematical/precise
- [ ] NO translateY in any animation — pure opacity reveals
- [ ] Positive tone: primary blue, Neutral tone: gray
- [ ] Works for numbers ("2003"), words ("PTD"), mixed ("냉증 -36%")
- [ ] Removing bottomMessage leaves no orphan space
- [ ] Feels like a premium medical research document's key findings
- [ ] Left-to-right reading order is natural across 3 or 4 cards
- [ ] A 원장님 sees this and thinks "이 회사는 체계적이다"
