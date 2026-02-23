# DividerSlide — Plan C: "Ink & Stone"
# 한국 전통 인장 미학 — 동심원과 먹번짐이 만드는 한의학 정체성

---

## ROLE & CONTEXT

You are a 30-year veteran UI designer specializing in premium medical presentation systems.
You create designs that rival GRAFY DESIGN Hanisul level sophistication.

This is an **ACT DIVIDER** slide — a chapter title page that appears **6 times**
in a 49-slide medical proposal for a Korean Medicine Clinic (한의원).

**DESIGN SYSTEM CONTEXT**: TwoColumnSlide ("Elevated Panels") and CardsSlide
("Frosted Panels") use modern Western design language. The DividerSlide has an
opportunity to subtly reference the clinic's Korean Medicine identity through
abstract, contemporary interpretations of traditional Korean aesthetics.

---

## DESIGN CONCEPT: "Ink & Stone"

**Philosophy**: "Tradition speaks through restraint."

This design uses a subtle diagonal gradient background (from primary to a darker shade)
with a central composition anchored by concentric circle rings — an abstract
reference to traditional Korean seal stamps (인장/도장) and ripples in still water.

The act number sits inside the innermost circle. The title and subtitle
emerge below the circular composition. An SVG ink-bleeding effect
(achieved through feGaussianBlur + stroke-only paths) adds organic warmth
to the otherwise geometric composition.

This isn't literal traditional design — it's a modern, restrained interpretation
that adds a layer of cultural meaning. The circles reference 원(圓),
symbolizing completeness and harmony (음양의 조화).

**Visual Reference**: Sulwhasoo packaging, Amorepacific brand design,
National Museum of Korea exhibition graphics, Muji × traditional craft.

**Key Traits**:
- Diagonal gradient background: #004B8D → slightly darker navy
- Central concentric circles (3 rings) — abstract 인장 reference
- Act number inside innermost circle, white
- Title below circles, white, prominent
- Subtitle below title, secondary color
- SVG paths with feGaussianBlur for organic "ink bleed" texture on circles
- Overall feel: contemplative, authoritative, culturally rooted

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
  primary:        #004B8D   (Ocean Blue Deep — gradient start)
  primaryLight:   #1A5F7A   (Ocean Blue)
  secondary:      #48A9C5   (Teal Bright — subtitle, accent rings)
  secondaryLight: #57A0A0   (Teal Green)
  accent:         #9DC5BB   (Soft Mint — outermost ring)
  accentLight:    #B8D8D0   (Mint Light)
  bgWhite:        #FAFBFC
  bgCream:        #F5F0EB
  bgMist:         #EEF4F8
  textPrimary:    #1A1A2E
  textSecondary:  #4A5568
  textMuted:      #94A3B8
  borderLight:    #E2E8F0
  white:          #FFFFFF   (title, number)

Typography:
  fontFamily: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif

ABSOLUTE PROHIBITION:
  ❌ No red colors — medical context
  ❌ No external imports
  ❌ No external CSS files
  ❌ No responsive breakpoints
