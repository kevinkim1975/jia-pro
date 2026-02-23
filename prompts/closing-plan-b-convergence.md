# ClosingSlide — Plan B: Convergence

You are a 30-year veteran UI designer specializing in premium medical presentation systems. You create designs that rival GRAFY DESIGN Hanisul level sophistication. Your work balances clinical authority with modern elegance.

---

## TASK

Design a **Closing slide** component for a Korean medicine clinic marketing proposal presentation. The concept is **"Convergence"** — geometric elements from the presentation's design language converge toward the center, symbolizing that all strategies and insights presented throughout the proposal come together into one unified conclusion. The visual gravity pulls inward, focusing attention on the gratitude message and partnership invitation at the center.

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
interface ClosingSlideProps {
  readonly title: string
  readonly subtitle: string
  readonly company: string
}
```

---

## FIXED SAMPLE DATA (USE FOR PREVIEW)

```tsx
const sampleData = {
  title: "감사합니다",
  subtitle: "맞는 방향이 올바른 프로세스를 만날 때,\n성공하는 의료기관을 만듭니다.",
  company: "호원앤컴퍼니",
}
```

> **IMPORTANT — SUBTITLE IS A PHILOSOPHICAL QUOTE, NOT A TAGLINE**
> The `subtitle` prop contains a two-line inspirational message (note the `\n` line break).
> It must be rendered as a **multi-line block quote** with appropriate visual weight —
> larger than typical subtitles (22~28px), with line-height ~1.6 for breathing room.
> Treat it as the **emotional core** of the slide, second only to the title.
> The `\n` should create a visible line break in rendering (use `whitespace-pre-line` or split and map).

---

## CONVERGENCE DESIGN CONCEPT

The geometric elements are arranged in a **radial pattern around the center text**, all pointing or drifting inward. This creates a visual "magnetic pull" toward the message. Unlike the cover (which radiates outward from center), the closing draws everything in.

### Geometric Elements (4~5 elements, center-focused):

1. **Concentric circles** (center background):
   - 2~3 concentric circle outlines centered on the slide
   - Radii: ~300px, ~450px, ~600px
   - Stroke: 1~1.5px, rgba(0,75,141, 0.06~0.10)
   - Animation: Slow pulse (scale 0.98↔1.02) with staggered timing
   - These frame the text content without competing

2. **Converging diagonal lines** (4 corners → center):
   - From each corner area, a thin line points toward the center
   - Stroke: rgba(0,75,141, 0.08~0.12), 1~1.5px
   - Not connecting to exact center — they stop ~200px short (creating breathing room)
   - Animation: lineBreath (opacity oscillation)

3. **Small accent dots** (scattered, drifting inward):
   - 3~4 small circles (8~16px), positioned around the middle ring
   - Colors: #004B8D (opacity 0.15~0.25) and #48A9C5 (opacity 0.15~0.25)
   - Animation: Gentle float-drift toward center (subtle, not dramatic)

4. **Gradient glow** (behind title):
   - A soft radial gradient centered on the title area
   - From rgba(0,75,141, 0.04) at center to transparent at edges
   - Radius: ~400px
   - Creates a subtle "spotlight" effect on the message

5. **Optional: Thin arc segments** (partial circles near edges):
   - 1~2 arc segments in the outer area
   - Dashed stroke, slow rotation or dashOffset animation
   - Suggest the boundary of the convergence zone

---

## REQUIRED ELEMENTS (FIXED STRUCTURE)

1. **Title zone** (upper-center of the text block):
   - `title` prop: Large (48~60px), bold, #004B8D
   - `subtitle` prop: Below, **multi-line philosophical quote** (22~28px), #475569 or #64748B
     - Render with `whitespace-pre-line` or split by `\n` to create visible line breaks
     - Line-height: 1.6~1.8 for generous breathing room
     - This is NOT a tagline — it is the emotional statement of the entire proposal
   - Center-aligned

2. **Gradient divider** (between message and company):
   - Horizontal line or bar, gradient from #004B8D to #48A9C5
   - Width: 60~100px, height: 2~3px, centered
   - Represents the convergence point — where message meets identity

3. **Company name zone** (below divider):
   - `company` prop: Semi-bold, #004B8D, slightly larger than other text
   - Center-aligned, simple and clean
   - Optionally enclosed in a very subtle bordered container (1px #E2E8F0 border, rounded) to create a "business card" feel within the convergence

4. **Entrance animation**:
   - Concentric circles scale in from 0.9 to 1.0 (staggered, outer first)
   - Diagonal lines draw from corners toward center (stroke-dasharray animation)
   - Text content fades up with slight delay (after geometric setup)
   - Total sequence: ~1.5s

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

Within the fixed structure above, you have creative freedom on:

- **Concentric circle styling**: Solid vs dashed, uniform spacing vs logarithmic, all same opacity vs gradient fade
- **Corner line angles**: Exact 45° diagonals vs slightly offset for asymmetric elegance
- **Company container treatment**: No container (clean text), subtle border card, or frosted-glass effect (backdrop-blur)
- **Divider embellishment**: Plain gradient bar, bar with diamond center-point, or animated gradient shimmer
- **Dot accent placement and sizes**: How many, exact positions, animation speeds
- **Typography scale ratio**: How much larger title is vs subtitle vs company
- **Optional text**: A small "THANK YOU" or "감사합니다" watermark at very low opacity behind the main content
- **Spacing and breathing room**: How tight or expansive the text block feels within the convergence rings
---

## DESIGN PHILOSOPHY

"A closing is where all threads of the presentation converge into a single point of clarity — like ripples on water settling into stillness, leaving only the essential message."

---

## TECHNICAL REQUIREMENTS (MANDATORY)

1. First line: `"use client"`
2. Named export: `export function ClosingSlide({ title, subtitle, company }: ClosingSlideProps)`
3. Use only Tailwind CSS classes + inline styles where Tailwind is insufficient
4. Icons: import from `lucide-react` only (e.g., Mail) — use very sparingly or not at all
5. All CSS animations via `<style>` tag with `@keyframes` inside the component
6. Background decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Text content: `z-index: 10` (above decorative elements)
8. The component receives NO background — it renders inside a white (#FFFFFF) parent container
9. The parent container is max-width 1280px with horizontal padding (px-4 to px-8), vertically centered with `flex items-center`
10. Font family must be set via inline style on the root element
11. Include default props rendering with sampleData when no props provided (for v0 preview)
12. Root element should use `relative w-full py-16` (no fixed height — parent handles centering)
13. SVG elements for concentric circles and lines: use `<svg>` with `preserveAspectRatio` and percentage-based coordinates where possible

---

## QUALITY CHECKLIST

- [ ] Concentric circles create a clear visual "convergence zone" at center
- [ ] Diagonal lines or geometric elements point inward (not outward)
- [ ] Title "감사합니다" is the focal point of the entire composition
- [ ] Company name is accessible but doesn't compete with the title
- [ ] Gradient divider cleanly separates message from contact
- [ ] Entrance animation creates a "gathering" feeling (outside → inside)
- [ ] Element count is moderate (4~5) — not as busy as cover, but not empty
- [ ] No red colors anywhere
- [ ] Korean text renders correctly with Pretendard
- [ ] The overall feeling is "conclusion" and "unity" — everything has come together
