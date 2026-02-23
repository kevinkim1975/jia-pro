═══ JIA-PRO 프로젝트 인수인계 ═══

■ 프로젝트 개요
정이안한의원(Korean Medicine Clinic) 마케팅 전략 제안서 웹 프레젠테이션 시스템.
React/TypeScript + Next.js + Tailwind CSS. Vercel 배포.
디자인 시스템명: "Balanced Harmony" (yin-yang 원리 기반)

■ 핵심 규칙
1. Boris Cherny 방법론: 단계별 검증, 명시적 사용자 선택, AI가 임의로 결정하지 않음
2. 코드 수정은 반드시 사용자 지시 후에만. 무단 수정 절대 금지
3. v0.dev 토큰 비용 민감 — 한 번에 완성되는 상세 프롬프트 필요
4. 빨간색 계열 사용 금지 (의료 부적합)
5. 불필요한 Vercel 접속이나 중복 확인으로 컨텍스트 낭비하지 말 것

■ 기술 스택
- React/TypeScript, Next.js, Tailwind CSS
- Font: Pretendard (CDN)
- 색상: primary #004B8D, primaryDark #003366, secondary #48A9C5
- neutral: 50 #F8FAFC ~ 900 #0F172A
- 8-point grid system, 1920×1080 기준 슬라이드 디자인

■ 프로젝트 경로
루트: C:\MyProject\crmp\jia-pro

핵심 파일:
- src/components/proposal-viewer.tsx — 메인 레이아웃 (헤더/슬라이드/푸터 조합)
- src/components/topbar-header.tsx — 헤더 (방안3 보더라인만 적용 완료)
- src/components/progress-footer.tsx — 푸터 (방안3 보더라인만 적용 완료)
- src/components/slides/index.tsx — SlideRenderer (12종 슬라이드 타입 라우팅)
- src/components/slides/CoverSlide.tsx — 커버 슬라이드 (v0.dev 생성, 기하학 요소+애니메이션)
- src/components/slides/TocSlide.tsx — 목차 슬라이드 (v0.dev 생성, Editorial Sidebar 디자인)
- src/components/SlideWrapper.tsx — 보존됨, 단 모든 슬라이드에서 제거 상태
- config/theme.ts — 디자인 토큰 정의
- config/meta.ts — 메타 정보 (이전에 git 충돌로 삭제 후 복구한 이력 있음)
- src/app/globals.css — CSS 변수
- public/logo.jpg — 회사 로고 (304×90px 원본)

슬라이드 컴포넌트 (13종):
CoverSlide, TocSlide, DividerSlide, ContentSlide, CardsSlide,
ChartSlide(동적로딩), ComparisonSlide, SummarySlide, ClosingSlide,
TwoColumnSlide, QuoteSlide, FlowStepsSlide + shared/ 디렉토리

■ 완료된 작업

1. 커버 슬라이드 레이아웃 수정
   - SlideWrapper를 모든 슬라이드에서 제거 (파일은 보존)
   - 커버 전용 조건분기: max-width/padding 제거 (proposal-viewer.tsx 73행)

2. 헤더/푸터 리디자인 — "방안3: 보더라인만" 적용 완료
   - 배경 흰색, 1px 보더만으로 영역 구분
   - 헤더 44px, 푸터 44px
   - v0.dev에서 생성 → proposal-nav.tsx로 받아서 분리 적용

3. 콘텐츠 세로 중앙 정렬 (proposal-viewer.tsx)
   - 커버: h-full 체인 유지 (커버 자체 내부에서 justify-center)
   - 나머지: flex items-center로 세로 중앙
   - 조건분기 코드 (74-75행):
     <div className={`h-full ${cover ? "" : "flex items-center"}`}>
       <div className={cover ? "h-full" : "w-full"}>

4. 헤더 로고 — "정" 글자 → logo.jpg 이미지로 교체 완료
   - height: 26px, width: auto, grayscale(100%) opacity(0.45)

5. 목차(TocSlide) 디자인 교체 — Editorial Sidebar 디자인 적용 완료
   - v0.dev에서 Plan C(Editorial Sidebar) 생성 → TocSlide.tsx 교체
   - 디자인: 좌측 대형 넘버링(54px, opacity 0.15) + 세로 구분선(gradient) + 우측 제목+dot-leader+페이지번호
   - 4개 기하학 장식요소 (원, 회전사각, 그라데이션원, 수평선) + pulse/float 애니메이션
   - stagger 입장 애니메이션 (0.3s~0.9s 순차)
   - hover: 번호 강조, 제목 이동, chevron 등장
   - 하단 "Proposal" 라벨 포함 (progress-footer와 겹침 없음 확인)
   - 통합 후 수정 2건:
     a) px-16 → px-6 (부모 px-4~8과의 이중패딩 해소)
     b) min-h-[720px] 제거 (가용높이 초과로 콘텐츠 클리핑 방지)
   - 빌드 통과 확인 완료

■ 미완료/다음 작업

1. 헤더/푸터 디자인 검증 — 방안3 적용 후 전체 페이지 순회하며 확인 필요
2. 9개 슬라이드 모듈 디자인 고도화 (커버, 목차 완료 / 나머지 미착수)
   - divider, content, cards, chart, comparison, summary, closing, twoColumn, quote, flowSteps
3. proposal-nav.tsx — 프로젝트에 남아있으나 미사용, 삭제 가능
4. 디자인 방향 참고: "GRAFY DESIGN Hanisul" 수준 목표

■ 작업 분담 체계
- Claude.ai (이 대화): v0.dev MCP 활용 디자인 생성, 프롬프트 엔지니어링
- Claude Code: 코드 수정, 토큰 추출, 컴포넌트 분리, 빌드 확인
- 사용자가 Claude Code 프롬프트를 요청하면 복사-붙여넣기 가능한 형태로 제공

■ v0.dev 프롬프트 작성 패턴 (검증 완료)
프롬프트 구조:
1. 역할 부여 (30-year veteran UI designer)
2. 디자인 시스템 토큰 (MANDATORY 섹션)
3. Props interface (FIXED — 변경 불가)
4. Sample data (FIXED — 프리뷰용)
5. Required elements (FIXED 구조)
6. Creative freedom (V0 자유도 범위 명시)
7. Philosophy (한 문장 비유)
8. Technical requirements ("use client", Tailwind, lucide-react, named exports)
9. Quality checklist

■ prompts/ 디렉토리 (참고용)
- toc-plan-a-executive-grid.md — 미채택
- toc-plan-b-narrative-flow.md — 미채택
- toc-plan-c-editorial-sidebar.md — 채택, 적용 완료
- claude-code-toc-integration.md — 통합 검증 프롬프트

■ 레이아웃 구조 참고 (proposal-viewer.tsx)
73행: 커버만 패딩/max-width 제외, 나머지는 max-w-[1280px] + px-4~8
74행: 커버만 h-full, 나머지는 flex items-center (수직 중앙)
75행: 커버만 h-full, 나머지는 w-full

■ 주의사항
- v0.dev 생성 코드를 Claude Code가 임의 수정하지 않도록 항상 명시할 것
- v0.dev 디자인 요소(색상, 애니메이션, 레이아웃, 장식, 폰트, 간격)는 오류 아닌 한 변경 금지
- 수정 범위를 행번호/className 수준으로 특정하여 프롬프트 작성
- 디자인 방안은 항상 3가지 제시 후 사용자 선택 (Boris Cherny)
