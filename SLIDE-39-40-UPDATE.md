# 슬라이드 39-40 내용 교체 명세서

## 개요
- 대상: ACT 5 CRM 섹션 (39, 40페이지)
- 파일: src/data/proposal-data.ts

---

## 39페이지 (slide-39) - 전체 교체

찾을 내용: `id: 'slide-39'`

교체할 내용:
```typescript
  {
    id: 'slide-39',
    pageNumber: 39,
    act: 5,
    content: {
      type: 'comparison',
      title: 'AI 기반 CRM의 강점',
      quote: '환자가 확산되는 시스템',
      before: {
        title: '기존 CRM',
        items: [
          '기록 관리 중심',
        ],
      },
      after: {
        title: '호원앤컴퍼니',
        items: [
          'AI 기반 환자확산 시스템',
        ],
      },
    },
  },
```

---

## 40페이지 (slide-40) - 전체 교체

찾을 내용: `id: 'slide-40'`

교체할 내용:
```typescript
  {
    id: 'slide-40',
    pageNumber: 40,
    act: 5,
    content: {
      type: 'twoColumn',
      title: 'AI 협업 구조',
      left: {
        title: 'AI가 하는 일',
        items: [
          '데이터 분석',
          '타이밍 알림',
        ],
      },
      right: {
        title: '사람이 하는 일',
        items: [
          '상담 실행',
          '관계 형성',
        ],
      },
      bottomMessage: 'AI는 기록과 알람을, 사람은 진심을',
    },
  },
```

---

## 주의사항

1. slide-39, slide-40만 수정
2. 다른 슬라이드 절대 수정 금지
3. id, pageNumber, act 값 유지
4. 39페이지는 comparison 타입 (quote 포함)
5. 40페이지는 twoColumn 타입 (bottomMessage 포함)

---

## 완료 확인

npm run dev 실행 후:
- 39페이지: "AI 기반 CRM의 강점" + 인용구 + Before/After 비교
- 40페이지: "AI 협업 구조" + 2열 비교 + 하단 메시지
