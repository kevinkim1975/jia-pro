# FlowSteps v2 Plan A — "Giant Numbers"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 타이포그래피가 곧 디자인이다. 장식 요소를 최소화하고 숫자와 텍스트의 크기 대비로 시각 위계를 만든다.

## TASK
1280×720px 고정 캔버스에 "단계별 프로세스" 슬라이드를 React/TypeScript로 구현.

**컨셉: 거대 번호가 디자인 그 자체**
각 스텝의 번호(01, 02, 03)가 120px 크기로 존재감을 지배.
번호 옆에 title과 description이 작게 붙는다.
화살표, 라인, 아이콘, 도형 일체 없음. 오직 타이포그래피 크기 대비.

## ── FROZEN (절대 변경 금지) ────────────────────

### Import (반드시 사용, 직접 구현 금지)
```tsx
import { SlideHeader } from "./shared/SlideHeader"
import { SlideBottomMessage } from "./shared/SlideBottomMessage"
```

### Interface (정확히 이 타입)
```tsx
interface FlowStepsSlideProps {
  readonly title: string
  readonly steps: readonly {
    readonly step: number
    readonly title: string
    readonly description?: string
  }[]
  readonly bottomMessage?: string
}
```

### Export
```tsx
export function FlowStepsSlide({ title, steps, bottomMessage }: FlowStepsSlideProps)
```

### Canvas
- 루트 div: width 1280px, height 720px 고정, inline style
- 배경: #F8FAFC
- fontFamily: "Pretendard, -apple-system, sans-serif"
- 반응형 클래스(md:, lg:) 사용 금지

### Header
- `<SlideHeader title={title} align="left" />` 호출
- 직접 타이틀 구현 금지

### Bottom Message
- bottomMessage 존재 시 `<SlideBottomMessage>{bottomMessage}</SlideBottomMessage>` 호출
- 직접 구현 금지

### Colors (이 값만 사용)
- Primary: #004B8D
- Accent: #48A9C5
- Gray 계열: Tailwind gray-100~900

### 금지사항
- shadcn Card 사용 금지
- default export 금지
- sampleData / Preview 컴포넌트 금지
- hover/transition/animation 금지
- lucide-react 아이콘 금지 (ArrowRight 등 일체 금지)
- SVG 도형, 화살표, 연결선 금지
- 원형 노드, 뱃지 금지

## ── FREE (v0 자유도) ────────────────────────────

### 핵심: 타이포그래피만으로 단계 표현

1. **거대 번호**: 각 step.step을 2자리로 포맷 (01, 02, 03, 04)
   - font-size: 약 120px (7.5rem)
   - font-weight: 900 (black)
   - color: #004B8D, opacity 약 0.12~0.15 (배경처럼 은은하게)
   - 또는 stroke-only 처리 (outline 느낌)

2. **텍스트 블록**: 거대 번호의 우측 또는 위에 겹쳐서
   - step.title: text-xl font-bold, #1F2937
   - step.description: text-base, #6B7280
   - 번호와 텍스트의 크기 대비가 시각적 임팩트

3. **수평 배치**: steps를 가로로 균등 배치
   - 각 스텝이 하나의 컬럼
   - 컬럼 사이 구분: 없음 또는 1px 수직선
   - 전체 너비를 균등 분할

4. **빈 공간**: 거대 번호가 공간을 시각적으로 채움
   - 실제 콘텐츠가 적어도 120px 숫자가 존재감 발휘
   - 3개든 4개든 동일한 밀도감

### 참고: Vogue 매거진 섹션 넘버링, Bloomberg 리포트 챕터 헤딩

## ── SAMPLE DATA (테스트용) ─────────────────────
4개 스텝 (최대 케이스):
```
title: "이론은 의도를 배양하고 실전에서 역량을"
steps: [
  { step: 1, title: "형태", description: "맞춤형 교육 (조직 진단 기반)" },
  { step: 2, title: "이론교육", description: "의도와 마인드 배양" },
  { step: 3, title: "행동교정", description: "실전 역량 강화" },
  { step: 4, title: "혼합형 교육 시스템", description: "이론 + 실전의 통합" },
]
bottomMessage: "방식: 이론교육 + 행동교정 → 혼합형 교육 시스템"
```
