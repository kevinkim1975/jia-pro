# AutoMed Proposal Framework 설계

## Boris Cherny 관점의 타입 안전 프레젠테이션 생성 프레임워크

**목적**: MD 파일 기반의 의료기관 마케팅 제안서 자동 생성
**핵심 원칙**: 컴파일 타임 검증, 타입 안전성, 확장 가능성

---

## 1. 현재 구조 분석

### 1.1 식별된 분리 대상

| 구분 | 현재 위치 | 분리 필요성 |
|------|----------|------------|
| 색상 시스템 | globals.css | ⭐ 테마별 분리 필요 |
| 타이포그래피 | globals.css | ⭐ 폰트 설정 분리 |
| 헤더 설정 | topbar-header.tsx | ⭐ 설정 파일로 분리 |
| 푸터 설정 | progress-footer.tsx | ⭐ 설정 파일로 분리 |
| 배경 패턴 | BackgroundPattern.tsx | ⭐ 테마 시스템에 통합 |
| 슬라이드 타입 | proposal.ts | ✅ 유지 (핵심 도메인) |
| 슬라이드 데이터 | proposal-data.ts | → MD 파일로 대체 |

### 1.2 Boris Cherny 원칙 적용 현황

✅ **이미 적용된 원칙**:
- 판별 유니온 (SlideContent = CoverSlide | TocSlide | ...)
- readonly로 불변성 보장
- 리터럴 타입 (ActNumber = 1 | 2 | 3 | 4 | 5 | 6)
- 타입 가드 함수 (isCoverSlide, isChartSlide)

❌ **추가 필요한 원칙**:
- 설정 타입의 컴파일 타임 검증
- 테마 시스템의 타입 안전성
- MD 파싱 결과의 타입 검증

---

## 2. 프레임워크 아키텍처

### 2.1 디렉토리 구조 제안

```
src/
├── config/                    # 🆕 설정 파일 (분리됨)
│   ├── theme.config.ts        # 테마 설정 (색상, 폰트)
│   ├── layout.config.ts       # 레이아웃 설정 (헤더, 푸터)
│   ├── pattern.config.ts      # 배경 패턴 설정
│   └── index.ts               # 설정 통합 export
│
├── themes/                    # 🆕 테마 프리셋
│   ├── cleveland-clinic.ts    # 현재 테마
│   ├── mayo-clinic.ts         # 예시 테마
│   └── index.ts
│
├── parser/                    # 🆕 MD 파서
│   ├── markdown-parser.ts     # MD → AST 변환
│   ├── slide-transformer.ts   # AST → Slide[] 변환
│   ├── validators.ts          # 타입 검증
│   └── index.ts
│
├── generator/                 # 🆕 생성기
│   ├── proposal-generator.ts  # 메인 생성기
│   ├── css-generator.ts       # 동적 CSS 생성
│   └── index.ts
│
├── types/                     # 기존 + 확장
│   ├── proposal.ts            # 기존 유지
│   ├── config.ts              # 🆕 설정 타입
│   └── parser.ts              # 🆕 파서 타입
│
├── components/                # 기존 유지 (렌더러)
├── data/                      # → content/ 로 대체
│
└── content/                   # 🆕 MD 콘텐츠
    ├── templates/             # MD 템플릿
    │   └── medical-proposal-template.md
    └── proposals/             # 실제 제안서
        └── 정이안한의원_마케팅전략_제안서.md
```

---

## 3. 타입 시스템 설계 (Boris Cherny 스타일)

### 3.1 테마 설정 타입

