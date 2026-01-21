# MD 기반 제안서 생성 시스템 - 실행 계획

## 목표
MD 파일 하나만 수정하면 자동으로 proposal-data.ts가 생성되는 시스템

---

## 1단계: MD 템플릿 형식 정의

### 파일 구조
```
content/
└── 정이안한의원_마케팅전략_제안서.md  ← 이 파일만 복사해서 수정
```

### MD 파일 형식

```markdown
---
# 프로젝트 정보 (YAML frontmatter)
clientName: 정이안한의원
projectTitle: 마케팅 전략 제안
date: 2026. 01
company: 호원앤컴퍼니
---

# ACT 1: 상황
<!-- purpose: 원장님의 세계를 인정하고 공감대 형성 -->

## [cover]
title: 정이안한의원
subtitle: 마케팅 전략 제안

## [toc]
<!-- 자동 생성 - 작성 불필요 -->

## [divider]
<!-- ACT 정보로 자동 생성 -->

## [chart] 22년까지, 정이안한의원은 성장했습니다
chartType: line
yAxisLabel: 신환수
highlight: 3년간 32% 성장
data:
  - 20년: 261
  - 21년: 283 | +8.4%
  - 22년: 344 | +21.6%

## [cards] 성장의 동력
cards:
  - 33년 | 경력 | 한의학박사
  - 11권 | 저서 | 출간
  - 콘텐츠가 | 환자를 데려온다 | 직접 경험
bottomMessage: "콘텐츠의 힘을 잘 알고 계시지요?"
tone: positive

# ACT 2: 위기
<!-- purpose: 현재 직면한 문제 제시 -->

## [divider]

## [chart] 그러나 22년 이후, 흐름이 바뀌었습니다
chartType: line
yAxisLabel: 신환수
highlight: 피크 대비 -43.9% (151건 감소)
data:
  - 22년: 344
  - 23년: 221 | -35.8%
  - 24년: 193 | -12.7%
  - 25년: 193

## [twoColumn] 원인 1: 시장 자체가 변하고 있습니다
left:
  title: 냉증 시장
  highlight: ▼ -36%
  items:
    - 검색량 하락
    - 시장 규모 축소
right:
  title: 자율신경 시장
  highlight: ▲ +57%
  items:
    - 검색량 상승
    - 그러나 우리 영역 아님
bottomMessage: "우리가 노출되던 시장이 줄어들고 있습니다"

## [content] 원인 3: 블로그 환경이 바뀌었습니다
content: 2025년 규제 환경 변화 (대구 한의원간 민원 전쟁으로 인한 결과)
bullets:
  - 블로그에 치료 관련 적극적 노출 제한
  - 경쟁사 블로그: 최적화
  - 정이안 블로그: 준최적화
  - 최적화 블로그 구매: 2천만원+, 물량도 불확실
emphasis: "블로그의 홍보 패턴은 변화가 필요합니다"
tone: negative

## [quote]
message: |
  같은 상황에서, 다른 결과를 만든 사례가 있습니다
subMessage: |
  휴한의원 (2014~2015)
  
  "환자 감소, 매출 정체, 경쟁 심화"
  정이안한의원과 같은 고민을 가진 한의원이었습니다

## [comparison] 2년 만에 10배 성장
before:
  label: Before
  items:
    - 월 매출
    - 3,000만원
after:
  label: After
  items:
    - 월 매출
    - 3억원
    - 선택한 질환: 틱장애

## [flowSteps] 온라인 환자 여정
steps:
  - 1 | 인지 | 콘텐츠로 문제 인식
  - 2 | 탐색 | 지식인/블로그 검색
  - 3 | 결정 | 예약 결심
  - 4 | 전환 | 상담 → 내원
bottomMessage: 각 단계별 최적화 전략 필요

## [closing]
title: 감사합니다
subtitle: 함께 성장하겠습니다
contact:
  person: 담당자
  email: contact@howon.com
```

---

## 2단계: 필요한 파일 목록

| 파일 | 역할 | 생성 순서 |
|------|------|----------|
| `content/정이안한의원_마케팅전략_제안서.md` | MD 템플릿 | 1 |
| `src/parser/md-parser.ts` | MD 파싱 (YAML + 슬라이드) | 2 |
| `src/parser/slide-builder.ts` | 슬라이드 객체 생성 | 3 |
| `src/parser/index.ts` | 파서 통합 | 4 |
| `scripts/generate.ts` | CLI 스크립트 | 5 |
| `package.json` | npm run generate 명령 추가 | 6 |

---

## 3단계: 작업 흐름

### 새 제안서 작성 시

```bash
# 1. MD 파일 복사
cp content/정이안한의원_마케팅전략_제안서.md content/새한의원_제안서.md

# 2. MD 파일 수정 (VS Code 등에서)
# - clientName, projectTitle 변경
# - 슬라이드 내용 수정

# 3. 데이터 생성
npm run generate content/새한의원_제안서.md

# 4. 개발 서버 실행
npm run dev
```

### 생성되는 결과

```typescript
// src/data/proposal-data.ts (자동 생성됨)
import type { Slide } from '@/types/proposal';

export const slides: Slide[] = [
  {
    id: 'slide-1',
    pageNumber: 1,
    act: 1,
    content: {
      type: 'cover',
      title: '새한의원',
      subtitle: '마케팅 전략 제안',
      date: '2026. 01',
      company: '호원앤컴퍼니',
    },
  },
  // ... 나머지 슬라이드
];

export const proposalMeta = {
  clientName: '새한의원',
  totalPages: 49,
  createdAt: '2026-01-20',
};
```

---

## 4단계: 의존성

```json
{
  "devDependencies": {
    "gray-matter": "^4.0.3",      // YAML frontmatter 파싱
    "tsx": "^4.7.0"               // TypeScript 스크립트 실행
  }
}
```

---

## 5단계: 예상 작업 시간

| 단계 | 작업 | 예상 시간 |
|------|------|----------|
| 1 | MD 템플릿 작성 | 30분 |
| 2 | 파서 구현 (md-parser.ts) | 1시간 |
| 3 | 슬라이드 빌더 (slide-builder.ts) | 1시간 |
| 4 | CLI 스크립트 | 30분 |
| 5 | 테스트 및 디버깅 | 1시간 |
| **총계** | | **4시간** |

---

## 진행 확인

위 계획대로 진행할까요?

1단계 (MD 템플릿 작성)부터 시작하겠습니다.
