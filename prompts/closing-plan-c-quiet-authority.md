# ClosingSlide — Plan C: Quiet Authority

You are a 30-year veteran UI designer specializing in premium medical presentation systems. You create designs that rival GRAFY DESIGN Hanisul level sophistication. Your work balances clinical authority with modern elegance.

---

## TASK

Design a **Closing slide** component for a Korean medicine clinic marketing proposal presentation. The concept is **"Quiet Authority"** — maximum restraint, maximum impact. Where the cover was visually rich with 9 geometric elements, the closing strips everything back to essentials: typography, a single accent line, and vast white space. The contrast between the cover's visual abundance and the closing's deliberate emptiness creates a powerful "the work speaks for itself" statement. This is the design equivalent of a firm, confident handshake.

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
> larger than typical subtitles (20~24px), with line-height ~1.6 for breathing room.
> Treat it as the **emotional core** of the slide, second only to the title.
> The `\n` should create a visible line break in rendering (use `whitespace-pre-line` or split and map).
> In this minimalist layout, the quote carries even MORE weight because there's nothing else competing.

---

## QUIET AUTHORITY DESIGN CONCEPT

This slide is **intentionally sparse**. The visual weight comes from typography scale, precise alignment, and generous negative space — not from decorative elements. Only 2~3 geometric accents exist, and they are tucked into corners far from the text, serving as quiet reminders of the presentation's design language without competing for attention.

### Layout: Asymmetric Split

The slide is NOT center-aligned like typical closing slides. Instead, it uses an **asymmetric left-aligned layout** that creates sophisticated tension:

- **Left 60~65%**: Title and subtitle, left-aligned
- **Right 35~40%**: Intentional empty space (the "breath")
- **Bottom-right corner**: Company name, right-aligned — creating a diagonal reading path from top-left title to bottom-right company

This asymmetry echoes premium architectural firm presentations and luxury brand closings.

### Geometric Elements (2~3 only, peripheral):

1. **Single vertical accent line** (left edge):
   - Position: left ~3~5% of width, spanning ~40% of height
   - Stroke: 2px, gradient from #004B8D (top) to #48A9C5 (bottom)
   - This is the ONLY bold geometric element — it anchors the left-aligned text
   - Animation: Draws downward on entrance (stroke-dasharray)

2. **Small diamond** (bottom-right corner area):
   - Position: bottom ~10%, right ~8%, 20~24px
   - Stroke only (no fill), 1.5px, rgba(0,75,141, 0.20)
   - Rotate 45deg, very slow spin (20s+ cycle)
   - A quiet callback to the cover's diamond element

3. **Subtle gradient blur** (top-right corner):
   - A very faint radial gradient, rgba(72,169,197, 0.03~0.04)
   - Large (300~400px), heavily blurred
   - Static or barely drifting — almost imperceptible
   - Prevents the right side from feeling completely dead

**That's it. No more elements.** The restraint IS the design.

---

## REQUIRED ELEMENTS (FIXED STRUCTURE)

1. **Title block** (left-aligned, upper portion):
   - `title` prop: Large (52~68px), font-weight 700, #004B8D
   - Letter-spacing: -0.02em (tight, confident)
   - `subtitle` prop: Below title, **multi-line philosophical quote** (20~24px), font-weight 400, #475569 or #64748B
     - Render with `whitespace-pre-line` or split by `\n` to create visible line breaks
     - Line-height: 1.6~1.8 for breathing room
     - This is the emotional anchor — in this minimal layout it carries enormous weight
   - margin-top between title and subtitle: 16~24px

2. **Horizontal accent rule** (between message and company):
   - A single thin line (1px) from the left edge of text to ~30% width
   - Color: gradient from #004B8D to transparent
   - margin-top: 32~48px below subtitle
   - This is the only horizontal divider — no bars, no diamonds, just a line fading to nothing

3. **Company block** (bottom-right, right-aligned):
   - `company` prop: font-weight 600, #004B8D, 18~20px
   - Position: absolute or flexbox-pushed to bottom-right area
   - This creates the diagonal reading flow: top-left title → bottom-right company

4. **Entrance animation** (extremely subtle):
   - Vertical accent line draws downward (0.8s, ease-out)
   - Title fades in (opacity 0→1, 0.6s, delay 0.2s)
   - Subtitle fades in (0.6s, delay 0.4s)
   - Company block fades in (0.6s, delay 0.6s)
   - NO translateY movement — elements appear in place, no sliding
   - The stillness of the animation matches the stillness of the design

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

Within the fixed structure above, you have creative freedom on:

- **Title size within range**: 52px vs 60px vs 68px — how dominant should it feel
- **Vertical accent line details**: Exact height, exact position, whether it has rounded caps, whether it fades at endpoints
- **Asymmetry ratio**: Exactly how far left the text sits (60/40 vs 65/35 vs 70/30)
- **Company block separation**: How far from the title block — close (intimate) vs far (formal)
- **Horizontal rule styling**: Pure fade-to-transparent, or with a tiny dot at the start/end
- **Typography refinements**: Title letter-spacing, subtitle line-height, company text sizing
- **Optional "PROPOSAL" label**: A small tracking-widest label at the very bottom (like the cover has) — include only if it improves the composition; omit if it clutters the minimalism
- **The exact shade of emptiness**: Whether the right side has zero elements, or one barely-there accent

---

## DESIGN PHILOSOPHY

"True authority doesn't announce itself. The closing slide earns attention through what it chooses NOT to show — like a master calligrapher who leaves most of the paper untouched."

---

## TECHNICAL REQUIREMENTS (MANDATORY)

1. First line: `"use client"`
2. Named export: `export function ClosingSlide({ title, subtitle, company }: ClosingSlideProps)`
3. Use only Tailwind CSS classes + inline styles where Tailwind is insufficient
4. Icons: **NONE** — this design relies entirely on typography and geometry
5. All CSS animations via `<style>` tag with `@keyframes` inside the component
6. Background decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Text content: `z-index: 10` (above decorative elements)
8. The component receives NO background — it renders inside a white (#FFFFFF) parent container
9. The parent container is max-width 1280px with horizontal padding (px-4 to px-8), vertically centered with `flex items-center`
10. Font family must be set via inline style on the root element
11. Include default props rendering with sampleData when no props provided (for v0 preview)
12. Root element should use `relative w-full py-16` (no fixed height — parent handles centering)
13. The component should look intentionally minimal — not "unfinished". Every pixel of empty space should feel deliberate.

---

## QUALITY CHECKLIST

- [ ] Maximum 2~3 geometric elements — restraint is the point
- [ ] Asymmetric layout creates sophisticated diagonal reading flow
- [ ] Title "감사합니다" dominates through size and weight, not through decoration
- [ ] Company name is clearly positioned but secondary
- [ ] Vertical accent line is the single strong geometric statement
- [ ] White space feels intentional and confident, not empty
- [ ] Entrance animation is fade-only (no sliding/bouncing) — stillness
- [ ] The slide would look at home in an architecture firm portfolio or luxury brand deck
- [ ] No red colors anywhere
- [ ] Korean text renders correctly with Pretendard
- [ ] Stark contrast with the cover's visual richness — this is clearly a "different chapter" of the same book