```typescript
// src/types/config.ts

/**
 * 색상 팔레트 - 리터럴 타입으로 제한
 * Boris Cherny: "가능한 값을 타입으로 명시하여 오류 방지"
 */
export interface ColorPalette {
  readonly primary: `#${string}`;      // 메인 색상
  readonly primaryForeground: `#${string}`;
  readonly secondary: `#${string}`;    // 보조 색상
  readonly secondaryForeground: `#${string}`;
  readonly accent: `#${string}`;       // 강조 색상
  readonly accentForeground: `#${string}`;
  readonly background: `#${string}`;
  readonly foreground: `#${string}`;
  readonly muted: `#${string}`;
  readonly mutedForeground: `#${string}`;
  readonly surface: `#${string}`;
  readonly border: `#${string}`;
  readonly destructive: `#${string}`;
  readonly destructiveForeground: `#${string}`;
}

/**
 * 타이포그래피 설정
 */
export interface Typography {
  readonly fontFamily: {
    readonly primary: string;
    readonly secondary?: string;
  };
  readonly fontSize: {
    readonly xs: `${number}rem`;
    readonly sm: `${number}rem`;
    readonly base: `${number}rem`;
    readonly lg: `${number}rem`;
    readonly xl: `${number}rem`;
    readonly '2xl': `${number}rem`;
    readonly '3xl': `${number}rem`;
  };
}

/**
 * 배경 패턴 설정
 */
export type PatternType = 'crosshatch' | 'dots' | 'radial' | 'concentric' | 'none';

export interface PatternConfig {
  readonly type: PatternType;
  readonly opacity: number;        // 0-100
  readonly color: `#${string}`;
  readonly size?: number;          // 패턴 크기 (px)
  readonly strokeWidth?: number;   // 선 두께 (px)
}

export interface BackgroundConfig {
  readonly cover: PatternConfig;      // 표지용
  readonly divider: PatternConfig;    // 간지용
  readonly content: PatternConfig;    // 일반 슬라이드용
}

/**
 * 테마 전체 설정 - 불변 객체
 */
export interface ThemeConfig {
  readonly name: string;
  readonly colors: ColorPalette;
  readonly typography: Typography;
  readonly background: BackgroundConfig;
  readonly spacing: {
    readonly unit: number;  // 기본 단위 (px)
    readonly scale: readonly number[];  // 배수 [1, 2, 3, 4, 6, 8, 12, 16]
  };
  readonly radius: `${number}rem`;
}
```

### 3.2 레이아웃 설정 타입

```typescript
// src/types/config.ts (계속)

/**
 * 헤더 설정
 */
export interface HeaderConfig {
  readonly height: number;           // px
  readonly backgroundColor: keyof ColorPalette | `#${string}`;
  readonly logo: {
    readonly type: 'text' | 'image';
    readonly content: string;        // 텍스트 또는 이미지 경로
    readonly size: number;           // px
    readonly backgroundColor: keyof ColorPalette | `#${string}`;
  };
  readonly title: {
    readonly visible: boolean;
    readonly position: 'left' | 'center' | 'right';
    readonly color: keyof ColorPalette | `#${string}`;
  };
  readonly navigation: {
    readonly showToc: boolean;
    readonly showPageNumber: boolean;
  };
}

/**
 * 푸터 설정
 */
export interface FooterConfig {
  readonly height: number;           // px
  readonly progressBar: {
    readonly visible: boolean;
    readonly height: number;         // px
    readonly backgroundColor: keyof ColorPalette | `#${string}`;
    readonly fillColor: keyof ColorPalette | `#${string}`;
  };
  readonly navigation: {
    readonly buttonStyle: 'filled' | 'outline' | 'ghost';
    readonly buttonColor: keyof ColorPalette | `#${string}`;
    readonly showLabels: boolean;
    readonly labels: {
      readonly previous: string;
      readonly next: string;
    };
  };
  readonly pageIndicator: {
    readonly visible: boolean;
    readonly position: 'left' | 'center' | 'right';
    readonly format: 'number' | 'progress' | 'both';
  };
}

/**
 * 전체 레이아웃 설정
 */
