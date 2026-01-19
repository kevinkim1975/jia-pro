# AutoMed Proposal Generator 디자인 가이드

## 1. 전체적인 무드 (Overall Mood)

**신뢰감 있고 전문적인 의료 컨설팅 서비스**

AutoMed Proposal Generator는 병원 및 의료기관을 대상으로 하는 전문 컨설팅 서비스로, 의료진과 경영진에게 신뢰감과 전문성을 전달해야 합니다. 차분하고 안정적인 블루 톤을 기반으로 하여 의료 분야의 신뢰성을 표현하며, 깔끔하고 체계적인 레이아웃을 통해 전문성을 강조합니다. 사용자가 첫 화면을 보는 순간부터 '이 서비스는 믿을 만하다'는 인상을 받을 수 있도록 설계되었습니다.

## 2. 참조 서비스 (Reference Service)

- **서비스명**: Cleveland Clinic 기업 웹사이트
- **제품 설명**: 세계적인 의료기관의 공식 웹사이트로, 의료 서비스와 전문성을 소개
- **디자인 무드**: 차분한 블루 톤과 전문적인 그리드 시스템으로 의료진의 신뢰감 구축
- **주요 색상**: #004B8D
- **보조 색상**: #48A9C5

## 3. 색상 & 그라데이션 (Color & Gradient)

**메디컬 블루 기반의 차분하고 전문적인 팔레트**

- **Primary Color**: #004B8D (깊은 의료용 블루)
- **Secondary Color**: #48A9C5 (밝은 메디컬 블루)
- **Accent Color**: #10B981 (성공/긍정을 나타내는 그린)
- **Background**: #FFFFFF (순수한 화이트)
- **Text Primary**: #1F2937 (진한 그레이)
- **Text Secondary**: #6B7280 (중간 그레이)
- **Surface**: #F6F8FA (연한 그레이 배경)

**무드**: 차가운 톤, 낮은 채도로 안정감과 신뢰감 조성

**색상 사용법**:
1. **최우선 요소**: Primary Color - 상단바 배경, 주요 버튼, 핵심 제목
2. **보조 요소**: Secondary Color - 링크, 차트 하이라이트, 보조 액션 버튼
3. **강조 요소**: Accent Color - 알림, 성공 배지, 진행률 표시
4. **배경 요소**: Surface Color - 카드 배경, 구분선

## 4. 타이포그래피 & 폰트 (Typography & Font)

**Inter 폰트 기반의 가독성 중심 타이포그래피 시스템**

- **폰트 패밀리**: Inter, -apple-system, BlinkMacSystemFont, sans-serif
- **Heading 1**: Inter, 48px (3.0rem), Weight 600, Line-height 1.2
- **Heading 2**: Inter, 36px (2.25rem), Weight 600, Line-height 1.2
- **Heading 3**: Inter, 24px (1.5rem), Weight 600, Line-height 1.2
- **Body Large**: Inter, 20px (1.25rem), Weight 400, Line-height 1.5
- **Body**: Inter, 18px (1.125rem), Weight 400, Line-height 1.5
- **Body Small**: Inter, 16px (1.0rem), Weight 400, Line-height 1.5
- **Caption**: Inter, 14px (0.875rem), Weight 400, Line-height 1.5

**글자 간격**: 기본값 유지, 제목은 -0.025em의 미세한 트래킹 적용

## 5. 레이아웃 & 구조 (Layout & Structure)

**4포인트 스페이싱 시스템 기반의 그리드 레이아웃**

- **스페이싱 시스템**: 4px 단위 (4, 8, 12, 16, 24, 32, 48, 64px)
- **최대 콘텐츠 너비**: 1280px (컨테이너 제한)
- **그리드 시스템**: 12컬럼 반응형 그리드
  - 데스크톱: 12컬럼
  - 태블릿: 8컬럼
  - 모바일: 4컬럼 (640px 이하에서 단일 컬럼으로 축소)
- **여백**: 넉넉한 화이트스페이스로 가독성 확보
- **모서리 반경**: 6px (shadcn 기본값)

## 6. 비주얼 스타일 (Visual Style)

**미니멀하고 전문적인 비주얼 요소**

- **아이콘**: lucide-react, stroke-width 1.5
  - 기본 상태: Primary Color (#004B8D)
  - 비활성 상태: Gray-600 (#6B7280)
- **일러스트레이션**: 사용하지 않음 (데이터와 차트 중심)
- **이미지**: 고품질 의료/병원 관련 이미지, 적절한 필터 적용
- **그림자**: 미세한 드롭섀도우 (0 1px 3px rgba(0,0,0,0.1))
- **경계선**: 1px solid #E5E7EB

## 7. UX 가이드 (UX Guide)

**초보자 친화적이면서도 전문적인 사용자 경험**

**대상 사용자**: 병원 의사결정권자 (경영진, 실장 등 / 디지털 경험 제한적인 40~60대 다수)

**핵심 UX 원칙**:
1. **직관적 네비게이션**: 명확한 페이지 번호와 진행률 표시
2. **친화적인 언어**: 기술적 용어 대신 이해하기 쉬운 한국어 사용
3. **인지 부하 최소화**: 현재 위치와 전체 구조를 항상 명확히 표시
4. **접근성 우선**: 키보드 네비게이션 및 스크린 리더 지원
5. **모바일 최적화**: 터치 친화적인 48px 이상의 탭 영역

**주요 UX 패턴**:
- 2클릭 이내 모든 정보 접근
- 명시적인 버튼 라벨 ("이전 페이지", "다음 페이지")
- 진행률 시각화로 사용자 위치 인식 지원

## 8. UI 컴포넌트 가이드 (UI Component Guide)

### 상단바 (TopbarHeader)
- **배경색**: Primary Color (#004B8D)
- **높이**: 64px
- **구성**: 로고 (좌측) + 제목 (중앙) + 목차 버튼 + 페이지 번호 (우측)
- **텍스트**: 흰색, Weight 600

### 목차 드로어 (TocDrawer)
- **배경색**: Surface (#F6F8FA)
- **너비**: 320px (모바일에서는 전체 너비의 80%)
- **애니메이션**: 우측에서 슬라이드 인
- **항목**: 페이지 번호 + 제목, 호버 시 Secondary Color 배경

### 진행률 푸터 (ProgressFooter)
- **높이**: 80px
- **진행률 바**: Primary Color, 높이 4px
- **버튼**: 
  - 기본: Secondary Color 배경, 흰색 텍스트
  - 호버: Primary Color 배경
  - 비활성: Gray-300 배경, Gray-500 텍스트

### 차트 블록 (ChartBlock)
- **배경**: Surface Color (#F6F8FA)
- **패딩**: 24px
- **모서리**: 6px 반경
- **제목**: Heading 3 스타일
- **차트 색상**: Primary 및 Secondary Color 활용

### 섹션 카드 (SectionCard)
- **배경**: 흰색
- **경계선**: 1px solid #E5E7EB
- **패딩**: 32px
- **제목**: Heading 2 스타일
- **내용**: Body 스타일

### 버튼
- **Primary**: Primary Color 배경, 흰색 텍스트, 48px 높이
- **Secondary**: 투명 배경, Secondary Color 경계선 및 텍스트
- **Ghost**: 투명 배경, 호버 시 Surface Color 배경

모든 컴포넌트는 WCAG 2.1 AA 접근성 기준을 충족하며, 키보드 네비게이션과 스크린 리더를 완벽 지원합니다.
