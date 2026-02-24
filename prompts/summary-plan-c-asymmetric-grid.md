# SummarySlide Plan C — "Asymmetric Grid"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 비대칭이 위계를 선언한다. 넓은 영역 = 중요한 정보. 좁은 영역 = 실행 항목. 레이아웃 자체가 메시지.

## TASK
1280×720px 고정 캔버스에 "핵심 요약" 슬라이드를 React/TypeScript로 구현.

**컨셉: 비대칭 그리드 (Asymmetric Grid)**
좌측 65% = keyPoints(주인공), 우측 35% = nextSteps(조연).
비대칭 비율이 "핵심 요약이 더 중요하다"를 시각적으로 선언.
keyPoints 각 항목 앞에 3px accent bar. nextSteps는 컴팩트 리스트.
nextSteps 없으면 keyPoints가 전폭 확장.
The Economist infographic, consulting deck summary에서 차용.

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

### 핵심: 65:35 비대칭 분할 + accent bar 항목

1. **전체 레이아웃**: SlideHeader 아래 flex-1 영역
   - 좌우 패딩: px-16
   - nextSteps 존재 시: 커스텀 grid — 좌측 65%, 우측 35% (grid-cols-[65fr_35fr] 또는 flex basis)
   - nextSteps 없을 시: keyPoints 단일 영역, max-w-3xl
   - 두 영역 사이 gap: gap-12

2. **keyPoints 영역 (좌측 65% 또는 전폭)**:
   - 섹션 라벨: "핵심 요약" — text-xs font-bold uppercase tracking-widest text-[#004B8D]/60
   - 라벨 아래 mb-6
   - 각 항목 구조:
     - 좌측 accent bar: w-1 (3~4px), 높이 auto(텍스트 높이와 동일), bg-[#004B8D]
       → 스텝별 색상 점진 변화: 첫 번째 #004B8D → 마지막 #48A9C5 (interpolation)
     - bar 오른쪽 pl-4:
       - 번호: text-xs font-bold text-[#004B8D]/40, "POINT 01" 포맷
       - 본문: text-base text-[#1F2937], leading-relaxed, mt-1
   - 항목 간 간격: space-y-5

3. **nextSteps 영역 (우측 35%, 존재 시만)**:
   - 영역 전체에 좌측 border: border-l-1 border-[#E5E7EB], pl-8
   - 섹션 라벨: "Next Steps" — text-xs font-bold uppercase tracking-widest text-[#10B981]/60
   - 라벨 아래 mb-6
   - 각 항목 구조:
     - 번호 원: w-6 h-6 rounded-full bg-[#10B981]/10, 내부 text-xs font-bold text-[#10B981]
     - 텍스트: text-sm text-[#374151], leading-snug, ml-3
   - 항목 간 간격: space-y-4

4. **수직 리듬**:
   - SlideHeader → mt-8 → 콘텐츠 영역
   - 하단은 breathing room

### 참고: The Economist data pages, McKinsey recommendation slides, Deloitte consulting decks

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
