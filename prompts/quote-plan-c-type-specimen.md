# Plan C: "Type Specimen" — QuoteSlide v0 Prompt

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

### 2-1. Design Direction: "Type Specimen"
Bloomberg Businessweek / 타이포그래피 포스터 스타일. 인용부호 자체가 거대한 그래픽 요소가 된다.

### 2-2. Background
- Solid dark: #004B8D (gradient 없이 단색)
- 자체 배경 포함

### 2-3. Giant Quote Marks — 핵심 디자인 요소 ★
- 열기 `"`: **좌상단**, font-size 360~400px, serif체
  - color: rgba(255,255,255, 0.05~0.07)
  - position: absolute, top: -40px, left: 40px
  - 메시지 텍스트 뒤에 깔림 (z-index 낮음)
- 닫기 `"`: **우하단**, 동일 크기
  - position: absolute, bottom: -40px, right: 40px, rotate-180
- 이 두 거대 인용부호가 화면의 **구조적 프레임**을 만든다

### 2-4. Message
- 화면 정중앙, 두 인용부호 사이에 위치
- text-4xl ~ text-5xl, font-bold, text-white
- leading-snug (tight한 행간으로 타이포 밀도감)
- text-center, max-w-3xl
- 짧은 메시지("71%")일 때: 자연스럽게 text-7xl ~ text-8xl로 보이도록
  → message.length < 5일 때 동적으로 font-size 증가

### 2-5. SubMessage
- message 아래 우측 정렬 (text-right)
- 앞에 em dash (—) 붙임: "— 도입 기관 중 71%가..."
- text-lg, text-white/50, font-light
- whitespace-pre-line
- attribution(출처) 스타일로 처리

### 2-6. Accent Line
- message와 subMessage 사이에 accent 색상 라인
- w-24, h-0.5, bg-[#48A9C5]/40, ml-auto (우측 정렬과 맞춤)

### 2-7. Background Decoration
- 최소한: 우하단에 #48A9C5 opacity 5%의 원 1개 (w-64 h-64, blur-3xl)
- 거대 인용부호 자체가 그래픽 역할을 하므로 추가 장식 최소화

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
