# DividerSlide — Plan A: "Deep Stage"
# 영화적 무대 — 어두운 navy 위에 빛나는 ACT 타이틀

---

## ROLE & CONTEXT

You are a 30-year veteran UI designer specializing in premium medical presentation systems.
You create designs that rival GRAFY DESIGN Hanisul level sophistication.

This is an **ACT DIVIDER** slide — a chapter title page that marks the beginning
of each major section. It appears **6 times** in a 49-slide medical proposal presentation.
Think of it as the "Part 1", "Part 2" chapter pages in a premium annual report.

**DESIGN SYSTEM CONTEXT**: This presentation has TwoColumnSlide ("Elevated Panels")
and CardsSlide ("Frosted Panels") — both using rounded cards, subtle shadows,
and smooth rise-into-place animations on **light backgrounds**.
The DividerSlide should create **dramatic contrast** — a dark, cinematic pause
between light content slides.

---

## DESIGN CONCEPT: "Deep Stage"

**Philosophy**: "Silence before the next movement."

Like a theater stage going dark between acts, this slide creates a moment of
dramatic pause. Deep navy background (#004B8D) fills the entire canvas.
A massive, barely-visible act number (280px+) serves as an architectural
watermark behind the content. The title emerges in bright white, commanding
attention through contrast and scale.

The effect is cinematic — like a film's chapter title card or a TED Talk
stage transition. The darkness feels intentional and authoritative,
not empty. Subtle light rays and glowing geometric elements create depth
without clutter.

**Visual Reference**: TED Talk stage transitions, Bloomberg Businessweek
chapter openers, Apple Keynote dark slides, Netflix title sequences.

**Key Traits**:
- Full dark navy background (#004B8D) — entire 960×540 canvas
- Giant act number as architectural watermark (280px, ~3-5% opacity white)
- "ACT N" label: small, tracked, secondary color (#48A9C5)
- Title: large white text, the hero element
- Subtitle: lighter, secondary color, refined tracking
- Subtle gradient bar below (secondary→accent)
- 배경 장식: faint light rays or glowing circles, never distracting

---

## CANVAS (FROZEN)

```
Width:  960px (fixed)
Height: 540px (fixed)
Aspect: 16:9
Safe Zone: x 4%~96% (38px~922px), y 4%~90% (22px~486px)
```

---

## MANDATORY DESIGN TOKENS (FROZEN — DO NOT MODIFY)

```
Colors (use these EXACT values):
  primary:        #004B8D   (Ocean Blue Deep — BACKGROUND for this slide)
  primaryLight:   #1A5F7A   (Ocean Blue)
  secondary:      #48A9C5   (Teal Bright — ACT label, subtitle)
  secondaryLight: #57A0A0   (Teal Green)
  accent:         #9DC5BB   (Soft Mint)
  accentLight:    #B8D8D0   (Mint Light)
  bgWhite:        #FAFBFC   (NOT used as bg here)
  bgCream:        #F5F0EB   (Warm Cream)
  bgMist:         #EEF4F8   (Cool Mist)
  textPrimary:    #1A1A2E   (NOT used here — dark bg slide)
  textSecondary:  #4A5568   (NOT used here)
  textMuted:      #94A3B8   (Muted Gray — can use for very subtle elements)
  borderLight:    #E2E8F0   (Light Border)
  white:          #FFFFFF   (PRIMARY text color on this dark slide)

Typography:
  fontFamily: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif

ABSOLUTE PROHIBITION:
  ❌ No red colors (#DC2626, #EF4444, #B91C1C, etc.) — medical context
  ❌ No external component imports (no shadcn/ui, no lucide-react)
  ❌ No external CSS files — Tailwind + inline only
  ❌ No responsive breakpoints — fixed 960×540 canvas
```

---

## FIXED TYPE CONTRACT (FROZEN)

```tsx
interface DividerSlideProps {
  readonly act: number        // 1~6
  readonly title: string      // 한글 제목 (e.g., "해결책 1: 마케팅 전략")
  readonly subtitle: string   // 영문 부제 (e.g., "Marketing Strategy")
}
```

---

## SAMPLE DATA FOR PREVIEW (FROZEN)

```tsx
const sampleData: DividerSlideProps = {
  act: 4,
  title: "해결책 1: 마케팅 전략",
  subtitle: "Marketing Strategy",
}
```

Include this as a default preview inside the component file.
The component must also work correctly with ALL 6 data sets:

| act | title | subtitle |
|:---:|-------|----------|
| 1 | 상황 | Situation |
| 2 | 위기 | Crisis |
| 3 | 전환점 | Turning Point |
| 4 | 해결책 1: 마케팅 전략 | Marketing Strategy |
| 5 | 해결책 2: AI CRM | AI CRM |
| 6 | 요약 및 Next Step | Summary & Next Step |

**Stress test**: act=4 has the longest Korean title (11 chars + colon + space).
act=6 has the longest combined title. Short titles (act=1 "상황") must not look empty.

---

## PLAN A — LAYOUT SPECIFICATION

### Zone A: Background (Full Canvas)
- `backgroundColor: "#004B8D"` (primary) — fills entire 960×540
- This creates the "deep stage" effect

### Zone B: Watermark Number (Architectural)
- The `act` number rendered at massive scale
- Size: 280px~320px, font-weight: 900
- Color: `rgba(255, 255, 255, 0.04)` — barely visible, architectural
- Position: centered or slightly offset right
- This is purely decorative — `pointer-events: none`

### Zone C: Content Cluster (Center)
- Vertically and horizontally centered in the canvas
- Stack (top to bottom):
  1. **ACT Label**: "ACT 4" — small caps, tracked, `#48A9C5`
  2. **Title**: "해결책 1: 마케팅 전략" — large, bold, `#FFFFFF`
  3. **Subtitle**: "Marketing Strategy" — lighter, tracked, `#48A9C5` or `rgba(255,255,255,0.6)`
  4. **Gradient Bar**: thin horizontal line, `#48A9C5` → `#9DC5BB`

### Zone D: Geometric Decorations (5 max)
- All: `position: absolute`, `pointer-events: none`, `z-index: 0`
- Content cluster: `z-index: 10`

---

## PLAN A — GEOMETRIC ELEMENTS (5 max)

All elements use light/white tones on the dark background:

1. **Large soft glow** (top-right):
   - 300px diameter, radial-gradient
   - Center: `rgba(72, 169, 197, 0.06)`, Edge: transparent
   - Position: top -10%, right -8%
   - Static

2. **Small soft glow** (bottom-left):
   - 200px diameter, radial-gradient
   - Center: `rgba(157, 197, 187, 0.05)`, Edge: transparent
   - Position: bottom -8%, left -6%
   - Static

3. **Thin light ray** (diagonal, top-left to center):
   - 1px width, 200px length, `rgba(255, 255, 255, 0.04)`
   - Rotated 35deg
   - Position: top 10%, left 5%
   - Static

4. **Small outlined circle** (bottom-right area):
   - 60px diameter, 1px stroke, `rgba(255, 255, 255, 0.06)`
   - No fill
   - Position: bottom 12%, right 8%
   - Static

5. **Tiny dot** (top-left):
   - 6px, `rgba(72, 169, 197, 0.15)`
   - Slow pulse (opacity 0.10→0.20, 8s)
   - Position: top 8%, left 12%

---

## ENTRANCE ANIMATION

Cinematic and deliberate — slower than content slides:

1. Background: instant (no animation — the darkness is already there)
2. Watermark number: fade-in 0.8s, opacity 0→0.04
3. ACT label: fade-in 0.5s, delay 0.3s
4. Title: fade-in + translateY(12px→0) 0.6s ease-out, delay 0.4s
5. Subtitle: fade-in 0.5s, delay 0.6s
6. Gradient bar: scaleX(0→1) 0.5s ease-out, delay 0.7s, transform-origin: left

---

## CREATIVE FREEDOM (V0 DECIDES)

| Area | Freedom Range |
|------|---------------|
| Watermark number opacity | 3% vs 4% vs 5% |
| Watermark number position | Dead center vs offset right 10% vs offset left 5% |
| Title font size | text-4xl vs text-5xl vs custom 42px |
| Title font weight | font-bold vs font-extrabold |
| Subtitle color | #48A9C5 vs rgba(255,255,255,0.6) vs rgba(255,255,255,0.5) |
| Subtitle tracking | tracking-wide vs tracking-[0.15em] vs tracking-[0.2em] |
| ACT label size | text-xs vs text-sm |
| ACT label tracking | 0.3em vs 0.4em vs 0.5em |
| Gradient bar width | 48px vs 64px vs 80px |
| Gradient bar thickness | 1px vs 2px vs 3px |
| Content cluster vertical position | Exact center vs slightly above center |
| Gap between ACT label and title | 8px vs 12px vs 16px |
| Gap between title and subtitle | 6px vs 10px vs 14px |
| Geometric glow softness | 40px vs 60px vs 80px blur |
| Whether subtitle is uppercase | Yes vs No |

---

## TECHNICAL REQUIREMENTS (MANDATORY — ALL 12 ITEMS)

1. First line: `"use client"`
2. Named export: `export function DividerSlide({ act, title, subtitle }: DividerSlideProps)`
3. Tailwind CSS + inline styles only — NO external imports
4. All animations via `<style>` tag with `@keyframes` inside the component
5. Decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
6. Content cluster: `position: relative`, `z-index: 10`
7. Root div: `relative w-full overflow-hidden` with `backgroundColor` and `fontFamily` as inline style
8. Include `sampleData` for v0 preview (act=4)
9. No red colors anywhere in the entire file
10. Korean text "해결책 1: 마케팅 전략" must render correctly
11. Component must work for act values 1 through 6
12. Single-character titles like "상황" must not look empty or lost

---

## QUALITY CHECKLIST

- [ ] Dark background creates dramatic contrast with preceding/following light slides
- [ ] Watermark number is architectural — visible but never distracting
- [ ] Title is the undisputed hero — immediately readable white on navy
- [ ] Short titles ("상황", "위기") feel intentional, not empty
- [ ] Long titles ("해결책 1: 마케팅 전략") fit comfortably without wrapping awkwardly
- [ ] Subtitle adds refinement without competing with title
- [ ] Gradient bar provides visual closure to the content cluster
- [ ] All 5 geometric elements are subtle — enhance depth, never distract
- [ ] Animation feels cinematic — deliberate, not bouncy
- [ ] No red colors anywhere
- [ ] Total lines: 150~250 (comparable to other v0-designed slides)
