# TwoColumnSlide — Plan B: "Elevated Panels"
# Modern Card Design — 부드러운 그림자와 면적이 정보를 감싸는 신뢰감

---

## ROLE & CONTEXT

You are a 30-year veteran UI designer specializing in premium medical presentation systems.
You create designs that rival GRAFY DESIGN Hanisul level sophistication.
Your work balances clinical authority with modern elegance.

This is a **TEMPLATE** that renders **11 different slides** (22.4% of the entire 49-slide
presentation). Every design decision must work across vastly different content —
from pricing tables to strategy breakdowns to AI system diagrams.

---

## DESIGN CONCEPT: "Elevated Panels"

**Philosophy**: "Information feels safer when it's contained."

This design creates **two distinct card panels** that float above a subtle background.
Each card has its own identity (primary vs secondary) through tinted backgrounds
and colored top-borders, but they feel like a matched pair — siblings, not strangers.

The depth comes from **soft shadows and layered backgrounds**, giving each column
the feel of a premium dashboard widget. The reader instinctively trusts information
that is cleanly contained and visually organized.

**Visual Reference**: Apple Keynote financial slides, Notion database views,
Linear's project dashboards, modern SaaS pricing pages.

**Key Traits**:
- Each column is a full card with rounded corners, subtle shadow, tinted background
- Left card: primary tone (blue tint), Right card: secondary tone (teal tint)
- Cards feel "lifted" — soft box-shadow creates physical depth
- Highlight gets a "hero badge" treatment inside a colored block
- Geometric elements are soft: gradient blurs, faded circles
- The design feels like a premium web application dashboard

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
│  ZONE B: Two Card Panels                                │
│  ┌─────────────────────┐  ┌─────────────────────┐       │
│  │ ▓▓▓▓▓▓ top-3px ▓▓▓▓ │  │ ▓▓▓▓▓▓ top-3px ▓▓▓▓ │       │
│  │ ╭─────────────────╮ │  │ ╭─────────────────╮ │       │
│  │ │ card body       │ │  │ │ card body       │ │       │
│  │ │ col.title       │ │  │ │ col.title       │ │       │
│  │ │ ─── separator ──│ │  │ │ ─── separator ──│ │       │
│  │ │ [highlight?]    │ │  │ │ [highlight?]    │ │       │
│  │ │ • item 1        │ │  │ │ • item 1        │ │       │
│  │ │ • item 2        │ │  │ │ • item 2        │ │       │
│  │ │ • item 3        │ │  │ │ • item 3        │ │       │
│  │ ╰─────────────────╯ │  │ ╰─────────────────╯ │       │
│  │  ░░ soft shadow ░░  │  │  ░░ soft shadow ░░  │       │
│  └─────────────────────┘  └─────────────────────┘       │
│                                                         │
│  ZONE C: Bottom Message (optional)                      │
│  ┌─ border-l-4 + gradient-bg ───────────────────────┐   │
│  │  message text                                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## PLAN B SPECIFIC — COLUMN TREATMENT

### Card Container
- **Rounded corners**: rounded-2xl (16px)
- **Background tint**:
  - Left card: rgba(0, 75, 141, 0.03) — barely-there blue wash
  - Right card: rgba(72, 169, 197, 0.03) — barely-there teal wash
- **Border**: 1px solid
  - Left: rgba(0, 75, 141, 0.10)
  - Right: rgba(72, 169, 197, 0.10)
- **Top accent border**: 3px solid (overrides the 1px border at top)
  - Left: #004B8D
  - Right: #48A9C5
- **Box shadow**: `0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)`
  (Very subtle — feels lifted but not floating)
- **Internal padding**: p-7 to p-8

### Column Title
- Font-weight 700, text-xl (20px)
- Left: #004B8D, Right: #48A9C5
- Below title: thin separator line (1px, column color at 15% opacity)
- padding-bottom 12px on title, margin-bottom 16px to separator

### Highlight Block (Hero Badge Treatment)
- When present: rendered inside a **tinted badge block**:
  - Background: column color at 6~8% opacity
  - Rounded: rounded-xl
  - Padding: px-5 py-3
  - Text: text-2xl to text-3xl, font-weight 700, column color
