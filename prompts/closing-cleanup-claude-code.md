# ClosingSlide 기하학 요소 정리 작업

## 파일 위치
`src/components/slides/ClosingSlide.tsx`

## 작업 목표
현재 20개의 기하학 장식 요소(geometric patterns #1~#20)를 **10개로 축소**합니다.

## 삭제 기준

### 1. 콘텐츠 영역 근처 요소 우선 삭제
콘텐츠는 **좌측 8% ~ 62% 영역, 세로 중앙**에 위치합니다.
이 영역과 겹치거나 가까운 요소들을 우선 제거하세요:
- `#15 Diamond grid` (top: 26%, left: 36%) — 타이틀 바로 옆
- `#10 Cross/plus sign` (top: 42%, left: 7%) — 서브타이틀 높이
- `#17 Floating triangle cluster` (top: 50%, right: 18%) — 콘텐츠 중앙부

### 2. 시각적 중복 요소 삭제
비슷한 역할을 하는 요소 중 하나만 남기세요:
- `#7 Pulsing dot grid`와 `#13 Breathing dots` 중 하나 삭제 (둘 다 점 패턴)
- `#6 Drifting parallel lines`와 `#12 Sliding dashes`와 `#20 Thin horizontal line pattern` 중 하나만 남기기 (모두 수평 선 패턴)
- `#4 Floating triangle`와 `#17 Floating triangle cluster` 중 하나 삭제 (둘 다 삼각형)

### 3. 남길 10개 추천 (참고용, 판단에 따라 조정 가능)

| # | 요소 | 남기는 이유 |
|---|------|------------|
| 1 | Vertical accent line (left edge) | 핵심 디자인 요소 — 반드시 유지 |
| 2 | Large dashed circle (top-right) | 상단 우측 앵커 |
| 3 | Spinning diamond (bottom-right) | 하단 우측 앵커, 커버 콜백 |
| 5 | Concentric circles (center-right) | 우측 중앙 채움 |
| 8 | Orbiting dot (top center) | 상단 중앙 미세 악센트 |
| 9 | Swaying hexagon (right upper) | 우측 상단 다양성 |
| 11 | Rotating square (bottom center) | 하단 중앙 앵커 |
| 14 | Dashed arc (top-left corner) | 좌측 상단 채움 |
| 16 | Reverse-spinning ring (bottom-left) | 좌측 하단 밸런스 |
| 18 | Subtle gradient blur (top-right) | 분위기 조성, 비침습적 |

삭제 대상 (10개):
`#4, #6, #7, #10, #12, #13, #15, #17, #19, #20`

## 작업 방법
1. 해당 번호의 `{/* N. ... */}` 주석 블록과 그 아래 `<div>...</div>` 전체를 삭제
2. 삭제 후 남은 요소 번호를 1~10으로 **리넘버링**
3. 사용하지 않는 `@keyframes`가 있으면 함께 제거 (삭제된 요소에서만 사용되는 것)
4. `.geo-fade-d5`, `.geo-fade-d6` 등 불필요한 delay 클래스도 정리

## 주의사항
- `{/* ===== CONTENT AREA ===== */}` 아래 콘텐츠 부분은 절대 수정하지 마세요
- Props interface, sampleData, 컴포넌트 시그니처 변경 금지
- 남은 10개 요소의 위치/크기/애니메이션은 그대로 유지
