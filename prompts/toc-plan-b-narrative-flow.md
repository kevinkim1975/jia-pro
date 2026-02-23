# TocSlide — Plan B: Narrative Flow (Horizontal Timeline)

You are a 30-year veteran UI designer specializing in premium medical presentation systems. You create designs that rival GRAFY DESIGN Hanisul level sophistication. Your work balances clinical authority with modern elegance.

---

## TASK

Design a **Table of Contents (TOC) slide** component for a Korean medicine clinic marketing proposal presentation. This is a **horizontal timeline/flow layout** that visualizes the narrative progression from "situation" to "resolution."

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

1. **Header section** (top-left or top-center):
   - Small badge/label: "CONTENTS" (uppercase, tracking-wider)
   - Main title: "목차" (large, bold)
   - Decorative element near the title (thin line, diamond, or geometric accent)

2. **Horizontal Timeline Flow**:
   - A horizontal connecting line/path runs across the component
   - The line uses a gradient from #004B8D (left) to #48A9C5 (right)
   - 6 nodes/stops along the line, each representing one TocItem
   - Each node is a `<button>` with `onClick={() => onNavigate?.(item.startPage)}`
   - Each node contains:
     - ACT number (displayed prominently — above or inside the node)
     - Title text (Korean, below or beside the node)
     - Page indicator ("p.{startPage}")
   - Hover state: node scale-up, glow effect, or highlight
   - **Critical layout challenge**: titles like "해결책 1: 마케팅 전략" are long. 
     Solve this with: angled text, multi-line wrapping, tooltip, or expanded card on hover.

3. **Staggered entrance animation**:
   - Nodes appear left-to-right with sequential delay (0.1s~0.15s between each)
   - The connecting line draws itself progressively (stroke-dasharray animation)

4. **Background decorative elements** (behind content, pointer-events-none):
   - Subtle geometric shapes from cover design language (circles, lines, diamonds)
   - Lower opacity than cover (0.04~0.08 range)
   - At least 3 decorative elements

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

Within the fixed structure above, you have creative freedom on:

- **Timeline visual style**: Straight line, curved path, stepped path, or segmented line
- **Node design**: Circles, rounded squares, diamonds, numbered badges, or mixed
- **Node size and spacing**: How to distribute 6 nodes across ~1200px width
- **Long title handling**: Choose your approach — multi-line, truncation with hover expand, rotated labels, cards below nodes, etc.
- **Vertical layout around the line**: Title above + page below? All below? Alternating above/below (zigzag)?
- **Animation style**: How the connecting line draws, how nodes appear, micro-interactions on hover
- **Decorative element placement**: Position and animation of background geometric shapes
- **Progress feeling**: Whether to add a subtle "journey" metaphor — starting point marker, destination marker, etc.
- **Secondary information hierarchy**: How page numbers are displayed relative to titles

---

## DESIGN PHILOSOPHY

"A narrative timeline is like a river flowing from the source of a problem to the ocean of resolution — each stop along the way reveals the next chapter of the story."

---

## TECHNICAL REQUIREMENTS (MANDATORY)

1. First line: `"use client"`
2. Named export: `export function TocSlide({ items, onNavigate }: TocSlideProps)`
3. Use only Tailwind CSS classes + inline styles where Tailwind is insufficient
4. Icons: import from `lucide-react` only (e.g., ChevronRight, ArrowRight, Circle)
5. All CSS animations via `<style>` tag with `@keyframes` inside the component
6. Background decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Text content: `z-index: 10` (above decorative elements)
8. The component receives NO background — it renders inside a white (#FFFFFF) parent container
9. The parent container is max-width 1280px, vertically centered with `flex items-center`
10. SVG is encouraged for the timeline path and connecting lines
11. Font family must be set via inline style on the root element
12. Include default props rendering with sampleItems when no items provided (for v0 preview)
13. The timeline must handle exactly 6 items gracefully. It does NOT need to handle arbitrary counts.

---

## QUALITY CHECKLIST

- [ ] Horizontal flow clearly communicates narrative progression left→right
- [ ] Connecting line has gradient from #004B8D to #48A9C5
- [ ] Each node is an interactive button with hover feedback
- [ ] Long Korean titles ("해결책 1: 마케팅 전략") do not overflow or break layout
- [ ] Staggered left-to-right entrance animation
- [ ] At least 3 background decorative elements
- [ ] No red colors anywhere
- [ ] Korean text renders correctly
- [ ] Professional medical aesthetic maintained
