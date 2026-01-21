/**
 * 프로젝트 메타 정보 - config/meta.ts
 * 
 * Boris Cherny 원칙:
 * - 모든 필드는 readonly
 * - 선택적 필드는 명시적으로 optional
 * - 연락처 정보 타입 제한
 * 
 * 사용법:
 * 1. client 섹션에 의료기관 정보 입력
 * 2. provider 섹션에 제안 회사 정보 입력
 * 3. document 섹션에 문서 메타 정보 입력
 * 4. contact 섹션에 연락처 입력
 */

// ============================================================
// 타입 정의
// ============================================================

/** 이메일 형식 */
type Email = `${string}@${string}.${string}`;

/** 전화번호 형식 (간단한 패턴) */
type PhoneNumber = string;

/** URL 형식 */
type WebURL = `${'http' | 'https'}://${string}` | `www.${string}`;

/** 프로젝트 메타 정보 인터페이스 */
export interface ProposalMeta {
  /** 고객사 (의료기관) 정보 */
  readonly client: {
    readonly name: string;           // 의료기관 정식 명칭
    readonly shortName?: string;     // 약칭
    readonly logo?: string;          // 로고 이미지 경로
    readonly location?: string;      // 위치 (선택)
  };
  
  /** 제안 회사 정보 */
  readonly provider: {
    readonly name: string;           // 회사명
    readonly logo?: string;          // 로고 이미지 경로
  };
  
  /** 문서 정보 */
  readonly document: {
    readonly title: string;          // 제안서 제목
    readonly subtitle?: string;      // 부제목
    readonly date: string;           // 발행일 (YYYY. MM 형식)
    readonly version?: string;       // 버전
    readonly confidential?: boolean; // 대외비 여부
  };
  
  /** 연락처 정보 */
  readonly contact: {
    readonly email: string;          // 이메일
    readonly phone?: PhoneNumber;    // 전화번호
    readonly website?: string;       // 웹사이트
    readonly address?: string;       // 주소
  };
}

// ============================================================
// 정이안한의원 메타 정보
// ============================================================

export const jiaProMeta: ProposalMeta = {
  client: {
    name: '정이안한의원',
    shortName: '정이안',
    location: '서울',
  },
  
  provider: {
    name: '호원앤컴퍼니',
  },
  
  document: {
    title: '마케팅 전략 제안',
    subtitle: '6막 구조 기반 종합 제안서',
    date: '2026. 01',
    version: '1.0',
    confidential: true,
  },
  
  contact: {
    email: 'contact@howon.co.kr',
    phone: '02-1234-5678',
    website: 'www.howon.co.kr',
  },
} as const;

// ============================================================
// 현재 프로젝트 메타
// ============================================================

/** 현재 활성 메타 정보 */
export const currentMeta = jiaProMeta;

/** 표지 정보 생성 헬퍼 */
export function getCoverInfo(meta: ProposalMeta) {
  return {
    title: meta.client.name,
    subtitle: meta.document.title,
    date: meta.document.date,
    company: meta.provider.name,
  };
}

/** 클로징 페이지 정보 생성 헬퍼 */
export function getClosingInfo(meta: ProposalMeta) {
  return {
    title: '감사합니다',
    subtitle: `${meta.client.name}의 성장을 함께하겠습니다`,
    contact: {
      email: meta.contact.email,
      phone: meta.contact.phone,
      website: meta.contact.website,
    },
  };
}
