# CardsSlide — Plan C: "Connected Flow"
# 연결된 흐름 — 카드 사이의 브릿지가 서사를 만든다

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
designed in "Elevated Panels" style (rounded cards, subtle shadows, smooth
rise-into-place animations). The CardsSlide should feel like a sibling
component — related but distinct in its information architecture.

---

## DESIGN CONCEPT: "Connected Flow"

**Philosophy**: "Cards are not islands. They are stations on a journey."

The signature element is a **horizontal connecting line** (bridge) that
visually links each card to the next. This transforms a static grid into
a **reading path** — the eye follows the connection from card 1 → 2 → 3 → 4.

Each card has a **colored left accent bar** (4px) that serves as the "entry point"
where the connecting line attaches. The accent bar's color transitions across
cards — from primary (#004B8D) on the first card, gradually blending toward
secondary (#48A9C5) on the last card. This creates a subtle gradient narrative.

This design philosophy is especially powerful for p.28 ("호원앤컴퍼니 CRM 연혁")
where the cards represent a timeline: 2003 → 2004 → 현재 → 2025.12.
But it also works for non-sequential data — the connection simply implies
"these belong together as a complete set."

**Visual Reference**: McKinsey consulting decks, Notion timeline views,
LinkedIn experience sections, premium process diagrams.

**Key Traits**:
- **Horizontal bridge line** between cards (gradient, thin, elegant)
- **Left accent bar** on each card (4px, progressively transitioning color)
- Card backgrounds are **clean white with subtle border** — neutral vessels
- Title is **medium-large** (text-2xl~3xl) — not as huge as Plan A,
  because the connecting flow is the visual story, not the number
- Geometric elements are organic: flowing arcs, dashed paths, curved lines
- Entry animation follows the bridge: left-to-right sequential reveal

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
1. `cards.length` is 3 or 4 — grid AND connecting bridges must adapt
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
│  ZONE B: Connected Card Grid                            │
│  ┌──────────┐ ──→── ┌──────────┐ ──→── ┌──────────┐    │
│  │▌         │       │▌         │       │▌         │    │
│  │▌ TITLE   │bridge │▌ TITLE   │bridge │▌ TITLE   │    │
│  │▌subtitle │ line  │▌subtitle │ line  │▌subtitle │    │
│  │▌  desc   │       │▌  desc   │       │▌  desc   │    │
│  │▌         │       │▌         │       │▌         │    │
│  └──────────┘       └──────────┘       └──────────┘    │
│  ↑                                                      │
│  4px left accent bar (color transitions across cards)   │
│                                                         │
│  ZONE C: Bottom Message (optional)                      │
│  ┌─ border-l-4 + gradient-bg ───────────────────────┐   │
│  │  message text                                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## PLAN C SPECIFIC — CARD TREATMENT

### Card Container
- **Rounded**: rounded-xl (12px)
- **Background**: white (#FFFFFF)
- **Border**: 1px solid rgba(0,0,0, 0.06) — light neutral
- **Left accent bar**: 4px solid, rounded-l-xl
  - Color progression across cards (positive tone):
    - Card 1: #004B8D (pure primary)
    - Card 2: mix of primary→secondary (~30%)
    - Card 3: mix of primary→secondary (~60%)
    - Card 4: #48A9C5 (pure secondary)
  - Implementation: compute color via index interpolation
  - For 3 cards: #004B8D → blend → #48A9C5
- **Internal padding**: p-5 to p-6, pl-6 (extra left padding after accent bar)
- **No shadow** — depth comes from the connecting line, not card elevation

### Connecting Bridge Line (THE SIGNATURE of Plan C)
- Position: between each pair of adjacent cards
- A **thin gradient line** (2px height) connecting:
  - Right edge of card N → Left edge of card N+1
- Color: gradient that matches the card color transition
  - Between card 1 and 2: primary → primary-secondary blend
  - Between card 2 and 3: blend → blend
  - Between card 3 and 4: blend → secondary
- Vertically positioned at ~40% of card height (roughly title level)
- **Optional**: tiny arrow tip (▸) or dot (●) at the right end of each bridge
- Bridge count: cards.length - 1 (2 bridges for 3 cards, 3 bridges for 4 cards)
- Implementation: absolute positioned divs between grid columns,
  or use flexbox with bridge elements between card elements

### Card Title
- Font size: **text-2xl to text-3xl** (24~30px)
- Font weight: 700
- Color: matches the card's accent bar color (progressively transitions)
- Margin-bottom: 8px

### Card Subtitle
- Font size: text-base (16px)
- Font weight: 500
- Color: #475569 (neutral.600)
- Margin-bottom: 4~6px

### Card Description
- Font size: text-sm (14px)
- Font weight: 400
- Color: #64748B (neutral.500)
- When empty: do not render (check `description && description.trim() !== ''`)
- Optional: subtle top-border separator (1px) before description

### Tone Handling
- `positive`: accent bars primary→secondary gradient, bridge line colored
- `neutral`: accent bars neutral.400→neutral.500, bridge line gray
- `negative`: same as neutral (NO red)

---

## PLAN C SPECIFIC — GEOMETRIC ELEMENTS (5 max)

Organic, flowing elements that reinforce the horizontal journey:

1. **Flowing SVG arc** (background, full width):
   - Gentle curve spanning ~80% of slide width
   - Stroke: 1.5px, rgba(0, 75, 141, 0.04)
   - Positioned behind card row, slightly below center
   - Animation: slow dashOffset (stroke-dasharray: 8 12), 18s cycle
   - This reinforces the left→right reading direction subliminally

2. **Dashed arc** (top-right):
   - Small 100px arc, stroke-dasharray: 4 8
   - Color: rgba(72, 169, 197, 0.08)
   - Position: top 2%, right 2%
   - Static

3. **Small gradient circle** (bottom-left):
   - 150px diameter, radial-gradient
   - Center: rgba(0, 75, 141, 0.03)
   - Position: bottom -4%, left -3%
   - Static

4. **Tiny diamond** (bottom-right):
   - 12px, 1.5px stroke, rgba(72, 169, 197, 0.12)
   - Rotated 45deg
   - Slow rotation: 25s cycle
   - Position: bottom 4%, right 3%

5. **Three small flowing dashes** (left edge, mid):
   - 3 dashes (10px each, 3px gap)
   - rgba(0, 75, 141, 0.06)
   - Position: left 1%, top 50%
   - Animation: slow slide right translateX(0→6px), 12s

**Safe Zone**: x 4%~96%, y 4%~90%

---

## ENTRANCE ANIMATION

Directional, left-to-right, emphasizing the connected journey:

1. Zone A accent-bar: width 0→100%, 0.4s
2. Zone A title: fade-in 0.5s, delay 0.1s
3. **Card 1**: fade-in + translateX(-10px→0), 0.4s, delay 0.2s
4. **Bridge 1**: draws from left to right (width 0→100%), 0.3s, delay 0.4s
5. **Card 2**: fade-in + translateX(-10px→0), 0.4s, delay 0.5s
6. **Bridge 2**: draws left→right, 0.3s, delay 0.7s
7. **Card 3**: fade-in + translateX(-10px→0), 0.4s, delay 0.8s
8. **Bridge 3** (if 4 cards): draws left→right, 0.3s, delay 1.0s
9. **Card 4** (if 4 cards): fade-in + translateX(-10px→0), 0.4s, delay 1.1s
10. Zone C bottom message: fade-in 0.4s, delay last-card + 0.3s

**Key**: translateX (horizontal), NOT translateY.
Cards slide in from the left, bridges draw across — the animation tells
the story of progression. The total duration is longer than Plan A/B
because the sequential reveal IS the experience.

**Note for 3 cards**: Skip Bridge 3 and Card 4 timings. Adjust final delay.

---

## CREATIVE FREEDOM (V0 DESIGNER DECIDES)

| Area | Freedom |
|------|---------|
| Bridge line style | Solid gradient / Dashed / Dotted |
| Bridge line thickness | 1.5px vs 2px vs 2.5px |
| Bridge line arrow tip | None / Small dot / Small chevron ▸ / Triangle |
| Bridge vertical position | 35% vs 40% vs 45% of card height |
| Left accent bar width | 3px vs 4px vs 5px |
| Color interpolation method | Linear blend vs step function |
| Card title size | text-2xl vs text-3xl |
| Card border visibility | 1px subtle vs no border (shadow only) |
| Card corner radius | rounded-lg vs rounded-xl |
| Description separator | None vs 1px line vs dotted line |
| Grid gap (excluding bridge) | 40px vs 48px vs 56px |
| Whether cards have subtle bg tint | Pure white vs 1% tint |
| Flowing arc SVG curvature | Wide gentle vs tighter wave |
| Bottom message alignment | Left with border-l vs center |
| Overall horizontal padding | px-12 vs px-16 |

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
9. **Dynamic grid**: adapt layout for 3 vs 4 cards WITH bridge elements
10. **Bridge elements**: render `cards.length - 1` bridges between cards
11. Handle `description` empty string: `description && description.trim() !== ''`
12. Handle `subtitle` absence: no empty element
13. Handle `bottomMessage` absence: no orphan space
14. Handle `tone` variants: positive (primary→secondary), neutral (grays), negative (grays, NO red)
15. **Color interpolation** for left accent bars:
    compute intermediate colors between #004B8D and #48A9C5 based on card index
16. Include sampleData for v0 preview
17. No red colors anywhere
18. Korean text must render correctly with Pretendard

---

## QUALITY CHECKLIST

- [ ] Bridge lines connect cards visually — creating a reading path
- [ ] Left accent bars transition from primary to secondary across cards
- [ ] Bridge count adapts: 2 bridges for 3 cards, 3 bridges for 4 cards
- [ ] Cards slide in from left (translateX), bridges draw across
- [ ] Empty description ("") produces NO empty space
- [ ] Grid + bridge layout works cleanly for both 3 and 4 cards
- [ ] Positive tone: colored bridges, Neutral tone: gray bridges
- [ ] Works for timeline data ("2003"→"현재") AND abstract data ("PTD"→"CRM")
- [ ] Removing bottomMessage leaves no orphan space
- [ ] Flow elements don't overpower the actual card content
- [ ] Total animation duration is under 2 seconds (even for 4 cards)
- [ ] A 원장님 sees this and thinks "이 회사는 과정을 알고 있다"
- [ ] Feels like a premium consulting deck's process diagram
- [ ] Bridge lines are elegant, not heavy — they suggest, not demand
