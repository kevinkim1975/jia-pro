import type { Proposal, Act, Slide, ActNumber, ActTitle, ActSubtitle } from '@/types/proposal';

// ACT 메타데이터 매핑
const ACT_METADATA: Record<ActNumber, { title: ActTitle; subtitle: ActSubtitle; purpose: string }> = {
  1: { title: '상황', subtitle: 'Situation', purpose: '원장님의 세계를 인정하고 공감대 형성' },
  2: { title: '위기', subtitle: 'Crisis', purpose: '현재 직면한 문제 제시' },
  3: { title: '전환점', subtitle: 'Turning Point', purpose: '변화의 필요성 인식' },
  4: { title: '해결책 1: 마케팅 전략', subtitle: 'Marketing Strategy', purpose: '구체적인 마케팅 솔루션 제안' },
  5: { title: '해결책 2: AI CRM', subtitle: 'AI CRM', purpose: 'CRM 솔루션 소개' },
  6: { title: '요약 및 Next Step', subtitle: 'Summary & Next Step', purpose: '핵심 요약 및 다음 단계 제시' },
};

// 정이안한의원 제안서 슬라이드 데이터
export const slides: Slide[] = [
  // 표지
  {
    id: 'slide-1',
    pageNumber: 1,
    act: 1,
    content: {
      type: 'cover',
      title: '정이안한의원',
      subtitle: '마케팅 전략 제안',
      date: '2026. 01',
      company: '호원앤컴퍼니',
    },
  },
  // 목차
  {
    id: 'slide-2',
    pageNumber: 2,
    act: 1,
    content: {
      type: 'toc',
      items: [
        { act: 1, title: '상황', startPage: 3 },
        { act: 2, title: '위기', startPage: 7 },
        { act: 3, title: '전환점', startPage: 14 },
        { act: 4, title: '해결책 1: 마케팅 전략', startPage: 19 },
        { act: 5, title: '해결책 2: AI CRM', startPage: 26 },
        { act: 6, title: '요약 및 Next Step', startPage: 46 },
      ],
    },
  },
  // ACT 1 간지
  {
    id: 'slide-3',
    pageNumber: 3,
    act: 1,
    content: {
      type: 'divider',
      act: 1,
      title: '상황',
      subtitle: 'Situation',
    },
  },
  // ACT 1 슬라이드들
  {
    id: 'slide-4',
    pageNumber: 4,
    act: 1,
    content: {
      type: 'chart',
      title: '22년까지, 정이안한의원은 성장했습니다',
      chart: {
        type: 'line',
        data: [
          { label: '20년', value: 261, annotation: '' },
          { label: '21년', value: 283, annotation: '+8.4%' },
          { label: '22년', value: 344, annotation: '+21.6%' },
        ],
        yAxisLabel: '신환수',
      },
      highlight: '3년간 32% 성장',
      description: '',
    },
  },
  {
    id: 'slide-5',
    pageNumber: 5,
    act: 1,
    content: {
      type: 'content',
      title: '성장의 동력',
      content: '"콘텐츠의 힘을 잘 알고 계시지요?"',
      bullets: [
        '33년 경력 한의학박사',
        '11권 저서 출간',
        '콘텐츠가 환자를 데려온다 - 직접 경험',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-6',
    pageNumber: 6,
    act: 1,
    content: {
      type: 'content',
      title: '원장님만의 강점',
      content: '정이안 원장님은 콘텐츠 마케팅의 선구자입니다.',
      bullets: [
        '블로그 콘텐츠 → 신환 유입',
        '저서 출간 → 권위 확립',
        '방송 출연 → 인지도 상승',
      ],
      tone: 'positive',
    },
  },
  // ACT 2 간지
  {
    id: 'slide-7',
    pageNumber: 7,
    act: 2,
    content: {
      type: 'divider',
      act: 2,
      title: '위기',
      subtitle: 'Crisis',
    },
  },
  // ACT 2 슬라이드들
  {
    id: 'slide-8',
    pageNumber: 8,
    act: 2,
    content: {
      type: 'chart',
      title: '그러나 23년부터 신환이 감소하기 시작했습니다',
      chart: {
        type: 'line',
        data: [
          { label: '22년', value: 344, annotation: '' },
          { label: '23년', value: 298, annotation: '-13.4%' },
          { label: '24년', value: 267, annotation: '-10.4%' },
        ],
        yAxisLabel: '신환수',
      },
      highlight: '2년간 -22.4% 감소',
      description: '',
    },
  },
  {
    id: 'slide-9',
    pageNumber: 9,
    act: 2,
    content: {
      type: 'content',
      title: '무엇이 문제일까요?',
      content: '환경이 변했습니다.',
      bullets: [
        '검색 알고리즘 변화',
        '경쟁 한의원 증가',
        '콘텐츠 소비 패턴 변화',
        '새로운 마케팅 채널 등장',
      ],
      tone: 'negative',
    },
  },
  {
    id: 'slide-10',
    pageNumber: 10,
    act: 2,
    content: {
      type: 'comparison',
      title: '과거 vs 현재',
      before: {
        label: '과거 (효과적)',
        items: [
          '블로그 글 작성 → 상위 노출',
          '콘텐츠 = 신환',
          '꾸준히 하면 성과',
        ],
      },
      after: {
        label: '현재 (변화)',
        items: [
          '알고리즘 변화 → 노출 감소',
          '경쟁 심화 → 차별화 필요',
          '다채널 전략 필수',
        ],
      },
    },
  },
  // ACT 3 간지
  {
    id: 'slide-14',
    pageNumber: 14,
    act: 3,
    content: {
      type: 'divider',
      act: 3,
      title: '전환점',
      subtitle: 'Turning Point',
    },
  },
  {
    id: 'slide-15',
    pageNumber: 15,
    act: 3,
    content: {
      type: 'content',
      title: '변화가 필요한 시점입니다',
      content: '기존 방식만으로는 한계가 있습니다.',
      bullets: [
        '데이터 기반 마케팅 전략 필요',
        '고객 관계 관리(CRM) 체계화',
        '다채널 통합 마케팅',
      ],
      emphasis: '지금이 바로 그 전환점입니다',
      tone: 'neutral',
    },
  },
  // ACT 4 간지
  {
    id: 'slide-19',
    pageNumber: 19,
    act: 4,
    content: {
      type: 'divider',
      act: 4,
      title: '해결책 1: 마케팅 전략',
      subtitle: 'Marketing Strategy',
    },
  },
  {
    id: 'slide-20',
    pageNumber: 20,
    act: 4,
    content: {
      type: 'content',
      title: '3단계 마케팅 전략',
      content: '체계적인 접근으로 신환을 늘립니다.',
      bullets: [
        '1단계: 온라인 가시성 강화',
        '2단계: 콘텐츠 마케팅 최적화',
        '3단계: 전환율 개선',
      ],
      tone: 'positive',
    },
  },
  // ACT 5 간지
  {
    id: 'slide-26',
    pageNumber: 26,
    act: 5,
    content: {
      type: 'divider',
      act: 5,
      title: '해결책 2: AI CRM',
      subtitle: 'AI CRM',
    },
  },
  {
    id: 'slide-27',
    pageNumber: 27,
    act: 5,
    content: {
      type: 'content',
      title: 'AI CRM 시스템 도입',
      content: '고객 관계를 체계적으로 관리합니다.',
      bullets: [
        '자동 예약 리마인더',
        '맞춤형 콘텐츠 발송',
        '이탈 고객 재유입 캠페인',
        '치료 만족도 자동 조사',
      ],
      tone: 'positive',
    },
  },
  // ACT 6 간지
  {
    id: 'slide-46',
    pageNumber: 46,
    act: 6,
    content: {
      type: 'divider',
      act: 6,
      title: '요약 및 Next Step',
      subtitle: 'Summary & Next Step',
    },
  },
  {
    id: 'slide-47',
    pageNumber: 47,
    act: 6,
    content: {
      type: 'summary',
      title: '요약',
      keyPoints: [
        '3년간 32% 성장 → 최근 2년간 22% 감소',
        '환경 변화에 대응하는 새로운 전략 필요',
        '데이터 기반 마케팅 + AI CRM = 신환 회복',
      ],
      nextSteps: [
        '마케팅 전략 미팅 일정 확정',
        'CRM 시스템 데모 시연',
        '3개월 파일럿 프로그램 제안',
      ],
    },
  },
  {
    id: 'slide-50',
    pageNumber: 50,
    act: 6,
    content: {
      type: 'content',
      title: '감사합니다',
      content: '호원앤컴퍼니가 정이안한의원의 성장을 함께 합니다.',
      bullets: [
        '문의: consulting@howon.co.kr',
        '담당: 대표 정중우',
      ],
      tone: 'positive',
    },
  },
];

// ACT별로 슬라이드 그룹화
function groupSlidesByAct(slides: Slide[]): Act[] {
  const actNumbers: ActNumber[] = [1, 2, 3, 4, 5, 6];
  
  return actNumbers.map((actNum) => {
    const actSlides = slides.filter((s) => s.act === actNum);
    const meta = ACT_METADATA[actNum];
    
    return {
      number: actNum,
      title: meta.title,
      subtitle: meta.subtitle,
      purpose: meta.purpose,
      slides: actSlides,
    };
  });
}

// 제안서 데이터
export const proposal: Proposal = {
  id: 'jeongiaan-2026-01',
  clientName: '정이안한의원',
  createdAt: '2026-01-01',
  acts: groupSlidesByAct(slides),
  totalPages: 50,
};

// 페이지 번호로 슬라이드 찾기
export function getSlideByPage(pageNumber: number): Slide | undefined {
  return slides.find((s) => s.pageNumber === pageNumber);
}

// ACT 번호로 시작 페이지 찾기
export function getActStartPage(actNumber: ActNumber): number {
  const actSlide = slides.find(
    (s) => s.act === actNumber && s.content.type === 'divider'
  );
  return actSlide?.pageNumber ?? 1;
}

// 목차 데이터 생성
export function getTocItems() {
  return slides
    .filter((s) => s.content.type === 'divider')
    .map((s) => ({
      pageNumber: s.pageNumber,
      act: s.act,
      title: ACT_METADATA[s.act].title,
      subtitle: ACT_METADATA[s.act].subtitle,
    }));
}
