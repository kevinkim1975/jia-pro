# Markdown 콘텐츠 형식 가이드

## 개요

이 문서는 제안서 Markdown 파일의 작성 형식을 정의합니다.
Markdown 파일을 작성하면, 파서가 TypeScript 데이터로 변환합니다.

---

## 기본 구조

```markdown
---
# YAML Front Matter (선택)
client: 의료기관명
theme: cleveland-clinic
---

# ACT 1: 상황

## [슬라이드타입] 슬라이드 제목
속성: 값
속성: 값

본문 내용...

# ACT 2: 위기
...
```

---

## 슬라이드 타입별 형식

### 1. cover (표지)

```markdown
## [cover]
title: 정이안한의원
subtitle: 마케팅 전략 제안
```

### 2. toc (목차)

```markdown
## [toc]
<!-- 자동 생성됨 -->
```

### 3. divider (ACT 간지)

```markdown
## [divider]
act: 1
```

### 4. chart (차트)

```markdown
## [chart] 22년까지 성장했습니다
chartType: line
yAxisLabel: 신환수
highlight: 3년간 32% 성장

| 연도 | 값 | 주석 |
|------|-----|------|
| 20년 | 261 | |
| 21년 | 283 | +8.4% |
| 22년 | 344 | +21.6% |
```

### 5. cards (카드형)

```markdown
## [cards] 성장의 동력
tone: positive
bottomMessage: "콘텐츠의 힘을 잘 알고 계시지요?"

- 33년 | 경력 | 한의학박사
- 11권 | 저서 | 출간
- 콘텐츠가 | 환자를 데려온다 | 직접 경험
```

### 6. content (일반 콘텐츠)

```markdown
## [content] 무엇이 문제일까요?
tone: negative
emphasis: "좋은 콘텐츠만으로는 부족합니다"

콘텐츠는 있지만, 확산이 안 됩니다.

- 블로그 방문자 감소
- SNS 참여율 하락
- 신환 유입 경로 다변화 필요
```

### 7. comparison (비교)

```markdown
## [comparison] Before vs After
quote: "변화가 필요한 시점입니다"

### Before: 기존 방식
- 콘텐츠 생산에만 집중
- 단일 채널 의존
- 수동적 환자 유입

### After: 새로운 접근
- 멀티 채널 확산 전략
- 데이터 기반 마케팅
- 능동적 환자 유치
```

### 8. twoColumn (2열 레이아웃)

```markdown
## [twoColumn] AI 협업 구조
bottomMessage: "AI는 기록과 알람을, 사람은 진심을"

### Left: AI가 하는 일
- 데이터 분석
- 타이밍 알림
- 패턴 인식

### Right: 사람이 하는 일
- 상담 실행
- 관계 형성
- 공감 대화
```

### 9. flowSteps (단계별 플로우)

```markdown
## [flowSteps] 교육 방식
bottomMessage: "이론교육 + 행동교정 → 혼합형 교육 시스템"

1. 형태 | 맞춤형 교육
2. 이론교육 | 의도 배양
3. 행동교정 | 실전 역량
4. 혼합형 | 시스템 구축
```

### 10. quote (인용/메시지)

```markdown
## [quote]
message: "환자가 확산되는 시스템"
author: 호원앤컴퍼니
```

### 11. summary (요약)

```markdown
## [summary] 제안 요약
keyPoints:
- 데이터 기반 마케팅 전략
- AI CRM 시스템 도입
- 체계적인 교육 프로그램

nextSteps:
- 1차 미팅 일정 조율
- 세부 견적 협의
```

### 12. closing (마무리)

```markdown
## [closing]
title: 감사합니다
subtitle: 정이안한의원의 성장을 함께하겠습니다
```

---

## 속성 참조

| 속성 | 적용 타입 | 값 | 설명 |
|------|----------|-----|------|
| tone | content, cards | positive/negative/neutral | 슬라이드 톤 |
| emphasis | content | 문자열 | 강조 문구 |
| quote | comparison | 문자열 | 인용구 |
| bottomMessage | cards, twoColumn, flowSteps | 문자열 | 하단 메시지 |
| chartType | chart | line/bar/pie | 차트 종류 |
| highlight | chart | 문자열 | 강조 텍스트 |
| yAxisLabel | chart | 문자열 | Y축 레이블 |

---

## 파일 예시

전체 파일 예시는 `content/proposal.example.md`를 참조하세요.
