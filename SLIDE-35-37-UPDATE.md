# 슬라이드 35-37 내용 교체 명세서

## 개요
- 대상: ACT 5 교육 프로그램 섹션 (35, 36, 37페이지)
- 파일: src/types/proposal.ts, src/components/slide-renderers.tsx, src/data/proposal-data.ts

---

## 1단계: 타입 확장

### 파일: src/types/proposal.ts

ComparisonSlide 인터페이스를 찾아서 quote 필드 추가:

```typescript
interface ComparisonSlide {
  readonly type: 'comparison'
  readonly title: string
  readonly quote?: string  // ← 이 줄 추가
  readonly before: {
    readonly title: string
    readonly items: readonly string[]
  }
  readonly after: {
    readonly title: string
    readonly items: readonly string[]
  }
}
```

---

## 2단계: 렌더러 수정

### 파일: src/components/slide-renderers.tsx

### 2-1. ComparisonSlide props 수정

기존:
```typescript
interface ComparisonSlideProps {
  readonly title: string
  readonly before: { ... }
  readonly after: { ... }
}
```

변경:
```typescript
interface ComparisonSlideProps {
  readonly title: string
  readonly quote?: string  // ← 추가
  readonly before: { ... }
  readonly after: { ... }
}
```

### 2-2. ComparisonSlide 함수 수정

props에 quote 추가:
```typescript
export function ComparisonSlide({ title, quote, before, after }: ComparisonSlideProps) {
```

title 렌더링 바로 아래에 quote 렌더링 추가:
```tsx
{/* 타이틀 아래, Before/After 위에 추가 */}
{quote && (
  <p className="text-center text-lg italic text-gray-600 mb-8">
    "{quote}"
  </p>
)}
```

### 2-3. SlideRenderer switch문 수정

comparison case 찾아서 quote 전달:
```typescript
case "comparison":
  return (
    <SlideWrapper showPattern>
      <ComparisonSlide
        title={content.title}
        quote={content.quote}  // ← 추가
        before={content.before}
        after={content.after}
      />
    </SlideWrapper>
  )
```

---

## 3단계: 데이터 교체

### 파일: src/data/proposal-data.ts

### 35페이지 (slide-35) - 전체 교체

찾을 내용: `id: 'slide-35'`

교체할 내용:
```typescript
  {
    id: 'slide-35',
    pageNumber: 35,
    act: 5,
    content: {
      type: 'comparison',
      title: '스킬이 중요한가 의도가 중요한가',
      quote: '마케팅은 사냥, 교육은 농사',
      before: {
        title: '일반 교육',
        items: [
          '단순 스킬 전달',
        ],
      },
      after: {
        title: '호원앤컴퍼니',
        items: [
          '마인드 + 체계 변화',
        ],
      },
    },
  },
```

### 36페이지 (slide-36) - 전체 교체

찾을 내용: `id: 'slide-36'`

교체할 내용:
```typescript
  {
    id: 'slide-36',
    pageNumber: 36,
    act: 5,
    content: {
      type: 'cards',
      title: '4가지 실전 교육 프로그램',
      cards: [
        { title: '경영진', subtitle: 'SQI 리더십, 비전 설계', description: '' },
        { title: '중간관리자', subtitle: '조직관리, 코칭', description: '' },
        { title: '상담팀', subtitle: 'ASC 상담스킬 (8단계)', description: '' },
        { title: '전직원', subtitle: '에니어그램, SQI 커뮤니케이션', description: '' },
      ],
      tone: 'neutral',
    },
  },
```

### 37페이지 (slide-37) - 전체 교체

찾을 내용: `id: 'slide-37'`

교체할 내용:
```typescript
  {
    id: 'slide-37',
    pageNumber: 37,
    act: 5,
    content: {
      type: 'flowSteps',
      title: '이론은 의도를 배양하고 실전에서 역량을',
      steps: [
        { number: 1, title: '형태', description: '맞춤형 교육 (조직 요청 기반)' },
        { number: 2, title: '이론교육', description: '의도와 마인드 배양' },
        { number: 3, title: '행동교정', description: '실전 역량 강화' },
        { number: 4, title: '혼합형 교육 시스템', description: '이론 + 실전의 통합' },
      ],
      bottomMessage: '방식: 이론교육 + 행동교정 → 혼합형 교육 시스템',
    },
  },
```

---

## 주의사항

1. slide-35, slide-36, slide-37만 수정
2. 다른 슬라이드 절대 수정 금지
3. id, pageNumber, act 값 유지
4. TypeScript 컴파일 에러 없어야 함

---

## 완료 확인

npm run dev 실행 후:
- 35페이지: "스킬이 중요한가" + 인용구 + Before/After 비교
- 36페이지: 4개 카드 (경영진, 중간관리자, 상담팀, 전직원)
- 37페이지: 4단계 플로우 (형태→이론→행동→혼합형)
