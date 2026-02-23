# Plan B: "Signal Strip" — ContentSlide v0 Prompt

You are a 40-year veteran presentation designer who has designed for Apple, McKinsey, and Samsung Medical Center.

## ROLE
Design a single React component for a medical consulting proposal slide.
This is a "content" type slide — the workhorse informational slide used 6 times in a 49-slide deck for 정이안한의원 (Korean medicine clinic).

---

## ════════════════════════════════════════
## SECTION 1: FROZEN (절대 불변 — 수정 금지)
## ════════════════════════════════════════

### 1-1. Canvas
- Width: 1280px, Height: 720px
- Background: #F8FAFC (surface)
- Padding: 64px horizontal, 48px vertical
- Font: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif

### 1-2. Component Interface (TypeScript)
```tsx
interface ContentSlideProps {
  readonly title: string
  readonly content: string
  readonly bullets?: readonly string[]
  readonly emphasis?: string
  readonly tone?: "positive" | "negative" | "neutral"
}
```

### 1-3. SlideHeader (Base Component — 코드 그대로 사용)
```tsx
<div className="space-y-2">
  <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
    {title}
  </h2>
</div>
```
⚠️ 이 구조 변경 금지. accent-bar → title 순서 고정. gradient 색상 고정.

### 1-4. SlideBottomMessage (Base Component — emphasis가 있을 때만 렌더링)
```tsx
<div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-[#004B8D]/10 to-[#48A9C5]/10 border-l-4 border-[#004B8D]">
  {icon}
  <p className="text-xl font-semibold text-[#004B8D]">{emphasis}</p>
</div>
```
⚠️ gradient 배경, border-l-4 구조 변경 금지.

### 1-5. Tone Color System (고정)
```ts
const toneColors = {
  positive: { accent: "#059669", bg: "emerald-50", border: "emerald-200", text: "emerald-700" },
  negative: { accent: "#DC2626", bg: "red-50", border: "red-200", text: "red-700" },
  neutral:  { accent: "#004B8D", bg: "blue-50", border: "blue-200", text: "[#004B8D]" }
}
```

### 1-6. Rendering Rules
- title은 항상 존재
- content가 빈 문자열("")일 수 있음 → 빈 문자열이면 본문 영역 렌더링 생략
- bullets가 없거나 빈 배열일 수 있음 → 없으면 불릿 영역 생략
- emphasis가 없을 수 있음 → 없으면 SlideBottomMessage 생략
- 아이콘: positive=TrendingUp, negative=Target, neutral=Lightbulb (lucide-react)

---

## ════════════════════════════════════════
## SECTION 2: CREATIVE FREEDOM (디자인 자유 영역)
## ════════════════════════════════════════

### 2-1. Design Direction: "Signal Strip"
Stripe Dashboard / Linear App 스타일. 좌측에 tone 색상 스트립이 콘텐츠 전체를 관통하며 진단적 시그널을 전달한다.

### 2-2. Core Layout — 좌측 Signal Strip
- 슬라이드 좌측에 **5px 너비의 tone 색상 vertical strip** 배치
- 이 strip은 body text + bullets 영역을 수직으로 관통
- strip과 콘텐츠 사이 padding-left: 24px
- strip은 SlideHeader 아래에서 시작, SlideBottomMessage 위에서 종료
- strip 색상: tone에 따라 변경 (positive=#059669, negative=#DC2626, neutral=#004B8D)

### 2-3. Body Text (content 영역)
- strip 오른쪽에 배치
- text-lg, leading-relaxed, text-gray-600
- 최대 2줄로 간결하게
- content가 빈 문자열이면 생략

### 2-4. Bullets 영역 — 핵심 자유 영역 ★
- 미니멀 행(row) 스타일, 카드 없음
- 각 bullet 앞에 tone 색상의 **작은 원형 dot** (w-2.5 h-2.5 rounded-full)
- bullet 텍스트: text-base~lg, text-gray-700
- bullet 간 separator: 매우 얇은 border-b border-gray-100 (마지막 항목 제외)
- 각 행: py-3, 깔끔한 리스트 느낌
- dot 옆에 넘버링 없음 (dot만)
- 최대 5개 대응

### 2-5. 전체 레이아웃 Flow
```
[SlideHeader]
   ↓ gap-8
┌─────────────────────────────────────┐
│ ▌ [Body Text]                       │  ← 5px tone strip 관통
│ ▌ ● bullet 1                        │
│ ▌ ─────────────────────────         │
│ ▌ ● bullet 2                        │
│ ▌ ─────────────────────────         │
│ ▌ ● bullet 3                        │
└─────────────────────────────────────┘
   ↓ gap-6
[SlideBottomMessage]
```

### 2-6. Subtle Decorations
- 없음. 이 안은 극도의 미니멀리즘. 장식 요소 0개.
- 여백과 strip 색상만으로 시각적 위계를 만든다.

---

## ════════════════════════════════════════
## SECTION 3: PREVIEW DATA (렌더링 확인용)
## ════════════════════════════════════════

```tsx
<ContentSlide
  title="원인 3: 블로그 환경이 바뀌었습니다"
  content="2025년 규제 환경 변화 (대구 한의원간 민원 전쟁으로 인한 결과)"
  bullets={[
    "블로그에 치료 관련 적극적 노출 제한",
    "경쟁사 블로그: 최적화",
    "정이안 블로그: 준최적화",
    "최적화 블로그 구매: 2천만원+, 물량도 불확실",
  ]}
  emphasis="블로그의 홍보 패턴은 변화가 필요합니다"
  tone="negative"
/>
```

---

## TECHNICAL REQUIREMENTS
- React functional component, TypeScript
- Tailwind CSS only (no external CSS)
- lucide-react for icons
- No animations (static presentation)
- w-full h-full (부모 컨테이너에 맞춤)
- 1280×720 비율 기준 디자인
