/**
 * Color Tokens - 정이안한의원 디자인 시스템
 * v0.dev 커버 디자인 기반
 */

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

// 통합 colors 객체
export const colors = {
  background,
  text,
  ui,
} as const

// TypeScript 타입 정의
export type BackgroundColor = keyof typeof background
export type TextColor = keyof typeof text
export type UIColor = keyof typeof ui

export type ColorToken =
  | `background-${'warm' | 'accent'}`
  | `text-${'primary' | 'secondary'}`
  | `ui-${'dark' | 'light'}`

// 색상값 조회 헬퍼
export const getColor = (token: ColorToken): string => {
  const colorMap: Record<ColorToken, string> = {
    'background-warm': background.warm,
    'background-accent': background.accent,
    'text-primary': text.primary,
    'text-secondary': text.secondary,
    'ui-dark': ui.dark,
    'ui-light': ui.light,
  }
  return colorMap[token]
}
