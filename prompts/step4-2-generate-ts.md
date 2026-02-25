# Step 4-2: generate.ts 작성 (layout.md → proposal-data.ts 변환기)

## 목표
pro-template/generate.ts를 작성한다.
이 스크립트는 input/layout.md를 파싱하여 src/data/proposal-data.ts를 생성한다.
Node.js (ts-node 또는 tsx)로 실행된다.

## 입력: layout.md 형식

```markdown
# 정이안한의원 경쟁분석 프레젠테이션

## slide-1 | cover
title: 정이안한의원
subtitle: 마케팅 전략 제안
date: 2026. 01
company: 호원앤컴퍼니

## slide-2 | toc
- act: 1 | title: 상황 | startPage: 3
- act: 2 | title: 위기 | startPage: 7

## slide-3 | divider
act: 1
title: 상황
subtitle: Situation

## slide-4 | chart
act: 1
title: 22년까지 성장했습니다
chartType: line
yAxisLabel: 신환수
data:
- 20년 | 261
- 21년 | 283 | +8.4%
- 22년 | 344 | +21.6%
highlight: 3년간 32% 성장
description:

## slide-5 | cards
act: 1
title: 성장의 동력
cards:
- 33년 | 경력 | 한의학박사
- 11권 | 저서 | 출간
bottomMessage: "콘텐츠의 힘을 잘 알고 계시지요?"
tone: positive

## slide-6 | content
act: 2
title: 블로그 환경이 바뀌었습니다
content: 2025년 규제 환경 변화
bullets:
- 블로그에 치료 관련 적극적 노출 제한
- 경쟁사 블로그: 최적화
emphasis: "블로그의 홍보 패턴은 변화가 필요합니다"
tone: negative

## slide-7 | comparison
act: 3
title: 2년 만에 10배 성장
quote: 환자가 확산되는 시스템
before:
  label: Before
  items:
  - 월 매출 3,000만원
after:
  label: After
  items:
  - 월 매출 3억원
  - 선택한 질환: 틱장애

## slide-8 | twoColumn
act: 4
title: 전략 1: 지식인 극대화
left:
  title: 현재 강점
  highlight: 72.73%
  items:
  - 자율신경 지식인 점유율
right:
  title: 목표
  items:
  - 월 100개 답변
bottomMessage: "한 고지는 어떠한 경쟁도 허용할 수 없도록"

## slide-9 | quote
act: 3
message: 같은 상황에서, 다른 결과를 만든 사례가 있습니다
subMessage: 휴한의원 (2014~2015)\n\n정이안한의원과 같은 고민

## slide-10 | flowSteps
act: 4
title: 실행 로드맵
steps:
- 1 | 해당 질환 | 수요 분석
- 2 | 질환 방향 | 확정
- 3 | 연간 캘린더 | 수립
bottomMessage: "방향이 정해지면, 실행 계획을 함께 수립합니다"

## slide-11 | summary
act: 6
title: 핵심 요약
keyPoints:
- 시장이 구조적으로 변화
- 질환 방향 재설정 필요
nextSteps:
- 질환 확정
- 실행 캘린더 수립

## slide-12 | closing
act: 6
title: 감사합니다
subtitle: 맞는 방향이 올바른 프로세스를 만날 때,\n성공하는 의료기관을 만듭니다.
company: 호원앤컴퍼니
```

## 출력: proposal-data.ts 형식

생성되는 파일은 현재 jia-pro/src/data/proposal-data.ts와 정확히 동일한 구조여야 한다.

### 필수 import
```typescript
import type { Proposal, Act, Slide, ActNumber } from '@/types/proposal';
import { ACT_METADATA } from '../../config/structure';
```

### slides 배열
각 slide 객체 구조:
```typescript
{
  id: 'slide-N',        // layout.md의 slide 번호
  pageNumber: N,         // 1부터 순서대로
  act: N,                // act 번호 (divider에서 자동 추적)
  content: { ... }       // 타입별 구조 (아래 참조)
}
```

### 슬라이드 타입별 content 구조

**cover**: { type, title, subtitle?, date, company }
**toc**: { type, items: [{ act, title, startPage }] }
**divider**: { type, act, title, subtitle }
**chart**: { type, title, chart: { type: chartType, data: [{ label, value, annotation? }], yAxisLabel? }, highlight?, description? }
**cards**: { type, title, cards: [{ title, subtitle?, description? }], bottomMessage?, tone? }
**content**: { type, title, content, bullets?, emphasis?, tone? }
**comparison**: { type, title, quote?, before: { label, items }, after: { label, items } }
**twoColumn**: { type, title, left: { title, items, highlight? }, right: { title, items, highlight? }, bottomMessage? }
**quote**: { type, message, subMessage? }
**flowSteps**: { type, title, steps: [{ step, title, description? }], bottomMessage? }
**summary**: { type, title, keyPoints, nextSteps? }
**closing**: { type, title, subtitle, company }

### 하단 헬퍼 함수 (그대로 포함)
- groupSlidesByAct()
- proposal export
- getSlideByPage()
- getActStartPage()
- getTocItems()

## 파싱 규칙

1. `## slide-N | type` 으로 슬라이드 경계 식별
2. `key: value` 형태로 단일 값 파싱
3. `items:` / `bullets:` / `steps:` / `data:` / `cards:` 다음에 오는 `- ` 줄들은 배열
4. 파이프(`|`)로 구분된 배열 아이템은 필드 분리
   - cards: `title | subtitle | description`
   - data: `label | value | annotation`
   - steps: `step | title | description`
   - toc items: `act: N | title: X | startPage: N`
5. `before:` / `after:` / `left:` / `right:` 는 중첩 객체
   - 하위에 `label:`, `title:`, `highlight:`, `items:` 가 올 수 있음
6. chart의 data value는 숫자로 파싱 (parseInt)
7. act 번호는 divider가 나올 때마다 갱신, 이후 슬라이드에 자동 적용
8. 빈 값 (`description:` 만 있고 값 없음)은 빈 문자열 ''
9. `\n`은 실제 줄바꿈 문자로 변환
10. 쌍따옴표로 감싼 값은 따옴표 제거 후 저장

## 실행 흐름

```
1. input/layout.md 읽기 (fs.readFileSync)
2. 파싱 → slides 배열 생성
3. proposal-data.ts 소스코드 문자열 생성
4. output 경로에 쓰기 (template/src/data/proposal-data.ts)
```

## 기술 요구사항

- TypeScript (tsx 또는 ts-node로 실행)
- 외부 의존성 없음 (fs, path만 사용)
- 에러 처리: 파싱 실패 시 슬라이드 번호와 함께 에러 메시지
- console.log로 생성된 슬라이드 수, 총 페이지 수 출력

## 파일 위치
- 생성할 파일: C:\MyProject\crmp\pro-template\generate.ts
- 읽을 파일: C:\MyProject\crmp\pro-template\input\layout.md
- 쓸 파일: C:\MyProject\crmp\pro-template\template\src\data\proposal-data.ts

## 절대 원칙
- git 명령 실행 금지
- jia-pro 원본 파일 수정 금지
- layout.md가 없으면 에러 메시지 출력 후 종료
