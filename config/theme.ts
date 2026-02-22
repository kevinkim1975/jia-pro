/**
 * 디자인 토큰 시스템 - config/theme.ts
 * 
 * Boris Cherny 원칙:
 * - 모든 색상은 HEX 형식으로 타입 제한
 * - 숫자 값은 브랜드 타입으로 범위 제한
 * - 불변 객체(as const)로 런타임 변경 방지
 * 
 * 사용법:
 * 1. 이 파일을 복사하여 새 프로젝트에서 수정
 * 2. 의료기관 브랜드 색상으로 colors 변경
 * 3. 패턴 설정 조정
 */

// ============================================================
// 타입 정의
// ============================================================

/** HEX 색상 형식 강제 */
type HexColor = `#${string}`;

/** 투명도 브랜드 타입 (0-100 범위) */
type Opacity = number & { readonly __brand: 'opacity' };

/** 투명도 헬퍼 함수 - 런타임 검증 */
export const opacity = (value: number): Opacity => {
  if (value < 0 || value > 100) {
    throw new Error(`Opacity must be 0-100, got ${value}`);
  }
  return value as Opacity;
};

/** 패턴 타입 */
type PatternType = 'crosshatch' | 'dots' | 'radial' | 'concentric' | 'none';

// ============================================================
// 테마 설정 인터페이스
// ============================================================

export interface ThemeConfig {
  /** 테마 이름 (식별용) */
  readonly name: string;
  
  /** 색상 팔레트 */
  readonly colors: {
    /** 주 브랜드 색상 */
    readonly primary: HexColor;
    readonly primaryLight: HexColor;
    readonly primaryDark: HexColor;
    
    /** 강조 색상 */
    readonly accent: HexColor;
    
    /** 중립 색상 (그레이스케일) */
    readonly neutral: {
      readonly 50: HexColor;
      readonly 100: HexColor;
      readonly 200: HexColor;
      readonly 300: HexColor;
      readonly 400: HexColor;
      readonly 500: HexColor;
      readonly 600: HexColor;
      readonly 700: HexColor;
      readonly 800: HexColor;
      readonly 900: HexColor;
    };
    
    /** 의미적 색상 */
    readonly semantic: {
      readonly positive: HexColor;
      readonly negative: HexColor;
      readonly warning: HexColor;
    };
  };
  
  /** 타이포그래피 */
  readonly typography: {
    readonly fontFamily: {
      readonly heading: string;
      readonly body: string;
    };
    readonly fontSize: {
      readonly xs: string;
      readonly sm: string;
      readonly base: string;
      readonly lg: string;
      readonly xl: string;
      readonly '2xl': string;
      readonly '3xl': string;
      readonly '4xl': string;
    };
  };
  
  /** 간격 및 레이아웃 */
  readonly spacing: {
    readonly page: {
      readonly paddingX: string;
      readonly paddingY: string;
    };
    readonly header: {
      readonly height: string;
    };
    readonly footer: {
      readonly height: string;
    };
  };
  
  /** 배경 패턴 설정 */
  readonly patterns: {
    /** 콘텐츠 슬라이드용 패턴 */
    readonly content: {
      readonly type: PatternType;
      readonly opacity: Opacity;
      readonly color: HexColor;
      readonly size: number;
      readonly strokeWidth: number;
    };
    /** 커버 슬라이드용 패턴 */
    readonly cover: {
      readonly type: PatternType;
      readonly opacity: readonly [number, number, number];
      readonly color: HexColor;
    };
    /** 간지(divider) 슬라이드용 패턴 */
    readonly divider: {
      readonly type: PatternType;
      readonly opacity: Opacity;
      readonly color: HexColor;
    };
  };
}

// ============================================================
// 정이안한의원 테마 (Cleveland Clinic 디자인 시스템 기반)
// ============================================================

