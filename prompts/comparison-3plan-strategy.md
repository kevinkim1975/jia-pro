# ComparisonSlide 디자인 3-Plan 전략 비교표

## 데이터 기반 (Boris Cherny Step 1: 실제 데이터 검증)
- 슬라이드 수: 5개 (10.2%)
- Props: title(항상), quote?(2/5), before{label, items[]}, after{label, items[]}
- items 범위: 1~3개 per side
- label 패턴: "Before/After" 또는 커스텀 ("사냥하는 의료기관"/"농사하는 의료기관")
- Shared: SlideHeader (accent-bar gradient → title, center)
- 대표:
  - p.42: 3 items/side, no quote (최대 밀도)
  - p.35: 1 item/side + quote (최소 밀도)

## 6축 차별화 비교

| 축 | Plan A: Versus Arena | Plan B: Elevation Cards | Plan C: Transformation Path |
|---|---|---|---|
| 1. 레이아웃 | 수직 분할선 중심 대칭 | 떠있는 2카드 + 그림자 계층 | 좌→우 흐름 + 화살표 전환 |
| 2. Before 표현 | 좌측 desaturated 영역 | 낮은 카드 (shadow-sm) | 좌측 muted zone |
| 3. After 표현 | 우측 accent 하이라이트 | 높은 카드 (shadow-xl, 살짝 위) | 우측 accent zone + glow |
| 4. 중앙 요소 | VS 뱃지 or 수직 구분선 | 없음 (카드 간격으로 대비) | 화살표/chevron 전환 아이콘 |
| 5. quote 처리 | 상단 italic bar | 타이틀 아래 pill badge | 상단 blockquote 스타일 |
| 6. 참조 미학 | ESPN/스포츠 매치업 → 정제 | Material Design 3 | Stripe 가격비교 페이지 |

## 공통 FROZEN (3안 모두 동일)
- SlideHeader: import from ./shared/SlideHeader, align="center"
- Interface: { title, quote?, before{label,items[]}, after{label,items[]} }
- 색상: #004B8D, #48A9C5, #002D5A, gray-400/500
- Before=gray 톤, After=primary 톤 (방향성 고정)
- items는 CheckCircle2(After) + bullet dot(Before) 아이콘 패턴 유지
- 폰트: Pretendard
- Canvas: 1280×720
- Light background (surface #F8FAFC)
