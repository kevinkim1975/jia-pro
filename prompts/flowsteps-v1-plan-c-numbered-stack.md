# FlowSteps Plan C — "Numbered Stack"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.

## TASK
1280×720px 고정 캔버스에 "단계별 프로세스" 슬라이드를 React/TypeScript로 구현.
수직 스태킹 구조 — 좌측에 거대 번호, 우측에 텍스트, 수직선으로 연결.

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
- Success: #10B981
- Gray 계열: Tailwind gray-100~900

### 금지사항
- shadcn Card 컴포넌트 사용 금지
- default export 금지
- sampleData / Preview 컴포넌트 금지
- hover/transition/animation 금지

## ── FREE (v0 자유도) ────────────────────────────

### 디자인 컨셉: Numbered Stack (Material Stepper Editorial)
좌측 수직선 + 원형 노드, 우측에 텍스트 콘텐츠가 수직으로 쌓이는 구조.
Google Material Design Stepper의 에디토리얼 변형.

### 레이아웃 가이드 (2-Column: Number | Content)
1. **좌측 영역 (약 80px)**:
   - 수직 연결선: 2px, #E5E7EB, 첫 노드~마지막 노드 연결
   - 원형 노드: w-12 h-12, 배경 #004B8D, 흰색 번호
   - 노드가 수직선 위에 겹쳐 배치 (absolute positioning)
   - 마지막 노드: #48A9C5 (도착 강조)

2. **우측 영역 (나머지 전부)**:
   - step.title: text-xl font-bold, #1F2937
   - step.description: text-base, #6B7280
   - 각 행의 title이 좌측 노드와 수평 정렬

3. **행 구조**: 각 step이 하나의 행
   - 행 간격: gap-8 또는 균등 분배
   - 3개 스텝: 행 간격 넓게 → 캔버스 채움
   - 4개 스텝: 행 간격 자동 축소

4. **구분선**: 각 행 사이에 미세한 수평 구분선 없음
   - 수직선 + 노드만으로 단계 구분

5. **빈 공간 관리**:
   - 스텝 영역이 flex-1로 가용 공간 전체 사용
   - justify-between으로 균등 분배
   - 3개든 4개든 캔버스를 고르게 채움

### 참고 스타일: Material Design Vertical Stepper, 에디토리얼 잡지 목차

## ── SAMPLE DATA (테스트용) ─────────────────────
3개 스텝:
```
title: "Next Step"
steps: [
  { step: 1, title: "질환 방향", description: "확정" },
  { step: 2, title: "계절성", description: "분석" },
  { step: 3, title: "실행 캘린더", description: "수립" },
]
bottomMessage: "질환을 결정하는 여정이 될 것입니다"
```
