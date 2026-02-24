# SummarySlide Plan B — "Stacked Editorial"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 위에서 아래로 흐르는 독서 패턴이 가장 자연스럽다. 상단 핵심, 하단 실행 — 수평 gradient rule 하나로 두 세계를 나눈다.

## TASK
1280×720px 고정 캔버스에 "핵심 요약" 슬라이드를 React/TypeScript로 구현.

**컨셉: 적층 에디토리얼 (Stacked Editorial)**
상단 60% = keyPoints, 하단 40% = nextSteps. 두 영역 사이 gradient rule(2px).
keyPoints는 번호 인라인 + 텍스트 행, 넉넉한 행간으로 호흡.
nextSteps는 수평 flex-row로 컴팩트 나열.
nextSteps 없으면 keyPoints가 전체 높이 점유.
Bloomberg terminal summary, newspaper editorial에서 차용.

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

### 핵심: 수평 2단 적층 + gradient rule 구분

1. **전체 레이아웃**: SlideHeader 아래 flex-1 영역, flex-col
   - 좌우 패딩: px-16
   - nextSteps 존재 시: keyPoints 60% + rule + nextSteps 40%
   - nextSteps 없을 시: keyPoints가 전체 flex-1 차지

2. **keyPoints 영역 (상단)**:
   - 섹션 라벨: "핵심 요약" — text-xs font-bold uppercase tracking-widest text-[#004B8D]/60
   - 각 항목 구조 (수평 행):
     - 좌측 번호: inline, text-lg font-black text-[#004B8D]/30, mr-4
       → 포맷: "01", "02", "03", "04"
     - 본문: text-base font-medium text-[#1F2937], leading-relaxed
   - 항목 간 간격: space-y-4
   - 항목 사이에 선택적 1px hairline (#F3F4F6) 가능 (v0 판단)

3. **Gradient Rule (구분선)**:
   - nextSteps 존재 시만 표시
   - 높이 2px, 전폭
   - bg-gradient-to-r from-[#004B8D] to-[#48A9C5]
   - 상하 마진: my-6

4. **nextSteps 영역 (하단, 존재 시만)**:
   - 섹션 라벨: "Next Steps" — text-xs font-bold uppercase tracking-widest text-[#10B981]/60
   - 수평 나열: flex flex-row gap-8
   - 각 항목 구조:
     - 상단 번호: text-sm font-bold text-[#10B981]
     - 하단 텍스트: text-sm text-[#374151], leading-snug
     - 항목 너비: flex-1 (균등 분배)
     - 각 항목 상단에 w-6 h-0.5 bg-[#10B981] accent bar

5. **수직 리듬**:
   - SlideHeader → mt-8 → keyPoints 영역
   - 하단은 breathing room

### 참고: Bloomberg terminal, The Guardian long-read layout, editorial page design

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
