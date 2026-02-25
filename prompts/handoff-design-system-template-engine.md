# 디자인 시스템 정상화 + 템플릿 엔진 구축 — 핸드오프 문서

## 프로젝트 개요

**프로젝트**: JIA-PRO (정이안한의원 마케팅 제안서 프레젠테이션 시스템)
**경로**: C:\MyProject\crmp\jia-pro\
**스택**: React/TypeScript, Next.js, Tailwind CSS, Vercel 배포
**현재 상태**: 12개 슬라이드 컴포넌트가 v0.dev로 디자인 완료, 49페이지 프레젠테이션 정상 작동 중

## 배경 — 왜 이 작업이 필요한가

이 프레젠테이션 시스템은 정이안한의원 전용이 아닙니다.
**향후 경쟁분석 프레젠테이션의 재사용 템플릿**으로 사용됩니다.
모든 프레젠테이션이 동일한 호원앤컴퍼니 브랜드 + 동일한 색상 팔레트를 사용합니다.
클라이언트마다 바뀌는 것은 **콘텐츠 데이터(proposal-data.ts)만**입니다.

현재 문제: config/theme.ts를 import하는 슬라이드가 **0개**. 모든 슬라이드가 값을 하드코딩 중.
→ 색상 하나를 바꾸려면 12개 파일을 수동으로 찾아 수정해야 함.
→ 템플릿으로서 유지보수 불가능.

---

## TASK — 5단계 실행 계획

### Step 1: theme.ts 재작성
검증 보고서(아래) 기반으로 토큰 파일을 현실에 맞게 재작성.
- "추가 필요" 항목 등록
- "삭제 후보" 항목 제거
- fontFamily 통일: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif
- 중립 그레이 통일: Tailwind Gray 계열 (Slate 제거)
- 폰트 스케일에 실제 사용 사이즈 추가

### Step 2: 12개 슬라이드 리팩토링
하드코딩된 색상/폰트/간격을 theme.ts import로 교체.
**시각적 결과 변경 제로** (값이 동일하므로).
한 파일씩 순서대로: CoverSlide → TocSlide → DividerSlide → ... → ClosingSlide

### Step 3: 빌드 + 시각 검증
npm run build 성공 확인.
배포 후 49페이지 전체가 이전과 동일한지 확인.

### Step 4: 템플릿 폴더 구조 생성 + generate.ts 작성
```
jia-pro-template/           (또는 jia-pro 내 별도 디렉토리)
├── input/
│   └── layout.md          ← 사용자가 작성 (장표 콘텐츠)
├── output/
│   └── (생성된 Next.js 프로젝트 전체)
├── template/
│   ├── src/components/     ← 12개 슬라이드 (토큰 참조)
│   ├── config/theme.ts     ← 디자인 토큰
│   ├── config/structure.ts
│   ├── config/meta.ts
│   └── (나머지 Next.js 뼈대)
└── generate.ts             ← layout.md → proposal-data.ts 변환
```

실행 흐름:
1. input/layout.md 작성
2. Claude Code에서 "배치생성" 실행
3. generate.ts가 layout.md 파싱 → proposal-data.ts 생성
4. template/ 전체 + 생성된 data를 output/에 복사
5. output/을 별도 레포에 커밋 → Vercel 배포 → 프레젠테이션 가능

### Step 5: layout.md 스펙 정의 + end-to-end 테스트
정이안 데이터로 layout.md 작성 → 배치생성 → 배포 → 49페이지 동일 확인.

---

## layout.md 형식 (확정)

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
- act: 3 | title: 전환점 | startPage: 14

## slide-3 | divider
act: 1
title: 상황
subtitle: Situation

## slide-4 | chart
act: 1
title: 22년까지, 정이안한의원은 성장했습니다
chartType: line
yAxisLabel: 신환수
data:
- 20년 | 261
- 21년 | 283 | +8.4%
- 22년 | 344 | +21.6%
highlight: 3년간 32% 성장