export interface LayoutConfig {
  readonly header: HeaderConfig;
  readonly footer: FooterConfig;
  readonly slide: {
    readonly maxWidth: number;       // px
    readonly aspectRatio?: '16:9' | '4:3' | 'auto';
    readonly padding: {
      readonly x: number;            // px
      readonly y: number;            // px
    };
  };
}
```

### 3.3 프로젝트 메타데이터 타입

```typescript
/**
 * 프로젝트 메타데이터 - MD 파일 frontmatter에서 파싱
 */
export interface ProjectMeta {
  readonly id: string;
  readonly clientName: string;
  readonly clientNameEn?: string;
  readonly projectTitle: string;
  readonly subtitle?: string;
  readonly date: string;             // ISO 8601
  readonly company: {
    readonly name: string;
    readonly contact: {
      readonly person: string;
      readonly email: string;
      readonly phone?: string;
    };
  };
  readonly theme: string;            // 테마 이름 참조
  readonly layout?: string;          // 레이아웃 프리셋 참조
}

/**
 * 완전한 프로젝트 설정
 */
export interface ProjectConfig {
  readonly meta: ProjectMeta;
  readonly theme: ThemeConfig;
  readonly layout: LayoutConfig;
}
```

---

## 4. MD 파서 설계

### 4.1 MD 파일 형식 정의

```markdown
---
# Frontmatter (YAML)
id: "jia-2025-01"
clientName: "정이안한의원"
clientNameEn: "Jung-e-an Korean Medicine Clinic"
projectTitle: "마케팅 전략 제안서"
date: "2025-01-20"
company:
  name: "호원앤컴퍼니"
  contact:
    person: "담당자"
    email: "contact@howon.com"
theme: "cleveland-clinic"
layout: "default"
---

# ACT 1: 상황 | Situation
<!-- act: 1, purpose: 정이안한의원의 현재 상황 분석 -->

## [cover]
title: 정이안한의원 마케팅 전략 제안
subtitle: AI CRM 기반 환자 관계 혁신
date: 2025년 1월
company: 호원앤컴퍼니

## [toc]
<!-- 자동 생성 -->

## [divider]
<!-- 자동 생성: ACT 정보 사용 -->

## [content] 정이안한의원 소개
content: |
  정이안한의원은 난임/불임 치료 전문 한의원으로...
bullets:
  - 20년 이상의 난임 치료 경험
  - 연간 3,000건 이상 상담
emphasis: 난임/불임 전문 한의원

## [cards] 핵심 역량
cards:
  - title: 전문성
    subtitle: 20+ Years
    description: 난임/불임 치료 전문
  - title: 실적
    subtitle: 3,000+
    description: 연간 상담 건수
  - title: 신뢰
    subtitle: 4.8/5.0
    description: 환자 만족도
bottomMessage: 검증된 전문성과 신뢰

## [chart] 시장 트렌드
chartType: line
data:
  - label: "2020"
    value: 100
  - label: "2024"
    value: 145
    annotation: +45%
highlight: 5년간 45% 성장

# ACT 2: 위기 | Crisis
<!-- act: 2, purpose: 현재 직면한 도전 과제 -->

## [divider]

## [comparison] 현황 대비
quote: 변화가 필요한 시점
before:
  label: 현재 상태
  items:
    - 수동 환자 관리
    - 분산된 데이터
after:
  label: 필요한 상태
  items:
    - 자동화된 CRM
    - 통합 데이터 관리

# ... 계속
```

### 4.2 파서 타입 정의

```typescript
// src/types/parser.ts

/**
 * MD 파싱 결과 - 원시 데이터
 */
export interface ParsedMarkdown {
  readonly frontmatter: Record<string, unknown>;
  readonly acts: readonly ParsedAct[];
}

export interface ParsedAct {
  readonly number: number;
  readonly title: string;
  readonly subtitle: string;
  readonly purpose?: string;
  readonly slides: readonly ParsedSlide[];
}

export interface ParsedSlide {
  readonly type: string;
  readonly title?: string;
  readonly rawContent: Record<string, unknown>;
  readonly lineNumber: number;  // 오류 추적용
}

