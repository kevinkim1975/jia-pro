/**
 * Spacing Tokens - 정이안한의원 디자인 시스템
 * @see docs/DESIGN-DIRECTION.md Section 4
 */

// Base Unit: 8px 그리드 시스템
export const BASE_UNIT = 8

// Spacing Scale
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const

// Slide Canvas
export const slideCanvas = {
  width: 1920,
  height: 1080,
  aspectRatio: '16:9',
  padding: 64,
  contentArea: {
    width: 1792,  // 1920 - 64*2
    height: 952,  // 1080 - 64*2
  },
} as const

// Grid System
export const grid = {
  columns: 12,
  gutter: 24,  // space-6
  margin: 64,  // space-16
} as const

// Breakpoints
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
  presentation: 1920,
} as const

// 컴포넌트별 간격 가이드
export const componentSpacing = {
  slide: { padding: 64 },
  card: { padding: 24, margin: 16 },
  button: { paddingY: 12, paddingX: 24 },
  listItem: { padding: 12, margin: 8 },
  iconText: { gap: 8 },
} as const

// TypeScript 타입 정의
export type SpacingKey = keyof typeof spacing
export type SpacingValue = (typeof spacing)[SpacingKey]
export type Breakpoint = keyof typeof breakpoints

// 헬퍼 함수: spacing 값을 px 문자열로 변환
export const getSpacing = (key: SpacingKey): string => `${spacing[key]}px`

// 헬퍼 함수: 여러 spacing 값을 조합 (padding/margin shorthand)
export const getSpacingMulti = (...keys: SpacingKey[]): string =>
  keys.map((key) => `${spacing[key]}px`).join(' ')

// 헬퍼 함수: breakpoint 미디어 쿼리
export const getMediaQuery = (bp: Breakpoint): string =>
  `@media (min-width: ${breakpoints[bp]}px)`
