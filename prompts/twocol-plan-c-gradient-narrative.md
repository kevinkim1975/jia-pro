# TwoColumnSlide — Plan C: "Gradient Narrative"
# 흐름이 있는 비교 — 좌에서 우로 서사가 흐른다

---

## ROLE & CONTEXT

You are a 30-year veteran UI designer specializing in premium medical presentation systems.
You create designs that rival GRAFY DESIGN Hanisul level sophistication.
Your work balances clinical authority with modern elegance.

This is a **TEMPLATE** that renders **11 different slides** (22.4% of the entire 49-slide
presentation). Every design decision must work across vastly different content —
from pricing tables to strategy breakdowns to AI system diagrams.

---

## DESIGN CONCEPT: "Gradient Narrative"

**Philosophy**: "Comparison is not static — it's a story with direction."

Every twoColumn slide in this presentation tells a story:
현재 → 제안, 정가 → 제안가, 문제 → 해결, 기존 → 혁신.

This design makes that **left-to-right narrative visible** through a flowing
gradient system. A subtle gradient ribbon connects the two columns,
and the color transition from primary (established) to secondary (aspirational)
reinforces the "transformation" message at a subconscious level.

The column titles sit inside gradient-backed pills, and a connecting element
(thin gradient line or arrow-like flow) bridges the two columns visually.
This is not just a comparison layout — it's a **persuasion machine**.

**Visual Reference**: Stripe's product pages, Linear's feature comparisons,
McKinsey presentation decks, premium consulting proposal slides.

**Key Traits**:
- Column titles as **gradient-backed pills** (rounded badges with color fill)
- A **connecting gradient element** flows between columns (ribbon, line, or arc)
- Left column feels "grounded" (slightly heavier visual weight)
- Right column feels "elevated" (lighter, more aspirational)
- Geometric elements are organic: flowing curves, SVG arcs, dashed paths
- The whole slide has subtle directional energy (left → right)

---

## MANDATORY DESIGN TOKENS (FROZEN)

```
Colors:
  primary:      #004B8D
  primaryLight: #E8F4FC
  primaryDark:  #003366
  secondary:    #48A9C5
  accent:       #10B981
  neutral.50:   #F8FAFC
  neutral.100:  #F1F5F9
  neutral.200:  #E2E8F0
  neutral.300:  #CBD5E1
  neutral.400:  #94A3B8
  neutral.500:  #64748B
  neutral.600:  #475569
  neutral.700:  #334155
  neutral.800:  #1E293B
  neutral.900:  #0F172A

Typography:
  fontFamily: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif

ABSOLUTE PROHIBITION:
  ❌ No red colors (#DC2626, #EF4444, etc.) — medical context
  ❌ No shadcn/ui Card import — pure Tailwind + inline styles only
  ❌ No external icon library
```

---

## FIXED TYPE CONTRACT (FROZEN)

```tsx
interface TwoColumnSlideProps {
  readonly title: string
  readonly left: {
    readonly title: string
    readonly items: readonly string[]
    readonly highlight?: string
  }
  readonly right: {
    readonly title: string
    readonly items: readonly string[]
    readonly highlight?: string
  }
  readonly bottomMessage?: string
}
```

**CRITICAL**: `highlight` is OPTIONAL (only 1 of 11 slides uses it).
Design MUST look complete and balanced both WITH and WITHOUT highlight.

---

## FIXED SAMPLE DATA

