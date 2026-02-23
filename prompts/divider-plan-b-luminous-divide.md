# DividerSlide — Plan B: "Luminous Divide"
# 편집 디자인의 2분할 — 좌측 컬러 밴드 + 우측 타이포그래피

---

## ROLE & CONTEXT

You are a 30-year veteran UI designer specializing in premium medical presentation systems.
You create designs that rival GRAFY DESIGN Hanisul level sophistication.

This is an **ACT DIVIDER** slide — a chapter title page that marks the beginning
of each major section. It appears **6 times** in a 49-slide medical proposal presentation.

**DESIGN SYSTEM CONTEXT**: This presentation has TwoColumnSlide ("Elevated Panels")
and CardsSlide ("Frosted Panels") on light backgrounds.
The DividerSlide should feel distinct while belonging to the same design family.

---

## DESIGN CONCEPT: "Luminous Divide"

**Philosophy**: "Structure creates meaning."

This design splits the canvas into two clear zones: a narrow colored band on the left
(~25% width) and a spacious white area on the right (~75%).
The left band carries the act number as a bold typographic element.
The right area presents the title with generous whitespace.

The division itself IS the design — a clean vertical split that signals
"we are entering a new chapter." The left band uses a gradient from primary
to primaryLight, creating depth. The right side is pristine white,
letting the Korean title breathe.

This approach mirrors premium editorial design — Kinfolk magazine section dividers,
Monocle handbook chapter pages, Aesop product category pages.

**Visual Reference**: Kinfolk magazine, Monocle Travel Guide dividers,
Aesop retail signage, Swiss International Style posters.

