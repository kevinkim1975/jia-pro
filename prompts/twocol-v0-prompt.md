# TwoColumnSlide — v0.dev Design Prompt
# "Structured Authority" — 11장을 지배하는 하나의 틀

---

## STEP 0: ROLE & CONTEXT

You are a 30-year veteran UI designer specializing in premium medical presentation systems.
You create designs that rival GRAFY DESIGN Hanisul level sophistication.
Your work balances clinical authority with modern elegance.

This is NOT a one-off design. This is a **TEMPLATE** that will render **11 different slides**
(22.4% of the entire 49-slide presentation). Every design decision must work across
vastly different content — from pricing tables to strategy breakdowns to AI system diagrams.

**The 11 slides this template must serve:**
- p.8  "원인 1: 시장 자체가 변하고 있습니다" (시장분석)
- p.9  "원인 2: 경쟁이 급격히 심화되고 있습니다" (경쟁분석)
- p.20 "전략 1: 지식인 극대화" (전략)
- p.21 "전략 2: 블로그 전환" (전략)
- p.22 "전략 3: 파워링크 최적화" (전략)
- p.24 "예산 변경" (재무)
- p.29 "AI CRM: 기록 관리 → 환자 확산 시스템" (기술)
- p.32 "PTD 경영진단" (진단)
- p.40 "AI 협업 구조" (기술)
- p.43 "가격 구성" (가격 — highlight 포함, 가장 복잡)
- p.47 "제안 방향 요약" (요약)

---

## STEP 1: MANDATORY DESIGN TOKENS (FROZEN — DO NOT CHANGE)

```
Colors:
  primary:      #004B8D    (Deep Medical Blue)
  primaryLight: #E8F4FC
  primaryDark:  #003366
  secondary:    #48A9C5    (Bright Medical Teal)
  accent:       #10B981    (Success Green — highlight 전용)
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
  ❌ No shadcn/ui Card component import — pure Tailwind + inline styles only
  ❌ No external icon library — geometry only
```

---

## STEP 2: FIXED TYPE CONTRACT (FROZEN — DO NOT MODIFY)

```tsx
interface TwoColumnSlideProps {
  readonly title: string
  readonly left: {
    readonly title: string
    readonly items: readonly string[]
    readonly highlight?: string        // ← optional, only p.43 uses this
  }
  readonly right: {
    readonly title: string
    readonly items: readonly string[]
    readonly highlight?: string        // ← optional, only p.43 uses this
  }
  readonly bottomMessage?: string      // ← optional, 9 of 11 slides use this
}
```

**CRITICAL**: The `highlight` field is OPTIONAL. Most slides do NOT have it.
The design MUST look complete and balanced both WITH and WITHOUT highlight.
Never leave an awkward gap when highlight is absent.

---

## STEP 3: FIXED SAMPLE DATA (USE FOR PREVIEW)

Use p.43 "가격 구성" — the most complex case with ALL fields populated:

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

## STEP 4: SKELETON — FIXED LAYOUT STRUCTURE (FROZEN)

The layout hierarchy is **immutable**. The visual treatment of each zone is your creative domain.

```
┌─────────────────────────────────────────────────────────┐
│  ZONE A: Header                                         │
│  ┌─ accent-bar (gradient line) ─┐                       │
│  └─ title text ─────────────────┘                       │
│                                                         │
│  ZONE B: Two Column Grid                                │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │  LEFT COLUMN     │  │  RIGHT COLUMN    │             │
│  │  ┌─ col.title ─┐ │  │  ┌─ col.title ─┐ │             │
│  │  ├─ highlight? ─┤ │  │  ├─ highlight? ─┤ │             │
│  │  ├─ item 1 ─────┤ │  │  ├─ item 1 ─────┤ │             │
│  │  ├─ item 2 ─────┤ │  │  ├─ item 2 ─────┤ │             │
│  │  ├─ item 3 ─────┤ │  │  ├─ item 3 ─────┤ │             │
│  │  └─ item 4 ─────┘ │  │  └─ item 4 ─────┘ │             │
│  └──────────────────┘  └──────────────────┘             │
│                                                         │
│  ZONE C: Bottom Message (optional)                      │
│  ┌─ gradient-bg + border-l accent ──────────────────┐   │
│  │  message text                                    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  [Background: Geometric decorative elements, z-0]       │
└─────────────────────────────────────────────────────────┘
```

**Zone rendering order**: A → B → C (top to bottom, always)
**Column order**: Left column = primary tone, Right column = secondary tone (always)

---

## STEP 5: EXCHANGE TABLE — WHAT CHANGES PER SLIDE