export const jiaProTheme: ThemeConfig = {
  name: '정이안한의원',
  
  colors: {
    // Cleveland Clinic 블루 계열
    primary: '#004B8D',
    primaryLight: '#E8F4FC',
    primaryDark: '#003366',
    accent: '#0066CC',
    
    // Tailwind Slate 기반 중립색
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    
    semantic: {
      positive: '#059669',  // Emerald 600
      negative: '#DC2626',  // Red 600
      warning: '#D97706',   // Amber 600
    },
  },
  
  typography: {
    fontFamily: {
      heading: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      body: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
  },
  
  spacing: {
    page: {
      paddingX: '3rem',   // 48px
      paddingY: '2rem',   // 32px
    },
    header: {
      height: '3.5rem',   // 56px
    },
    footer: {
      height: '2.5rem',   // 40px
    },
  },
  
  patterns: {
    content: {
      type: 'crosshatch',
      opacity: opacity(7),    // 7%
      color: '#94A3B8',       // neutral.400
      size: 20,               // 20x20px
      strokeWidth: 0.8,
    },
    cover: {
      type: 'concentric',
      opacity: [0.025, 0.02, 0.015],  // 3개 원의 투명도
      color: '#004B8D',
    },
    divider: {
      type: 'radial',
      opacity: opacity(5),
      color: '#004B8D',
    },
  },
} as const;

// ============================================================
// 테마 내보내기
// ============================================================

/** 현재 활성 테마 */
export const currentTheme = jiaProTheme;

/** 테마 헬퍼 함수 */
export const getColor = (path: string): string => {
  const parts = path.split('.');
  let result: any = currentTheme.colors;
  for (const part of parts) {
    result = result[part];
  }
  return result;
};

// ============================================================
// Semantic Mapping — 슬라이드 타입 → 토큰 역할
// ============================================================

/**
 * 슬라이드 타입 → 토큰 역할 매핑
 *
 * 방법론 출처: Boris Cherny Semantic Mapping
 * 색상값: jia-pro 고유 (Cleveland Clinic #004B8D 계열)
 *
 * 참고: 프레젠테이션은 슬라이드 전환이 있으므로
 * 웹과 달리 동일 배경 연속 사용이 허용된다.
 */
export const SLIDE_TOKEN_MAP = {
  // --- 강조 슬라이드 (dark 배경) ---
  cover:      { bg: 'primary',        text: 'onPrimary' },
  divider:    { bg: 'primary',        text: 'onPrimary' },
  closing:    { bg: 'primary',        text: 'onPrimary' },
  quote:      { bg: 'primary',        text: 'onPrimary' },

  // --- 콘텐츠 슬라이드 (light 배경) ---
  toc:        { bg: 'surface',        text: 'onSurface', accent: 'primary' },
  content:    { bg: 'surface',        text: 'onSurface', accent: 'primary' },
  cards:      { bg: 'surface',        text: 'onSurface', accent: 'primary' },
  chart:      { bg: 'surface',        text: 'onSurface', accent: 'primary' },
  comparison: { bg: 'surface',        text: 'onSurface', accent: 'primary' },
  twoColumn:  { bg: 'surface',        text: 'onSurface', accent: 'primary' },

  // --- 보조 슬라이드 (variant 배경) ---
  flowSteps:  { bg: 'surfaceVariant', text: 'onSurface', accent: 'primary' },
  summary:    { bg: 'surfaceVariant', text: 'onSurface', accent: 'primary' },
} as const;

/** 타입 안전성 (jia-pro SlideType과 1:1 대응) */
type SlideTokenKey = keyof typeof SLIDE_TOKEN_MAP;

// ============================================================
// 슬라이드 배경 가이드라인
// ============================================================

/**
 * 슬라이드 배경 가이드라인
 *
 * 방법론 출처: Boris Cherny Composition Rules
 * 재해석: 프레젠테이션은 슬라이드 전환이 있으므로
 *         웹의 "연속 동일 배경 금지"는 강제하지 않는다.
 *         대신 시각적 리듬을 위한 권장 사항을 제공한다.
 *
 * 이것은 런타임 강제가 아닌 작성자 참고용이다.
 */
export const BG_GUIDELINES = {
  /** 권장: 3장 이상 연속 동일 배경은 피한다 (강제 아님) */
  recommendedMaxConsecutiveSameBg: 3,

  /** 권장: 막(Act) 전환 시 divider로 시각적 구분 */
  actTransitionUseDivider: true,

  /** 허용되는 배경-텍스트 조합 (이것은 강제) */
  requiredCombinations: {
    primary:        { text: 'onPrimary' },
    surface:        { text: 'onSurface' },
    surfaceVariant: { text: 'onSurface' },
  },
} as const;

// ============================================================
// 슬라이드 전용 치수 토큰
// ============================================================

/** jia-pro 고유 치수. howonhp 치수와 무관. */
export const SLIDE_DIMENSIONS = {
  topbarHeight: 48,
  footerHeight: 40,
  contentPadding: { x: 64, y: 48 },
  chartMinHeight: 280,
  metricCardMinWidth: 200,
  teamAvatarSize: 80,
  timelineNodeSize: 12,
  processStepMinWidth: 160,
} as const;
