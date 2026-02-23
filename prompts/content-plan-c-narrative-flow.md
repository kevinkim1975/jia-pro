# Plan C: "Narrative Flow" — ContentSlide v0 Prompt

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

### 2-1. Design Direction: "Narrative Flow"
McKinsey 전략 보고서 스타일. 불릿이 타임라인처럼 연결되며 "문제 → 원인 → 결론"의 서사 흐름을 시각적으로 표현한다.

### 2-2. Body Text (content 영역)
- SlideHeader 바로 아래, 큰 따옴표 없이 심플한 서브타이틀 느낌
- text-lg, text-gray-500, font-medium
- 제목의 부연설명 역할, 간결하게
- content가 빈 문자열이면 생략

### 2-3. Bullets 영역 — 핵심 자유 영역 ★
- **Vertical Timeline** 스타일 연결
- 좌측에 tone 색상의 vertical line (w-0.5, 2px)
- 각 bullet 위치에 timeline node: tone 색상 원 (w-3 h-3 rounded-full, border-2, bg-white)
- node에서 오른쪽으로 연결되는 콘텐츠 영역
- 각 bullet 콘텐츠: bg-white rounded-lg p-4 shadow-sm border border-gray-100
- 넘버링: node 안이 아니라 카드 내부 좌상단에 tone 색상 텍스트로 "01" "02" 형식
- line은 첫 번째 node 중심에서 마지막 node 중심까지만 (위아래 여분 없음)
- 최대 5개 대응

### 2-4. 전체 레이아웃 Flow
```
[SlideHeader]
[Body Text - subtitle style]
   ↓ gap-8
    ○── [01. bullet card 1]
    │
    ○── [02. bullet card 2]
    │
    ○── [03. bullet card 3]
    │
    ○── [04. bullet card 4]
   ↓ gap-6
[SlideBottomMessage]
```

### 2-5. Subtle Decorations
- SlideHeader 우측에 tone에 따른 작은 badge 표시
  - positive: "긍정" 또는 ▲ 기호 (emerald)
  - negative: "주의" 또는 ▼ 기호 (red)
  - neutral: 표시 없음
- badge: text-xs, px-2 py-0.5, rounded-full, tone bg + tone text
- 이것은 프레젠터가 슬라이드 톤을 즉시 파악하게 하는 장치

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
