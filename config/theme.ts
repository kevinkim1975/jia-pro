/**
 * 디자인 토큰 시스템 - config/theme.ts
 *
 * 슬라이드에서 실제 사용되는 값만 수록.
 * 모든 색상은 슬라이드 코드 감사(2026-02-25) 기준.
 */

// ============================================================
// 타입 정의
// ============================================================

type HexColor = `#${string}`;

// ============================================================
// 테마 설정 인터페이스
// ============================================================

export interface ThemeConfig {
  readonly name: string;

  readonly colors: {
    readonly primary: HexColor;
    readonly primaryDark: HexColor;
    readonly primaryDarker: HexColor;
    readonly primaryDeep: HexColor;
    readonly secondary: HexColor;
    readonly accent: HexColor;
    readonly white: HexColor;

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

    readonly semantic: {
      readonly positive: HexColor;
      readonly negative: HexColor;
    };

    readonly border: HexColor;
    readonly borderCard: HexColor;
    readonly textDark: HexColor;
    readonly textBody: HexColor;
    readonly textMuted: HexColor;
    readonly textLight: HexColor;
    readonly surfaceAlt: HexColor;
    readonly decorativeSage: string;
  };

  readonly chart: {
    readonly warning: HexColor;
    readonly danger: HexColor;
    readonly palette: readonly HexColor[];
  };

  readonly typography: {
    readonly fontFamily: string;
    readonly fontSize: Record<string, string>;
  };

  readonly spacing: {
    readonly page: { readonly paddingX: string; readonly paddingY: string };
    readonly header: { readonly height: string };
    readonly footer: { readonly height: string };
  };
}

// ============================================================
// 정이안한의원 테마
// ============================================================

export const jiaProTheme: ThemeConfig = {
  name: '정이안한의원',

  colors: {
    primary: '#004B8D',
    primaryDark: '#003366',
    primaryDarker: '#002D5A',
    primaryDeep: '#001529',
    secondary: '#48A9C5',
    accent: '#10B981',
    white: '#FFFFFF',

    // Tailwind Gray 계열 중립색
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E5E7EB',
      300: '#CBD5E1',
      400: '#9CA3AF',
      500: '#64748B',
      600: '#475569',
      700: '#374151',
      800: '#1F2937',
      900: '#0F172A',
    },

    semantic: {
      positive: '#059669',
      negative: '#DC2626',
    },

    border: '#E5E7EB',
    borderCard: '#DEE5ED',
    textDark: '#1F2937',
    textBody: '#374151',
    textMuted: '#6B7280',
    textLight: '#9CA3AF',
    surfaceAlt: '#F6F8FA',
    decorativeSage: 'rgba(157,197,187,0.15)',
  },

  chart: {
    warning: '#F59E0B',
    danger: '#EF4444',
    palette: [
      '#004B8D',
      '#48A9C5',
      '#10B981',
      '#F59E0B',
      '#EF4444',
      '#8B5CF6',
      '#EC4899',
      '#14B8A6',
    ],
  },

  typography: {
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    fontSize: {
      '10': '10px',
      '11': '11px',
      xs: '12px',
      '13': '13px',
      sm: '14px',
      '15': '15px',
      base: '16px',
      lg: '18px',
      '19': '19px',
      xl: '20px',
      '21': '21px',
      '2xl': '24px',
      '28': '28px',
      '3xl': '30px',
      '32': '32px',
      '4xl': '36px',
      '42': '42px',
      '44': '44px',
      '48': '48px',
      '54': '54px',
      '60': '60px',
      '64': '64px',
      '96': '96px',
      '120': '120px',
    },
  },

  spacing: {
    page: {
      paddingX: '3rem',   // 48px
      paddingY: '2rem',   // 32px
    },
    header: {
      height: '2.75rem', // 44px
    },
    footer: {
      height: '2.5rem',  // 40px
    },
  },
} as const;

// ============================================================
// 테마 내보내기
// ============================================================

export const currentTheme = jiaProTheme;

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

type SlideTokenKey = keyof typeof SLIDE_TOKEN_MAP;

// ============================================================
// 슬라이드 배경 가이드라인
// ============================================================

export const BG_GUIDELINES = {
  recommendedMaxConsecutiveSameBg: 3,
  actTransitionUseDivider: true,
  requiredCombinations: {
    primary:        { text: 'onPrimary' },
    surface:        { text: 'onSurface' },
    surfaceVariant: { text: 'onSurface' },
  },
} as const;

// ============================================================
// 슬라이드 전용 치수 토큰
// ============================================================

export const SLIDE_DIMENSIONS = {
  topbarHeight: 44,
  footerHeight: 40,
  contentPadding: { x: 64, y: 48 },
  chartMinHeight: 280,
  timelineNodeSize: 12,
} as const;
