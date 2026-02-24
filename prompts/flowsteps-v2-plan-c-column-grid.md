# FlowSteps v2 Plan C — "Column Grid"

## ROLE
40년 경력의 시니어 프레젠테이션 디자이너. 의료기관 마케팅 제안서 전문.
핵심 원칙: 그리드 시스템이 질서를 만든다. 카드 없이, 상단 액센트 라인과 타이포그래피 위계만으로 각 단계를 구분.

## TASK
1280×720px 고정 캔버스에 "단계별 프로세스" 슬라이드를 React/TypeScript로 구현.

**컨셉: 에디토리얼 컬럼 그리드**
steps 수만큼 균등 컬럼 분할. 각 컬럼 상단에 짧은 accent bar(40px 너비, 3px 높이),
그 아래 번호, title, description 수직 배치.
카드 border 없음. 상단 accent bar와 여백만으로 영역 구분.
신문/잡지 다단 기사 레이아웃에서 차용.

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
- lucide-react 아이콘 금지
- SVG 도형, 화살표, 연결선 금지

## ── FREE (v0 자유도) ────────────────────────────

### 핵심: 카드 없는 컬럼 그리드 + 상단 액센트 바

1. **그리드 구조**: steps.length에 따라 균등 컬럼
   - 3개 → grid-cols-3
   - 4개 → grid-cols-4
   - 컬럼 사이 gap: gap-8 또는 gap-12
   - 좌우 패딩: px-16

2. **각 컬럼 내부** (상단→하단 수직 배치):
   - **Accent Bar**: 40px 너비, 3px 높이, 색상 점진 변화
     - Step 1: #004B8D
     - Step 2: #004B8D와 #48A9C5 사이 보간
     - 마지막 Step: #48A9C5
   - **번호**: step 번호를 2자리 포맷 (01, 02, 03)
     - text-5xl font-black, #004B8D opacity 0.2
     - mt-4
   - **Title**: step.title
     - text-lg font-bold, #1F2937
     - mt-2
   - **Description**: step.description (있으면)
     - text-sm, #6B7280
     - mt-1

3. **컬럼 구분**: border나 배경 없음
   - 오직 gap 여백과 각 컬럼의 accent bar로 시작점 인지
   - 선택적으로 컬럼 사이에 1px 수직 구분선 (#E5E7EB) 가능 (v0 판단)

4. **빈 공간 관리**:
   - 그리드 영역이 flex-1로 가용 공간 차지
   - 컬럼 내부 콘텐츠는 상단 정렬 (items-start)
   - 하단 여백은 의도된 breathing room

### 참고: Financial Times 데이터 대시보드, Swiss style grid typography

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
