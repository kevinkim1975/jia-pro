# FlowSteps Plan A — "Timeline Rail"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.

## TASK
1280×720px 고정 캔버스에 "단계별 프로세스" 슬라이드를 React/TypeScript로 구현.
Gantt 타임라인 스타일의 수평 레일 위에 원형 노드로 단계를 배치.

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
- 2-column card grid 금지
- default export 금지
- sampleData / Preview 컴포넌트 금지
- hover/transition/animation 금지

## ── FREE (v0 자유도) ────────────────────────────

### 디자인 컨셉: Timeline Rail
수평 연속 레일 라인 위에 원형 노드가 놓이는 구조.

### 레이아웃 가이드
1. **수평 레일 라인**: 캔버스 중앙 높이에 2px 수평선 (#E5E7EB)
   - 양쪽 끝은 둥글게 (rounded)
   - 진행 구간은 gradient (#004B8D → #48A9C5)로 채움

2. **원형 노드**: 레일 위에 놓이는 원 (w-12 h-12)
   - 배경: #004B8D
   - 텍스트: 흰색 step 번호
   - 레일 라인 중앙에 정확히 위치

3. **텍스트 배치**: 노드 아래에 수직 배치
   - step.title: text-base font-bold, #1F2937
   - step.description: text-sm, #6B7280
   - 노드 중심 기준 text-center

4. **간격**: steps를 균등 분배 (justify-between)
   - 3개 스텝: 양쪽 여백 충분히
   - 4개 스텝: 간격 자동 축소

5. **빈 공간 관리**:
   - 레일 영역이 캔버스 중앙 40% 차지
   - 상단: SlideHeader (약 20%)
   - 하단: SlideBottomMessage (약 20%)
   - 나머지 여백은 의도된 breathing room

### 참고 스타일: Gantt chart milestone markers, subway map

## ── SAMPLE DATA (테스트용) ─────────────────────
3개 스텝:
```
title: "질환 전환 실행 로드맵"
steps: [
  { step: 1, title: "해당 질환", description: "수요 분석" },
  { step: 2, title: "질환 방향", description: "확정" },
  { step: 3, title: "연간 캘린더", description: "수립" },
]
bottomMessage: "방향이 정해지면, 실행 계획을 함께 수립합니다"
```
