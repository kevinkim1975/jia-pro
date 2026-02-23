# ContentSlide 디자인 3-Plan 전략 비교표

## 데이터 기반 (Boris Cherny Step 1: 실제 데이터 검증)
- 슬라이드 수: 6개 (12.2%)
- Props: title, content, bullets?(1~5개), emphasis?, tone?(positive/negative/neutral)
- 대표 페이지: p.10 (negative tone, 모든 필드 사용)
- 배경: surface(light #F8FAFC), 텍스트: onSurface, 강조: primary(#004B8D)

## 6축 차별화 비교

| 축 | Plan A: Layered Depth | Plan B: Signal Strip | Plan C: Narrative Flow |
|---|---|---|---|
| 1. 본문 영역 | 넓은 prose + 좌측 tone-bar | 좌측 5px 컬러 스트립 전체 관통 | 큰 따옴표 장식 + blockquote 스타일 |
| 2. 불릿 렌더링 | 부유하는 카드 레이어(그림자 깊이) | 미니멀 행 + 좌측 dot indicator | 타임라인 스타일 vertical-line 연결 |
| 3. Emphasis 영역 | 하단 gradient banner (현행 유지) | pill-shaped badge + 아이콘 | 풀폭 colored footer strip |
| 4. Tone 시스템 | 좌측 4px bar + 카드 tint | 좌측 5px strip 색상 변화 | 배경 subtle gradient shift |
| 5. 참조 미학 | Apple Keynote 프레젠테이션 | Stripe Dashboard / Linear | McKinsey 보고서 |
| 6. 의료 신뢰 | 깨끗한 레이어링 = 체계적 | 시그널 컬러 = 진단적 | 서사 흐름 = 설득적 |

## 공통 FROZEN (3안 모두 동일)
- SlideHeader: accent-bar(w-12 h-1 gradient #004B8D→#48A9C5) → title(text-3xl~4xl bold)
- SlideBottomMessage: gradient배경(#004B8D/10→#48A9C5/10) + border-l-4 + icon
- 색상 팔레트: #004B8D(primary), #48A9C5(accent), #059669(positive), #DC2626(negative)
- 폰트: Pretendard
- 캔버스: 1280×720 white/surface background
