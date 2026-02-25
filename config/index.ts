/**
 * 설정 통합 내보내기 - config/index.ts
 * 
 * 모든 설정 파일을 한 곳에서 import 가능
 * 
 * 사용법:
 * import { currentTheme, currentStructure, currentMeta } from '@/config';
 */

// 테마 설정
export {
  jiaProTheme,
  currentTheme,
  getColor,
  SLIDE_TOKEN_MAP,
  BG_GUIDELINES,
  SLIDE_DIMENSIONS,
  type ThemeConfig,
} from './theme';

// 구조 설정
export {
  defaultSixActStructure,
  currentStructure,
  validateStructure,
  getActConfig,
  ACT_METADATA,
  type ActNumber,
  type ActConfig,
  type SixActStructure,
  type PersuasionRole,
} from './structure';

// 메타 정보
export {
  jiaProMeta,
  currentMeta,
  getCoverInfo,
  getClosingInfo,
  type ProposalMeta,
} from './meta';