/**
 * 검증 결과 - 에러 수집
 */
export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly ValidationError[];
  readonly warnings: readonly ValidationWarning[];
}

export interface ValidationError {
  readonly code: string;
  readonly message: string;
  readonly line?: number;
  readonly field?: string;
}

export interface ValidationWarning {
  readonly code: string;
  readonly message: string;
  readonly line?: number;
  readonly suggestion?: string;
}

/**
 * 변환 결과 - 타입 안전한 Proposal
 */
export type TransformResult = 
  | { readonly success: true; readonly proposal: Proposal }
  | { readonly success: false; readonly errors: readonly ValidationError[] };
```

### 4.3 파서 구현 (의사 코드)

```typescript
// src/parser/markdown-parser.ts

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { parse as parseYaml } from 'yaml';

/**
 * Boris Cherny 원칙: 
 * "파싱 결과를 즉시 타입 검증하여 런타임 오류를 컴파일 타임으로 이동"
 */
export function parseMarkdown(content: string): ParsedMarkdown {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml']);
  
  const ast = processor.parse(content);
  
  // 1. Frontmatter 추출
  const frontmatter = extractFrontmatter(ast);
  
  // 2. ACT별 슬라이드 추출
  const acts = extractActs(ast);
  
  return { frontmatter, acts };
}

// src/parser/slide-transformer.ts

/**
 * 타입 안전한 변환기
 * ParsedSlide → SlideContent (판별 유니온)
 */
export function transformSlide(
  parsed: ParsedSlide,
  actNumber: ActNumber
): TransformResult<SlideContent> {
  
  switch (parsed.type) {
    case 'cover':
      return transformCoverSlide(parsed);
    case 'content':
      return transformContentSlide(parsed);
    case 'cards':
      return transformCardsSlide(parsed);
    case 'chart':
      return transformChartSlide(parsed);
    // ... 기타 타입
    default:
      return {
        success: false,
        errors: [{
          code: 'UNKNOWN_SLIDE_TYPE',
          message: `Unknown slide type: ${parsed.type}`,
          line: parsed.lineNumber
        }]
      };
  }
}
```

---

## 5. 생성기 설계

### 5.1 생성 파이프라인

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   MD 파일   │ ──▶ │    파싱     │ ──▶ │    검증     │ ──▶ │    변환     │
│  (콘텐츠)   │     │ (AST 생성)  │     │ (타입 체크) │     │ (Proposal)  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   테마      │ ──▶ │   CSS 생성  │ ──▶ │  컴포넌트   │ ◀── │   렌더링    │
│  (설정)     │     │  (동적)     │     │  (재사용)   │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### 5.2 생성기 인터페이스

```typescript
// src/generator/proposal-generator.ts

/**
 * 프레젠테이션 생성기 - 메인 진입점
 */
export interface ProposalGenerator {
  /**
   * MD 파일에서 제안서 생성
   * @param mdContent - 마크다운 콘텐츠
   * @param options - 생성 옵션
   * @returns 생성 결과
   */
  generate(
    mdContent: string,
    options?: GenerateOptions
  ): Promise<GenerateResult>;
  
  /**
   * 테마만 적용 (기존 Proposal에)
   */
  applyTheme(
    proposal: Proposal,
    theme: ThemeConfig
  ): ThemedProposal;
  
  /**
   * 레이아웃만 적용
   */
  applyLayout(
    proposal: Proposal,
    layout: LayoutConfig
  ): LayoutedProposal;
}

export interface GenerateOptions {
  readonly theme?: string | ThemeConfig;
  readonly layout?: string | LayoutConfig;
  readonly validate?: boolean;
  readonly strict?: boolean;  // 경고도 에러로 처리
}

export type GenerateResult =
  | { readonly success: true; readonly proposal: Proposal; readonly css: string }
  | { readonly success: false; readonly errors: readonly ValidationError[] };
