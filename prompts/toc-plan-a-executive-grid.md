# TocSlide — Plan A: Executive Grid

You are a 30-year veteran UI designer specializing in premium medical presentation systems. You create designs that rival GRAFY DESIGN Hanisul level sophistication. Your work balances clinical authority with modern elegance.

---

## TASK

Design a **Table of Contents (TOC) slide** component for a Korean medicine clinic marketing proposal presentation. This is a **3×2 card grid layout** where each card represents a narrative act.

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

1. **Header section** (top center):
   - Small badge/label: "CONTENTS" (uppercase, tracking-wider)
   - Main title: "목차" (large, bold)
   - Decorative divider between badge and title (thin line + diamond or similar)

2. **3×2 Card Grid**:
   - Each card is a `<button>` with `onClick={() => onNavigate?.(item.startPage)}`
   - Each card contains:
     - ACT number (large typographic emphasis, gradient from #004B8D to #48A9C5)
     - Title text (Korean, semibold)
     - Page indicator ("p.{startPage}")
     - Subtle arrow or navigation affordance
   - Cards have hover states: lift effect (shadow + translateY), border color change

3. **Background decorative elements** (behind content, pointer-events-none):
   - Reuse the geometric language from the cover slide: circles, diagonal lines, diamond shapes
   - Much more subtle than cover (lower opacity: 0.04~0.10 range)
   - At least 4 decorative elements to create visual richness

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

Within the fixed structure above, you have creative freedom on:

- **Card internal layout**: How to arrange act number, title, and page within each card
- **Card styling**: Border radius, shadow depth, background gradient, inner spacing
- **ACT number presentation**: Could be oversized watermark behind title, top-left badge, centered large number, etc.
- **Grid gap and card proportions**: Optimize for 1280px max-width container
- **Animation choreography**: Stagger timing for card entrance, hover micro-interactions
- **Decorative element placement**: Position, size, animation of background geometric shapes
- **Divider design between header and grid**: Creative line/shape treatment
- **Color gradient application on cards**: How primary→secondary gradient is used (borders, backgrounds, accents)

---

## DESIGN PHILOSOPHY

"A well-organized table of contents is like a clear map before a journey — it gives confidence about the path ahead while hinting at the story's progression from situation to resolution."

---

## TECHNICAL REQUIREMENTS (MANDATORY)

1. First line: `"use client"`
2. Named export: `export function TocSlide({ items, onNavigate }: TocSlideProps)`
3. Use only Tailwind CSS classes + inline styles where Tailwind is insufficient
4. Icons: import from `lucide-react` only (e.g., ChevronRight, ArrowRight)
5. All CSS animations via `<style>` tag with `@keyframes` inside the component
6. Background decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Text content: `z-index: 10` (above decorative elements)
8. The component receives NO background — it renders inside a white (#FFFFFF) parent container
9. The parent container is max-width 1280px, vertically centered with `flex items-center`
10. Responsive considerations: Works well at 1280px width. Cards should not be smaller than 380px wide.
11. Font family must be set via inline style on the root element
12. Include default props rendering with sampleItems when no items provided (for v0 preview)

---

## QUALITY CHECKLIST

- [ ] Cards are interactive buttons with clear hover feedback
- [ ] ACT numbers use primary→secondary gradient
- [ ] At least 4 background decorative elements with subtle animations
- [ ] Staggered entrance animation for cards
- [ ] Typography hierarchy: badge < title < act numbers
- [ ] No red colors anywhere
- [ ] Korean text ("목차", "상황", etc.) renders correctly
- [ ] Consistent with medical/professional aesthetic
