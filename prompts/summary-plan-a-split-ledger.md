# SummarySlide Plan A — "Split Ledger"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 수직 분할이 양측 동시 스캔을 가능하게 한다. 카드 없이, 수직 hairline과 타이포그래피 위계만으로 두 영역을 명징하게 구분.

## TASK
1280×720px 고정 캔버스에 "핵심 요약" 슬라이드를 React/TypeScript로 구현.

**컨셉: 분할 원장 (Split Ledger)**
좌측 = keyPoints 영역(primary blue 톤), 우측 = nextSteps 영역(emerald 톤).
두 영역은 1px 수직 hairline으로만 구분. 카드/배경색 차이 없음.
각 항목에 대형 번호(opacity 낮게)가 배경 역할을 하고 본문이 그 위에 놓임.
nextSteps가 없으면 keyPoints가 중앙 단일 컬럼으로 확장.
McKinsey executive summary page, Swiss financial report에서 차용.

## ── FROZEN (절대 변경 금지) ────────────────────

### Import (반드시 사용, 직접 구현 금지)
```tsx
import { SlideHeader } from "./shared/SlideHeader"
```
※ SlideBottomMessage 불필요 (인터페이스에 bottomMessage 없음)

### Interface (정확히 이 타입)
```tsx
interface SummarySlideProps {
  readonly title: string
  readonly keyPoints: readonly string[]
  readonly nextSteps?: readonly string[]
}
```

### Export
```tsx
export function SummarySlide({ title, keyPoints, nextSteps }: SummarySlideProps)
```

### Canvas
- 루트 div: width 1280px, height 720px 고정, inline style
- 배경: #F8FAFC
- fontFamily: "Pretendard, -apple-system, sans-serif"
- 반응형 클래스(md:, lg:) 사용 금지

### Header
- `<SlideHeader title={title} align="left" />` 호출
- 직접 타이틀 구현 금지

### SlideHeader 내부 구조 (참고용, 수정 불가)
```tsx
<div className="space-y-2">
  <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
  <h2 className="text-3xl font-bold text-gray-900 leading-tight">{title}</h2>
</div>
```

### Colors (이 값만 사용)
- Primary: #004B8D (keyPoints 계열)
- Accent: #48A9C5 (보조)
- Success: #10B981 (nextSteps 계열)
- Gray 계열: Tailwind gray-100~900
- 빨간색 계열 사용 절대 금지

### 금지사항
- shadcn Card, shadcn UI 컴포넌트 일체 사용 금지
- default export 금지
- sampleData / Preview 컴포넌트 금지
- hover/transition/animation 금지
- lucide-react 아이콘 금지
- SVG 도형 금지

## ── FREE (v0 자유도) ────────────────────────────

### 핵심: 수직 2단 분할 + 대형 번호 배경

1. **전체 레이아웃**: SlideHeader 아래 flex-1 영역
   - nextSteps 존재 시: grid-cols-2 균등 분할
   - nextSteps 없을 시: 단일 컬럼, max-w-2xl mx-auto 중앙 배치
   - 좌우 패딩: px-16

2. **수직 구분선** (nextSteps 존재 시만):
   - 1px 너비, 색상 #E5E7EB
   - 두 컬럼 사이 정중앙
   - 높이: 콘텐츠 영역 전체

3. **keyPoints 영역 (좌측 또는 단독)**:
   - 섹션 라벨: "핵심 요약" — text-sm font-semibold uppercase tracking-wider text-[#004B8D]
   - 라벨 아래 accent bar: w-8 h-0.5 bg-[#004B8D]
   - 각 항목: 대형 번호 text-4xl font-black #004B8D opacity-0.12 좌측, 본문 text-base #374151 pl-12
   - 번호 포맷: 01, 02, 03, 04
   - 항목 간격: space-y-5

4. **nextSteps 영역 (우측, 존재 시만)**:
   - 섹션 라벨: "Next Steps" — text-sm font-semibold uppercase tracking-wider text-[#10B981]
   - 라벨 아래 accent bar: w-8 h-0.5 bg-[#10B981]
   - 각 항목: 번호 text-4xl font-black #10B981 opacity-0.12, 본문 text-base #374151
   - 번호 포맷: 01, 02, 03
   - 항목 간격: keyPoints와 동일

5. **수직 리듬**: SlideHeader → mt-8 → 콘텐츠 영역, 하단 breathing room

### 참고: McKinsey summary decks, Swiss financial statements, FT data pages

## ── SAMPLE DATA (3안 비교용 — 반드시 이 데이터 사용) ──

```tsx
<SummarySlide
  title="핵심 제안 요약"
  keyPoints={[
    "냉증 시장 축소(-36%)에 따른 질환 방향 재설정 필수",
    "지식인 채널 중심의 콘텐츠 마케팅 전환",
    "블로그 전문성 강화 및 파워링크 최적화",
    "AI CRM 시스템 도입으로 환자 관리 체계화"
  ]}
  nextSteps={[
    "주력 질환 방향 확정 (원장님 논의)",
    "계절성 분석 기반 콘텐츠 캘린더 수립",
    "CRM 시스템 구축 및 교육 프로그램 시작"
  ]}
/>
```
