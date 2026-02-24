# SummarySlide — 3가지 디자인 컨셉 기획서

## 설계 배경

proposal-data.ts에 현재 type: 'summary' 슬라이드 0개.
컴포넌트는 존재하나 미할당 상태. 향후 Act 6 요약 장표에 적용 가능.
인터페이스: title + keyPoints(string[]) + nextSteps?(string[])
nextSteps는 optional — 없을 때의 레이아웃 전환이 핵심 설계 과제.

기존 문제점:
- shadcn Card 사용 중 (FROZEN 규칙 위반, 제거 대상)
- SlideHeader 미사용 (직접 구현 — 규칙 위반)
- SlideBottomMessage 불필요 (인터페이스에 bottomMessage 없음)

---

## 차별화 축 (Differentiation Axis)

| 축 | Plan A | Plan B | Plan C |
|----|--------|--------|--------|
| 레이아웃 | 수직 2단 분할 (50:50) | 수평 적층 (상하 분리) | 비대칭 분할 (65:35) |
| keyPoints 처리 | 대형 번호 + 텍스트 행 | 번호 인라인 + 강조 텍스트 | 좌측 accent bar + 텍스트 블록 |
| nextSteps 처리 | 우측 컬럼 (emerald 톤) | 하단 구역 (수평 나열) | 우측 컴팩트 리스트 |
| 영역 구분 방식 | 수직 hairline (1px) | 수평 gradient rule | 색상 톤 차이 (blue vs green) |
| nextSteps 없을 때 | 단일 컬럼 중앙 확장 | keyPoints가 전체 높이 차지 | keyPoints 전폭 확장 |
| 참조 미학 | McKinsey 요약 페이지 | Bloomberg 터미널 | The Economist 인포그래픽 |
| 장점 | 양쪽 동시 스캔 가능 | 시선 흐름이 자연스러움 | 위계가 명확 (요약>실행) |
| 리스크 | nextSteps 없으면 좌측만 붐 | 항목 많으면 수직 과밀 | 우측 공간 부족 가능 |

---

## Plan A: "Split Ledger" — 분할 원장

**한 줄 요약**: 수직 중앙선으로 나눈 두 영역, 재무 보고서처럼 명징한 이중 원장

좌측은 keyPoints 영역. 각 항목에 대형 번호(text-4xl, opacity 0.15)가 배경처럼 깔리고
그 위에 본문 텍스트가 놓인다. 우측은 nextSteps 영역으로 emerald 계열 accent.
두 영역은 1px 수직 hairline으로만 구분된다.
nextSteps가 없으면 좌측 컬럼이 중앙으로 확장.
카드 없음. 배경색 차이 없음. 오직 타이포그래피와 선.

---

## Plan B: "Stacked Editorial" — 적층 에디토리얼

**한 줄 요약**: 상단에 핵심 요약, 하단에 실행 단계 — 신문 사설의 수직 흐름

전체 영역을 수평으로 이등분. 상단 60%가 keyPoints, 하단 40%가 nextSteps.
keyPoints는 번호가 인라인으로 붙은 텍스트 행으로, 행 사이 여백이 넉넉하다.
두 구역 사이에 gradient rule(from-primary to-accent, 높이 2px)이 놓인다.
nextSteps는 수평 나열(flex-row)로 컴팩트하게 배치.
nextSteps가 없으면 keyPoints가 전체 높이를 점유.
시선이 위→아래로 자연스럽게 흐르는 독서 패턴.

---

## Plan C: "Asymmetric Grid" — 비대칭 그리드

**한 줄 요약**: 넓은 좌측에 핵심, 좁은 우측에 실행 — 위계가 곧 레이아웃

좌측 65%는 keyPoints 전용. 각 항목 앞에 3px 높이의 accent bar가 붙고
본문은 text-base 크기로 충분한 행간을 가진다.
우측 35%는 nextSteps로, 작은 순번 인디케이터와 컴팩트 텍스트.
비대칭이 "핵심 요약이 더 중요하다"는 위계를 시각적으로 선언한다.
nextSteps가 없으면 keyPoints가 전폭으로 확장.
정보 밀도가 높아도 읽기 편한 구조.

---

## 추천 의견

| 기준 | Plan A | Plan B | Plan C |
|------|:------:|:------:|:------:|
| 스캔 효율 | ★★★★★ | ★★★★ | ★★★★ |
| 시각적 임팩트 | ★★★★ | ★★★★ | ★★★★★ |
| nextSteps 없을 때 안정감 | ★★★ | ★★★★★ | ★★★★ |
| 기존 슬라이드 톤 조화 | ★★★★ | ★★★★★ | ★★★★ |
| 의료 신뢰감 | ★★★★★ | ★★★★ | ★★★★ |
| 타이포+구조 승부 (취향 부합) | ★★★★★ | ★★★★ | ★★★★★ |

---

## 공통 샘플 데이터 (3안 동일)

```typescript
title: "핵심 제안 요약"
keyPoints: [
  "냉증 시장 축소(-36%)에 따른 질환 방향 재설정 필수",
  "지식인 채널 중심의 콘텐츠 마케팅 전환",
  "블로그 전문성 강화 및 파워링크 최적화",
  "AI CRM 시스템 도입으로 환자 관리 체계화"
]
nextSteps: [
  "주력 질환 방향 확정 (원장님 논의)",
  "계절성 분석 기반 콘텐츠 캘린더 수립",
  "CRM 시스템 구축 및 교육 프로그램 시작"
]
```
