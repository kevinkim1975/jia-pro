/**
 * Effects Tokens - 정이안한의원 디자인 시스템
 * @see docs/DESIGN-DIRECTION.md Section 6
 */

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,  // 원형 (50%)
} as const

// Shadows (플랫 디자인 - 최소화)
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
} as const

// Borders
export const borders = {
  none: 'none',
  default: '1px solid #D1D9E0',  // gray-200
  primary: '1px solid #1A5F7A',
  accent: '1px solid #9DC5BB',
} as const

// Transitions
export const transitions = {
  fast: '150ms ease-in-out',
  normal: '200ms ease-in-out',
  slow: '300ms ease-in-out',
} as const

// Opacity
export const opacity = {
  0: 0,
  25: 0.25,
  50: 0.5,
  75: 0.75,
  100: 1,
} as const

// 컴포넌트 프리셋
export const componentEffects = {
  card: {
    borderRadius: 8,
    border: '1px solid #D1D9E0',
    shadow: 'none',
  },
  button: {
    borderRadius: 4,
    transition: '200ms ease-in-out',
  },
  badge: {
    borderRadius: 9999,
  },
  highlightBox: {
    borderRadius: 4,
    borderLeft: '4px solid #9DC5BB',
  },
} as const

// 통합 effects 객체
export const effects = {
  borderRadius,
  shadows,
  borders,
  transitions,
  opacity,
  componentEffects,
} as const

// TypeScript 타입 정의
export type BorderRadius = keyof typeof borderRadius
export type Shadow = keyof typeof shadows
export type Border = keyof typeof borders
export type Transition = keyof typeof transitions
export type Opacity = keyof typeof opacity

// 헬퍼 함수
export const getBorderRadius = (key: BorderRadius): string =>
  `${borderRadius[key]}px`

export const getTransition = (
  key: Transition,
  properties: string[] = ['all']
): string => properties.map((prop) => `${prop} ${transitions[key]}`).join(', ')
