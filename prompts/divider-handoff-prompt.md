# JIA-PRO 프로젝트 핸드오프 — DividerSlide 디자인

## 프로젝트 개요

정이안한의원(Jeong-ian Korean Medicine Clinic) 마케팅 전략 제안서 프레젠테이션 시스템.
49슬라이드, 12가지 슬라이드 타입, React/TypeScript/Next.js/Tailwind CSS.
디자인 철학: "Balanced Harmony" (음양 원리 기반).
Vercel 배포. v0.dev로 고품질 컴포넌트 디자인.

## 프로젝트 경로

- 루트: `C:\MyProject\crmp\jia-pro`
- 슬라이드 컴포넌트: `C:\MyProject\crmp\jia-pro\src\components\slides\`
- 데이터: `C:\MyProject\crmp\jia-pro\src\data\proposal-data.ts`
- 렌더러: `C:\MyProject\crmp\jia-pro\src\components\slides\index.tsx`
- 프롬프트 저장: `C:\MyProject\crmp\jia-pro\prompts\`

## 디자인 시스템 (확정, 절대 불변)

### 색상 토큰 (14색)
```
primary:        #004B8D   (Ocean Blue Deep)
primaryLight:   #1A5F7A   (Ocean Blue)
secondary:      #48A9C5   (Teal Bright)
secondaryLight: #57A0A0   (Teal Green)
accent:         #9DC5BB   (Soft Mint)
accentLight:    #B8D8D0   (Mint Light)
bgWhite:        #FAFBFC   (Background White)
bgCream:        #F5F0EB   (Warm Cream)
bgMist:         #EEF4F8   (Cool Mist)
textPrimary:    #1A1A2E   (Near Black)
textSecondary:  #4A5568   (Dark Gray)
textMuted:      #94A3B8   (Muted Gray)
borderLight:    #E2E8F0   (Light Border)
white:          #FFFFFF
```

### ❌ 금지: 빨간색 계열 (의료 맥락에서 절대 사용 금지)

### 폰트
- 기본: Pretendard (system-ui 폴백)
- 한글 제목, 영문 부제 모두 Pretendard

### 간격: 8pt 그리드 시스템

## v0 디자인 완료된 컴포넌트 (참고용)

| 컴포넌트 | 라인수 | 디자인명 | 특징 |
|----------|:------:|---------|------|
| CoverSlide | 366 | - | 표지 |
| TocSlide | 375 | - | 목차, Editorial Sidebar |
| ClosingSlide | 282 | - | 마무리 |
| TwoColumnSlide | 449 | "Elevated Panels" | 프로스트 패널, translateY 애니메이션 |
| CardsSlide | 345 | "Frosted Panels" | 프로스트 글래스, 순번 인디케이터, translateY |

### 디자인 패밀리 일관성
TwoColumnSlide와 CardsSlide 모두 "Frosted/Elevated Panels" 계열:
- rounded 카드, subtle shadow
- gradient accent border (primary→secondary)
- 순번 인디케이터 ("01", "02"...)
- translateY 입장 애니메이션
- 배경에 soft gradient blur 원형 장식 (최대 5개)

## 현재 작업 대상: DividerSlide

### 역할
ACT 구분 간지(칸지) 슬라이드. 프레젠테이션의 각 ACT(장) 시작을 알리는 전면 페이지.
책의 "Part 1", "Part 2" 같은 역할.

### 6개 DividerSlide 전체 데이터

| Page | act | title | subtitle |
|:----:|:---:|-------|----------|
| 3 | 1 | 상황 | Situation |
| 6 | 2 | 위기 | Crisis |
| 13 | 3 | 전환점 | Turning Point |
| 18 | 4 | 해결책 1: 마케팅 전략 | Marketing Strategy |
| 25 | 5 | 해결책 2: AI CRM | AI CRM |
| 45 | 6 | 요약 및 Next Step | Summary & Next Step |

### Props 인터페이스 (확정)
```tsx
interface DividerSlideProps {
  readonly act: number        // 1~6
  readonly title: string      // 한글 제목
  readonly subtitle: string   // 영문 부제
}
```

### 현재 컴포넌트 (62줄, 기본 버전 — 교체 대상)
```tsx
export function DividerSlide({ act, title, subtitle }: DividerSlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      {/* 워터마크 숫자 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[180px] font-black text-[#004B8D]/[0.03] leading-none">
          {act}
        </span>
      </div>
      <div className="relative z-10 text-center space-y-4">
        <span className="inline-block text-xs font-semibold tracking-[0.4em] text-[#48A9C5] uppercase">
          ACT {act}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#004B8D] leading-none">
          {title}
        </h1>
        <p className="text-base md:text-lg font-light text-[#48A9C5] tracking-wide">
          {subtitle}
        </p>
        <div className="pt-4 flex justify-center">
          <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        </div>
      </div>
    </div>
  )
}
```

### 렌더러 호출 방식 (index.tsx)
```tsx
import { DividerSlide } from "./DividerSlide"
// ...
case 'divider':
  return (
    <DividerSlide
      act={content.act}
      title={content.title}
      subtitle={content.subtitle}
    />
  )
// ...
export { DividerSlide } from "./DividerSlide"
```

### 배경 처리
DividerSlide는 SlideWrapper에서 별도 배경색이 적용됨 (primary 계열).
컴포넌트 자체는 배경을 가지지 않고, 부모가 처리.

### 대표 페이지 (디자인 기준)
**p.18 "해결책 1: 마케팅 전략"** 추천 (act=4, 가장 긴 제목, 콘텐츠 균형 테스트 적합)
또는 사용자가 다른 페이지 선택 가능.

## 작업 방법론

### Boris Cherny 방법론 (필수 준수)
1. 단계별 검증 — 각 단계 완료 후 사용자 확인
2. 명시적 선택 — AI가 임의 결정하지 않음, 항상 사용자에게 선택지 제시
3. 데이터 기반 — 가정하지 않고 실제 데이터 검증

### 3-Plan 전략 (이전 성공 패턴)
TwoColumnSlide, CardsSlide 모두 이 패턴으로 진행:
1. 데이터 검증 (모든 divider 슬라이드 구조 확인) ← 위에서 완료
2. 3가지 디자인 플랜 차별화 전략 수립 (6축 차별화)
3. 각 플랜별 완전한 v0.dev 프롬프트 작성
4. 사용자가 1개 선택
5. v0.dev에서 생성
6. DividerSlide.tsx에 배포

### 차별화 6축
- 카드/레이아웃 형태
- 숫자/타이틀 처리
- 요소 관계성
- 기하학적 장식
- 레퍼런스 미학
- 의료 신뢰 접근법

### v0.dev 프롬프트 구조
```
1. Canvas (960×540 fixed)
2. Color Palette (14 tokens)
3. Sample Data
4. Typography
5. Design Direction (플랜별 차별점)
6. Geometric Elements
7. Animation
8. Technical Requirements (16항목)
9. Quality Checklist
10. Creative Freedom Table
```

## 기술 요구사항 (v0 프롬프트 공통)

1. "use client" 첫 줄
2. export function DividerSlide 이름 유지
3. DividerSlideProps 인터페이스 유지
4. Tailwind CSS + inline style only (외부 CSS 파일 없음)
5. 외부 컴포넌트 import 없음 (순수 React + Tailwind)
6. Safe Zone: x 4~96%, y 4~90%
7. 캔버스: 960×540px (16:9)
8. 빨간색 계열 금지
9. Pretendard 폰트
10. 반응형 불필요 (고정 캔버스)

## 배포 매핑

```
v0.dev 생성 파일 → C:\MyProject\crmp\jia-pro\src\components\slides\DividerSlide.tsx
```
기존 62줄 파일을 통째로 교체. 렌더러(index.tsx) 수정 불필요.

## 참고: 전체 슬라이드 타입 현황

| 타입 | 슬라이드 수 | v0 디자인 | 상태 |
|------|:---------:|:---------:|:----:|
| twoColumn | 11 (22.4%) | ✅ Elevated Panels | 완료 |
| cards | 8 (16.3%) | ✅ Frosted Panels | 완료 |
| divider | 6 (12.2%) | ⏳ | **현재 작업** |
| quote | 5 (10.2%) | ❌ | 대기 |
| content | 5 (10.2%) | ❌ | 대기 |
| chart | 4 (8.2%) | ❌ | 대기 |
| comparison | 4 (8.2%) | ❌ | 대기 |
| flowSteps | 3 (6.1%) | ❌ | 대기 |
| cover | 1 | ✅ | 완료 |
| toc | 1 | ✅ | 완료 |
| summary | 1 | ❌ | 대기 |
| closing | 1 | ✅ | 완료 |