| Element | Exchangeable? | Constraint |
|---------|:---:|---|
| title text | ✅ | Props-driven, 8~40 characters |
| left.title text | ✅ | 2~10 characters |
| left.items[] | ✅ | 2~6 items, each 8~30 characters |
| left.highlight | ✅ | Optional, 0 or 1, 5~20 characters |
| right.title text | ✅ | 2~10 characters |
| right.items[] | ✅ | 2~6 items, each 8~30 characters |
| right.highlight | ✅ | Optional, 0 or 1, 5~20 characters |
| bottomMessage | ✅ | Optional, 10~40 characters |
| accent-bar gradient | ❌ | Always #004B8D → #48A9C5 |
| left column color tone | ❌ | Always primary (#004B8D) family |
| right column color tone | ❌ | Always secondary (#48A9C5) family |
| layout structure | ❌ | Always header → 2col → bottom |
| geometric elements | ❌ | Fixed decorative background |

---

## STEP 6: DESIGN DIRECTION — "Structured Authority"

### Concept

This is the **workhorse slide** of the presentation — appearing 11 times.
It must feel **organized, professional, and effortlessly readable** without being boring.

The design philosophy: **"Information architecture IS the aesthetic."**
Unlike the cover (emotional, geometric) or closing (minimal, typographic),
twoColumn slides earn their sophistication through:
- Perfect visual hierarchy between header → columns → bottom
- Subtle differentiation between left (primary) and right (secondary) columns
- Clean data presentation that respects the reader's time

### Design Language Continuity

This component lives in the same presentation as:
- **CoverSlide**: Rich geometric elements (9 elements), centered layout, large typography
- **TocSlide**: Grid-based, structured, numbered sections
- **ClosingSlide**: Minimalist, asymmetric, vast white space

The twoColumn design should feel like a **natural middle ground** between
TocSlide's structured precision and ClosingSlide's refined restraint.

### Column Identity System (MANDATORY)

The two columns must be **visually distinct but harmoniously paired**:

**Left Column = "Current State / Standard / Before"**
- Color family: primary (#004B8D)
- Visual weight: Solid, established, grounded
- This column typically presents: 현재 상황, 정가, 원인, 기존 방식

**Right Column = "Proposed / Special / After"**
- Color family: secondary (#48A9C5)
- Visual weight: Lighter, aspirational, forward-looking
- This column typically presents: 제안가, 전략, 해결책, 새로운 방식

This left/right semantic pairing is consistent across all 11 slides.

---

## STEP 7: REQUIRED ELEMENTS — ZONE SPECIFICATIONS

### ZONE A: Header

- **Accent bar**: w-12 (48px), h-1 (4px), `bg-gradient-to-r from-[#004B8D] to-[#48A9C5]`, rounded-full
- **Title**: text-3xl to text-4xl, font-bold, text-gray-900
- Spacing: accent-bar above title, gap 8px (space-y-2)
- Alignment: left-aligned (never center)

### ZONE B: Two Column Grid (THE CORE)

**Grid**: 2 columns, equal width, gap 24~32px

**Each column must contain** (in order):
1. **Column title**: font-bold, sized appropriately (text-lg to text-xl)
   - Left: primary color (#004B8D)
   - Right: secondary color (#48A9C5)
   - Below title: a subtle separator (border, line, or spacing)

2. **Highlight block** (CONDITIONAL — only if `highlight` prop exists):
   - Large, bold typography (text-2xl to text-3xl)
   - Visually prominent — this is the "hero number" of the column
   - Must NOT leave empty space when absent
   - When present: pushes items down gracefully

3. **Item list**: Each item as a row with:
   - A bullet indicator (dot, dash, or subtle icon-like mark)
   - Text content: text-base to text-lg, text-gray-700, leading-relaxed
   - Consistent vertical spacing between items (space-y-3 to space-y-4)

**Column container treatment**: Each column needs a visible boundary —
a card-like container with:
- Subtle background tint (primary/secondary at 3~8% opacity)
- Thin border or border-top accent (1~2px)
- Generous internal padding (p-6 to p-8)
- Rounded corners (rounded-xl to rounded-2xl)

### ZONE C: Bottom Message (CONDITIONAL)

- Only renders when `bottomMessage` prop exists
- Full-width bar below the columns
- Left border accent: 4px, primary color (#004B8D)
- Background: gradient from primary/10 to secondary/10
- Text: font-semibold, primary color, text-lg to text-xl
- Rounded corners: rounded-xl
- Padding: p-4 to p-5

---

## STEP 8: GEOMETRIC BACKGROUND ELEMENTS

**Maximum 4~6 elements.** This is a content-heavy slide — decorations must NOT
compete with the data. Keep them subtle and peripheral.

### Safe Zone (NO geometric elements allowed):
```
┌────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░  SAFE ZONE: x 5%~95%, y 5%~90%          ░░ │
│ ░░  No geometric elements inside this area  ░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│            ↑ Only corners and edges ↑          │
└────────────────────────────────────────────────┘
```

### Suggested elements (v0 has freedom on specifics):
- Top-right: Faint gradient circle or arc (secondary color, 3~5% opacity)
- Bottom-left: Small geometric accent (dot, diamond, outlined circle)
- Corner dashes or dots: Very subtle repeating pattern
- All elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
- All elements: Animation cycles 10s+ (extremely slow, ambient)

---

## STEP 9: ENTRANCE ANIMATION

Subtle, professional, sequential:

1. Header accent-bar: fade-in 0.4s
2. Title: fade-in 0.5s, delay 0.1s
3. Left column: fade-in + slight translateY(8px→0) 0.5s, delay 0.2s
4. Right column: fade-in + slight translateY(8px→0) 0.5s, delay 0.35s
5. Bottom message: fade-in 0.4s, delay 0.5s

No bouncing. No scaling. Clinical precision.

---

## STEP 10: CREATIVE FREEDOM (V0 DESIGNER DECIDES)

Within all constraints above, the designer has full creative authority over:

| Area | Freedom Range | Notes |
|------|---------------|-------|
| **Column container style** | Flat card / Elevated card / Glassmorphism-light / Outlined | Choose what feels most premium and readable |
| **Column title treatment** | Underline / Bottom-border / Background pill / Icon-prefix | How to separate title from items visually |
| **Bullet indicator style** | Solid dot / Gradient dot / Dash / Numbered / Arrow | Must be consistent left-right, color-coded by column |
| **Highlight typography** | Size (24~36px), weight (600~800), color treatment | Make it unmissable but not garish |
| **Column internal spacing** | Padding, item gap, title-to-items distance | Optimize for 3~4 items (most common case) |
| **Geometric element specifics** | Exact shapes, sizes, positions, animation timing | Stay within safe zone rules |
| **Hover/focus states** | Optional micro-interactions on column containers | Only if it enhances, never if it distracts |
| **Visual separator between columns** | None / Thin vertical line / Gap only / Gradient divider | What creates the best visual rhythm |
| **Bottom message icon** | None / Subtle info icon / Arrow / Quote mark | Optional, if it improves scannability |
| **Overall vertical rhythm** | Spacing between zones A, B, C | Balance density vs breathing room |
| **Subtle texture or pattern** | None / Faint dot grid / Hairline rules | Background texture for the column containers |

---

## STEP 11: TECHNICAL REQUIREMENTS (MANDATORY)

1. First line: `"use client"`
2. Named export: `export function TwoColumnSlide({ title, left, right, bottomMessage }: TwoColumnSlideProps)`
3. Use only Tailwind CSS classes + inline styles where Tailwind is insufficient
4. **NO imports** — no Card, no SlideHeader, no SlideBottomMessage, no icons
   (The component is fully self-contained for v0 preview)
5. All CSS animations via `<style>` tag with `@keyframes` inside the component
6. Background decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Text content: `position: relative`, `z-index: 10` (above decorative elements)
8. Root element: `relative w-full overflow-hidden` with inline style for fontFamily and backgroundColor: '#FFFFFF'
9. Font: Pretendard via inline style on root element
10. Include sampleData rendering when no props provided (for v0 preview)
11. Handle `highlight` absence gracefully — no empty div, no layout shift
12. Handle `bottomMessage` absence gracefully — no empty space at bottom
13. `\n` in bottomMessage should be rendered (whitespace-pre-line)
14. Root element: `relative w-full py-12 to py-16` (parent handles centering)

---

## STEP 12: QUALITY CHECKLIST

Before submitting, verify:

- [ ] Both columns look balanced even when item counts differ (left: 4 items, right: 3 items)
- [ ] Removing `highlight` from both columns doesn't break layout
- [ ] Removing `bottomMessage` doesn't leave orphaned space
- [ ] Left column reads as "primary/established" tone
- [ ] Right column reads as "secondary/aspirational" tone
- [ ] Text is fully readable — no overlap with geometric elements
- [ ] Geometric elements are confined to corners/edges (outside safe zone)
- [ ] Animations are subtle and professional (no bounce, no scale)
- [ ] The slide feels like it belongs with CoverSlide's geometric richness
    and ClosingSlide's typographic restraint — a sophisticated middle ground
- [ ] Korean text (한글) renders correctly at all sizes
- [ ] No red colors anywhere
- [ ] The design works for BOTH pricing content (가격 구성) AND strategic content (전략 1: 지식인 극대화) — it's content-agnostic
- [ ] A medical clinic director would trust this design immediately
