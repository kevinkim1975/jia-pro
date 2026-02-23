# QuoteSlide 디자인 3-Plan 전략 비교표

## 데이터 기반 (Boris Cherny Step 1: 실제 데이터 검증)
- 슬라이드 수: 5개 (10.2%)
- Props: message(항상), subMessage?(선택)
- SLIDE_TOKEN_MAP: bg=primary(dark #004B8D), text=onPrimary(white)
- 대표 데이터:
  - p.14: 긴 message + subMessage (사례 소개)
  - p.17: 3줄 질문 + subMessage (조건 나열)
  - p.19: 2줄 전략 문구, subMessage 없음
  - p.26: 짧은 질문, subMessage 없음
  - p.41: "71%" 숫자 + subMessage (통계 강조)
- 현재 문제: 토큰은 dark bg인데 코드는 light bg → 불일치

## 6축 차별화 비교

| 축 | Plan A: Grand Stage | Plan B: Frosted Canvas | Plan C: Type Specimen |
|---|---|---|---|
| 1. 배경 | 자체 dark gradient (divider와 유사) | 현행 light + 개선된 카드 | dark solid #004B8D |
| 2. 인용부호 | 거대 배경 워터마크 (200px+) | 카드 내 장식 (현행 개선) | 좌상단 초대형 + 우하단 짝 |
| 3. 메시지 | 중앙 white text, 그림자 없음 | 카드 안 primary text | 중앙 white text, serif mix |
| 4. subMessage | 메시지 아래 divider line + 밝은 톤 | 카드 내 하단 영역 | 우하단 attribution 스타일 |
| 5. 참조 미학 | TED Talk 무대 | Glassmorphism UI | Bloomberg Businessweek |
| 6. 숫자 대응 ("71%") | 거대 숫자가 자연스럽게 돋보임 | 카드 안에서 약간 답답 | 타이포 강조로 최적 |

## 공통 FROZEN (3안 모두 동일)
- Interface: { message: string, subMessage?: string }
- 인용부호: 존재해야 함 (열기/닫기 쌍)
- subMessage: whitespace-pre-line 유지 (\n 줄바꿈 지원)
- 중앙 정렬 레이아웃
- 색상 팔레트: #004B8D, #48A9C5, #002D5A
- 폰트: Pretendard
