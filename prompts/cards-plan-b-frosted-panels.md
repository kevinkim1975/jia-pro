# CardsSlide — Plan B: "Frosted Panels"
# 부유하는 서리 유리 — 깊이감과 순번이 만드는 프리미엄 대시보드

---

## ROLE & CONTEXT

You are a **35-year veteran UI designer** who has designed presentation systems
for Samsung Medical Center, Seoul National University Hospital, and leading
pharmaceutical companies. Your work has won Red Dot and iF Design awards.

This is a **TEMPLATE** that renders **8 different slides** (16.3% of a 49-slide
medical proposal). The card count varies: **3 cards** on 5 slides, **4 cards**
on 3 slides. Every design decision must work for both counts.

Content ranges from clinic history timelines ("2003", "2004", "현재") to
abstract concepts ("PTD", "교육", "CRM") to market data ("냉증 -36%", "80개 업체").

**DESIGN SYSTEM CONTEXT**: This presentation already has a TwoColumnSlide
designed in "Elevated Panels" style — rounded cards with subtle shadows,
tinted backgrounds, and smooth rise-into-place animations. The CardsSlide
should feel like it belongs to the same family while serving a different purpose.

---

## DESIGN CONCEPT: "Frosted Panels"

**Philosophy**: "Information has depth. Each card is a floating window into data."

Each card is a **frosted glass panel** — subtle background tint, delicate border,
soft shadow that gives the impression of physical depth. Cards feel like they're
floating slightly above the surface.

What distinguishes this from the TwoColumnSlide's "Elevated Panels":
- **Ordinal indicators** (01, 02, 03, 04) in each card's top-left corner
  give the reader a clear sense of sequence
- Cards are **smaller and more compact** than TwoColumn's wide panels
- The gradient is on the **border**, not the background — creating a subtle glow
- Title is prominent but not as enormous as Plan A — sized for both "2003" and "시장 변화"

Think of Apple Vision Pro's interface — information floating in space,
organized in clean panels with precise depth cues.

**Visual Reference**: Apple Vision Pro UI, Linear's project cards,
Notion databases, Vercel dashboard widgets.

**Key Traits**:
- Each card: rounded-2xl, subtle shadow, barely-there background tint
- Top-left ordinal: "01", "02", "03", "04" in small text, primary color at 30%
- Card title: text-3xl to text-4xl, bold, vertically centered emphasis
- Gradient accent on top border (3px, primary→secondary)
- Cards feel like siblings — matched pair/trio/quad
- Geometric elements: soft blurred circles, faded gradient spots

---

## MANDATORY DESIGN TOKENS (FROZEN — DO NOT MODIFY)

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
  ❌ No shadcn/ui imports — pure Tailwind + inline styles only
  ❌ No external icon library
  ❌ No Card component import
```

---

## FIXED TYPE CONTRACT (FROZEN — DO NOT MODIFY)

```tsx
interface CardItem {
  readonly title: string
  readonly subtitle?: string
  readonly description?: string  // can be empty string ""
}