```

---

## FIXED TYPE CONTRACT (FROZEN)

```tsx
interface DividerSlideProps {
  readonly act: number        // 1~6
  readonly title: string      // 한글 제목
  readonly subtitle: string   // 영문 부제
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

All 6 must work:
| act | title | subtitle |
|:---:|-------|----------|
| 1 | 상황 | Situation |
| 2 | 위기 | Crisis |
| 3 | 전환점 | Turning Point |
| 4 | 해결책 1: 마케팅 전략 | Marketing Strategy |
| 5 | 해결책 2: AI CRM | AI CRM |
| 6 | 요약 및 Next Step | Summary & Next Step |

---

## PLAN C — LAYOUT SPECIFICATION

### Background
- Full canvas gradient: `linear-gradient(135deg, #004B8D 0%, #003366 100%)`
  (diagonal, top-left to bottom-right, primary to darker navy)
- The gradient is subtle — not a dramatic color shift, just depth

### Central Composition (Circle Group)
- 3 concentric circles, centered horizontally, positioned in upper-center area
- **Outer ring**: 220px diameter, 1px stroke, `rgba(157, 197, 187, 0.12)` (accent)
  - SVG `<circle>` with `stroke-dasharray` for subtle dashed effect
- **Middle ring**: 160px diameter, 1.5px stroke, `rgba(72, 169, 197, 0.15)` (secondary)
  - SVG `<circle>` with subtle `feGaussianBlur` filter (stdDeviation: 0.5) for ink-bleed
- **Inner ring**: 100px diameter, 1.5px stroke, `rgba(255, 255, 255, 0.12)`
  - Clean circle, no blur
- All rings: no fill, stroke only, `stroke-linecap: round`

### Act Number (Inside Inner Ring)
- Centered inside the innermost circle
- Size: text-4xl to text-5xl (36px~48px), font-weight 700
- Color: `rgba(255, 255, 255, 0.85)`
- The number and circle together form the "seal" motif

### Text Stack (Below Circles)
- Positioned below the circle group, centered
- Gap: 32px~48px from the outer ring's bottom edge
- Stack:
  1. **ACT Label**: "ACT 4" — text-xs, tracked 0.3em+, `#48A9C5`
  2. **Title**: "해결책 1: 마케팅 전략" — text-3xl~4xl, bold, white
  3. **Subtitle**: "Marketing Strategy" — text-sm~base, tracked, `rgba(72, 169, 197, 0.8)`
  4. **Accent dots**: 3 small dots in a row (4px each, `rgba(157, 197, 187, 0.3)`)

---

## PLAN C — SVG SPECIFICATION

The concentric circles and ink-bleed effect MUST be implemented as inline SVG:

```svg
<svg width="240" height="240" viewBox="0 0 240 240" style="position:absolute; ...">
  <defs>
    <filter id="inkBleed">
      <feGaussianBlur stdDeviation="0.5" />
    </filter>
  </defs>
  <!-- Outer ring (accent, dashed) -->
  <circle cx="120" cy="120" r="110" fill="none"
    stroke="rgba(157,197,187,0.12)" stroke-width="1"
    stroke-dasharray="8 6" />
  <!-- Middle ring (secondary, ink-bleed) -->
  <circle cx="120" cy="120" r="80" fill="none"
    stroke="rgba(72,169,197,0.15)" stroke-width="1.5"
    filter="url(#inkBleed)" stroke-linecap="round" />
  <!-- Inner ring (white, clean) -->
  <circle cx="120" cy="120" r="50" fill="none"
    stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
</svg>
```

This is a **guide** — v0 may adjust exact radii, positions, and opacity
within the creative freedom ranges below. The key is: 3 concentric rings,
stroke-only, outermost dashed, middle with ink-bleed blur.

---

## PLAN C — GEOMETRIC ELEMENTS (5 max, including the circle group)

The circle group counts as 1 element (it's a single SVG):

1. **Concentric circle group** (center-upper): described above

2. **Faint ink stroke** (top-left):
   - SVG path, curved, 1px, `rgba(255, 255, 255, 0.03)`
   - With `feGaussianBlur` stdDeviation 1 — looks like a faded brush stroke
   - ~150px long, gentle S-curve
   - Position: top 5%, left 3%

3. **Small dot** (bottom-right):
   - 6px, `rgba(72, 169, 197, 0.15)`
   - Slow pulse (opacity 0.10→0.20, 8s)
   - Position: bottom 8%, right 10%

4. **Horizontal line fragment** (below text):
   - 60px, 1px, `rgba(255, 255, 255, 0.05)`
   - Position: below the accent dots, centered

5. **Tiny ring** (top-right):
   - 30px, 1px stroke, `rgba(157, 197, 187, 0.08)`, no fill
   - Position: top 10%, right 12%

---

## ENTRANCE ANIMATION

Contemplative — like ink settling on paper:

1. Background gradient: instant
2. Outer ring: fade-in + scale(1.05→1) 0.6s ease-out, delay 0.1s
3. Middle ring: fade-in + scale(1.03→1) 0.5s ease-out, delay 0.25s
4. Inner ring: fade-in 0.4s, delay 0.35s
5. Act number: fade-in 0.4s, delay 0.4s
6. ACT label: fade-in 0.3s, delay 0.5s
7. Title: fade-in + translateY(8px→0) 0.5s ease-out, delay 0.55s
8. Subtitle: fade-in 0.4s, delay 0.65s
9. Accent dots: fade-in 0.3s, delay 0.75s

**Key**: Rings expand slightly inward (from outer to inner), then text reveals.
Like ripples converging to center, then meaning emerging.

---

## CREATIVE FREEDOM (V0 DECIDES)

| Area | Freedom Range |
|------|---------------|
| Background gradient darkness | #003366 vs #002D5A vs #003D7A |
| Gradient angle | 135deg vs 150deg vs 120deg |
| Circle group vertical position | 35% from top vs 40% vs 45% |
| Outer ring diameter | 200px vs 220px vs 240px |
| Ring spacing ratios | Even vs tighter inner |
| Ink-bleed blur intensity | stdDeviation 0.3 vs 0.5 vs 0.8 |
| Outer ring dash pattern | "8 6" vs "6 4" vs "10 8" |
| Act number size | 36px vs 42px vs 48px |
| Title size | text-3xl vs text-4xl |
| Gap between circles and text | 32px vs 40px vs 48px |
| Accent dots size | 3px vs 4px vs 5px |
| Accent dots spacing | 8px vs 12px vs 16px |
| Whether subtitle is uppercase | Yes vs No |
| Ink stroke curve shape | Gentle S vs shallow arc |
| Overall circle opacity levels | As specified vs slightly brighter |

---

## TECHNICAL REQUIREMENTS (MANDATORY — ALL 12 ITEMS)

1. First line: `"use client"`
2. Named export: `export function DividerSlide({ act, title, subtitle }: DividerSlideProps)`
3. Tailwind CSS + inline styles only — NO external imports
4. All animations via `<style>` tag with `@keyframes`
5. SVG must be inline (not external file)
6. Decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Content: `position: relative`, `z-index: 10`
8. Root div: `relative w-full overflow-hidden` with inline styles
9. Include `sampleData` for v0 preview (act=4)
10. No red colors anywhere
11. Korean text renders correctly
12. Works for act 1~6, short and long titles

---

## QUALITY CHECKLIST

- [ ] Concentric circles feel like an abstract seal/stamp, not a target
- [ ] Ink-bleed effect is subtle — organic warmth, not messy
- [ ] The composition is centered and balanced
- [ ] Dark gradient background has depth, not flat
- [ ] Number inside the inner ring feels intentional, like a seal character
- [ ] Title below circles is prominent and legible
- [ ] Short titles ("상황") feel like a powerful single word, not empty
- [ ] Long titles fit without breaking the composition
- [ ] Cultural reference is abstract/modern, never literal/kitsch
- [ ] Animation converges inward (rings→number→text), creating focus
- [ ] No red colors anywhere
- [ ] The slide feels like it belongs to the same family as Elevated/Frosted Panels
