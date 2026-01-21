/**
 * 6막 구조 설정 - config/structure.ts
 * 
 * Boris Cherny 원칙:
 * - ACT 번호는 리터럴 타입으로 제한 (1-6)
 * - 튜플 타입으로 정확히 6개 요소 강제
 * - readonly로 런타임 변경 방지
 * 
 * 사용법:
 * 1. 기본 구조를 그대로 사용하거나
 * 2. ACT 제목/부제목을 프로젝트에 맞게 수정
 */

// ============================================================
// 타입 정의
// ============================================================

/** ACT 번호 리터럴 타입 */
export type ActNumber = 1 | 2 | 3 | 4 | 5 | 6;

/** ACT 구성 인터페이스 */
export interface ActConfig {
  readonly number: ActNumber;
  readonly title: string;        // 한글 제목
  readonly subtitle: string;     // 영문 부제목
  readonly purpose: string;      // 이 ACT의 목적 (내부 참고용)
  readonly icon?: string;        // 아이콘 (선택)
}

/** 6막 구조 타입 - 정확히 6개 요소의 튜플 */
export type SixActStructure = readonly [
  ActConfig,  // ACT 1
  ActConfig,  // ACT 2
  ActConfig,  // ACT 3
  ActConfig,  // ACT 4
  ActConfig,  // ACT 5
  ActConfig,  // ACT 6
];

// ============================================================
// 기본 6막 구조 (마케팅 제안서용)
// ============================================================

export const defaultSixActStructure: SixActStructure = [
  {
    number: 1,
    title: '상황',
    subtitle: 'Situation',
    purpose: '원장님의 세계를 인정하고 공감대 형성',
    icon: '📍',
  },
  {
    number: 2,
    title: '위기',
    subtitle: 'Crisis',
    purpose: '현재 직면한 문제 제시',
    icon: '⚠️',
  },
  {
    number: 3,
    title: '전환점',
    subtitle: 'Turning Point',
    purpose: '변화의 필요성 인식',
    icon: '🔄',
  },
  {
    number: 4,
    title: '해결책 1: 마케팅 전략',
    subtitle: 'Marketing Strategy',
    purpose: '구체적인 마케팅 솔루션 제안',
    icon: '📈',
  },
  {
    number: 5,
    title: '해결책 2: AI CRM',
    subtitle: 'AI CRM',
    purpose: 'CRM 솔루션 소개',
    icon: '🤖',
  },
  {
    number: 6,
    title: '요약 및 Next Step',
    subtitle: 'Summary & Next Step',
    purpose: '핵심 요약 및 다음 단계 제시',
    icon: '🎯',
  },
] as const;

// ============================================================
// 구조 검증 함수
// ============================================================

/** 구조가 올바른지 검증 */
export function validateStructure(structure: SixActStructure): boolean {
  const expectedNumbers: ActNumber[] = [1, 2, 3, 4, 5, 6];
  return structure.every((act, index) => act.number === expectedNumbers[index]);
}

/** ACT 번호로 설정 조회 */
export function getActConfig(
  structure: SixActStructure,
  actNumber: ActNumber
): ActConfig {
  return structure[actNumber - 1];
}

// ============================================================
// 현재 프로젝트 구조
// ============================================================

/** 현재 활성 구조 */
export const currentStructure = defaultSixActStructure;

/** ACT 메타데이터 맵 생성 (기존 코드 호환용) */
export const ACT_METADATA = Object.fromEntries(
  currentStructure.map(act => [
    act.number,
    {
      title: act.title,
      subtitle: act.subtitle,
      purpose: act.purpose,
    }
  ])
) as Record<ActNumber, { title: string; subtitle: string; purpose: string }>;
