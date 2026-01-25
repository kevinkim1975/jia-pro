/**
 * Color Tokens - 정이안한의원 디자인 시스템
 * v0.dev 커버 디자인 기반 + 하위 호환성 유지
 */

// ============================================
// New Tokens (v0.dev Cover 기반)
// ============================================

// Background Colors
export const background = {
  warm: '#F8F7F4',    // Warm White
  accent: '#9C8B7A',  // Warm Taupe
} as const

// Text Colors
export const text = {
  primary: '#2D2D2D',   // Charcoal
  secondary: '#9C8B7A', // Warm Taupe
} as const

// UI Colors
export const ui = {
  dark: '#0A0A0A',   // Near Black
  light: '#FFFFFF',  // White
} as const

// ============================================
// Legacy Tokens (하위 호환성)
// ============================================

// Primary Colors - Ocean Blue 기반
export const primary = {
  DEFAULT: '#1A5F7A',
  dark: '#134558',
  light: '#2A7A9A',
} as const

// Secondary Colors - Teal Green 기반
export const secondary = {
  DEFAULT: '#57A0A0',
  dark: '#458080',
  light: '#6BB5B5',
} as const

// Accent Colors - Soft Mint 기반
export const accent = {
  DEFAULT: '#9DC5BB',
  light: '#C5DED8',
} as const

// Neutral Colors - Cool Gray 스케일
export const neutral = {
  white: '#FFFFFF',
  gray50: '#F8FAFB',
  gray100: '#EEF2F4',
  gray200: '#D1D9E0',
  gray400: '#94A3B8',
  gray700: '#334155',
  gray900: '#1E293B',
} as const

// Semantic Colors
export const semantic = {
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const

// ============================================
// 통합 객체
// ============================================

export const colors = {
  // New
  background,
  text,
  ui,
  // Legacy
  primary,
  secondary,
  accent,
  neutral,
  semantic,
} as const

// ============================================
// TypeScript 타입 정의
// ============================================

// New types
export type BackgroundColor = keyof typeof background
export type TextColor = keyof typeof text
export type UIColor = keyof typeof ui

// Legacy types
export type PrimaryColor = keyof typeof primary
export type SecondaryColor = keyof typeof secondary
export type AccentColor = keyof typeof accent
export type NeutralColor = keyof typeof neutral
export type SemanticColor = keyof typeof semantic

export type ColorToken =
  // New tokens
  | `background-${'warm' | 'accent'}`
  | `text-${'primary' | 'secondary'}`
  | `ui-${'dark' | 'light'}`
  // Legacy tokens
  | `primary${'' | '-dark' | '-light'}`
  | `secondary${'' | '-dark' | '-light'}`
  | `accent${'' | '-light'}`
  | 'white'
  | `gray-${'50' | '100' | '200' | '400' | '700' | '900'}`
  | 'success'
  | 'warning'
  | 'info'

// ============================================
// 헬퍼 함수
// ============================================

export const getColor = (token: ColorToken): string => {
  const colorMap: Record<ColorToken, string> = {
    // New
    'background-warm': background.warm,
    'background-accent': background.accent,
    'text-primary': text.primary,
    'text-secondary': text.secondary,
    'ui-dark': ui.dark,
    'ui-light': ui.light,
    // Legacy
    primary: primary.DEFAULT,
    'primary-dark': primary.dark,
    'primary-light': primary.light,
    secondary: secondary.DEFAULT,
    'secondary-dark': secondary.dark,
    'secondary-light': secondary.light,
    accent: accent.DEFAULT,
    'accent-light': accent.light,
    white: neutral.white,
    'gray-50': neutral.gray50,
    'gray-100': neutral.gray100,
    'gray-200': neutral.gray200,
    'gray-400': neutral.gray400,
    'gray-700': neutral.gray700,
    'gray-900': neutral.gray900,
    success: semantic.success,
    warning: semantic.warning,
    info: semantic.info,
  }
  return colorMap[token]
}
