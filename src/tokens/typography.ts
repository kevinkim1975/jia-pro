/**
 * Typography Tokens - 정이안한의원 디자인 시스템
 * @see docs/DESIGN-DIRECTION.md Section 3
 */

// Font Family
export const fontFamily = {
  sans: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  serif: 'Noto Serif KR, Georgia, serif',
} as const

// Font Weight
export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

// Font Scale (size, lineHeight, letterSpacing, weight)
export const fontSize = {
  'title-xl': { size: 88, lineHeight: 1.1, letterSpacing: '-0.02em', weight: 700 },
  'title-lg': { size: 48, lineHeight: 1.2, letterSpacing: '-0.02em', weight: 600 },
  'title-md': { size: 24, lineHeight: 1.3, letterSpacing: '-0.01em', weight: 400 },
  display: { size: 48, lineHeight: 1.2, letterSpacing: '-0.02em', weight: 700 },
  h1: { size: 36, lineHeight: 1.3, letterSpacing: '-0.01em', weight: 600 },
  h2: { size: 28, lineHeight: 1.4, letterSpacing: '-0.01em', weight: 600 },
  h3: { size: 22, lineHeight: 1.4, letterSpacing: '0', weight: 500 },
  h4: { size: 18, lineHeight: 1.5, letterSpacing: '0', weight: 500 },
  body: { size: 16, lineHeight: 1.6, letterSpacing: '0', weight: 400 },
  'body-sm': { size: 14, lineHeight: 1.6, letterSpacing: '0', weight: 400 },
  caption: { size: 14, lineHeight: 1.5, letterSpacing: '0.01em', weight: 400 },
} as const

// 통합 typography 객체
export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
} as const

// TypeScript 타입 정의
export type FontFamily = keyof typeof fontFamily
export type FontWeight = keyof typeof fontWeight
export type FontSize = keyof typeof fontSize

export type FontSizeValue = {
  size: number
  lineHeight: number
  letterSpacing: string
  weight?: number
}

// 헬퍼 함수: px 단위 CSS 값 생성
export const getFontSize = (token: FontSize): string => `${fontSize[token].size}px`
export const getLineHeight = (token: FontSize): string => {
  const { size, lineHeight } = fontSize[token]
  return `${Math.round(size * lineHeight)}px`
}

// 헬퍼 함수: 전체 폰트 스타일 객체 반환
export const getFontStyle = (
  size: FontSize,
  weight: FontWeight = 'regular'
): {
  fontSize: string
  lineHeight: string
  letterSpacing: string
  fontWeight: number
} => ({
  fontSize: `${fontSize[size].size}px`,
  lineHeight: `${fontSize[size].lineHeight}`,
  letterSpacing: fontSize[size].letterSpacing,
  fontWeight: fontWeight[weight],
})
