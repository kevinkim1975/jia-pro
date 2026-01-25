/**
 * Design Tokens - 정이안한의원 디자인 시스템
 * @description 모든 토큰을 통합 export
 * @see docs/DESIGN-DIRECTION.md
 */

// Colors
export {
  colors,
  // New tokens
  background,
  text,
  ui,
  // Legacy tokens
  primary,
  secondary,
  accent,
  neutral,
  semantic,
  getColor,
  // New types
  type BackgroundColor,
  type TextColor,
  type UIColor,
  // Legacy types
  type ColorToken,
  type PrimaryColor,
  type SecondaryColor,
  type AccentColor,
  type NeutralColor,
  type SemanticColor,
} from './colors'

// Typography
export {
  typography,
  fontFamily,
  fontWeight,
  fontSize,
  getFontSize,
  getLineHeight,
  getFontStyle,
  type FontFamily,
  type FontWeight,
  type FontSize,
  type FontSizeValue,
} from './typography'

// Spacing
export {
  spacing,
  slideCanvas,
  grid,
  breakpoints,
  componentSpacing,
  getSpacing,
  getSpacingMulti,
  getMediaQuery,
  BASE_UNIT,
  type SpacingKey,
  type SpacingValue,
  type Breakpoint,
} from './spacing'

// Effects
export {
  effects,
  borderRadius,
  shadows,
  borders,
  transitions,
  opacity,
  componentEffects,
  getBorderRadius,
  getTransition,
  type BorderRadius,
  type Shadow,
  type Border,
  type Transition,
  type Opacity,
} from './effects'

// 통합 DesignTokens 타입
export type DesignTokens = {
  colors: typeof import('./colors').colors
  typography: typeof import('./typography').typography
  spacing: typeof import('./spacing').spacing
  effects: typeof import('./effects').effects
}