interface CardsSlideProps {
  readonly title: string
  readonly cards: readonly CardItem[]   // length: 3 or 4
  readonly bottomMessage?: string
  readonly tone?: 'positive' | 'negative' | 'neutral'
}
```

**CRITICAL INVARIANTS**:
1. `cards.length` is 3 or 4 — grid must adapt dynamically
2. `description` can be empty string `""` — must not render empty space
3. `subtitle` is always present in data but typed optional — handle absence
4. `bottomMessage` absent on 1 of 8 slides — no orphan space
5. `tone` defaults to 'positive' if undefined

---

## FIXED SAMPLE DATA (p.28)

```tsx
const sampleData: CardsSlideProps = {
  title: "호원앤컴퍼니 CRM 연혁",
  cards: [
    { title: "2003", subtitle: "서울대 분당병원", description: "CRM 개발" },
    { title: "2004", subtitle: "초이스피부과", description: "로컬 최초" },
    { title: "현재", subtitle: "150개 기관", description: "운영" },
    { title: "2025.12", subtitle: "AI CRM", description: "개발 5개 시범" },
  ],
  bottomMessage: '"20년간 의료기관 CRM을 만들어 왔습니다"',
  tone: 'positive',
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
│  ZONE B: Card Grid (adaptive: 3col or 4col)             │
│  ┌────────────────┐  ┌────────────────┐                 │
│  │ 01             │  │ 02             │  ...             │
│  │ ╭────────────╮ │  │ ╭────────────╮ │                 │
│  │ │   TITLE    │ │  │ │   TITLE    │ │                 │
│  │ │  subtitle  │ │  │ │  subtitle  │ │                 │
│  │ │   desc     │ │  │ │   desc     │ │                 │
│  │ ╰────────────╯ │  │ ╰────────────╯ │                 │
│  │░░ soft shadow ░░│  │░░ soft shadow ░░│                 │
│  └────────────────┘  └────────────────┘                 │
│                                                         │
│  ZONE C: Bottom Message (optional)                      │
│  ┌─ border-l-4 + gradient-bg ───────────────────────┐   │
│  │  message text                                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## PLAN B SPECIFIC — CARD TREATMENT

### Card Container
- **Rounded**: rounded-2xl (16px)
- **Background tint**: rgba(0, 75, 141, 0.02) for positive, rgba(100,116,139,0.02) for neutral
- **Border**: 1px solid rgba(0, 75, 141, 0.08)
- **Top accent border**: 3px solid, gradient from #004B8D to #48A9C5
  (overrides 1px border at top)
- **Box shadow**: `0 1px 3px rgba(0,0,0,0.03), 0 6px 16px rgba(0,0,0,0.02)`
- **Internal padding**: p-6 to p-7
- All cards have equal min-height (natural flow, but visually balanced)

### Ordinal Indicator
- Position: top-left of card, inside padding
- Format: "0{index+1}" → "01", "02", "03", "04"
- Font: text-xs (12px), font-mono or font-semibold
- Color: primary at 25~35% opacity → rgba(0, 75, 141, 0.30)
- This gives sequence awareness without visual weight

### Card Title
- Font size: **text-3xl to text-4xl** (30~36px)
- Font weight: 700 (bold)
- Color: #004B8D (positive) or #475569 (neutral)
- Margin-top: 12~16px below ordinal
- Title is prominent but not overwhelmingly large (unlike Plan A)

### Card Subtitle
- Font size: text-base (16px)
- Font weight: 500 (medium)
- Color: #48A9C5 (positive) or #64748B (neutral)
- Margin-top: 8px below title

### Card Description
- Font size: text-sm (14px)
- Font weight: 400
- Color: #64748B
- Margin-top: 6px below subtitle
- **Separator**: thin 1px line (neutral.200) between subtitle and description area
- When empty string: do not render separator OR description
  → check: `description && description.trim() !== ''`

### Tone Handling
- `positive`: primary colors, gradient accent, blue-tinted cards
- `neutral`: gray colors, gray accent line, gray-tinted cards
- `negative`: same as neutral (NO red — medical prohibition)

---

## PLAN B SPECIFIC — GEOMETRIC ELEMENTS (5 max)

Soft, ambient elements that create atmosphere without competing:

1. **Large gradient circle** (top-right):
   - 300px diameter, radial-gradient
   - Center: rgba(72, 169, 197, 0.04), Edge: transparent
   - Position: top -10%, right -8%
   - Animation: slow drift translateX ±8px, 16s cycle

2. **Small gradient circle** (bottom-left):
   - 200px diameter, radial-gradient
   - Center: rgba(0, 75, 141, 0.03), Edge: transparent
   - Position: bottom -6%, left -5%
   - Static

3. **Outlined ring** (top-left):
   - 80px diameter, 1.5px stroke, rgba(0, 75, 141, 0.06)
   - No fill
   - Position: top 2%, left 1%
   - Static

4. **Small solid dot** (bottom-right):
   - 8px, rgba(72, 169, 197, 0.12)
   - Slow pulse: opacity 0.08→0.16, 7s
   - Position: bottom 4%, right 3%

5. **Subtle horizontal dash** (right edge):
   - 50px wide, 1.5px, rgba(0, 75, 141, 0.05)
   - Position: top 60%, right 1%
   - Static

**Safe Zone**: x 4%~96%, y 4%~90%

---

## ENTRANCE ANIMATION

Smooth rise, matching TwoColumnSlide's "Elevated Panels" family:

1. Zone A accent-bar: fade-in 0.4s
2. Zone A title: fade-in 0.5s, delay 0.1s
3. **Cards rise into place** — each card:
   - fade-in + translateY(12px→0), 0.5s ease-out
   - Staggered: Card 1 delay 0.2s, Card 2 delay 0.3s, Card 3 delay 0.4s, Card 4 delay 0.5s
4. Ordinal indicators within each card: fade-in 0.3s, delay +0.15s after card appears
5. Zone C bottom message: fade-in + translateY(6px→0), 0.4s, delay 0.6s

**Key**: Cards "rise" with translateY, matching the "elevated" concept.
Ordinals appear slightly after their card settles — a refined sequencing detail.

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

| Area | Freedom |
|------|---------|
| Card shadow depth | Barely there vs softly visible |
| Card background tint opacity | 1% vs 2% vs 3% |
| Card border radius | rounded-xl vs rounded-2xl vs rounded-3xl |
| Top accent border width | 2px vs 3px vs 4px |
| Ordinal indicator style | "01" vs "①" vs "1/" |
| Ordinal font | font-mono vs Pretendard semibold |
| Card title size | text-3xl vs text-4xl |
| Separator before description | 1px line vs no separator vs dotted line |
| Grid gap between cards | 20px vs 24px vs 28px |
| Whether cards have matched min-height | Natural vs forced equal height |
| Bottom message icon | None vs subtle → arrow vs quote mark |
| Geometric blur radius | 40px vs 60px vs 80px |
| Card internal alignment | Left vs center |
| Whether ordinal has a circle background | Plain text vs circled |

---

## TECHNICAL REQUIREMENTS (MANDATORY — DO NOT SKIP)

1. First line: `"use client"`
2. Named export: `export function CardsSlide({ title, cards, bottomMessage, tone = 'positive' }: CardsSlideProps)`
3. Tailwind CSS + inline styles only (NO component imports)
4. NO import of Card, SlideHeader, or any component
5. All animations via `<style>` tag with `@keyframes`
6. Decorative elements: `position: absolute`, `pointer-events: none`, `z-index: 0`
7. Content: `position: relative`, `z-index: 10`
8. Root: `relative w-full overflow-hidden`, fontFamily and bg inline
9. **Dynamic grid**: `cards.length <= 3 ? 'grid-cols-3' : 'grid-cols-4'`
10. Handle `description` empty string: `description && description.trim() !== ''`
11. Handle `subtitle` absence: no empty element
12. Handle `bottomMessage` absence: no orphan space
13. Handle `tone` variants: positive (primary), neutral (gray), negative (gray, NO red)
14. Include sampleData for v0 preview
15. No red colors anywhere
16. Korean text must render correctly with Pretendard

---

## QUALITY CHECKLIST

- [ ] Cards feel like floating glass panels — subtle depth through shadow + tint
- [ ] Ordinal indicators ("01", "02"...) are visible but not dominant
- [ ] Grid adapts: 3 cards → 3 columns, 4 cards → 4 columns
- [ ] Empty description ("") produces NO empty space
- [ ] Cards rise into place with translateY animation (matching TwoColumnSlide family)
- [ ] Positive tone: blue palette, Neutral tone: gray palette
- [ ] Top accent gradient creates visual connection across all cards
- [ ] Works for numbers ("2003"), words ("PTD"), mixed ("냉증 -36%")
- [ ] Removing bottomMessage leaves no orphan space
- [ ] Feels like a premium SaaS dashboard's metric cards
- [ ] A 원장님 sees this and thinks "현대적이고 신뢰할 수 있다"
- [ ] Visually cohesive with the TwoColumnSlide "Elevated Panels" already in use
