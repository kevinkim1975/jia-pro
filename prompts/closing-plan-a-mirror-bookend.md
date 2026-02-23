# ClosingSlide — Plan A: Mirror Bookend

You are a 30-year veteran UI designer specializing in premium medical presentation systems. You create designs that rival GRAFY DESIGN Hanisul level sophistication. Your work balances clinical authority with modern elegance.

---

## TASK

Design a **Closing slide** component for a Korean medicine clinic marketing proposal presentation. This is the **final slide** — the mirror image of the cover slide. It uses the **same geometric design language as the cover** (gradient circles, outlined circles, diagonal lines, diamonds, dotted arcs, horizontal lines, gradient rectangles) but **reflected/inverted in position**, creating a visual "bookend" effect. The message is gratitude and partnership invitation.

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
  readonly contact: {
    readonly email: string
    readonly person: string
  }
  readonly company: string
}
```

---

## FIXED SAMPLE DATA (USE FOR PREVIEW)

```tsx
const sampleData = {
  title: "감사합니다",
  subtitle: "맞는 방향이 올바른 프로세스를 만날 때,\n성공하는 의료기관을 만듭니다.",
  contact: {
    email: "contact@howon.co.kr",
    person: "대표 컨설턴트",
  },
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

## COVER SLIDE GEOMETRIC ELEMENTS (REFERENCE — Mirror these)

The cover slide uses these 9 geometric elements. Your closing slide should use the **same element types** but with **mirrored/inverted positions** (top-right → bottom-left, left → right, etc.):

```
Cover Element 1: Large gradient circle — top: -12%, right: -8%, 550px
  → Closing: bottom-left area, similar size
Cover Element 2: Outlined circle — bottom: -6%, left: -3%, 400px  
  → Closing: top-right area
Cover Element 3: Small solid circle (#48A9C5) — top: 20%, left: 12%, 16px
  → Closing: bottom: ~20%, right: ~12%
Cover Element 4: Diagonal line — top-left to center
  → Closing: bottom-right to center
Cover Element 5: Diagonal line — bottom-right to center
  → Closing: top-left to center  
Cover Element 6: Small diamond (rotate 45deg) — top: 35%, right: 18%, 28px
  → Closing: bottom: ~35%, left: ~18%
Cover Element 7: Dotted arc — right: 5%, vertically centered, 240px
  → Closing: left side
Cover Element 8: Horizontal thin line (#48A9C5/0.3) — left: 8%, top: 65%, 120px
  → Closing: right side, bottom area
Cover Element 9: Gradient rectangle — bottom: 15%, right: 20%, 120×72px
  → Closing: top area, left side
```

Use the **same opacity ranges, stroke widths, and color values** as the cover. The animations should also mirror — use the same keyframe names but consider reversed drift directions.

---

## REQUIRED ELEMENTS (FIXED STRUCTURE)

1. **Main title area** (center of slide):
   - `title` prop: Large, prominent (48~64px), font-weight 700, primary color (#004B8D)
   - `subtitle` prop: Below title, **multi-line philosophical quote** (22~28px), #475569 or #64748B
     - Render with `whitespace-pre-line` or split by `\n` to create visible line breaks
     - Line-height: 1.6~1.8 for generous breathing room
     - This is NOT a tagline — it is the emotional statement of the entire proposal
   - Decorative divider between subtitle and contact section (matching cover's diamond+line divider)

2. **Contact information block** (below divider):
   - `company` prop: Company name, semi-bold, #004B8D
   - `contact.person` prop: Person name/title, neutral gray
   - `contact.email` prop: Email, #48A9C5 color, subtle hover underline
   - Compact vertical stack, generous spacing between each line

3. **"PROPOSAL" label** (bottom area):
   - Uppercase, letter-spacing 0.3~0.4em, #CBD5E1
   - Same treatment as cover's bottom label

4. **Geometric decorative elements** (7~9 elements, mirrored from cover):
   - All elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
   - Same animation types as cover (floatDrift, pulse, spinSlow, dashOffset, lineBreath, lineSlide)

5. **Entrance animation**:
   - Content fades up (slideUp, same as cover)
   - Geometric elements fade in with staggered timing

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

Within the fixed structure above, you have creative freedom on:

- **Title typography weight**: Extra bold vs medium weight, letter-spacing choices
- **Divider design**: Cover uses diamond+lines — you may vary the closing divider (e.g., longer gradient bar, double line, or subtle flourish) while keeping the same design DNA
- **Contact block layout**: Vertical stack, horizontal row, or card-like container with subtle border
- **Spacing proportions**: How much space between title/subtitle/divider/contact — the vertical rhythm
- **Geometric element animation timing**: Stagger delays, drift speeds, breath cycles
- **Optional additions**: A very subtle "Thank you" watermark in English (opacity 0.03~0.05), or additional micro-detail that says "this is the closing"

---

## DESIGN PHILOSOPHY

"A closing slide is the cover's reflection in still water — the same elements, rearranged with quiet confidence, leaving the audience with a sense of completeness."

---

## TECHNICAL REQUIREMENTS (MANDATORY)

1. First line: `"use client"`
2. Named export: `export function ClosingSlide({ title, subtitle, contact, company }: ClosingSlideProps)`
3. Use only Tailwind CSS classes + inline styles where Tailwind is insufficient
4. Icons: import from `lucide-react` only (e.g., Mail, Phone) — use sparingly
5. All CSS animations via `<style>` tag with `@keyframes` inside the component
6. Background decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Text content: `z-index: 10` (above decorative elements)
8. The component receives NO background — it renders inside a white (#FFFFFF) parent container
9. The parent container is max-width 1280px with horizontal padding (px-4 to px-8), vertically centered with `flex items-center`
10. Font family must be set via inline style on the root element
11. Include default props rendering with sampleData when no props provided (for v0 preview)
12. Root element should use `relative w-full py-16` (no fixed height — parent handles centering)

---

## QUALITY CHECKLIST

- [ ] Geometric elements clearly mirror the cover's positions (left↔right, top↔bottom)
- [ ] Same animation types and opacity ranges as cover
- [ ] Title "감사합니다" is the dominant visual element
- [ ] Contact information is readable but secondary to the title
- [ ] Decorative divider separates message zone from contact zone
- [ ] "PROPOSAL" label anchors the bottom
- [ ] No red colors anywhere
- [ ] Korean text renders correctly with Pretendard
- [ ] Entrance animation is smooth (content slides up, elements fade in)
- [ ] The slide feels like a natural "pair" with the cover — opening and closing of the same book
