═══ JIA-PRO 프로젝트 인수인계 ═══

■ 프로젝트 개요
정이안한의원(Korean Medicine Clinic) 마케팅 전략 제안서 웹 프레젠테이션 시스템.
React/TypeScript + Next.js + Tailwind CSS. Vercel 배포.
디자인 시스템명: "Balanced Harmony" (yin-yang 원리 기반)
49개 슬라이드, 12종 슬라이드 타입.

■ 핵심 규칙
1. Boris Cherny 방법론: 단계별 검증, 명시적 사용자 선택, AI 임의 결정 금지
2. 코드 수정은 반드시 사용자 지시 후에만. 무단 수정 절대 금지
3. v0.dev 토큰 비용 민감 — 한 번에 완성되는 상세 프롬프트 필요
4. 빨간색 계열 사용 금지 (의료 부적합)
5. Claude Code 프롬프트: 470자 이내, git 명령 포함 금지 (사용자 직접 처리)
6. v0 프롬프트: 3안 제시 시 반드시 동일 샘플 데이터로 비교
7. 불필요한 대화/확인으로 사용자 시간 낭비 금지 — 빠르고 신중하게

■ 사용자 디자인 취향 패턴 (선택 이력 기반)
- QuoteSlide: "Type Specimen" 선택 (거대 타이포그래피)
- ComparisonSlide: "Row Showdown" 선택 (미니멀 테이블)
- 공통: 장식 제거, 타이포+구조만으로 승부, PPT SmartArt 느낌 거부

■ 기술 스택
- React/TypeScript, Next.js, Tailwind CSS
- Font: Pretendard (CDN)
- 색상: primary #004B8D, accent #48A9C5, success #10B981
- neutral: 50 #F8FAFC ~ 900 #0F172A
- 캔버스: 1280×720px, backgroundColor #F8FAFC
- 8-point grid system

■ 프로젝트 경로
루트: C:\MyProject\crmp\jia-pro

핵심 파일:
- C:\MyProject\crmp\jia-pro\src\components\proposal-viewer.tsx — 메인 레이아웃
- C:\MyProject\crmp\jia-pro\src\components\topbar-header.tsx — 헤더
- C:\MyProject\crmp\jia-pro\src\components\progress-footer.tsx — 푸터
- C:\MyProject\crmp\jia-pro\src\components\slides\index.tsx — SlideRenderer (12종 라우팅)

슬라이드 컴포넌트 (12종 + shared):
- C:\MyProject\crmp\jia-pro\src\components\slides\CoverSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\TocSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\DividerSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\ContentSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\QuoteSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\ComparisonSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\FlowStepsSlide.tsx ← 현재 작업 중
- C:\MyProject\crmp\jia-pro\src\components\slides\CardsSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\ChartSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\TwoColumnSlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\SummarySlide.tsx
- C:\MyProject\crmp\jia-pro\src\components\slides\ClosingSlide.tsx