```tsx
const sampleData = {
  title: "가격 구성",
  left: {
    title: "정가",
    items: [
      "맞춤형 CRM: 1억6,500만",
      "교육 프로그램: 1억1,880만",
      "PTD+모니터링: 990만",
      "총액: 2억9,370만원",
    ],
  },
  right: {
    title: "제안가",
    highlight: "330만원 × 36개월",
    items: [
      "= 1억 1,880만원",
      "할인: 1억 7,490만원 (59.6%)",
      "*AI 기능 추가 포함",
    ],
  },
  bottomMessage: "모니터링 요원 비용은 실비 청구됩니다",
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
│  ZONE B: Two Columns with Gradient Flow                 │
│  ┌──────────────────┐ ──→── ┌──────────────────┐        │
│  │ ╭──────────────╮ │       │ ╭──────────────╮ │        │
│  │ │ ■ col.title ■│ │ flow  │ │ ■ col.title ■│ │        │
│  │ ╰──────────────╯ │  →   │ ╰──────────────╯ │        │
│  │                  │       │                  │        │
│  │  [highlight?]    │       │  [highlight?]    │        │
│  │  • item 1        │       │  • item 1        │        │
│  │  • item 2        │       │  • item 2        │        │
│  │  • item 3        │       │  • item 3        │        │
│  └──────────────────┘       └──────────────────┘        │
│         ↑                            ↑                  │
│     primary tone              secondary tone            │
│                                                         │
│  ZONE C: Bottom Message (optional)                      │
│  ┌─ border-l-4 + gradient-bg ───────────────────────┐   │
│  │  message text                                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## PLAN C SPECIFIC — COLUMN TREATMENT

### Card Container
- **Rounded corners**: rounded-xl (12px)
- **Background**: white (#FFFFFF) — both cards on pure white
- **Border**: 1px solid, rgba(0,0,0, 0.06) — neutral, same both sides
- **No separate color tint** on the card body — color identity comes
  from the TITLE PILL and ACCENT ELEMENTS, not the container
- **Internal padding**: p-6 to p-7
- The cards themselves are **neutral vessels** — the color story
  is told by the pills, flow element, and accents

### Column Title as Gradient Pill
- **Left pill**: background gradient from #004B8D to rgba(0,75,141,0.85)
  - Text: white (#FFFFFF), font-weight 600, text-sm to text-base
  - Padding: px-4 py-1.5 to py-2
  - Rounded: rounded-full
  - This is a SOLID colored badge — primary identity

- **Right pill**: background gradient from #48A9C5 to rgba(72,169,197,0.85)
  - Text: white (#FFFFFF), font-weight 600, text-sm to text-base
  - Same sizing as left pill
  - Rounded: rounded-full

- Below pill: 16~20px gap, then content starts

### Connecting Flow Element (THE SIGNATURE of Plan C)
Between the two columns, implement ONE of:

**Option recommended**: Gradient Line with Arrow
- A thin gradient line (2px) that spans from the right edge of the left column
  to the left edge of the right column
- Gradient: from #004B8D (left) to #48A9C5 (right)
- Positioned vertically at the same height as the column titles (pill level)
- Optional: small arrow tip (▸) or chevron at the right end
- This element says "from here → to here" without words

**Alternative**: SVG arc that curves gently from left column's title area
to right column's title area, with gradient stroke. Like a bridge.

### Highlight Block
- When present: text-2xl to text-3xl, font-weight 700
- Color: column's identity color (#004B8D or #48A9C5)
- Underline accent: 3px solid line below the highlight text,
  same color at 30% opacity, width ~60% of text width
- This underline is a "mini gradient ribbon" echoing the flow concept
- When absent: items start directly below pill gap — clean, no residue

### Item List
- Bullet: gradient dot (6px) — left items use primary, right items use secondary
  - The dot has a subtle gradient (column-color to column-color-light)
  - This is more refined than a solid dot
- Text: text-base (16px), #334155, leading-relaxed
- Item spacing: space-y-3
- Left column items: left border accent (2px, primary at 8% opacity) on each item row
  - Creates a "contained list" feel
- Right column items: same structure, secondary color

---

## PLAN C SPECIFIC — GEOMETRIC ELEMENTS (5~6 elements)

This plan uses **organic, flowing** decorative elements that reinforce directionality:

1. **Flowing arc** (background, spanning both columns):
   - SVG path: a gentle S-curve or wide arc
   - Stroke: 1.5px, gradient from rgba(0,75,141,0.06) to rgba(72,169,197,0.06)
   - Spans approximately 70% of slide width, vertically centered
   - Animation: slow dashOffset animation (stroke-dasharray, 15s cycle)
   - This reinforces the left→right narrative at a subliminal level

2. **Dashed curved path** (top-right area):
   - Small arc, 120px, stroke-dasharray: 4 8
   - Color: rgba(72, 169, 197, 0.10)
   - Position: top 2%, right 3%
   - Animation: dashOffset 12s

3. **Small gradient circle** (bottom-left):
   - 160px diameter, radial-gradient
   - Center: rgba(0, 75, 141, 0.04), Edge: transparent
   - Position: bottom -4%, left -3%
   - Static

4. **Tiny diamond** (bottom-right):
   - 14px, 1.5px stroke, rgba(72, 169, 197, 0.15)
   - Rotated 45deg
   - Slow spin: 20s cycle
   - Position: bottom 4%, right 3%

5. **Horizontal flowing dashes** (left edge, mid-height):
   - 3 small dashes (12px each, 2px gap), rgba(0, 75, 141, 0.08)
   - Position: left 1%, top 50%
   - Animation: slow slide right (translateX 0→8px, 10s)

**Safe Zone**: x 4%~96%, y 4%~90%

---

## ENTRANCE ANIMATION

Directional and sequential, reinforcing the left→right flow:

1. Header accent-bar: width 0→100%, 0.4s
2. Title: fade-in 0.5s, delay 0.1s
3. Left column pill: fade-in + scale(0.9→1) 0.3s, delay 0.2s
4. Left column content: fade-in + translateX(-8px→0) 0.4s, delay 0.3s
5. **Connecting flow element**: draws from left to right (width 0→100%) 0.5s, delay 0.35s
6. Right column pill: fade-in + scale(0.9→1) 0.3s, delay 0.45s
7. Right column content: fade-in + translateX(8px→0) 0.4s, delay 0.5s
8. Bottom message: fade-in 0.4s, delay 0.65s

**Key**: The animation tells the story — left appears first, flow element
bridges across, then right appears. The reader experiences the narrative
through the entrance sequence itself.

Note: translateX (horizontal) not translateY (vertical) — movement follows
the left→right reading direction, matching the concept.

---

## CREATIVE FREEDOM (V0 DECIDES)

| Area | Freedom |
|------|---------|
| Flow element style | Gradient line / SVG arc / Dashed bridge / Chevron chain |
| Flow element vertical position | Title-level vs mid-column vs below columns |
| Pill size and padding | Compact (text-sm) vs standard (text-base) |
| Pill gradient direction | left-to-right vs radial vs solid |
| Card border treatment | 1px neutral vs no border vs subtle shadow only |
| Highlight underline length | 40% vs 60% vs 80% of text width |
| Item left-border accent | Include vs omit (if it feels too busy) |
| Bullet gradient direction | top-to-bottom vs radial |
| Flowing arc SVG curvature | Wide gentle curve vs tighter S-curve |
| Column gap width | 32px vs 40px vs 48px (needs room for flow element) |
| Whether the flow element has an arrow tip | Yes / No |
| Background flowing arc opacity | 4% vs 6% vs 8% |
| Overall energy level | Restrained (consulting) vs dynamic (startup) |

---

## TECHNICAL REQUIREMENTS (MANDATORY)

1. First line: `"use client"`
2. Named export: `export function TwoColumnSlide({ title, left, right, bottomMessage }: TwoColumnSlideProps)`
3. Tailwind CSS + inline styles only (no component imports)
4. All animations via `<style>` tag with `@keyframes`
5. Decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
6. Content: `position: relative`, `z-index: 10`
7. Root: `relative w-full overflow-hidden` with fontFamily and backgroundColor inline
8. Handle `highlight` absence — no empty div, no layout shift
9. Handle `bottomMessage` absence — no empty space
10. Include sampleData for v0 preview
11. No red colors anywhere
12. Korean text must render correctly with Pretendard
13. SVG elements for arcs/curves must use `preserveAspectRatio="none"` where appropriate
14. Flow element between columns must be positioned with care —
    it should not overlap column content

---

## QUALITY CHECKLIST

- [ ] Column title pills clearly differentiate left (primary blue) from right (secondary teal)
- [ ] Flow element creates visible left→right narrative without being heavy
- [ ] The entrance animation tells the comparison story through sequence
- [ ] translateX (not translateY) matches the directional concept
- [ ] Removing highlight leaves clean layout — no underline orphan
- [ ] Removing bottomMessage leaves no orphan space
- [ ] 5~6 geometric elements, all organic/flowing (no sharp geometric shapes)
- [ ] Works for both pricing (가격 구성) and strategy (전략 1: 지식인 극대화)
- [ ] The "narrative" concept doesn't overpower the data
- [ ] Left = established/current, Right = proposed/new — visually clear
- [ ] A medical clinic director feels "this company has a clear plan for us"
- [ ] The design has more visual energy than Plan A and Plan B,
    but the energy serves the content, not decoration
