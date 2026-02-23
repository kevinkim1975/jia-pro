# slide-49 타입 변경: quote → closing

## 파일
`src/data/proposal-data.ts`

## 현재 (라인 918~922)
```ts
content: {
  type: 'quote',
  message: '맞는 방향이 올바른 프로세스를 만날 때, 성공하는 의료기관을 만듭니다.',
  subMessage: '호원앤컴퍼니',
},
```

## 변경 후
```ts
content: {
  type: 'closing',
  title: '감사합니다',
  subtitle: '맞는 방향이 올바른 프로세스를 만날 때,\n성공하는 의료기관을 만듭니다.',
  company: '호원앤컴퍼니',
},
```

## 변경 사항
1. `type`: `'quote'` → `'closing'`
2. `message` → `subtitle` (필드명 변경 + `\n` 줄바꿈 추가)
3. `subMessage` → `company` (필드명 변경)
4. `title: '감사합니다'` 신규 추가

## 타입 검증
`src/types/proposal.ts`에 `closing` 타입이 정의되어 있는지 확인하세요.
없으면 SlideContent union에 추가:
```ts
| { type: 'closing'; title: string; subtitle: string; company: string }
```

## 주의
- ClosingSlide.tsx는 수정하지 마세요
- index.tsx의 `case "closing"` 분기는 이미 존재합니다
