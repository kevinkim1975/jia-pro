# ChartSlide — 3가지 디자인 컨셉 기획서

## 설계 배경

2장(4.1%). proposal-data.ts 실측: p.4(성장 추이), p.7(하락 추이). 둘 다 line 차트.
highlight 존재, description은 빈 문자열. bar/pie는 데이터에 없으나 인터페이스상 지원 필요.
recharts 라이브러리 유지. "use client" 필수.

기존 문제점:
- shadcn Card 사용 (FROZEN 위반)
- SlideHeader 미사용, 직접 구현 (위반)
- lucide-react 아이콘 사용 (TrendingUp, Info)

---

## 차별화 축

| 축 | Plan A | Plan B | Plan C |
|----|--------|--------|--------|
| 차트 비중 | 전체의 70% (주인공) | 60% + 우측 주석 | 50%, 상단 히어로 수치 |
| highlight 처리 | 차트 하단 accent bar 행 | 우측 패널 내 배치 | 히어로 수치로 승격 |
| 차트 프레임 | 프레임 없음, 배경 직접 배치 | 좌측 차트 + 우측 주석 컬럼 | 상단 수치 + 하단 차트 |
| 참조 미학 | FT Data Visualization | Bloomberg Terminal | Stripe Dashboard |
| 장점 | 데이터 몰입감 최대 | 맥락 정보 동시 제공 | 핵심 수치 즉시 전달 |
| 리스크 | highlight 공간 부족 가능 | 좌우 밸런스 어려움 | 차트 영역 축소 |

---

## Plan A: "Data Theatre" — 데이터 극장
**한 줄 요약**: 차트가 무대 중앙을 차지하고, 모든 장식이 사라진 순수 데이터 시각화
프레임/카드 없이 차트가 캔버스 위에 직접 놓인다.
highlight는 차트 하단에 accent bar + 텍스트 한 줄로 처리.

## Plan B: "Annotated Insight" — 주석이 있는 인사이트
**한 줄 요약**: 좌측 70%에 차트, 우측 30%에 핵심 수치와 주석이 수직 배치
차트 옆에 highlight와 annotation이 함께 보여 맥락을 즉시 파악.

## Plan C: "Metric Hero" — 수치가 주인공
**한 줄 요약**: 상단에 highlight 수치가 거대하게, 하단에 차트가 근거로 배치
highlight 텍스트에서 숫자를 추출해 히어로 수치로 표시.
차트는 그 수치의 근거 데이터.

---

## 공통 샘플 데이터 (p.7 기준, 3안 동일)

```typescript
title: "그러나 22년 이후, 흐름이 바뀌었습니다"
chart: {
  type: "line",
  data: [
    { label: "22년", value: 344, annotation: "" },
    { label: "23년", value: 221, annotation: "-35.8%" },
    { label: "24년", value: 193, annotation: "-12.7%" },
    { label: "25년", value: 193, annotation: "" },
  ],
  yAxisLabel: "신환수",
}
highlight: "피크 대비 -43.9% (151건 감소)"
description: ""
```
