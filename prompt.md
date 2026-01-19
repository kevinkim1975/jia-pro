# jia-pro 슬라이드 컴포넌트 전체 리팩토링

## 프로젝트 경로
C:\MyProject\crmp\jia-pro

## 현재 문제
1. src/components/slide-renderers.tsx에 인코딩 깨진 한글 (紐⑹감, ???? 등)
2. 어설픈 디자인 - 전문적이지 않음
3. V0.dev 품질이 아님

## 요청 작업
slide-renderers.tsx의 7개 슬라이드 컴포넌트를 완전히 재작성해주세요.

## 필수 도구 사용
- V0.dev MCP를 사용하여 각 슬라이드 컴포넌트 디자인 생성
- 한 컴포넌트씩 V0.dev에 요청하고 결과를 적용

## 슬라이드 타입 (7개)
1. CoverSlide - 표지
2. TocSlide - 목차
3. DividerSlide - ACT 구분 페이지
4. ContentSlide - 일반 콘텐츠
5. ChartSlide - 차트 (chart-slide.tsx 별도 파일)
6. ComparisonSlide - Before/After 비교
7. SummarySlide - 핵심 요약

## 디자인 시스템
- Primary: #004B8D (Cleveland Clinic 파란색)
- Secondary: #48A9C5 (밝은 청록)
- Accent: #10B981 (초록)
- Warning: #F59E0B
- Danger: #EF4444
- 배경: #F8FAFC (surface)
- 폰트: 시스템 폰트
- 스타일: 의료기관 마케팅 제안서, 전문적이고 신뢰감 있게
- 참고: Cleveland Clinic 웹사이트 스타일

## 레이아웃 제약 조건
- 슬라이드 최대 높이: 600px (min-h-[600px] max-h-[600px])
- 콘텐츠가 600px 초과 시: 내부 스크롤 (overflow-y-auto)
- 슬라이드 내부 padding: p-8 md:p-12 lg:p-16
- 반응형: 모바일/태블릿/데스크톱 대응

## TypeScript 규칙 (Boris Cherny 스타일)
- readonly 적극 사용
- optional props는 ?로 명시
- 판별 유니온 타입 활용
- 타입은 src/types/proposal.ts 참조
- 컴파일 오류 0개 유지

## Vercel React Best Practices
- functional setState 사용: setX(prev => ...) 형태
- useCallback 의존성 최소화
- dynamic import 유지 (chart-slide.tsx 분리 상태 유지)
- 불필요한 리렌더 방지

## 중요 사항
1. 모든 한글 텍스트 정상 출력 (UTF-8 인코딩)
2. 주석도 한글로 깔끔하게
3. Tailwind CSS 사용
4. shadcn/ui 컴포넌트 활용 (Card, Button 등)
5. 각 슬라이드별 고유한 시각적 특성 부여
6. 호버/포커스 상태 스타일링
7. 부드러운 트랜지션 (transition-all duration-200)

## 작업 순서
1. 각 슬라이드 타입별로 V0.dev MCP에 디자인 요청
2. 생성된 코드를 slide-renderers.tsx에 적용
3. chart-slide.tsx는 별도로 업데이트
4. npm run build로 빌드 확인
5. 오류 있으면 수정
6. 모든 슬라이드 완료 후 최종 확인

## 완료 기준
- TypeScript 컴파일 오류 0개
- 모든 한글 정상 표시
- 7개 슬라이드 모두 V0.dev 품질
- 세로 600px 내에서 스크롤 정상 작동