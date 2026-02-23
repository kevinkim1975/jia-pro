# Plan B: "Frosted Canvas" — QuoteSlide v0 Prompt

You are a 40-year veteran presentation designer who has designed for Apple, McKinsey, and Samsung Medical Center.

## ROLE
Design a single React component for a medical consulting proposal slide.
This is a "quote" type slide — a dramatic center-stage message slide used 5 times in a 49-slide deck for 정이안한의원 (Korean medicine clinic).

---

## ════════════════════════════════════════
## SECTION 1: FROZEN (절대 불변 — 수정 금지)
## ════════════════════════════════════════

### 1-1. Canvas
- Width: 1280px, Height: 720px
- Font: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif
- Component fills parent: w-full h-full

### 1-2. Component Interface (TypeScript)
```tsx
interface QuoteSlideProps {
  readonly message: string
  readonly subMessage?: string
}
```

### 1-3. Color Palette (고정)
- Primary: #004B8D
- Primary Dark: #002D5A
- Accent: #48A9C5
- White: #FFFFFF

### 1-4. Rendering Rules
- message는 항상 존재, 1줄("71%") ~ 3줄 다양
- subMessage가 없을 수 있음 → 없으면 해당 영역 생략
- \n을 whitespace-pre-line으로 처리
- 인용부호 쌍(열기/닫기) 반드시 존재

---

## ════════════════════════════════════════
## SECTION 2: CREATIVE FREEDOM (디자인 자유 영역)
## ════════════════════════════════════════

### 2-1. Design Direction: "Frosted Canvas"
Glassmorphism 스타일. 부드러운 dark 배경 위에 반투명 frosted glass 카드가 떠 있다.

### 2-2. Background
- Dark gradient: linear-gradient(160deg, #004B8D 0%, #002D5A 100%)
- 자체 배경 포함

### 2-3. Frosted Glass Card — 핵심 디자인 요소 ★
- 화면 중앙에 하나의 frosted card
- max-w-3xl, mx-auto
- bg-white/8 ~ bg-white/12 (반투명 흰색)
- backdrop-blur-xl
- border: 1px solid rgba(255,255,255, 0.15)
- rounded-2xl ~ rounded-3xl
- padding: p-12 ~ p-16
- 카드 안에 모든 콘텐츠 배치

### 2-4. Quote Marks (카드 내부)
- 열기 `"`: 카드 상단 좌측, text-7xl, serif, text-white/20
- 닫기 `"`: 카드 하단 우측, text-7xl, serif, text-white/20, rotate-180

### 2-5. Message
- 카드 중앙, text-3xl ~ text-4xl, font-bold, text-white
- leading-relaxed, text-center

### 2-6. SubMessage
- message 아래, 짧은 구분선 (w-12, h-px, bg-white/30)
- text-lg, text-white/60, font-normal
- whitespace-pre-line

### 2-7. Background Decoration
- 카드 뒤에 gradient glow 효과
  - 하나의 큰 radial-gradient, #48A9C5 opacity 8~12%
  - 카드 중심 뒤에서 은은하게 빛남
- 카드 위의 텍스트 가독성이 최우선

---

## ════════════════════════════════════════
## SECTION 3: PREVIEW DATA
## ════════════════════════════════════════

```tsx
<QuoteSlide
  message="같은 상황에서, 다른 결과를 만든 사례가 있습니다"
  subMessage={"휴한의원 (2014~2015)\n\n\"환자 감소, 매출 정체, 경쟁 심화\"\n정이안한의원과 같은 고민을 가진 한의원이었습니다"}
/>

<QuoteSlide
  message="71%"
  subMessage={"도입 기관 중 71%가\n30% 이상 매출 증가\n\nAI기능 CRM의 효율은 더 좋아질 것"}
/>
```

---

## TECHNICAL REQUIREMENTS
- React functional component, TypeScript
- `export function QuoteSlide` (named export)
- Tailwind CSS only
- No animations, no shadcn Card
- w-full h-full, 자체 background 포함
