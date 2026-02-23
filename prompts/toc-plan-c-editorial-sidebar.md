# TocSlide — Plan C: Editorial Sidebar

You are a 30-year veteran UI designer specializing in premium medical presentation systems. You create designs that rival GRAFY DESIGN Hanisul level sophistication. Your work balances clinical authority with modern elegance.

---

## TASK

Design a **Table of Contents (TOC) slide** component for a Korean medicine clinic marketing proposal presentation. This is an **editorial/magazine-style layout** with oversized numbering on the left, a vertical accent line, and content on the right — like a premium annual report table of contents.

---

## MANDATORY DESIGN TOKENS (DO NOT CHANGE)

```
Colors:
  primary:      #004B8D
  primaryLight: #E8F4FC
  primaryDark:  #003366
  secondary:    #48A9C5
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

ABSOLUTE PROHIBITION: No red colors (#DC2626, #EF4444, etc.) anywhere. This is a medical context.
```

---

## FIXED PROPS INTERFACE (DO NOT MODIFY)

```tsx
interface TocItem {
  readonly act: number
  readonly title: string
  readonly startPage: number
}

interface TocSlideProps {
  readonly items: readonly TocItem[]
  readonly onNavigate?: (page: number) => void
}
```

---

## FIXED SAMPLE DATA (USE FOR PREVIEW)

```tsx
const sampleItems: TocItem[] = [
  { act: 1, title: "상황", startPage: 3 },
  { act: 2, title: "위기", startPage: 6 },
  { act: 3, title: "전환점", startPage: 13 },
  { act: 4, title: "해결책 1: 마케팅 전략", startPage: 18 },
  { act: 5, title: "해결책 2: AI CRM", startPage: 25 },
  { act: 6, title: "요약 및 Next Step", startPage: 45 },
]
```

---

## REQUIRED ELEMENTS (FIXED STRUCTURE)

1. **Header section** (top area):
   - "CONTENTS" label (uppercase, tracking-wider, small)
   - Horizontal accent line beneath the label (gradient from #004B8D to #48A9C5, or solid #004B8D)
   - Clean, minimal — no large "목차" title needed (the layout itself communicates "table of contents")

2. **Editorial List — Two-zone layout per row**:
   - **Left zone**: Large ACT number (48~64px font size, light opacity or gradient text)
   - **Vertical accent line**: 1~2px line separating left and right zones (primary color, subtle opacity)
   - **Right zone**: Title text + dot-leader or space + page number
   - Each row is a `<button>` with `onClick={() => onNavigate?.(item.startPage)}`
   - Rows have generous vertical spacing (editorial white space)
   - Hover state: the entire row subtly highlights — left number becomes fully opaque, right side gets primary color accent, subtle translateX shift

3. **Page numbers** on the right edge:
   - Right-aligned, monospace or tabular-nums style
   - Format: "p.{startPage}" or just the number
   - Connected to title via dot-leaders (......) or clean spacing

4. **Staggered entrance animation**:
   - Rows appear top-to-bottom with sequential delay
   - The vertical accent line draws itself downward

5. **Background decorative elements** (behind content, pointer-events-none):
   - Subtle geometric shapes from cover design language
   - Placed primarily in the right/top-right area to not interfere with the editorial layout
   - Lower opacity (0.04~0.08 range)
   - At least 3 decorative elements

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

Within the fixed structure above, you have creative freedom on:

- **Number styling**: Outline only, gradient fill, watermark-scale behind row, thin weight vs bold, etc.
- **Vertical line treatment**: Solid, dashed, gradient, or segmented with nodes at each row
- **Row spacing rhythm**: Equal spacing or grouped (e.g., tighter spacing within acts, more space between major sections)
- **Dot-leader style**: Classic dots, thin dashes, gradient fade line, or clean space with right-aligned numbers
- **Hover micro-interaction design**: How the row transforms — slide right, background fill, border appear, etc.
- **Overall composition**: Centered on page, left-biased, or with intentional asymmetric white space
- **Decorative element specifics**: Which geometric shapes, where placed, what animations
- **Typography weight contrast**: How dramatically the act numbers differ from title text
- **Optional "목차" title**: If you feel it improves the design, you may add a large "목차" title. If the editorial layout is self-explanatory, you may omit it.

---

## DESIGN PHILOSOPHY

"An editorial table of contents is like the index of a well-crafted book — generous white space, confident typography, and quiet elegance that invites the reader to begin."

---

## TECHNICAL REQUIREMENTS (MANDATORY)

1. First line: `"use client"`
2. Named export: `export function TocSlide({ items, onNavigate }: TocSlideProps)`
3. Use only Tailwind CSS classes + inline styles where Tailwind is insufficient
4. Icons: import from `lucide-react` only (e.g., ChevronRight, ArrowRight) — use sparingly, this is typography-driven
5. All CSS animations via `<style>` tag with `@keyframes` inside the component
6. Background decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Text content: `z-index: 10` (above decorative elements)
8. The component receives NO background — it renders inside a white (#FFFFFF) parent container
9. The parent container is max-width 1280px, vertically centered with `flex items-center`
10. Font family must be set via inline style on the root element
11. Include default props rendering with sampleItems when no items provided (for v0 preview)
12. For dot-leaders or page number alignment, CSS `tabular-nums` or flexbox space-between is preferred over absolute positioning

---

## QUALITY CHECKLIST

- [ ] Large act numbers create strong visual hierarchy
- [ ] Vertical accent line cleanly separates number zone from content zone
- [ ] Each row is an interactive button with elegant hover state
- [ ] Generous white space gives editorial/premium feeling
- [ ] Page numbers are cleanly right-aligned
- [ ] Staggered top-to-bottom entrance animation
- [ ] At least 3 background decorative elements
- [ ] Long titles ("해결책 1: 마케팅 전략") have sufficient horizontal space
- [ ] No red colors anywhere
- [ ] Korean text renders correctly
- [ ] Typography-driven design — icons are minimal accents, not focal points