**Key Traits**:
- Left band (~25%): gradient primary→primaryLight, contains act number
- Right area (~75%): white/near-white, contains ACT label + title + subtitle
- Clean vertical division — the edge between zones is the design statement
- Act number in left band: large (120px+), bold, white
- Title in right area: large, dark (#1A1A2E), left-aligned
- Subtle geometric elements span across both zones
- The division line itself may have a subtle gradient glow

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
  primary:        #004B8D   (Ocean Blue Deep — LEFT BAND gradient start)
  primaryLight:   #1A5F7A   (Ocean Blue — LEFT BAND gradient end)
  secondary:      #48A9C5   (Teal Bright — ACT label)
  secondaryLight: #57A0A0   (Teal Green)
  accent:         #9DC5BB   (Soft Mint)
  accentLight:    #B8D8D0   (Mint Light)
  bgWhite:        #FAFBFC   (RIGHT AREA background)
  bgCream:        #F5F0EB   (Warm Cream)
  bgMist:         #EEF4F8   (Cool Mist)
  textPrimary:    #1A1A2E   (Near Black — TITLE color on right)
  textSecondary:  #4A5568   (Dark Gray)
  textMuted:      #94A3B8   (Muted Gray)
  borderLight:    #E2E8F0   (Light Border)
  white:          #FFFFFF   (NUMBER color on left band)

Typography:
  fontFamily: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif

ABSOLUTE PROHIBITION:
  ❌ No red colors (#DC2626, #EF4444, #B91C1C, etc.) — medical context
  ❌ No external component imports
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

All 6 data sets must work:
| act | title | subtitle |
|:---:|-------|----------|
| 1 | 상황 | Situation |
| 2 | 위기 | Crisis |
| 3 | 전환점 | Turning Point |
| 4 | 해결책 1: 마케팅 전략 | Marketing Strategy |
| 5 | 해결책 2: AI CRM | AI CRM |
| 6 | 요약 및 Next Step | Summary & Next Step |

---

## PLAN B — LAYOUT SPECIFICATION

### Left Band (~25% width, ~240px)
- Full height of canvas (540px)
- Background: linear-gradient(180deg, #004B8D 0%, #1A5F7A 100%)
- Contains the act NUMBER centered vertically
- Number: 120px~160px, font-weight 800-900, white
- Number slightly offset (not dead center — maybe lower third)

### Right Area (~75% width, ~720px)
- Full height, `backgroundColor: "#FAFBFC"`
- Content vertically centered, left-aligned
- Stack (top to bottom):
  1. **ACT Label**: "ACT 4" — small, tracked, `#48A9C5`
  2. **Title**: "해결책 1: 마케팅 전략" — large, bold, `#1A1A2E`
  3. **Subtitle**: "Marketing Strategy" — medium, `#4A5568`, tracked
  4. **Accent line**: horizontal, gradient `#48A9C5` → `#9DC5BB`, below subtitle
- Left padding: ~60px from the band edge

### Division Edge
- The boundary between left band and right area
- May have a subtle glow/shadow on the right side (1-2px, very faint)

---

## PLAN B — GEOMETRIC ELEMENTS (5 max)

1. **Subtle arc** (spanning the division):
   - Quarter-circle arc, 200px radius, 1px stroke
   - `rgba(0, 75, 141, 0.08)` on white side, `rgba(255,255,255,0.06)` on dark side
   - Centered on the division line, mid-height
   - Static

2. **Small dot cluster** (right area, top-right):
   - 3 dots, 4px each, `rgba(72, 169, 197, 0.12)`
   - Arranged in a small triangle pattern
   - Position: top 8%, right 5%
   - Static

3. **Horizontal dash** (left band, below number):
   - 40px wide, 1.5px, `rgba(255, 255, 255, 0.15)`
   - Centered horizontally in the band
   - Position: 70% from top
   - Static

4. **Faint circle** (right area, bottom-right):
   - 80px diameter, `rgba(157, 197, 187, 0.06)`, no fill, 1px stroke
   - Position: bottom 10%, right 8%
   - Static

5. **Tiny glow** (left band, top):
   - 100px radial gradient, center `rgba(72, 169, 197, 0.08)`
   - Position: top 5%, centered in band
   - Static

---

## ENTRANCE ANIMATION

Editorial precision — clean reveals:

1. Left band: instant (already present as structural element)
2. Number in band: fade-in + scale(0.95→1) 0.5s, delay 0.1s
3. ACT label: fade-in + translateX(-8px→0) 0.4s, delay 0.2s
4. Title: fade-in + translateX(-10px→0) 0.5s ease-out, delay 0.3s
5. Subtitle: fade-in + translateX(-8px→0) 0.4s, delay 0.45s
6. Accent line: scaleX(0→1) 0.4s ease-out, delay 0.55s, transform-origin: left

**Key**: Content slides in from the LEFT — reinforcing the left-to-right reading flow
and the visual connection to the colored band.

---

## CREATIVE FREEDOM (V0 DECIDES)

| Area | Freedom Range |
|------|---------------|
| Left band width | 22% vs 25% vs 28% |
| Left band gradient angle | 180deg (vertical) vs 160deg vs 200deg |
| Number size | 120px vs 140px vs 160px |
| Number vertical position | Center vs lower-third vs upper-third |
| Division edge treatment | Sharp vs 1px shadow vs subtle glow |
| Title font size | text-4xl vs text-5xl vs custom 40px |
| Title line-height | 1.1 vs 1.2 vs 1.3 |
| Subtitle treatment | Normal case vs uppercase vs small-caps |
| Accent line width | 48px vs 64px vs 80px |
| Right area left padding | 48px vs 60px vs 72px from band edge |
| Content vertical position | Exact center vs slightly above |
| Arc decoration size | 160px vs 200px vs 240px radius |
| Whether number has subtle text-shadow | None vs faint glow |
| Gap between title and subtitle | 8px vs 12px vs 16px |

---

## TECHNICAL REQUIREMENTS (MANDATORY — ALL 12 ITEMS)

1. First line: `"use client"`
2. Named export: `export function DividerSlide({ act, title, subtitle }: DividerSlideProps)`
3. Tailwind CSS + inline styles only — NO external imports
4. All animations via `<style>` tag with `@keyframes` inside the component
5. Decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
6. Content: `position: relative`, `z-index: 10`
7. Root div: `relative w-full overflow-hidden` with `fontFamily` inline
8. Include `sampleData` for v0 preview (act=4)
9. No red colors anywhere
10. Korean text must render correctly
11. Works for act 1~6
12. Short titles ("상황") must look balanced, not lost in the wide right area

---

## QUALITY CHECKLIST

- [ ] Left band and right area feel like intentional design, not a random split
- [ ] The division creates clear chapter-transition drama
- [ ] Number in the band is bold but not overwhelming
- [ ] Title on the right has generous breathing room
- [ ] Short titles ("위기") don't feel lost — the whitespace is intentional
- [ ] Long titles ("해결책 1: 마케팅 전략") fit without wrapping
- [ ] The arc spanning the division creates visual connection between zones
- [ ] Animation flows left-to-right, matching reading direction
- [ ] No red colors anywhere
- [ ] Feels like a sibling of TwoColumnSlide/CardsSlide (same palette, same font, same quality)
