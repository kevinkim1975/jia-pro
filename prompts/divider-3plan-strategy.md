# DividerSlide — 3-Plan 차별화 전략
# Boris Cherny 검증 완료, 6축 차별화 기준

---

## 검증 결과 요약

- 6개 divider 데이터: 핸드오프 문서와 100% 일치
- 대표 페이지: p.18 (act=4, "해결책 1: 마케팅 전략 / Marketing Strategy")
- 배경: 각 컴포넌트가 자체 backgroundColor 포함 (CoverSlide 패턴 확인)
- SlideWrapper: `fullHeight showPattern patternType="radial"` — 레이아웃만 담당

## FROZEN (절대 불변) vs CREATIVE FREEDOM (v0 자유도)

### 🔒 FROZEN — 16항목
1. `"use client"` 첫 줄
2. `export function DividerSlide` 이름
3. `DividerSlideProps { act, title, subtitle }` 인터페이스
4. Tailwind CSS + inline style only
5. 외부 import 없음 (순수 React + Tailwind)
6. Safe Zone: x 4~96%, y 4~90%
7. 캔버스: 960×540px (16:9)
8. 빨간색 계열 절대 금지
9. Pretendard 폰트
10. 반응형 불필요 (고정 캔버스)
11. 14색 팔레트만 사용
12. 장식 요소 최대 5개
13. act 1~6 모두 대응
14. 한글/영문 모두 깨짐 없이 렌더링
15. sampleData 포함 (act=4, 해결책 1: 마케팅 전략)
16. root: `relative w-full overflow-hidden` + fontFamily inline

### 🎨 CREATIVE FREEDOM — v0가 결정
| 영역 | 자유도 범위 |
|------|------------|
| 배경색 | 어두운 계열 ~ 밝은 계열 (플랜별 차이) |
| ACT 숫자 크기/처리 | 워터마크 vs 히어로 vs 기하학 통합 |
| 타이틀 크기/위치 | 중앙 vs 좌측 vs 오프셋 |
| 장식 요소 스타일 | 원형 vs 선형 vs 아크 |
| 그림자 강도 | 없음 ~ 미세 |
| 애니메이션 타이밍 | 0.3s~0.8s 범위 |
| 요소 간 간격 | 16px~48px |
| 서브타이틀 처리 | tracking-wide vs uppercase vs italic |
| 구분선 형태 | gradient bar vs dot vs dash vs 없음 |
| 전체 톤 | 드라마틱 vs 절제 vs 우아 |

---

## 3개 플랜 6축 비교

| 축 | Plan A "Deep Stage" | Plan B "Luminous Divide" | Plan C "Ink & Stone" |
|----|-------|--------|--------|
| 배경/레이아웃 | 어두운 navy (#004B8D) 풀배경 | 밝은 white (#FAFBFC) + 좌측 컬러 밴드 | 그라디언트 (navy→teal 대각선) |
| 숫자/타이틀 처리 | 거대 숫자(280px) 워터마크, 타이틀 중앙 | 좌측 밴드에 숫자, 우측에 타이틀 | 숫자가 기하학 원 안에, 타이틀 아래 |
| 요소 관계성 | 숫자→타이틀 수직 계층 | 좌→우 시선 흐름, 2분할 | 원→텍스트 동심원 구조 |
| 기하학 장식 | 미세 빛줄기(ray) + 반투명 원 | 수직 밴드 경계선 + 점 패턴 | 동심원 링 + 잉크번짐 SVG |
| 레퍼런스 미학 | 영화 타이틀 시퀀스, TED 무대 | 편집 디자인, Kinfolk 매거진 | 한국 전통 인장(도장), 먹번짐 |
| 의료 신뢰 | 깊은 navy = 권위/안정 | 밝은 배경 = 청결/투명 | 전통+현대 = 한의학 정체성 |

---

## 추천

**Plan A "Deep Stage"** — 간지 슬라이드의 본질(장 전환의 드라마)에 가장 부합.
어두운 배경은 밝은 콘텐츠 슬라이드들 사이에서 시각적 리듬을 만듦.

단, 사용자 선택이 우선.