```

---

## 6. 구현 로드맵

### Phase 1: 설정 시스템 분리 (1-2일)

1. **config/ 디렉토리 생성**
   - `theme.config.ts` - 현재 globals.css를 타입 안전한 객체로
   - `layout.config.ts` - 헤더/푸터 설정 분리
   - `pattern.config.ts` - 배경 패턴 설정 분리

2. **themes/ 디렉토리 생성**
   - `cleveland-clinic.ts` - 현재 테마를 프리셋으로
   - 타입 안전한 테마 정의

3. **CSS 동적 생성기**
   - ThemeConfig → CSS 변수 변환
   - globals.css 자동 생성

### Phase 2: 타입 시스템 확장 (1일)

1. **types/config.ts 생성**
   - 위에서 정의한 모든 설정 타입
   - 타입 가드 함수

2. **types/parser.ts 생성**
   - 파싱 결과 타입
   - 검증 결과 타입

### Phase 3: MD 파서 구현 (2-3일)

1. **parser/markdown-parser.ts**
   - unified + remark 기반 파서
   - frontmatter 추출
   - ACT/슬라이드 구조 추출

2. **parser/slide-transformer.ts**
   - ParsedSlide → SlideContent 변환
   - 각 슬라이드 타입별 변환 로직

3. **parser/validators.ts**
   - 스키마 검증
   - 필수 필드 체크
   - 타입 호환성 검증

### Phase 4: 생성기 구현 (2일)

1. **generator/proposal-generator.ts**
   - 메인 파이프라인
   - 테마/레이아웃 적용

2. **generator/css-generator.ts**
   - 동적 CSS 생성
   - 테마 변수 주입

### Phase 5: CLI/API 제공 (1-2일)

1. **CLI 도구**
   ```bash
   npx automed-proposal generate ./content/정이안한의원.md --theme cleveland-clinic
   ```

2. **프로그래매틱 API**
   ```typescript
   import { generateProposal } from '@automed/proposal-generator';
   
   const result = await generateProposal(mdContent, {
     theme: 'cleveland-clinic',
     layout: 'default'
   });
   ```

---

## 7. 대안 비교

### 대안 A: 완전 타입 기반 (권장)

**장점:**
- 컴파일 타임 100% 검증
- IDE 자동완성 완벽 지원
- 오류 조기 발견

**단점:**
- 초기 구현 비용 높음
- MD 파서 복잡도 증가

### 대안 B: JSON Schema 기반

**장점:**
- 런타임 검증 용이
- 기존 도구 활용 가능

**단점:**
- 타입 안전성 약화
- 컴파일 타임 검증 불가

### 대안 C: Zod 기반 런타임 검증

**장점:**
- 타입 추론 자동화
- 런타임 + 컴파일타임 모두 지원

**단점:**
- 추가 의존성
- 번들 크기 증가

### 권장 선택: 대안 A + C 하이브리드

```typescript
import { z } from 'zod';

// Zod 스키마로 런타임 검증 + 타입 추론
const ThemeConfigSchema = z.object({
  name: z.string(),
  colors: ColorPaletteSchema,
  typography: TypographySchema,
  // ...
});

// 자동 타입 추론
export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;

// 런타임 검증 함수
export function validateTheme(data: unknown): ThemeConfig {
  return ThemeConfigSchema.parse(data);
}
```

---

## 8. 결론

Boris Cherny의 핵심 메시지를 적용하면:

> "타입 시스템은 버그를 런타임에서 컴파일 타임으로 이동시키는 도구다.
> 가능한 한 많은 제약을 타입으로 표현하라."

이 프레임워크는:
1. **MD 파일**로 콘텐츠 정의 (비개발자 친화적)
2. **타입 안전한 설정**으로 테마/레이아웃 관리
3. **컴파일 타임 검증**으로 오류 조기 발견
4. **확장 가능한 구조**로 새로운 의료기관 대응

다음 단계로 Phase 1 (설정 시스템 분리)부터 시작할까요?
