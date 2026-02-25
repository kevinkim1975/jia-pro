# CoverSlide v2 Plan C — "Split Block"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 화면을 두 영역으로 나누면 정보 계층이 즉시 명확해진다. 컬러 블록이 브랜드 아이덴티티를, 흰색 영역이 정보를 담당한다. McKinsey 보고서, Pentagram 아이덴티티 시스템에서 차용.

## TASK
1280×720px 고정 캔버스에 프레젠테이션 "표지" 슬라이드를 React/TypeScript로 구현.
좌측 컬러 블록(~40%) + 우측 텍스트 영역(~60%) 분할 레이아웃. 분할선 애니메이션과 텍스트 시퀀스로 세련됨.

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

### 색상 팔레트
- Primary: #004B8D (Ocean Blue)
- Accent: #48A9C5 (Teal Green)
- Mint: #10B981 (Soft Mint)
- Surface: #F8FAFC, #FFFFFF
- 어두운 변형: #001529 ~ #003366 범위 허용

### 금지사항
- shadcn Card, shadcn UI 컴포넌트 일체 사용 금지
- default export 금지
- lucide-react 아이콘 금지
- 빨간색 계열 금지
- 외부 이미지, 로고 사용 금지

## ── FREE (v0 자유도) ────────────────────────────

### 핵심: 좌측 컬러 블록 + 우측 텍스트 + 분할선 애니메이션

1. **좌측 컬러 블록** (~38~42%):
   - 배경: #004B8D 단색 또는 #001529→#004B8D gradient
   - 블록 안에 배치할 것들 (디자이너 자유 선택):
     - "PROPOSAL" 라벨: 대형(24~36px), uppercase, letter-spacing 0.4em, rgba(255,255,255,0.15~0.25), 세로 배치 또는 가로
     - 또는 연도 "2026": 초대형(120~200px), font-black, rgba(255,255,255,0.06~0.1)
     - 또는 추상적 기하학 요소 1~2개 (원호, 가는 선, opacity 0.08~0.15)
   - 이 블록은 "분위기"를 담당 — 정보 전달이 아님

2. **분할선**:
   - 좌측 블록과 우측 사이 경계
   - gradient line (vertical): from-transparent via-[#48A9C5] to-transparent, w-0.5~1px
   - 애니메이션: scaleY(0→1), 600ms, ease-out, 페이지 로드시

3. **우측 텍스트 영역** (~58~62%):
   - 배경: #FFFFFF 또는 #F8FAFC
   - 수직 중앙 정렬, pl-12~16, pr-10~12
   - title: 56~72px, font-bold(700) 또는 font-black(900), #004B8D
   - subtitle: 22~26px, font-medium(500), #48A9C5, mt-3~4
   - divider: w-60~80px, h-0.5~1px, bg-gradient from-[#004B8D] to-[#48A9C5], mt-6
   - date: 16~18px, #64748B, mt-6~8
   - company: 18~20px, font-semibold, #004B8D, mt-1~2

4. **애니메이션** (CSS keyframes):
   - 좌측 블록: slideInFromLeft, 0ms, 500ms duration (translateX(-100%→0))
   - 분할선: scaleY(0→1), 300ms delay, 400ms duration
   - 우측 title: fadeIn + translateX(20px→0), 500ms delay
   - 우측 subtitle~meta: 순차 페이드인, 100ms 간격
   - 좌측 블록 내 장식: 느린 float 또는 pulse, 10~15s cycle

5. **정보 계층**: 좌측 블록(분위기) | 분할선(구조) | title ≫ subtitle > company > date

## ── SAMPLE DATA (반드시 이 데이터 사용) ──

```tsx
<CoverSlide
  title="정이안한의원"
  subtitle="마케팅 전략 제안"
  date="2026. 01"
  company="호원앤컴퍼니"
/>
```