- When absent: items start directly below separator — no gap, no empty block
- The badge makes the highlight feel like the "hero stat" of the card

### Item List
- Bullet: 7px solid circle with 2px white ring (creating a "target" dot)
  - Outer: column color at 100%
  - Creates a more substantial, dashboard-like bullet
- Text: text-base (16px), #334155, leading-relaxed (1.625)
- Item spacing: space-y-3.5
- Each item row: flex items-start gap-3

---

## PLAN B SPECIFIC — GEOMETRIC ELEMENTS (5 max)

This plan uses **soft, ambient** decorative elements:

1. **Large gradient circle** (top-right corner):
   - 280px diameter, radial-gradient
   - Center: rgba(72, 169, 197, 0.05), Edge: transparent
   - Position: top -8%, right -6%
   - Animation: very slow drift (translateX ±10px, 14s cycle)

2. **Small gradient circle** (bottom-left corner):
   - 180px diameter, radial-gradient
   - Center: rgba(0, 75, 141, 0.04), Edge: transparent
   - Position: bottom -5%, left -4%
   - Static — no animation

3. **Outlined circle** (top-left area):
   - 100px diameter, 1.5px stroke, rgba(0, 75, 141, 0.08)
   - No fill
   - Position: top 2%, left 1%
   - Static

4. **Small solid dot** (bottom-right):
   - 8px, rgba(72, 169, 197, 0.15)
   - Slow pulse (opacity 0.10→0.20, 6s)
   - Position: bottom 5%, right 4%

5. **Subtle horizontal dash** (right edge, mid-height):
   - 40px wide, 1.5px, rgba(0, 75, 141, 0.06)
   - Position: top 55%, right 1%
   - Static

**Safe Zone**: x 4%~96%, y 4%~90%

---

## ENTRANCE ANIMATION

Smooth and layered, matching the elevated card aesthetic:

1. Header accent-bar: fade-in 0.4s
2. Title: fade-in 0.5s, delay 0.1s
3. Left card: fade-in + translateY(10px→0) 0.5s ease-out, delay 0.2s
4. Right card: fade-in + translateY(10px→0) 0.5s ease-out, delay 0.35s
5. Items within each card: staggered fade-in (NOT individually animated —
   the card as a whole animates, contents appear with the card)
6. Bottom message: fade-in + translateY(6px→0) 0.4s, delay 0.5s

**Key**: Cards "rise into place" with subtle vertical movement.
This reinforces the "elevated" concept — panels settling onto the surface.

---

## CREATIVE FREEDOM (V0 DECIDES)

| Area | Freedom |
|------|---------|
| Card shadow intensity | Barely there vs softly visible |
| Card background opacity | 2% vs 3% vs 5% tint |
| Card border radius | rounded-xl vs rounded-2xl vs rounded-3xl |
| Top accent border width | 2px vs 3px vs 4px |
| Separator style below column title | Solid line vs gradient fade vs dashed |
| Highlight badge border-radius | rounded-lg vs rounded-xl |
| Highlight badge padding | Compact vs spacious |
| Bullet style | Solid dot vs ring-dot vs gradient dot |
| Gap between the two cards | 24px vs 28px vs 32px |
| Whether cards have identical height (min-h) | Matched vs natural height |
| Bottom message icon | None vs subtle ℹ️ indicator vs → arrow |
| Geometric blur softness | 40px vs 60px vs 80px blur radius |
| Overall zone A-B-C spacing | Tight (space-y-6) vs relaxed (space-y-8) |

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

---

## QUALITY CHECKLIST

- [ ] Both cards feel like a "matched pair" — same structure, different color identity
- [ ] Cards have visible but subtle depth (shadow + tint + border)
- [ ] Highlight "hero badge" is eye-catching but not garish
- [ ] Removing highlight leaves the card looking complete, not empty
- [ ] Removing bottomMessage leaves no orphan space
- [ ] 5 geometric elements maximum, all soft/ambient in character
- [ ] Cards rise into place with smooth translateY animation
- [ ] Works for both pricing (가격 구성) and strategy (전략 1: 지식인 극대화)
- [ ] Feels like a premium dashboard or modern SaaS interface
- [ ] Left = primary tone (blue), Right = secondary tone (teal), always
- [ ] A medical clinic director sees "organized, modern, trustworthy"
