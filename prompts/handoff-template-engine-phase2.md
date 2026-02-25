# 템플릿 엔진 완성 — 핸드오프 문서 (Phase 2)

## 프로젝트 개요

**프로젝트**: pro-template (호원앤컴퍼니 재사용 프레젠테이션 템플릿 엔진)
**소스 프로젝트**: jia-pro (정이안한의원 마케팅 제안서)
**경로**:
- 소스: C:\MyProject\crmp\jia-pro\
- 템플릿: C:\MyProject\crmp\pro-template\
**스택**: React/TypeScript, Next.js, Tailwind CSS, Vercel 배포

## 완료된 작업

### Step 1: theme.ts 재작성 ✅
- 18개 색상 추가 (secondary, primaryDeep, primaryDarker, accent, border, textDark/Body/Muted/Light 등)
- 11개 미사용 항목 삭제 (구 accent #0066CC, primaryLight, patterns 전체 등)
- neutral 팔레트: Slate→Gray 통일 (200/400/700/800만, 나머지는 원래 Slate 유지 — 슬라이드 실제 사용값과 일치)
- chart 섹션 신설 (warning, danger, palette 8색)
- fontSize 24단계 (10~120px), fontFamily 단일 문자열 통일
- header.height 44px, topbarHeight 44

### Step 2: 14개 컴포넌트 리팩토링 ✅
모든 하드코딩 색상/폰트를 theme.ts import로 교체. 시각적 변경 제로.

| # | 컴포넌트 | 주요 교체 |
|---|----------|----------|
| 1 | CoverSlide | 6색 + gradient 템플릿 리터럴 + fontSize 6개 |
| 2 | TocSlide | 7색 + CSS hover/keyframe 내 색상 포함 |
| 3 | DividerSlide | 5색 + gradient + fontSize 5개 |
| 4 | ChartSlide | CHART_COLORS/PIE_COLORS → 토큰, 6색 추가 |
| 5 | ContentSlide | toneConfig 3색 + neutral[50] |
| 6 | CardsSlide | TONE_MAP 7색 + 인라인 5색, as const 제거 |
| 7 | ComparisonSlide | 11색 |
| 8 | TwoColumnSlide | 로컬 COLORS/FONT_FAMILY 완전 제거 → 토큰 |
| 9 | FlowStepsSlide | 6색 + interpolateColor 내 참조 |
| 10 | QuoteSlide | 3색 + fontSize 조건식 |
| 11 | SummarySlide | hexToRgb 헬퍼 추가, primaryRGB/accentRGB 토큰화, Tailwind arbitrary→inline |
| 12 | ClosingSlide | SVG gradient stopColor 포함 |
| 공유 | SlideHeader | Tailwind arbitrary→inline gradient |
| 공유 | SlideBottomMessage | gradient + borderColor + text color |

모든 컴포넌트 import 패턴: `import { currentTheme } from "../../../config/theme"` (상대경로)

### Step 3: 빌드 + 시각 검증 ✅
- npm run build 성공
- Vercel 배포 성공
- 49페이지 전체 시각 동일 확인

### Step 4-1: pro-template 폴더 구조 생성 ✅
- template/ 하위 38개 파일 복사 (jia-pro에서)
- proposal-data.ts 미복사 (generate.ts가 생성할 파일)
- input/, output/ 빈 폴더 생성

### Step 4-2: generate.ts 파서 작성 ✅
- 330줄 TypeScript, 외부 의존성 없음 (fs, path만)
- 12개 슬라이드 타입 파싱 지원
- 라운드트립 검증 완료: 49슬라이드 → layout.md → generate.ts → proposal-data.ts
- diff 1건만 존재: id 필드 로마자 표기 차이 (jeongiaan vs 정이안한의원)
- 따옴표 버그 발견 및 수정 (cleanValue에서 콘텐츠 따옴표 보존)

---

## 미완료 작업

### Step 4-2.5: template 폴더 누락 파일 보충

jia-pro와 대조 결과, template/에 **빌드 필수 파일 7건이 누락**되어 있다.
이 파일들이 없으면 output/에서 독립 빌드가 불가능하다.

**누락 파일 목록:**

| # | 파일 | 소스 경로 (jia-pro) | 대상 경로 (template) | 역할 |
|---|------|-------------------|---------------------|------|
| 1 | proposal.ts | src/types/proposal.ts | src/types/proposal.ts | 타입 정의 — proposal-data.ts가 import |
| 2 | SlideWrapper.tsx | src/components/SlideWrapper.tsx | src/components/SlideWrapper.tsx | 슬라이드 래퍼 (Cover/Divider 제외 전체) |
| 3 | progress-footer.tsx | src/components/progress-footer.tsx | src/components/progress-footer.tsx | 프레젠테이션 하단 진행바 |
| 4 | proposal-nav.tsx | src/components/proposal-nav.tsx | src/components/proposal-nav.tsx | 네비게이션 컴포넌트 |
| 5 | topbar-header.tsx | src/components/topbar-header.tsx | src/components/topbar-header.tsx | 상단 헤더 |
| 6 | chart-slide.tsx | src/components/chart-slide.tsx | src/components/chart-slide.tsx | ChartSlide re-export 관계 확인 필요 |
| 7 | ui/ 폴더 | src/components/ui/ | src/components/ui/ | UI 유틸리티 컴포넌트 |

**실행 방법:**
jia-pro에서 위 7건을 pro-template/template/에 복사.
복사 후 template/ 파일 목록을 tree로 보고.

### Step 4-3: 배치 복사 스크립트 작성

template/ 전체 + 생성된 proposal-data.ts를 output/에 복사하는 스크립트.

**생성할 파일**: pro-template/build.ts (또는 build.sh)

**실행 흐름:**
```
1. input/layout.md 존재 확인
2. generate.ts 실행 → template/src/data/proposal-data.ts 생성
3. template/ 전체를 output/에 복사 (기존 output/ 내용 삭제 후)
4. 완료 메시지 출력
```

output/ 폴더가 독립된 Next.js 프로젝트가 되어야 한다.
- output/에서 npm install → npm run build 성공해야 함
- output/을 별도 레포에 커밋 → Vercel 배포 가능

### Step 5: End-to-End 테스트

정이안 데이터로 전체 파이프라인 검증:
1. input/layout.md (정이안 49슬라이드 데이터) → generate.ts 실행
2. build.ts 실행 → output/ 생성
3. output/에서 npm install + npm run build 성공 확인
4. Vercel 배포 → 49페이지 동일 확인

---

## 현재 폴더 구조

```
C:\MyProject\crmp\pro-template\
├── input/
│   └── layout.md              ← 정이안 49슬라이드 데이터 (라운드트립 테스트에서 생성됨)
├── output/                    ← 비어있음 (Step 4-3에서 채워짐)
├── template/
│   ├── src/
│   │   ├── components/
│   │   │   ├── slides/        ← 12개 슬라이드 + shared/ (14파일)
│   │   │   │   ├── shared/SlideHeader.tsx
│   │   │   │   ├── shared/SlideBottomMessage.tsx
│   │   │   │   └── (12개 슬라이드 + index.tsx)
│   │   │   ├── proposal-viewer.tsx
│   │   │   └── slide-renderers.tsx
│   │   │   ← 누락: SlideWrapper.tsx, progress-footer.tsx, proposal-nav.tsx,
│   │   │          topbar-header.tsx, chart-slide.tsx, ui/
│   │   ├── app/               ← page.tsx, layout.tsx, globals.css, favicon.ico
│   │   ├── data/
│   │   │   └── proposal-data.ts  ← generate.ts가 덮어쓸 파일
│   │   ├── lib/               ← utils.ts, validate-composition.ts
│   │   └── types/             ← 누락: proposal.ts
│   ├── config/                ← theme.ts, structure.ts, meta.ts, index.ts
│   ├── public/                ← 이미지/아이콘 파일들
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── postcss.config.mjs
└── generate.ts                ← layout.md → proposal-data.ts 파서 (330줄)
```

## 절대 원칙

1. Boris Cherny 방법론: 단계별 검증, 명시적 사용자 선택, AI 임의 판단 금지
2. 시각적 결과 변경 제로
3. git 명령 실행 금지 (사용자가 직접 관리)
4. 한 번에 한 단계씩 실행, 각 단계 완료 후 사용자 확인
5. 핸드오프 문서에 명시되지 않은 사항을 "확인사항"으로 제안하지 말 것
