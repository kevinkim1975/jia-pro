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
