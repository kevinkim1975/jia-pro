# CoverSlide v2 Plan B — "Deep Gradient Aurora"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 깊이감 있는 배경이 프리미엄을 만든다. 어두운 그라디언트 위에 빛나는 텍스트가 올라오면, 평범한 제안서도 브랜드 론칭처럼 보인다. Stripe Atlas, Linear 런칭 페이지에서 차용.

## TASK
1280×720px 고정 캔버스에 프레젠테이션 "표지" 슬라이드를 React/TypeScript로 구현.
딥 그라디언트 배경 위에 글래스모피즘 느낌의 레이어와 오로라 애니메이션으로 현대적 프리미엄 표지.

## ── FROZEN (절대 변경 금지) ────────────────────

### 파일 상단
```tsx
"use client"
```

### Interface
```tsx
interface CoverSlideProps {
  readonly title: string
  readonly subtitle?: string
  readonly date: string
  readonly company: string
}
```

### Export
```tsx
export function CoverSlide({ title, subtitle, date, company }: CoverSlideProps)
```

### Canvas
- 루트 div: width 1280px, height 720px 고정, inline style
- fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
- overflow: hidden
- 반응형 클래스(md:, lg:) 사용 금지

### SlideHeader
- 표지이므로 SlideHeader 사용하지 않음

### 색상 팔레트 (이 색상 기반, 어두운 변형 허용)
- Primary: #004B8D (Ocean Blue)
- Accent: #48A9C5 (Teal Green)
- Mint: #10B981 (Soft Mint)
- 어두운 배경용: #001529 ~ #002D5C 범위의 딥 네이비 허용

### 금지사항
- shadcn Card, shadcn UI 컴포넌트 일체 사용 금지
- default export 금지
- lucide-react 아이콘 금지
- 빨간색 계열 금지
- 외부 이미지, 로고 사용 금지

## ── FREE (v0 자유도) ────────────────────────────

### 핵심: 딥 그라디언트 배경 + 오로라 + 글래스 텍스트 영역

1. **배경**:
   - 다층 그라디언트: #001529 → #002D5C → #004B8D (대각선 또는 radial)
   - **오로라 효과**: 2~3개의 거대한 blur blob (300~500px)
     - #48A9C5 opacity 0.15, #10B981 opacity 0.08
     - 느린 부유 애니메이션 (15~20s cycle)
     - filter: blur(80~120px)
   - 미세한 noise 텍스처 (CSS radial-gradient로 dot pattern, opacity 0.03)

2. **텍스트 영역** (중앙 또는 좌측 하단):
   - 선택적 글래스 패널: background rgba(255,255,255,0.03~0.06), border 1px rgba(255,255,255,0.08), backdrop-filter blur(8px), rounded-2xl, px-12 py-10
   - 또는 패널 없이 텍스트만 직접 배치 (디자이너 판단)
   - title: 72~90px, font-bold(700) 또는 font-black(900), #FFFFFF
   - subtitle: 24~28px, font-medium(500), #48A9C5 또는 rgba(255,255,255,0.7)
   - divider: gradient line from-[#48A9C5] to-transparent, w-80~120px
   - date: 16~18px, rgba(255,255,255,0.5)
   - company: 18~20px, font-semibold, rgba(255,255,255,0.8) 또는 #48A9C5
   - "PROPOSAL": 12~14px, uppercase, letter-spacing 0.3em, rgba(255,255,255,0.2)

3. **장식 요소**:
   - 가는 원호(arc) 1~2개: stroke rgba(255,255,255,0.06~0.1), dasharray
   - 또는 미세한 grid line: rgba(255,255,255,0.03)
   - 과도한 기하학적 요소 금지 — 오로라 자체가 장식

4. **애니메이션** (CSS keyframes):
   - 오로라 blob: translateX/Y 느린 이동, 15~20s cycle
   - 텍스트 시퀀스: title(0ms) → subtitle(300ms) → meta(500ms), fadeIn + slight translateY
   - 선택적: 배경 그라디언트 angle 미세 회전 (매우 느리게, 30s+ cycle)

5. **핵심 느낌**: 어둠 속에서 빛이 떠오르는 듯한 프리미엄감. 의료기관이지만 혁신적이고 현대적인 인상.

## ── SAMPLE DATA (반드시 이 데이터 사용) ──

```tsx
<CoverSlide
  title="정이안한의원"
  subtitle="마케팅 전략 제안"
  date="2026. 01"
  company="호원앤컴퍼니"
/>
```
