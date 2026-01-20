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
        { act: 2, title: '위기', startPage: 6 },
        { act: 3, title: '전환점', startPage: 13 },
        { act: 4, title: '해결책 1: 마케팅 전략', startPage: 18 },
        { act: 5, title: '해결책 2: AI CRM', startPage: 25 },
        { act: 6, title: '요약 및 Next Step', startPage: 45 },
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
      type: 'cards',
      title: '성장의 동력',
      cards: [
        { title: '33년', subtitle: '경력', description: '한의학박사' },
        { title: '11권', subtitle: '저서', description: '출간' },
        { title: '콘텐츠가', subtitle: '환자를 데려온다', description: '직접 경험' },
      ],
      bottomMessage: '"콘텐츠의 힘을 잘 알고 계시지요?"',
      tone: 'positive',
    },
  },
  // ACT 2 간지
  {
    id: 'slide-6',
    pageNumber: 6,
    act: 2,
    content: {
      type: 'divider',
      act: 2,
      title: '위기',
      subtitle: 'Crisis',
    },
  },
  // ACT 2 슬라이드들
  // 2-1: 22년 이후의 변화
  {
    id: 'slide-7',
    pageNumber: 7,
    act: 2,
    content: {
      type: 'chart',
      title: '그러나 22년 이후, 흐름이 바뀌었습니다',
      chart: {
        type: 'line',
        data: [
          { label: '22년', value: 344, annotation: '' },
          { label: '23년', value: 221, annotation: '-35.8%' },
          { label: '24년', value: 193, annotation: '-12.7%' },
          { label: '25년', value: 193, annotation: '' },
        ],
        yAxisLabel: '신환수',
      },
      highlight: '피크 대비 -43.9% (151건 감소)',
      description: '',
    },
  },
  // 2-2: 원인 1 - 시장 변화
  {
    id: 'slide-8',
    pageNumber: 8,
    act: 2,
    content: {
      type: 'twoColumn',
      title: '원인 1: 시장 자체가 변하고 있습니다',
      left: {
        title: '냉증 시장',
        highlight: '▼ -36%',
        items: [
          '검색량 하락',
          '시장 규모 축소',
        ],
      },
      right: {
        title: '자율신경 시장',
        highlight: '▲ +57%',
        items: [
          '검색량 상승',
          '그러나 우리 영역 아님',
        ],
      },
      bottomMessage: '"우리가 노출되던 시장이 줄어들고 있습니다"',
    },
  },
  // 2-3: 원인 2 - 경쟁 격화
  {
    id: 'slide-9',
    pageNumber: 9,
    act: 2,
    content: {
      type: 'twoColumn',
      title: '원인 2: 경쟁이 급격히 심화되고 있습니다',
      left: {
        title: '자율신경 키워드 광고 현황',
        items: [
          '총 광고 업체: 80개',
          '신규 진입 (0~3개월): 다수',
        ],
      },
      right: {
        title: '해아림한의원',
        items: [
          '진입 시점: 4~6개월 전',
          '현재 점유율: 81.82%',
          '→ 6개월 만에 시장 장악 (막대한 광고비)',
        ],
      },
    },
  },
  // 2-4: 원인 3 - 블로그 환경
  {
    id: 'slide-10',
    pageNumber: 10,
    act: 2,
    content: {
      type: 'content',
      title: '원인 3: 블로그 환경이 바뀌었습니다',
      content: '2025년 규제 환경 변화 (대구 한의원간 민원 전쟁으로 인한 결과)',
      bullets: [
        '블로그에 치료 관련 적극적 노출 제한',
        '경쟁사 블로그: 최적화',
        '정이안 블로그: 준최적화',
        '최적화 블로그 구매: 2천만원+, 물량도 불확실',
      ],
      emphasis: '"블로그의 홍보 패턴은 변화가 필요합니다"',
      tone: 'negative',
    },
  },
  // 2-5: 원인 4 - 질환 구조
  {
    id: 'slide-11',
    pageNumber: 11,
    act: 2,
    content: {
      type: 'content',
      title: '원인 4: 타겟 질환의 구조적 한계',
      content: '현재 타겟: 냉증 / 열감 / 신체화장애',
      bullets: [
        '"질환"이 아닌 "증상"',
        '검색 의도가 약함',
        '치료 연결이 어려움',
      ],
      emphasis: '파워링크: "엄마와 딸은 정이안박사를 만나세요" → 타겟 제한으로 효율 낭비',
      tone: 'negative',
    },
  },
  // 2-6: 현재 위치 요약
  {
    id: 'slide-12',
    pageNumber: 12,
    act: 2,
    content: {
      type: 'content',
      title: '현재 우리가 마주한 현실',
      content: '',
      bullets: [
        '예산: 월 750만원 (대형 경쟁사 대비 열위)',
        '블로그: 준최적화, 홍보 제한',
        '질환: 증상 중심, 검색 의도 약함',
        '경쟁: 80개 업체, 해아림 81.82% 장악',
      ],
      emphasis: '"이것은 시장과 환경이 구조적으로 바뀌었다는 것을 의미합니다."',
      tone: 'neutral',
    },
  },
  // ACT 3 간지
  {
    id: 'slide-13',
    pageNumber: 13,
    act: 3,
    content: {
      type: 'divider',
      act: 3,
      title: '전환점',
      subtitle: 'Turning Point',
    },
  },
  // 3-1: 같은 상황, 다른 결과
  {
    id: 'slide-14',
    pageNumber: 14,
    act: 3,
    content: {
      type: 'quote',
      message: '같은 상황에서, 다른 결과를 만든 사례가 있습니다',
      subMessage: '휴한의원 (2014~2015)\n\n"환자 감소, 매출 정체, 경쟁 심화"\n정이안한의원과 같은 고민을 가진 한의원이었습니다',
    },
  },
  // 3-2: 2년 만에 10배 성장
  {
    id: 'slide-15',
    pageNumber: 15,
    act: 3,
    content: {
      type: 'comparison',
      title: '2년 만에 10배 성장',
      before: {
        label: 'Before',
        items: [
          '월 매출',
          '3,000만원',
        ],
      },
      after: {
        label: 'After',
        items: [
          '월 매출',
          '3억원',
          '선택한 질환: 틱장애',
        ],
      },
    },
  },
  // 3-3: 성공의 3가지 조건
  {
    id: 'slide-16',
    pageNumber: 16,
    act: 3,
    content: {
      type: 'content',
      title: '당시 틱장애의 조건',
      content: '',
      bullets: [
        '1. 한의원 경쟁이 적었다 → 한의원이 잘하는 진료로 인식되지 않았음',
        '2. 양방에서 주로 다루던 질환이었다 → 한방 대안에 대한 수요 존재',
        '3. 수익을 재투자했다 → 한정된 수익 외 전부 마케팅+CRM에 투입',
      ],
      tone: 'neutral',
    },
  },
  // 3-4: 질문
  {
    id: 'slide-17',
    pageNumber: 17,
    act: 3,
    content: {
      type: 'quote',
      message: '원장님께서 보시기에,\n이 세 가지 조건을 충족하는 질환은\n무엇이 있을까요?',
      subMessage: '1) 한의원 경쟁이 아직 치열하지 않고\n2) 양방에서 주로 다루던 영역이며\n3) 원장님의 33년 경험으로 자신 있는 질환',
    },
  },
  // ACT 4 간지
  {
    id: 'slide-18',
    pageNumber: 18,
    act: 4,
    content: {
      type: 'divider',
      act: 4,
      title: '해결책 1: 마케팅 전략',
      subtitle: 'Marketing Strategy',
    },
  },
  // 4-1: 전략 방향
  {
    id: 'slide-19',
    pageNumber: 19,
    act: 4,
    content: {
      type: 'quote',
      message: '수성하는 곳은 콘텐츠로 싸우고\n\n유리한 곳에 물량을 집중합니다.',
    },
  },
  // 4-2: 전략 1 - 지식인 극대화
  {
    id: 'slide-20',
    pageNumber: 20,
    act: 4,
    content: {
      type: 'twoColumn',
      title: '전략 1: 지식인 극대화',
      left: {
        title: '현재 강점 (이미 보유)',
        items: [
          '자율신경 지식인 점유율: 72.73%',
          '냉증 지식인 점유율: 50.00%',
        ],
      },
      right: {
        title: '목표',
        items: [
          '현재: 커버리지 ✗',
          '목표: 월 100개 답변',
          '(경쟁사 사례: 월 300개)',
          '→ 자율신경 + 연관 질환에 집중',
        ],
      },
      bottomMessage: '"한 고지는 어떠한 경쟁도 허용할 수 없도록"',
    },
  },
  // 4-3: 전략 2 - 블로그 전환
  {
    id: 'slide-21',
    pageNumber: 21,
    act: 4,
    content: {
      type: 'twoColumn',
      title: '전략 2: 블로그 전환',
      left: {
        title: '현실 인정',
        items: [
          '준최적화 블로그',
          '홍보 제한 환경 (대구 민원 전쟁 결과)',
        ],
      },
      right: {
        title: '전환 방향',
        items: [
          '1. 논문 기반 학술 콘텐츠 → 학술적이지만 쉽게',
          '2. 정보성 콘텐츠 콜라보 → 유입 안정성 확보',
          '3. 경쟁 의료기관 모니터링 강화(체계구축)',
        ],
      },
      bottomMessage: '"홍보 채널 → 전문성 채널로"',
    },
  },
  // 4-4: 전략 3 - 파워링크 최적화
  {
    id: 'slide-22',
    pageNumber: 22,
    act: 4,
    content: {
      type: 'twoColumn',
      title: '전략 3: 파워링크 최적화',
      left: {
        title: '현재 문제',
        items: [
          '"엄마와 딸은 정이안박사를 만나세요"',
          '→ 타겟 제한 (여성만)',
          '→ 효율 낭비',
        ],
      },
      right: {
        title: '개선 방향',
        items: [
          '1. 검색 의도에 맞는 메시지',
          '2. 성별 제한 제거 검토(다른 방향으로)',
          '3. 질환 전환 후 새 타겟 맞춤 문구',
        ],
      },
      bottomMessage: '"정교한 메시지 관리가 필요합니다"',
    },
  },
  // 4-5: 실행 로드맵
  {
    id: 'slide-23',
    pageNumber: 23,
    act: 4,
    content: {
      type: 'flowSteps',
      title: '질환 전환 실행 로드맵',
      steps: [
        { step: 1, title: '해당 질환', description: '수요 분석' },
        { step: 2, title: '질환 방향', description: '확정' },
        { step: 3, title: '연간 캘린더', description: '수립' },
      ],
      bottomMessage: '"방향이 정해지면, 실행 계획을 함께 수립합니다"',
    },
  },
  // 4-6: 예산 변경
  {
    id: 'slide-24',
    pageNumber: 24,
    act: 4,
    content: {
      type: 'twoColumn',
      title: '예산 변경',
      left: {
        title: '블로그 논문 포스팅',
        items: [
          '5만원 → 8만원/건',
          '월 10건 목표',
          '프로세스: 수집→확정→원고→포스팅',
        ],
      },
      right: {
        title: '지식인',
        items: [
          '20건 → 50건/월',
          '(자동완성검색어에서 전환)',
        ],
      },
      bottomMessage: '경쟁 모니터링 및 민원: 월 22만원',
    },
  },
  // ACT 5 간지
  {
    id: 'slide-25',
    pageNumber: 25,
    act: 5,
    content: {
      type: 'divider',
      act: 5,
      title: '해결책 2: AI CRM',
      subtitle: 'AI CRM',
    },
  },
  // 5-1: 질문
  {
    id: 'slide-26',
    pageNumber: 26,
    act: 5,
    content: {
      type: 'quote',
      message: '광고말고. 초진 문의를 늘리는 방법은\n없을까요?',
    },
  },
  // 5-2: 두 가지 의료기관
  {
    id: 'slide-27',
    pageNumber: 27,
    act: 5,
    content: {
      type: 'comparison',
      title: '두 가지 의료기관',
      before: {
        label: '사냥하는 의료기관',
        items: [
          '새 환자만 찾는다',
          '광고비 계속 증가',
          '경쟁에 휘둘린다',
        ],
      },
      after: {
        label: '농사하는 의료기관',
        items: [
          '기존 환자가 소개하도록',
          '육성한다',
          '안정적으로 성장한다',
        ],
      },
    },
  },
  // 5-3: 호원앤컴퍼니 CRM 연혁
  {
    id: 'slide-28',
    pageNumber: 28,
    act: 5,
    content: {
      type: 'cards',
      title: '호원앤컴퍼니 CRM 연혁',
      cards: [
        { title: '2003', subtitle: '서울대 분당병원', description: 'CRM 개발' },
        { title: '2004', subtitle: '초이스피부과', description: '로컬 최초' },
        { title: '현재', subtitle: '150개 기관', description: '운영' },
        { title: '2025.12', subtitle: 'AI CRM', description: '개발 5개 시범' },
      ],
      bottomMessage: '"20년간 의료기관 CRM을 만들어 왔습니다"',
      tone: 'positive',
    },
  },
  // 5-4: AI CRM 차별점
  {
    id: 'slide-29',
    pageNumber: 29,
    act: 5,
    content: {
      type: 'twoColumn',
      title: 'AI CRM: 기록 관리 → 환자 확산 시스템',
      left: {
        title: 'AI',
        items: [
          '캠페인 자동 생성',
          '타이밍 알림',
          '패턴 예측',
        ],
      },
      right: {
        title: '사람',
        items: [
          '상담 실행',
          '관계 형성',
          '감정 교류',
        ],
      },
      bottomMessage: '"AI가 알려주고, 사람이 실행합니다"',
    },
  },
  // 5-5: 3가지 확산 경로
  {
    id: 'slide-30',
    pageNumber: 30,
    act: 5,
    content: {
      type: 'cards',
      title: '3가지 확산 경로',
      cards: [
        { title: '신규 시술', subtitle: '유도', description: '기존 환자 → 추가 시술' },
        { title: '재구매', subtitle: '촉진', description: '정기 방문 유지' },
        { title: '소개', subtitle: '확산', description: '만족 환자 → 지인' },
      ],
      bottomMessage: '"한 명의 환자가 세 가지 방향으로 확산됩니다"',
      tone: 'positive',
    },
  },
  // 5-6: AI CRM 구성 요소
  {
    id: 'slide-31',
    pageNumber: 31,
    act: 5,
    content: {
      type: 'cards',
      title: 'AI CRM 구성 요소',
      cards: [
        { title: 'PTD', subtitle: '경영진단', description: '현황 파악' },
        { title: '교육', subtitle: '프로그램', description: '역량 강화' },
        { title: 'CRM', subtitle: '시스템', description: '실행 도구' },
      ],
      tone: 'positive',
    },
  },
  // 5-7: PTD 경영진단
  {
    id: 'slide-32',
    pageNumber: 32,
    act: 5,
    content: {
      type: 'twoColumn',
      title: 'PTD 경영진단 (2007년 다국적기업의 연구 지원 사업 선정)',
      left: {
        title: 'FS Paper',
        items: [
          '목표 지향성',
          '실행력 분석',
          '(절대평가)',
        ],
      },
      right: {
        title: 'FBATR Paper',
        items: [
          '조직 관리력',
          '분석',
          '(상대평가)',
        ],
      },
      bottomMessage: '비교 기준: 상위 5% vs 누적 의료기관 평균',
    },
  },
  // 5-8: PTD 방법론
  {
    id: 'slide-33',
    pageNumber: 33,
    act: 5,
    content: {
      type: 'cards',
      title: 'PTD 방법론',
      cards: [
        { title: '개방형', subtitle: '질문', description: '' },
        { title: '폐쇄형', subtitle: '질문', description: '' },
        { title: '검증', subtitle: '질문', description: '' },
      ],
      bottomMessage: '→ 편향성 배제, 객관적 현황 파악\n"분석 리뷰를 듣고 2년 근무한 경영실장보다 파악을 잘했다고 봤다."',
      tone: 'neutral',
    },
  },
  // 5-9: 교육 프로그램 개요
  {
    id: 'slide-34',
    pageNumber: 34,
    act: 5,
    content: {
      type: 'cards',
      title: '교육 프로그램',
      cards: [
        { title: '전직원', subtitle: '에니어그램', description: 'SQI 리더십' },
        { title: '경영진', subtitle: '원장 교육', description: '전체 교육' },
        { title: '상담팀 (ASC)', subtitle: '프로세스', description: '매뉴얼, 클로징' },
      ],
      bottomMessage: '교육 성과: 재진율 50% 향상',
      tone: 'positive',
    },
  },
  // 5-10: 전직원 교육 - 에니어그램
  {
    id: 'slide-35',
    pageNumber: 35,
    act: 5,
    content: {
      type: 'content',
      title: '전직원 교육: 에니어그램',
      content: '목적: 조직원간 소통 극대화',
      bullets: [
        '9가지 성격 유형 이해',
        '상호 이해',
        '협업 향상',
      ],
      tone: 'neutral',
    },
  },
  // 5-11: 전직원 교육 - SQI 리더십
  {
    id: 'slide-36',
    pageNumber: 36,
    act: 5,
    content: {
      type: 'content',
      title: '전직원 교육: SQI 리더십',
      content: 'Service Quality Institute',
      bullets: [
        '고객 4유형 분류',
        '유형별 맞춤 상담',
      ],
      tone: 'neutral',
    },
  },
  // 5-12: 경영진 교육
  {
    id: 'slide-37',
    pageNumber: 37,
    act: 5,
    content: {
      type: 'twoColumn',
      title: '경영진 교육',
      left: {
        title: '원장 교육',
        items: [
          '비전과 팀웍 방향',
          '의사결정 기준',
          'AI 시대의 시스템',
        ],
      },
      right: {
        title: '전체 교육',
        items: [
          '엔진/플랫폼',
          '설정',
        ],
      },
    },
  },
  // 5-13: 상담팀 교육 (ASC)
  {
    id: 'slide-38',
    pageNumber: 38,
    act: 5,
    content: {
      type: 'content',
      title: '상담팀 교육 (ASC)',
      content: '프로세스 구축 → 매뉴얼 제작 → 대화최면 상담교육 → 클로징 기법',
      bullets: [
        '+ 고객 거절 트리거 설정',
      ],
      tone: 'positive',
    },
  },
  // 5-14: CRM 시스템 기능 (1)
  {
    id: 'slide-39',
    pageNumber: 39,
    act: 5,
    content: {
      type: 'twoColumn',
      title: 'CRM 시스템 기능',
      left: {
        title: '환자 세분화',
        items: [
          '등급별 분류',
          '행동 패턴 분석',
        ],
      },
      right: {
        title: '자동 알림',
        items: [
          '연락 타이밍',
          '자동 추천',
        ],
      },
    },
  },
  // 5-15: CRM 시스템 기능 (2)
  {
    id: 'slide-40',
    pageNumber: 40,
    act: 5,
    content: {
      type: 'twoColumn',
      title: 'CRM 시스템 기능',
      left: {
        title: '상담 스크립트',
        items: [
          '상황별 대응',
          '가이드 제공',
        ],
      },
      right: {
        title: '성과 추적',
        items: [
          'KPI 대시보드',
          '리포트 자동화',
        ],
      },
    },
  },
  // 5-16: 도입 성과
  {
    id: 'slide-41',
    pageNumber: 41,
    act: 5,
    content: {
      type: 'quote',
      message: '71%',
      subMessage: '도입 기관 중 71%가\n30% 이상 매출 증가\n\nAI기능 CRM의 효율은 더 좋아질 것',
    },
  },
  // 5-17: 원장님 고민 연결
  {
    id: 'slide-42',
    pageNumber: 42,
    act: 5,
    content: {
      type: 'comparison',
      title: '원장님의 고민',
      before: {
        label: '고민',
        items: [
          '직원 관리 부담',
          '교육 시간 부족',
          '일관성 유지 어려움',
        ],
      },
      after: {
        label: '해결',
        items: [
          '시스템이 가이드',
          '최소 인원 운영',
          '프로세스 표준화',
        ],
      },
    },
  },
  // 5-18: 가격 구성
  {
    id: 'slide-43',
    pageNumber: 43,
    act: 5,
    content: {
      type: 'twoColumn',
      title: '가격 구성',
      left: {
        title: '정가',
        items: [
          '맞춤형 CRM: 1억6,500만',
          '교육 프로그램: 1억1,880만',
          'PTD+모니터링: 990만',
          '총액: 2억9,370만원',
        ],
      },
      right: {
        title: '제안가',
        highlight: '330만원 × 36개월',
        items: [
          '= 1억 1,880만원',
          '할인: 1억 7,490만원 (59.6%)',
          '*AI 기능 추가 포함',
        ],
      },
    },
  },
  // 5-19: 투자 비용
  {
    id: 'slide-44',
    pageNumber: 44,
    act: 5,
    content: {
      type: 'content',
      title: '투자 비용',
      content: '월 330만원 × 36개월 = 1억 1,880만원',
      bullets: [
        'PTD 경영진단',
        '교육 프로그램 (전직원/경영진/상담팀)',
        'CRM 시스템 구축 및 운영',
      ],
      tone: 'positive',
    },
  },
  // ACT 6 간지
  {
    id: 'slide-45',
    pageNumber: 45,
    act: 6,
    content: {
      type: 'divider',
      act: 6,
      title: '요약 및 Next Step',
      subtitle: 'Summary & Next Step',
    },
  },
  // 6-1: 현재 상황 요약
  {
    id: 'slide-46',
    pageNumber: 46,
    act: 6,
    content: {
      type: 'cards',
      title: '현재 상황 요약',
      cards: [
        { title: '시장 변화', subtitle: '냉증 -36%', description: '자율 +57%' },
        { title: '경쟁 격화', subtitle: '80개 업체', description: '해아림 급등' },
        { title: '블로그 제한', subtitle: '준최적화', description: '홍보 제한' },
        { title: '질환 구조', subtitle: '증상 중심', description: '' },
      ],
      bottomMessage: '"노력의 문제가 아닙니다. 환경이 바뀌었습니다."',
      tone: 'neutral',
    },
  },
  // 6-2: 제안 방향 요약
  {
    id: 'slide-47',
    pageNumber: 47,
    act: 6,
    content: {
      type: 'twoColumn',
      title: '제안 방향 요약',
      left: {
        title: '마케팅 전략 전환',
        items: [
          '질환 방향 재설정',
          '지식인 극대화',
          '블로그 → 전문성',
          '파워링크 최적화',
        ],
      },
      right: {
        title: 'AI CRM 도입',
        items: [
          'PTD 경영진단',
          '교육 프로그램',
          'CRM 시스템',
          '월 330만원 × 36개월',
          'AI시대에 맞는 미래형 한의원 구축',
        ],
      },
    },
  },
  // 6-3: Next Step
  {
    id: 'slide-48',
    pageNumber: 48,
    act: 6,
    content: {
      type: 'flowSteps',
      title: 'Next Step',
      steps: [
        { step: 1, title: '질환 방향', description: '확정' },
        { step: 2, title: '계절성', description: '분석' },
        { step: 3, title: '실행 캘린더', description: '수립' },
      ],
      bottomMessage: '"질환을 결정하는 여정이 될 것입니다"',
    },
  },
  // 6-4: 마무리
  {
    id: 'slide-49',
    pageNumber: 49,
    act: 6,
    content: {
      type: 'quote',
      message: '맞는 방향이\n올바른 프로세스를 만날 때,\n\n성공하는 의료기관을 만듭니다.',
      subMessage: '호원앤컴퍼니',
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
  totalPages: 49,
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
