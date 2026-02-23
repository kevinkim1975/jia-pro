# ComparisonSlide 디자인 3-Plan 전략 v2

## 이전 실패 원인 분석
- 3안 모두 "2-column card + list" 구조 → 장식만 다른 같은 디자인
- items 1~3개를 720px 높이 카드에 넣으니 빈 공간 80%
- B/A 뱃지, 체크아이콘 등 의미 없는 장식으로 채우려 함
- 근본 원인: "좌우 2열 카드" 레이아웃을 FROZEN으로 고정한 것

## 핵심 전환: 레이아웃 구조 자체를 3안 모두 완전히 다르게

| 축 | Plan A: Row Showdown | Plan B: Statement First | Plan C: Gradient Spectrum |
|---|---|---|---|
| 구조 | 행(row) 기반 테이블 | 상단 메시지 + 하단 compact 비교 | 하나의 가로 흐름 바 |
| Before/After 배치 | 같은 행에 좌우 대비 | 하단 바에서 좌→우 | 연속 그라데이션 위 |
| 빈 공간 해결 | 행이 화면을 채움 | 메시지가 상단 60% 차지 | 바가 가로 전체 사용 |
| items 1개일 때 | 행 1개 + 넓은 여백 활용 | 문제 없음 (메시지가 주역) | 자연스러운 흐름 |
| 참조 | McKinsey 비교표 | TED + 근거표 | Stripe/Linear |
| 카드 사용 | 없음 (행 기반) | 없음 (바 기반) | 없음 (플로우 기반) |