## slide-5 | cards
act: 1
title: 성장의 동력
cards:
- 33년 | 경력 | 한의학박사
- 11권 | 저서 | 출간
- 콘텐츠가 | 환자를 데려온다 | 직접 경험
bottomMessage: "콘텐츠의 힘을 잘 알고 계시지요?"
tone: positive
```

핵심 원칙: layout.md는 **데이터만** 담는다. 모양은 컴포넌트가 결정한다.

---

## 검증 보고서 — 전체 데이터

### 추가 필요 색상 (18개)

| 값 | 사용처 | 권장 토큰명 |
|----|--------|------------|
| #48A9C5 | 전체 슬라이드 (secondary/accent) | colors.secondary |
| #001529 | CoverSlide 그라데이션 | colors.primaryDeep |
| #002D5A | DividerSlide 그라데이션 | colors.primaryDarker |
| #10B981 | ChartSlide, SummarySlide (긍정) | colors.accent |
| #F59E0B | ChartSlide (경고) | chart.warning |
| #EF4444 | ChartSlide (위험) | chart.danger |
| #8B5CF6 | ChartSlide PIE | chart.palette[5] |
| #EC4899 | ChartSlide PIE | chart.palette[6] |
| #14B8A6 | ChartSlide PIE | chart.palette[7] |
| #E5E7EB | 6개 슬라이드 (border/grid) | colors.border |
| #6B7280 | ChartSlide, ComparisonSlide | colors.textMuted |
| #9CA3AF | ChartSlide (보조 텍스트) | colors.textLight |
| #1F2937 | SummarySlide, ComparisonSlide | colors.textDark (Gray-800) |
| #374151 | SummarySlide | colors.textBody (Gray-700) |
| #F6F8FA | CardsSlide 배경 | colors.surfaceAlt |
| #DEE5ED | CardsSlide 카드 border | colors.borderCard |
| #FFFFFF | 전체 (배경, 텍스트) | colors.white |
| rgba(157,197,187,...) | DividerSlide 장식 | colors.decorativeSage |

### 삭제 후보 (11개)

| 토큰 | 값 | 이유 |
|------|-----|------|
| colors.accent | #0066CC | 미사용, 실제 accent는 #48A9C5 |
| colors.primaryLight | #E8F4FC | 미사용 |
| semantic.warning | #D97706 | 미사용, ChartSlide는 #F59E0B |
| patterns.content | crosshatch 전체 | 어떤 슬라이드도 미참조 |
| patterns.cover | concentric 전체 | CoverSlide 미참조 |
| patterns.divider | radial 전체 | DividerSlide 미참조 |
| SLIDE_DIMENSIONS.metricCardMinWidth | 200 | 미사용 |
| SLIDE_DIMENSIONS.teamAvatarSize | 80 | 미사용 |
| SLIDE_DIMENSIONS.processStepMinWidth | 160 | 미사용 |
| spacing.header.height | 3.5rem | 실제 44px와 불일치 |
| SLIDE_DIMENSIONS.topbarHeight | 48 | 실제 44px와 불일치 |

### 폰트 스케일 추가 필요 (16개)

토큰 기존 스케일: 12, 14, 16, 18, 20, 24, 30, 36px

추가 필요: 10, 11, 13, 15, 19, 21, 28, 32, 42, 44, 48, 54, 60, 64, 96, 120px

### fontFamily 통일

4가지 변형이 존재. 아래로 통일:
```
'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif
```

### 중립 그레이 통일 — Gray 계열 채택

| 역할 | 기존 토큰 (Slate) | 변경 (Gray) |
|------|------------------|-------------|
| 700 | #334155 | #374151 |
| 800 | #1E293B | #1F2937 |
| border | #E2E8F0 | #E5E7EB |
| muted text | #94A3B8 | #9CA3AF |

---

## 파일 구조 참조

### config/ 파일
- config/theme.ts — 색상, 타이포, 간격, 패턴 토큰
- config/structure.ts — 6막 구조 정의
- config/meta.ts — 클라이언트/문서 메타 정보
- config/index.ts — 통합 re-export

### 12개 슬라이드 컴포넌트 (src/components/slides/)
1. CoverSlide.tsx — 표지 (Split Block 디자인, v0 신규)
2. TocSlide.tsx — 목차 (Editorial Sidebar 디자인, v0 신규)
3. DividerSlide.tsx — 간지/구분 (v0 신규)
4. ChartSlide.tsx → chart-slide.tsx에서 re-export → 실제 구현은 chart-slide.tsx (v0 신규, recharts)
5. ContentSlide.tsx
6. CardsSlide.tsx (Frosted Panels 디자인, v0 신규)
7. ComparisonSlide.tsx
8. TwoColumnSlide.tsx
9. FlowStepsSlide.tsx (v0 신규)
10. QuoteSlide.tsx
11. SummarySlide.tsx (Asymmetric Grid 디자인, v0 신규)
12. ClosingSlide.tsx

### 공유 컴포넌트 (src/components/slides/shared/)
- SlideHeader.tsx — 모든 슬라이드 헤더 (Cover, Divider 제외)
- SlideBottomMessage.tsx — 하단 메시지

### 렌더링 파이프라인
- proposal-viewer.tsx → slide-renderers.tsx → 각 슬라이드 컴포넌트
- SlideWrapper.tsx가 대부분 슬라이드를 감싸지만, Cover와 Divider는 직접 렌더링

---

## 절대 원칙

1. Boris Cherny 방법론: 단계별 검증, 명시적 사용자 선택, AI 임의 판단 금지
2. 시각적 결과 변경 제로 — 리팩토링 전후 49페이지 동일해야 함
3. git 명령 실행 금지 (사용자가 직접 관리)
4. 클로드 코드 프롬프트 470자 이내
5. 한 번에 한 단계씩 실행, 각 단계 완료 후 사용자 확인
