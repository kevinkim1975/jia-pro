# FlowSteps Plan B — "Chevron Pipeline"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.

## TASK
1280×720px 고정 캔버스에 "단계별 프로세스" 슬라이드를 React/TypeScript로 구현.
쉐브론(화살표 블록) 형태가 연결되는 파이프라인 구조. 블록 자체가 방향성을 내포.

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
- lucide-react ArrowRight 아이콘 금지 (쉐브론 도형이 방향 표현)

## ── FREE (v0 자유도) ────────────────────────────

### 디자인 컨셉: Chevron Pipeline
각 스텝이 쉐브론(화살표 꼬리) 모양 블록으로, 나란히 이어붙여 파이프라인을 형성.

### 레이아웃 가이드
1. **쉐브론 블록**: SVG 또는 CSS clip-path로 화살표 형태 구현
   - 각 블록이 오른쪽 끝이 뾰족한 화살표 모양
   - 다음 블록의 왼쪽 오목한 부분과 맞물림
   - 첫 번째 블록: 왼쪽 직선, 오른쪽 뾰족
   - 마지막 블록: 왼쪽 오목, 오른쪽 뾰족

2. **색상 그라데이션**: 단계별로 점진적 색상 변화
   - Step 1: #004B8D (가장 진함)
   - 중간 Steps: #004B8D → #48A9C5 보간
   - 마지막 Step: #48A9C5
   - 텍스트: 모두 white

3. **블록 내부 레이아웃**:
   - 상단: step 번호 (text-sm, opacity-80)
   - 중앙: step.title (text-lg font-bold)
   - 하단: step.description (text-sm, opacity-80)
   - 수직 중앙 정렬

4. **블록 크기**:
   - 각 블록 높이: 120~140px
   - 너비: 캔버스 가용 영역을 steps 수로 균등 분할
   - 쉐브론 뾰족 부분 너비: 약 24px

5. **빈 공간 관리**:
   - 쉐브론 영역이 캔버스 중앙 영역 차지
   - 좌우 패딩: px-16
   - 블록들이 가로 전체를 채움 → 빈 공간 최소

### 참고 스타일: McKinsey process chevrons, PowerPoint SmartArt "Chevron List"

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