Shared 컴포넌트:
- C:\MyProject\crmp\jia-pro\src\components\slides\shared\SlideHeader.tsx (33줄)
  → accent-bar(w-12 h-1 gradient) + title 렌더링
  → gradient: from-[#004B8D] to-[#48A9C5]
  → props: { title: string, align?: 'left' | 'center' }
- C:\MyProject\crmp\jia-pro\src\components\slides\shared\SlideBottomMessage.tsx (34줄)
  → gradient 배경, border-l-4, rounded-xl
  → props: { children: ReactNode, icon?: ReactNode }

기타:
- C:\MyProject\crmp\jia-pro\config\theme.ts — 디자인 토큰
- C:\MyProject\crmp\jia-pro\config\meta.ts — 메타 정보
- C:\MyProject\crmp\jia-pro\public\logo.jpg — 회사 로고

■ 슬라이드 디자인 고도화 진행 상태

완료:
1. CoverSlide — v0.dev 생성, 기하학 요소+애니메이션
2. TocSlide — Editorial Sidebar 디자인 (Plan C 채택)
3. DividerSlide — 배포 완료
4. ContentSlide — 배포 완료
5. QuoteSlide — Type Specimen 디자인 (거대 타이포그래피) 배포 완료
6. ComparisonSlide — Row Showdown 디자인 (미니멀 테이블형) 배포 완료
   - 커밋 SHA: 799538b
   - quote 없는 슬라이드(p.15, p.39, p.42)에 조건부 mt-10 적용 완료

완료 (계속):
7. FlowStepsSlide — Plan C "Column Grid" 배포 완료
   - 적용 페이지: p.23, p.37, p.48 (3개, 전체의 6.1%)
   - accent-bar 컬럼 + 큰 번호(48px, opacity 0.2) + title + description
   - interpolateColor로 스텝별 accent 색상 점진 변화
   - SlideHeader 미사용 (accent-bar 시선 충돌로 직접 h1 렌더링)
   - SlideBottomMessage import 사용, rounded-none 적용
8. CardsSlide — 배포 완료
9. TwoColumnSlide — 배포 완료
10. ClosingSlide — 배포 완료

미착수:
11. SummarySlide
12. ChartSlide

수정 예정:
- CoverSlide — 마지막에 한번 더 수정 예정

■ FlowSteps 데이터 구조
```typescript
interface FlowStepsSlideProps {
  readonly title: string
  readonly steps: readonly {
    readonly step: number
    readonly title: string
    readonly description?: string
  }[]
  readonly bottomMessage?: string
}
```
- steps 범위: 3~4개
- description: 모든 step에 100% 존재
- bottomMessage: 3개 모두 존재

■ prompts/ 디렉토리 (주요 파일)
경로: C:\MyProject\crmp\jia-pro\prompts\

FlowSteps 관련 (현재 작업):
- flowsteps-v2-plan-a-giant-numbers.md — v0 프롬프트 (미채택)
- flowsteps-v2-plan-b-horizontal-bands.md — v0 프롬프트 (미채택)
- flowsteps-v2-plan-c-column-grid.md — v0 프롬프트 (채택, 적용됨)

Cards 관련 (다음 작업 후보):
- cards-3plan-strategy.md
- cards-plan-a-clean-metrics.md
- cards-plan-b-frosted-panels.md
- cards-plan-c-connected-flow.md
- cards-verified-data.md

TwoColumn 관련 (다음 작업 후보):
- twocol-3plan-strategy.md
- twocol-plan-a-precision-grid.md
- twocol-plan-b-elevated-panels.md
- twocol-plan-c-gradient-narrative.md

■ FROZEN vs FREE 분류 체계 (모든 슬라이드 공통)

FROZEN (절대 변경 금지):
- SlideHeader import 사용 (직접 구현 금지) — 단, FlowSteps는 예외적으로 직접 렌더링
- SlideBottomMessage import 사용 (직접 구현 금지)
- Interface 타입 구조
- 캔버스: 1280×720px, backgroundColor #F8FAFC
- 색상 체계: #004B8D, #48A9C5, #10B981
- 폰트: Pretendard, -apple-system, sans-serif
- shadcn Card 사용 금지 (전면 제거 대상)

FREE (v0 자유도):
- 배치 구조, 간격, 타이포그래피 위계
- 시각 요소 (accent bar, 구분선 등)
- 색상 opacity/조합

■ 작업 분담 체계
- Claude.ai: v0.dev MCP 활용 디자인 생성, 프롬프트 엔지니어링, 전략 수립
- Claude Code: 코드 수정, import 적용, 빌드 확인
- 사용자: git push/commit 직접 처리, v0.dev에 프롬프트 입력
- Claude Code 프롬프트 470자 이내, git 명령 포함 금지

■ 레이아웃 구조 (proposal-viewer.tsx)
- 커버만 패딩/max-width 제외, 나머지는 max-w-[1280px] + px-4~8
- 커버만 h-full, 나머지는 flex items-center (수직 중앙)

■ 즉시 해야 할 작업
다음 슬라이드 디자인 고도화 진행 (SummarySlide 또는 ChartSlide)
마지막에 CoverSlide 수정
