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
  {
    id: 'slide-11',
    pageNumber: 11,
    act: 2,
    content: {
      type: 'content',
      title: '블로그 노출 감소의 원인',
      content: '네이버 알고리즘이 크게 변화했습니다.',
      bullets: [
        '스마트블록 도입으로 상위 노출 경쟁 심화',
        '인플루언서 콘텐츠 우선 노출',
        '광고성 콘텐츠 필터링 강화',
        '동영상/쇼츠 콘텐츠 선호',
      ],
      tone: 'negative',
    },
  },
  {
    id: 'slide-12',
    pageNumber: 12,
    act: 2,
    content: {
      type: 'chart',
      title: '한의원 경쟁 현황',
      chart: {
        type: 'bar',
        data: [
          { label: '2020', value: 14500 },
          { label: '2022', value: 15200 },
          { label: '2024', value: 16100 },
        ],
        yAxisLabel: '전국 한의원 수',
      },
      highlight: '4년간 11% 증가',
      description: '경쟁이 더욱 치열해지고 있습니다.',
    },
  },
  {
    id: 'slide-13',
    pageNumber: 13,
    act: 2,
    content: {
      type: 'content',
      title: '소비자 행동 변화',
      content: '환자들의 정보 탐색 방식이 달라졌습니다.',
      bullets: [
        '블로그 → 유튜브/인스타그램 이동',
        '텍스트보다 영상 선호',
        '리뷰 및 후기 중시',
        '비교 검색 증가',
      ],
      tone: 'negative',
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
  {
    id: 'slide-16',
    pageNumber: 16,
    act: 3,
    content: {
      type: 'content',
      title: '왜 지금인가?',
      content: '시장 변화에 선제적으로 대응해야 합니다.',
      bullets: [
        '경쟁자들은 이미 변화 중',
        '늦을수록 회복 비용 증가',
        '기존 콘텐츠 자산 활용 가능',
        '원장님의 전문성은 여전히 강점',
      ],
      tone: 'neutral',
    },
  },
  {
    id: 'slide-17',
    pageNumber: 17,
    act: 3,
    content: {
      type: 'comparison',
      title: '선택의 갈림길',
      before: {
        label: '현상 유지',
        items: [
          '계속되는 신환 감소',
          '경쟁에서 뒤처짐',
          '기회 비용 증가',
        ],
      },
      after: {
        label: '전략적 변화',
        items: [
          '신환 회복 및 성장',
          '시장 선도 위치 확보',
          '지속 가능한 성장 기반',
        ],
      },
    },
  },
  {
    id: 'slide-18',
    pageNumber: 18,
    act: 3,
    content: {
      type: 'content',
      title: '호원앤컴퍼니의 제안',
      content: '검증된 전략으로 함께 성장하겠습니다.',
      bullets: [
        '데이터 기반 마케팅 전략 수립',
        'AI CRM 시스템 도입',
        '다채널 콘텐츠 최적화',
        '지속적인 성과 모니터링',
      ],
      emphasis: '원장님의 강점을 극대화하는 맞춤 솔루션',
      tone: 'positive',
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
  {
    id: 'slide-21',
    pageNumber: 21,
    act: 4,
    content: {
      type: 'content',
      title: '1단계: 온라인 가시성 강화',
      content: '검색에서 더 많이 노출되도록 합니다.',
      bullets: [
        'SEO 최적화 - 키워드 전략 수립',
        '네이버 플레이스 최적화',
        '구글 비즈니스 프로필 관리',
        '지역 타겟 광고 집행',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-22',
    pageNumber: 22,
    act: 4,
    content: {
      type: 'content',
      title: '2단계: 콘텐츠 마케팅 최적화',
      content: '원장님의 전문성을 다양한 채널로 전달합니다.',
      bullets: [
        '기존 블로그 콘텐츠 리뉴얼',
        '유튜브 쇼츠/릴스 제작',
        '인스타그램 콘텐츠 운영',
        '환자 후기 콘텐츠 활용',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-23',
    pageNumber: 23,
    act: 4,
    content: {
      type: 'content',
      title: '3단계: 전환율 개선',
      content: '방문자를 실제 환자로 전환시킵니다.',
      bullets: [
        '랜딩 페이지 최적화',
        '예약 프로세스 간소화',
        '상담 응대 스크립트 개선',
        'A/B 테스트 지속 실행',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-24',
    pageNumber: 24,
    act: 4,
    content: {
      type: 'chart',
      title: '예상 성과',
      chart: {
        type: 'bar',
        data: [
          { label: '현재', value: 267 },
          { label: '3개월', value: 290 },
          { label: '6개월', value: 320 },
          { label: '12개월', value: 380 },
        ],
        yAxisLabel: '예상 신환수',
      },
      highlight: '12개월 내 42% 성장 목표',
      description: '단계별 전략 실행을 통한 점진적 성장',
    },
  },
  {
    id: 'slide-25',
    pageNumber: 25,
    act: 4,
    content: {
      type: 'summary',
      title: '마케팅 전략 요약',
      keyPoints: [
        '온라인 가시성 강화로 노출 증대',
        '다채널 콘텐츠로 도달 확대',
        '전환율 개선으로 실제 환자 증가',
      ],
      nextSteps: [
        '현황 분석 및 키워드 조사',
        '채널별 콘텐츠 전략 수립',
        '월별 실행 계획 확정',
      ],
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
  {
    id: 'slide-28',
    pageNumber: 28,
    act: 5,
    content: {
      type: 'content',
      title: 'CRM이 왜 필요한가?',
      content: '신환 유치보다 기존 환자 유지가 5배 효율적입니다.',
      bullets: [
        '재방문율 향상 → 매출 안정화',
        '환자 이탈 방지',
        '입소문 마케팅 활성화',
        '환자 생애 가치(LTV) 극대화',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-29',
    pageNumber: 29,
    act: 5,
    content: {
      type: 'comparison',
      title: 'CRM 도입 전 vs 후',
      before: {
        label: 'CRM 도입 전',
        items: [
          '수동 예약 관리',
          '환자 이탈 파악 어려움',
          '개인화 소통 불가',
          '데이터 분석 부재',
        ],
      },
      after: {
        label: 'CRM 도입 후',
        items: [
          '자동화된 예약 관리',
          '이탈 징후 조기 감지',
          'AI 기반 맞춤 메시지',
          '실시간 데이터 분석',
        ],
      },
    },
  },
  {
    id: 'slide-30',
    pageNumber: 30,
    act: 5,
    content: {
      type: 'content',
      title: '핵심 기능 1: 자동 예약 리마인더',
      content: '노쇼를 줄이고 예약 효율을 높입니다.',
      bullets: [
        '예약 24시간 전 자동 알림',
        '카카오톡/문자 발송',
        '예약 변경/취소 간편 처리',
        '노쇼율 50% 이상 감소',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-31',
    pageNumber: 31,
    act: 5,
    content: {
      type: 'content',
      title: '핵심 기능 2: 맞춤형 콘텐츠 발송',
      content: '환자별 관심사에 맞는 정보를 제공합니다.',
      bullets: [
        '증상별 건강 정보 자동 발송',
        '계절별 한방 건강 팁',
        '원장님 칼럼/영상 공유',
        '오픈율 30% 이상 달성',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-32',
    pageNumber: 32,
    act: 5,
    content: {
      type: 'content',
      title: '핵심 기능 3: 이탈 고객 재유입',
      content: '6개월 이상 미방문 환자를 되찾습니다.',
      bullets: [
        'AI가 이탈 위험 환자 자동 감지',
        '맞춤 재방문 유도 메시지',
        '특별 프로모션 안내',
        '재방문율 20% 향상',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-33',
    pageNumber: 33,
    act: 5,
    content: {
      type: 'content',
      title: '핵심 기능 4: 만족도 조사',
      content: '환자 피드백을 체계적으로 수집합니다.',
      bullets: [
        '진료 후 자동 만족도 조사',
        '불만족 환자 즉시 알림',
        '긍정 후기 작성 유도',
        '서비스 개선 데이터 축적',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-34',
    pageNumber: 34,
    act: 5,
    content: {
      type: 'chart',
      title: 'CRM 도입 예상 효과',
      chart: {
        type: 'bar',
        data: [
          { label: '재방문율', value: 25 },
          { label: '노쇼 감소', value: 50 },
          { label: '후기 증가', value: 40 },
          { label: '이탈 방지', value: 30 },
        ],
        yAxisLabel: '개선율 (%)',
      },
      highlight: '전체 매출 15-20% 향상 기대',
      description: '',
    },
  },
  {
    id: 'slide-35',
    pageNumber: 35,
    act: 5,
    content: {
      type: 'content',
      title: '도입 프로세스',
      content: '간편하게 시작할 수 있습니다.',
      bullets: [
        '1주차: 기존 환자 데이터 연동',
        '2주차: 시스템 설정 및 메시지 템플릿 제작',
        '3주차: 테스트 운영',
        '4주차: 정식 운영 시작',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-36',
    pageNumber: 36,
    act: 5,
    content: {
      type: 'content',
      title: '운영 지원',
      content: '도입 후에도 지속적으로 지원합니다.',
      bullets: [
        '전담 매니저 배정',
        '월간 성과 리포트 제공',
        '메시지 최적화 컨설팅',
        '24시간 기술 지원',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-37',
    pageNumber: 37,
    act: 5,
    content: {
      type: 'content',
      title: '성공 사례: A한의원',
      content: '서울 강남구 소재 한의원 사례입니다.',
      bullets: [
        '도입 6개월 만에 재방문율 32% 향상',
        '노쇼율 60% 감소',
        '월 매출 18% 증가',
        '환자 만족도 4.2 → 4.7점',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-38',
    pageNumber: 38,
    act: 5,
    content: {
      type: 'content',
      title: '성공 사례: B한의원',
      content: '경기도 수원시 소재 한의원 사례입니다.',
      bullets: [
        '이탈 환자 150명 재유입 성공',
        '온라인 후기 3배 증가',
        '신환 유입 경로 다변화',
        '직원 업무 부담 40% 감소',
      ],
      tone: 'positive',
    },
  },
  {
    id: 'slide-39',
    pageNumber: 39,
    act: 5,
    content: {
      type: 'chart',
      title: 'ROI 분석',
      chart: {
        type: 'line',
        data: [
          { label: '1개월', value: 80 },
          { label: '3개월', value: 150 },
          { label: '6개월', value: 280 },
          { label: '12개월', value: 450 },
        ],
        yAxisLabel: 'ROI (%)',
      },
      highlight: '6개월 내 투자 대비 2.8배 회수',
      description: '',
    },
  },
  {
    id: 'slide-40',
    pageNumber: 40,
    act: 5,
    content: {
      type: 'content',
      title: '요금제 안내',
      content: '병원 규모에 맞는 요금제를 선택하세요.',
      bullets: [
        'Basic: 월 29만원 (환자 1,000명 이하)',
        'Standard: 월 49만원 (환자 3,000명 이하)',
        'Premium: 월 79만원 (무제한)',
        '연간 결제 시 20% 할인',
      ],
      tone: 'neutral',
    },
  },
  {
    id: 'slide-41',
    pageNumber: 41,
    act: 5,
    content: {
      type: 'comparison',
      title: '요금제 비교',
      before: {
        label: 'Basic',
        items: [
          '자동 예약 리마인더',
          '기본 메시지 템플릿',
          '월간 리포트',
          '이메일 지원',
        ],
      },
      after: {
        label: 'Premium',
        items: [
          '모든 Basic 기능',
          'AI 맞춤 메시지',
          '실시간 대시보드',
          '전담 매니저 + 24시간 지원',
        ],
      },
    },
  },
  {
    id: 'slide-42',
    pageNumber: 42,
    act: 5,
    content: {
      type: 'content',
      title: '정이안한의원 맞춤 제안',
      content: '원장님께 가장 적합한 플랜을 제안드립니다.',
      bullets: [
        'Standard 요금제 추천',
        '첫 3개월 30% 할인 적용',
        '기존 데이터 무료 마이그레이션',
        '원장님 전용 메시지 템플릿 제작',
      ],
      emphasis: '월 34만원으로 시작 (정가 49만원)',
      tone: 'positive',
    },
  },
  {
    id: 'slide-43',
    pageNumber: 43,
    act: 5,
    content: {
      type: 'content',
      title: '보안 및 규정 준수',
      content: '환자 정보를 안전하게 보호합니다.',
      bullets: [
        'ISMS 인증 획득',
        '의료법 준수 메시지 발송',
        '개인정보 암호화 저장',
        '정기 보안 감사 실시',
      ],
      tone: 'neutral',
    },
  },
  {
    id: 'slide-44',
    pageNumber: 44,
    act: 5,
    content: {
      type: 'content',
      title: 'FAQ',
      content: '자주 묻는 질문에 답변드립니다.',
      bullets: [
        'Q: 기존 EMR과 연동 가능한가요? → 대부분 가능합니다',
        'Q: 환자가 수신 거부하면? → 자동으로 발송 제외됩니다',
        'Q: 메시지 내용을 직접 작성할 수 있나요? → 물론입니다',
        'Q: 해지 위약금이 있나요? → 없습니다',
      ],
      tone: 'neutral',
    },
  },
  {
    id: 'slide-45',
    pageNumber: 45,
    act: 5,
    content: {
      type: 'summary',
      title: 'AI CRM 요약',
      keyPoints: [
        '환자 관계 자동화로 업무 효율 향상',
        '재방문율 증가로 매출 안정화',
        '데이터 기반 의사결정 가능',
      ],
      nextSteps: [
        '무료 데모 신청',
        '기존 환자 데이터 분석',
        '맞춤 도입 계획 수립',
      ],
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
      title: '제안 요약',
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
    id: 'slide-48',
    pageNumber: 48,
    act: 6,
    content: {
      type: 'content',
      title: '투자 요약',
      content: '합리적인 투자로 큰 성과를 얻으세요.',
      bullets: [
        '마케팅 전략 컨설팅: 월 150만원',
        'AI CRM (Standard): 월 34만원 (할인가)',
        '총 월 184만원 투자',
        '예상 ROI: 6개월 내 280%',
      ],
      emphasis: '첫 달 무료 체험 가능',
      tone: 'positive',
    },
  },
  {
    id: 'slide-49',
    pageNumber: 49,
    act: 6,
    content: {
      type: 'content',
      title: '왜 호원앤컴퍼니인가?',
      content: '의료 마케팅 전문 기업입니다.',
      bullets: [
        '의료기관 전문 마케팅 10년 경력',
        '전국 200+ 병의원 파트너',
        '평균 고객 만족도 4.8점',
        '성과 기반 보상 시스템',
      ],
      tone: 'positive',
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
function groupSlidesByAct(slideList: Slide[]): Act[] {
  const actNumbers: ActNumber[] = [1, 2, 3, 4, 5, 6];

  return actNumbers.map((actNum) => {
    const actSlides = slideList.filter((s) => s.act === actNum);
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
