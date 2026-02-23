# Plan A: "Grand Stage" — QuoteSlide v0 Prompt

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
  readonly message: string       // 메인 메시지 (항상 존재, \n 줄바꿈 포함 가능)
  readonly subMessage?: string   // 보조 설명 (선택, \n 줄바꿈 포함 가능)
}
```

### 1-3. Color Palette (고정)
- Primary: #004B8D
- Primary Dark: #002D5A
- Accent: #48A9C5
- White: #FFFFFF

### 1-4. Rendering Rules
- message는 항상 존재, 1줄("71%") ~ 3줄(긴 문장) 다양
- subMessage가 없을 수 있음 → 없으면 해당 영역 생략
- 줄바꿈: message와 subMessage 모두 \n을 `<br />` 또는 whitespace-pre-line으로 처리
- 인용부호 쌍(열기/닫기)은 반드시 존재

---

## ════════════════════════════════════════
## SECTION 2: CREATIVE FREEDOM (디자인 자유 영역)
## ════════════════════════════════════════

### 2-1. Design Direction: "Grand Stage"
TED Talk 무대 스타일. 어두운 배경에 메시지만 강렬하게 빛난다.

### 2-2. Background
- 자체 dark gradient: linear-gradient(160deg, #004B8D 0%, #002D5A 100%)
- 컴포넌트가 자체 배경을 가짐 (DividerSlide와 동일 패턴)

### 2-3. Quote Marks — 배경 워터마크
- 열기 인용부호 `"`: 좌상단 영역, font-size 240~280px, serif체
- 닫기 인용부호 `"`: 우하단 영역, 동일 크기, 180도 회전
- 색상: rgba(255,255,255, 0.04~0.06) — 거의 보이지 않는 워터마크
- 이것은 장식이며 텍스트와 겹쳐도 됨 (투명도가 매우 낮으므로)

### 2-4. Message (메인 메시지)
- 화면 정중앙 배치
- text-3xl ~ text-5xl, font-bold, text-white
- leading-relaxed
- max-w-3xl (텍스트가 너무 넓어지지 않도록)
- 짧은 메시지("71%")일 때는 자연스럽게 크게 보임

### 2-5. SubMessage (보조 설명)
- message 아래, 구분선 1개 (w-16, h-px, bg-white/20, mx-auto)
- text-lg ~ text-xl, text-white/70, font-normal
- whitespace-pre-line
- max-w-2xl
- subMessage가 없으면 구분선과 함께 전체 생략

### 2-6. Subtle Background Decoration (선택적)
- 2개의 gradient 원 (blur-3xl)
  - 좌측: #48A9C5 opacity 5~8%
  - 우측: #004B8D opacity 3~5% (배경과 유사하지만 살짝 밝은)
- 텍스트 가독성을 해치지 않는 범위에서만

---

## ════════════════════════════════════════
## SECTION 3: PREVIEW DATA (렌더링 확인용)
## ════════════════════════════════════════

2가지 케이스로 확인:

```tsx
{/* Case 1: 긴 메시지 + subMessage */}
<QuoteSlide
  message="같은 상황에서, 다른 결과를 만든 사례가 있습니다"
  subMessage={"휴한의원 (2014~2015)\n\n\"환자 감소, 매출 정체, 경쟁 심화\"\n정이안한의원과 같은 고민을 가진 한의원이었습니다"}
/>

{/* Case 2: 숫자 메시지 + subMessage */}
<QuoteSlide
  message="71%"
  subMessage={"도입 기관 중 71%가\n30% 이상 매출 증가\n\nAI기능 CRM의 효율은 더 좋아질 것"}
/>
```

---

## TECHNICAL REQUIREMENTS
- React functional component, TypeScript
- `export function QuoteSlide` (named export)
- Tailwind CSS only (no external CSS)
- No animations (static presentation)
- No external dependencies (shadcn Card 사용하지 않음)
- w-full h-full, 자체 background 포함
