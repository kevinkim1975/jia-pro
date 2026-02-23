# TwoColumnSlide — Plan A: "Precision Grid"
# Swiss Design 정밀함 — 선과 타이포그래피만으로 구조를 만든다

---

## ROLE & CONTEXT

You are a 30-year veteran UI designer specializing in premium medical presentation systems.
You create designs that rival GRAFY DESIGN Hanisul level sophistication.
Your work balances clinical authority with modern elegance.

This is a **TEMPLATE** that renders **11 different slides** (22.4% of the entire 49-slide
presentation). Every design decision must work across vastly different content —
from pricing tables to strategy breakdowns to AI system diagrams.

---

## DESIGN CONCEPT: "Precision Grid"

**Philosophy**: "Structure emerges from typography and space, not from decoration."

This design draws from Swiss International Style and Dieter Rams's principles.
The two columns are defined NOT by card backgrounds or borders, but by
**a single accent line at the top and precise typographic hierarchy**.
White space between and within columns creates the structure.

Think of a premium medical research paper or a Bloomberg terminal report —
information is authoritative because of its precision, not its decoration.

**Visual Reference**: Swiss poster design, academic journal layouts,
Braun product manuals by Dieter Rams.

**Key Traits**:
- NO card backgrounds — columns float on white space
- Top accent border (3px) is the ONLY column boundary indicator
- Thin vertical dashed line separates the two columns (1px, very subtle)
- Typography does all the heavy lifting — size, weight, and color create hierarchy
- Geometric elements are mathematical: precise dots, hairlines, small crosses
- The design feels like it could be printed on high-quality bond paper

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
│  ZONE B: Two Columns                                    │
│  ┌──────────────┐ │ ┌──────────────┐                    │
│  │ 3px top line  │ │ │ 3px top line  │   ← only border  │
│  │ (primary)     │ │ │ (secondary)   │                   │
│  │              │ │ │              │                    │
│  │ col.title    │ │ │ col.title    │                    │
│  │ highlight?   │ │ │ highlight?   │                    │
│  │ items...     │ │ │ items...     │                    │
│  │              │ │ │              │                    │
│  └──────────────┘ │ └──────────────┘                    │
│                   ↑                                     │
│           dashed vertical line (1px)                    │
│                                                         │
│  ZONE C: Bottom Message (optional)                      │
│  ┌─ border-l-4 + gradient-bg ───────────────────────┐   │
│  │  message text                                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## PLAN A SPECIFIC — COLUMN TREATMENT

### Column Container
- **NO background color** — columns sit on pure white
- **Top border only**: 3px solid, left=#004B8D, right=#48A9C5
- **No rounded corners** on columns — sharp, precise edges
- Internal padding: pt-6 (below accent line), px-0 (no horizontal padding — open feel)
- The columns feel like **zones**, not boxes

### Column Title
- Font-weight 700, text-lg (18~20px)
- Left: #004B8D, Right: #48A9C5
- Below title: 16px gap, then items start — NO underline, NO separator
- The accent line at top IS the separator — nothing else needed

### Vertical Divider Between Columns
- 1px dashed line, color: neutral.200 (#E2E8F0)
- Full height of column area
- This is the quiet seam that holds the two columns apart
- Implemented as: border-r on left column OR absolute positioned div

### Highlight Block
- When present: text-2xl to text-3xl, font-weight 700
- Color: same as column (primary or secondary)
- No background, no badge — just large confident typography
- 8px margin below, then items continue
- When absent: items start directly below title — no gap

### Item List
- Bullet: 6px solid circle, same color as column (primary or secondary)
- Text: text-base (16px), text-gray-700 (#334155), leading-relaxed
- Item spacing: space-y-3
- Alignment: bullet vertically centered to first line of text

---

## PLAN A SPECIFIC — GEOMETRIC ELEMENTS (4 max)

This plan uses **mathematical precision** in its decorative elements:

1. **Dot cluster** (top-right corner):
   - 4~6 small circles (3px each), arranged in a precise grid pattern
   - Color: rgba(0, 75, 141, 0.10)
   - No animation — perfectly still, like coordinates on a graph
   - Position: top 3%, right 3%

2. **Hairline cross** (bottom-left corner):
   - Two perpendicular lines (40px each, 1px stroke)
   - Color: rgba(72, 169, 197, 0.12)
   - Static — no animation
   - Position: bottom 4%, left 3%

3. **Single horizontal rule** (right side, mid-height):
   - 60px wide, 1px, rgba(0, 75, 141, 0.08)
   - Very slow pulse animation (opacity 0.08→0.15, 8s cycle)
   - Position: top 50%, right 2%

4. **Small outlined square** (bottom-right):
   - 12px, 1px stroke, rgba(72, 169, 197, 0.15)
   - Rotated 15deg, static
   - Position: bottom 6%, right 5%

**Safe Zone**: All elements stay within x<4% or x>96%, y<4% or y>92%

---

## ENTRANCE ANIMATION

Ultra-minimal, matches the precision aesthetic:

1. Top accent line on left column: width 0→100%, 0.4s ease-out
2. Top accent line on right column: width 0→100%, 0.4s ease-out, delay 0.1s
3. Title: opacity 0→1, 0.5s, delay 0.15s
4. Left column content: opacity 0→1, 0.4s, delay 0.25s (NO translateY — appears in place)
5. Right column content: opacity 0→1, 0.4s, delay 0.35s (NO translateY — appears in place)
6. Vertical divider: opacity 0→1, 0.3s, delay 0.2s
7. Bottom message: opacity 0→1, 0.4s, delay 0.5s

**Key**: NO translateY on any element. Everything fades in-place.
This matches the "precision" concept — elements don't move, they reveal.

---

## CREATIVE FREEDOM (V0 DECIDES)

| Area | Freedom |
|------|---------|
| Exact top-border width | 2px vs 3px vs 4px |
| Dot cluster arrangement | 2×2 vs 2×3 vs diagonal |
| Vertical divider style | dashed vs dotted vs solid hairline |
| Title letter-spacing | -0.01em vs -0.02em vs normal |
| Item bullet size | 4px vs 6px vs 8px |
| Column gap width | 24px vs 32px vs 40px |
| Header accent-bar to title distance | 6px vs 8px vs 12px |
| Bottom message border-left width | 3px vs 4px |
| Overall vertical padding | py-12 vs py-14 vs py-16 |
| Whether highlight has a subtle bottom-border | Yes / No |

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

- [ ] Columns have NO background — only top accent line defines them
- [ ] Vertical dashed divider creates clean separation without heaviness
- [ ] Typography alone creates clear hierarchy (title > column titles > highlight > items)
- [ ] 4 geometric elements maximum, all mathematical/precise in character
- [ ] NO translateY in any animation — pure opacity reveals
- [ ] Works for both pricing (가격 구성) and strategy (전략 1: 지식인 극대화)
- [ ] Removing highlight leaves no gap
- [ ] Removing bottomMessage leaves no orphan space
- [ ] Feels like a premium medical research document
- [ ] Left = primary tone, Right = secondary tone, always
