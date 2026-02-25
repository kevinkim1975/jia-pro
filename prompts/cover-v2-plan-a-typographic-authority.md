# CoverSlide v2 Plan A — "Typographic Authority"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 표지에서 가장 강력한 디자인 요소는 타이포그래피 자체다. 장식을 걷어내고, 글자의 크기·무게·리듬만으로 권위를 만든다. Apple 키노트, Dieter Rams 미니멀리즘에서 차용.

## TASK
1280×720px 고정 캔버스에 프레젠테이션 "표지" 슬라이드를 React/TypeScript로 구현.
제목이 화면을 지배하는 초대형 타이포그래피 중심 디자인. 장식은 극도로 절제하되, 텍스트 등장 시퀀스 애니메이션으로 생동감 부여.

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

### 색상 팔레트 (이 색상만 사용)
- Primary: #004B8D (Ocean Blue)
- Accent: #48A9C5 (Teal Green)
- Mint: #10B981 (Soft Mint) — 극소량 포인트만
- Surface: #F8FAFC
- Text: #1E293B (진한), #64748B (중간), #94A3B8 (연한), #CBD5E1 (최연한)

### 금지사항
- shadcn Card, shadcn UI 컴포넌트 일체 사용 금지
- default export 금지
- lucide-react 아이콘 금지
- 빨간색 계열 UI 장식 금지
- 외부 이미지, 로고 사용 금지

## ── FREE (v0 자유도) ────────────────────────────

### 핵심: 초대형 타이포 + 시퀀스 애니메이션

1. **배경**: 흰색(#FFFFFF) 또는 #F8FAFC
   - 장식은 최대 2~3개만 (선 또는 도형, 극도로 절제)
   - opacity 0.08~0.15 수준으로 은은하게

2. **타이포그래피 레이아웃**:
   - title: 80~100px, font-black(900), #004B8D
   - 화면 좌측 또는 중앙 하단 배치 (중앙-중앙은 피할 것 — 현재 디자인과 차별화)
   - subtitle: 24~28px, font-medium(500), #48A9C5, letter-spacing 넓게
   - title과 subtitle 사이에 gradient line divider (from-[#004B8D] to-[#48A9C5], w-80~120px, h-0.5~1px)

3. **메타 정보** (date, company):
   - 화면 하단 또는 title과 떨어진 위치
   - date: 16~18px, #64748B
   - company: 18~20px, font-semibold, #004B8D
   - "PROPOSAL" 라벨: 12~14px, uppercase, letter-spacing 0.3em, #CBD5E1

4. **애니메이션 시퀀스** (CSS keyframes, @keyframes):
   - title: 0ms — fadeIn + translateY(-8px→0), duration 600ms
   - divider line: 200ms delay — scaleX(0→1), duration 400ms  
   - subtitle: 400ms delay — fadeIn, duration 500ms
   - date/company: 600ms delay — fadeIn, duration 500ms
   - 장식 요소: 천천히 부유 (float, 10~15s cycle)

5. **시각적 계층**: title ≫ subtitle > divider > company > date > PROPOSAL
   - 누구나 0.5초 안에 "정이안한의원"을 읽을 수 있어야 함

## ── SAMPLE DATA (반드시 이 데이터 사용) ──

```tsx
<CoverSlide
  title="정이안한의원"
  subtitle="마케팅 전략 제안"
  date="2026. 01"
  company="호원앤컴퍼니"
/>
```
