import { BG_GUIDELINES, SLIDE_TOKEN_MAP } from '../../config/theme';
import type { SlideContent } from '@/types/proposal';

type ValidationResult = {
  readonly errors: readonly string[];    // 반드시 수정
  readonly warnings: readonly string[];  // 권장 수정
};

/**
 * 슬라이드 배열의 디자인 규칙 검증
 *
 * 방법론 출처: Boris Cherny — 런타임에서 디자인 규칙 위반을 감지
 * 재해석: 프레젠테이션에서는 경고(warning)만, 에러(error)는 색상 조합 불일치만
 *
 * errors: 색상-텍스트 조합 위반 (강제)
 * warnings: 배경 리듬 권장사항 (참고)
 */
export function validateSlideComposition(
  slides: readonly SlideContent[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. 색상-텍스트 조합 검증 (강제)
  for (let i = 0; i < slides.length; i++) {
    const mapping = SLIDE_TOKEN_MAP[slides[i].type as keyof typeof SLIDE_TOKEN_MAP];
    if (!mapping) {
      errors.push(`슬라이드 ${i + 1}: 알 수 없는 타입 "${slides[i].type}"`);
    }
  }

  // 2. 배경 리듬 검증 (권장, 경고만)
  let consecutiveCount = 1;
  for (let i = 1; i < slides.length; i++) {
    const prevBg = SLIDE_TOKEN_MAP[slides[i - 1].type as keyof typeof SLIDE_TOKEN_MAP]?.bg;
    const currBg = SLIDE_TOKEN_MAP[slides[i].type as keyof typeof SLIDE_TOKEN_MAP]?.bg;

    if (prevBg === currBg) {
      consecutiveCount++;
      if (consecutiveCount > BG_GUIDELINES.recommendedMaxConsecutiveSameBg) {
        warnings.push(
          `슬라이드 ${i - consecutiveCount + 2}~${i + 1}: ` +
          `동일 배경(${currBg}) ${consecutiveCount}장 연속 (권장 최대 ${BG_GUIDELINES.recommendedMaxConsecutiveSameBg}장)`
        );
      }
    } else {
      consecutiveCount = 1;
    }
  }

  return { errors, warnings } as const;
}
