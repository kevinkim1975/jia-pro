# Design Direction - 정이안한의원 디자인 시스템

> **Version**: 1.0  
> **Last Updated**: 2025-01-24  
> **Status**: Approved  
> **Palette**: Balanced Harmony

---

## 1. 개요

### 1.1 프로젝트명
**jia-pro** - 정이안한의원 마케팅 전략 프레젠테이션 디자인 시스템

### 1.2 디자인 철학

**"Balanced Harmony (밸런스드 하모니)"**

음양(陰陽)의 조화에서 영감을 받은 디자인 철학으로, 다음 요소의 균형을 추구합니다:

| 요소 | 균형점 |
|------|--------|
| 신뢰(Trust) | Ocean Blue - 의료기관의 전문성과 신뢰 |
| 자연(Nature) | Teal Green - 한의원의 자연친화적 치유 |
| 현대(Modern) | 깔끔한 레이아웃, 8pt 그리드 시스템 |
| 전통(Traditional) | 동양적 여백미, 좌우 대칭 |

### 1.3 핵심 가치

```typescript
type DesignValue = 'Trust' | 'Nature' | 'Balance'
```

1. **Trust (신뢰)**: 의료기관으로서의 전문성과 권위
2. **Nature (자연)**: 한의학의 자연친화적 치유 철학
3. **Balance (균형)**: 음양 조화, 시각적 안정감

---

## 2. 색상 시스템 (Color Tokens)

### 2.1 Primary Colors

| Token Name | Color Name | HEX | RGB | 용도 |
|------------|------------|-----|-----|------|
| `primary` | Ocean Blue | `#1A5F7A` | rgb(26, 95, 122) | 헤더, 제목, 주요 강조, CTA 버튼 |
| `primary-dark` | Deep Ocean | `#134558` | rgb(19, 69, 88) | 호버 상태, 강조 텍스트 |
| `primary-light` | Light Ocean | `#2A7A9A` | rgb(42, 122, 154) | 링크, 보조 강조 |

### 2.2 Secondary Colors

| Token Name | Color Name | HEX | RGB | 용도 |
|------------|------------|-----|-----|------|
| `secondary` | Teal Green | `#57A0A0` | rgb(87, 160, 160) | 섹션 구분, 보조 요소, 아이콘 |
| `secondary-dark` | Deep Teal | `#458080` | rgb(69, 128, 128) | 호버 상태 |
| `secondary-light` | Light Teal | `#6BB5B5` | rgb(107, 181, 181) | 배지, 태그 |

### 2.3 Accent Colors

| Token Name | Color Name | HEX | RGB | 용도 |
|------------|------------|-----|-----|------|
| `accent` | Soft Mint | `#9DC5BB` | rgb(157, 197, 187) | 포인트, 강조 박스, 하이라이트 |
| `accent-light` | Pale Mint | `#C5DED8` | rgb(197, 222, 216) | 강조 배경, 카드 호버 |

### 2.4 Neutral Colors

| Token Name | Color Name | HEX | RGB | 용도 |
|------------|------------|-----|-----|------|
| `white` | Pure White | `#FFFFFF` | rgb(255, 255, 255) | 슬라이드 배경 |
| `gray-50` | Cool Gray 50 | `#F8FAFB` | rgb(248, 250, 251) | 섹션 배경 |
| `gray-100` | Cool Gray 100 | `#EEF2F4` | rgb(238, 242, 244) | 카드 배경, 구분선 |
| `gray-200` | Cool Gray 200 | `#D1D9E0` | rgb(209, 217, 224) | 비활성 요소, 테두리 |
| `gray-400` | Cool Gray 400 | `#94A3B8` | rgb(148, 163, 184) | 보조 텍스트, 캡션 |
| `gray-700` | Slate | `#334155` | rgb(51, 65, 85) | 본문 텍스트 |
| `gray-900` | Dark Slate | `#1E293B` | rgb(30, 41, 59) | 제목 텍스트 |

### 2.5 Semantic Colors

| Token Name | Color Name | HEX | 용도 |
|------------|------------|-----|------|
| `success` | Green | `#10B981` | 성공, 완료, 긍정 지표 |
| `warning` | Amber | `#F59E0B` | 주의, 경고 |
| `info` | Blue | `#3B82F6` | 정보, 안내 |

### 2.6 ❌ 금지 색상

```typescript
type ForbiddenColor = 
  | '#FF0000'  // Pure Red - 의료기관 부적합, 위험/경고 연상
  | '#FF4444'  // Bright Red
  | '#CC0000'  // Dark Red
  | '#FF6B6B'  // Coral Red
```

**금지 사유**:
- 의료기관에서 빨간색은 위험, 응급, 출혈을 연상시킴
- 환자에게 불안감 유발 가능
- 한의원의 자연친화적 이미지와 부조화

**대안**: 강조가 필요한 경우 `primary` 또는 `accent` 색상 사용

---

## 3. 타이포그래피 (Typography Tokens)

### 3.1 폰트 패밀리

```typescript
type FontFamily = {
  sans: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
  serif: 'Noto Serif KR, Georgia, serif'  // 전통적 느낌이 필요한 경우
}
```

| Token | Value | 용도 |
|-------|-------|------|
| `font-sans` | Pretendard | 기본 폰트 (제목, 본문) |
| `font-serif` | Noto Serif KR | 인용문, 전통적 강조 (선택적) |

### 3.2 폰트 스케일

| Token | Size | Line Height | Letter Spacing | 용도 |
|-------|------|-------------|----------------|------|
| `display` | 48px | 1.2 (58px) | -0.02em | 커버 타이틀 |
| `h1` | 36px | 1.3 (47px) | -0.01em | 슬라이드 제목 |
| `h2` | 28px | 1.4 (39px) | -0.01em | 섹션 제목 |
| `h3` | 22px | 1.4 (31px) | 0 | 서브섹션 제목 |
| `h4` | 18px | 1.5 (27px) | 0 | 카드 제목 |
| `body` | 16px | 1.6 (26px) | 0 | 본문 텍스트 |
| `body-sm` | 14px | 1.6 (22px) | 0 | 보조 텍스트 |
| `caption` | 12px | 1.5 (18px) | 0.01em | 캡션, 레이블 |

### 3.3 폰트 웨이트

| Token | Weight | 용도 |
|-------|--------|------|
| `font-bold` | 700 | 제목, 강조 |
| `font-semibold` | 600 | 서브타이틀, 중요 텍스트 |
| `font-medium` | 500 | 버튼, 레이블 |
| `font-regular` | 400 | 본문 |
| `font-light` | 300 | 캡션, 보조 텍스트 (제한적 사용) |

### 3.4 권장 조합

| 요소 | 조합 |
|------|------|
| 커버 타이틀 | `display` + `font-bold` + `gray-900` |
| 슬라이드 제목 | `h1` + `font-bold` + `primary` |
| 섹션 제목 | `h2` + `font-semibold` + `gray-900` |
| 카드 제목 | `h4` + `font-semibold` + `gray-700` |
| 본문 | `body` + `font-regular` + `gray-700` |
| 캡션 | `caption` + `font-regular` + `gray-400` |

---

## 4. 간격 시스템 (Spacing Tokens)

### 4.1 기본 단위

**Base Unit**: `8px` (8pt 그리드 시스템)

```typescript
type SpacingUnit = 8  // 모든 간격은 8의 배수
```

### 4.2 간격 스케일

| Token | Value | 용도 |
|-------|-------|------|
| `space-0` | 0px | 없음 |
| `space-1` | 4px | 아이콘-텍스트 간격, 미세 조정 |
| `space-2` | 8px | 인라인 요소 간격 |
| `space-3` | 12px | 밀접한 관련 요소 |
| `space-4` | 16px | 기본 요소 간격 |
| `space-5` | 20px | 보통 요소 간격 |
| `space-6` | 24px | 카드 내부 패딩 |
| `space-8` | 32px | 섹션 간 간격 |
| `space-10` | 40px | 큰 섹션 간격 |
| `space-12` | 48px | 주요 섹션 분리 |
| `space-16` | 64px | 슬라이드 여백 |
| `space-20` | 80px | 대형 여백 |
| `space-24` | 96px | 커버 슬라이드 여백 |

### 4.3 컴포넌트별 간격 가이드

| 컴포넌트 | 내부 패딩 | 외부 마진 |
|----------|----------|----------|
| 슬라이드 | `space-16` (64px) | - |
| 카드 | `space-6` (24px) | `space-4` (16px) |
| 버튼 | `space-3` × `space-6` (12px × 24px) | - |
| 리스트 아이템 | `space-3` (12px) | `space-2` (8px) |
| 아이콘 + 텍스트 | `space-2` (8px) | - |

---

## 5. 레이아웃 원칙

### 5.1 슬라이드 캔버스

```typescript
type SlideCanvas = {
  width: 1920      // px
  height: 1080     // px
  aspectRatio: '16:9'
  padding: 64      // px (space-16)
  contentArea: {
    width: 1792    // 1920 - 64*2
    height: 952    // 1080 - 64*2
  }
}
```

### 5.2 여백 활용 (동양적 여백미)

| 원칙 | 설명 | 구현 |
|------|------|------|
| **여백은 콘텐츠다** | 빈 공간도 디자인 요소 | 최소 20% 여백 유지 |
| **호흡하는 레이아웃** | 콘텐츠 밀도 조절 | 슬라이드당 핵심 메시지 1-2개 |
| **균형 잡힌 무게** | 시각적 안정감 | 좌우 대칭 또는 의도적 비대칭 |

### 5.3 정렬 원칙

```typescript
type AlignmentRule = {
  primary: 'center'     // 커버, 디바이더 슬라이드
  content: 'left'       // 콘텐츠 슬라이드
  numbers: 'center'     // 숫자 배지, 순서 표시
  icons: 'center'       // 아이콘
}
```

### 5.4 그리드 시스템

| 요소 | 값 |
|------|-----|
| Columns | 12 |
| Gutter | 24px (`space-6`) |
| Margin | 64px (`space-16`) |

### 5.5 반응형 기준 (참고)

```typescript
type Breakpoint = {
  mobile: 375      // px
  tablet: 768      // px
  desktop: 1024    // px
  wide: 1440       // px
  presentation: 1920  // px (기본)
}
```

> **Note**: 프레젠테이션은 1920×1080 고정. 반응형은 추후 웹 버전 대응용.

---

## 6. 컴포넌트 원칙

### 6.1 숫자 배지 (Number Badge)

```typescript
type NumberBadge = {
  size: 32           // px
  fontSize: 14       // px (body-sm)
  fontWeight: 600    // semibold
  background: 'primary'  // #1A5F7A
  color: 'white'
  borderRadius: '50%'
}
```

### 6.2 카드 (Card)

```typescript
type Card = {
  padding: 24        // px (space-6)
  borderRadius: 8    // px
  background: 'white'
  border: '1px solid'
  borderColor: 'gray-200'  // #D1D9E0
  shadow: 'none'     // 플랫 디자인
}
```

### 6.3 강조 박스 (Highlight Box)

```typescript
type HighlightBox = {
  padding: 16        // px (space-4)
  borderRadius: 4    // px
  borderLeft: 4      // px
  borderLeftColor: 'accent'  // #9DC5BB
  background: 'accent-light' // #C5DED8 at 30% opacity
}
```

---

## 7. 레퍼런스

### 7.1 핵심 레퍼런스

| 레퍼런스 | 적용 요소 |
|----------|----------|
| **Hanisul (Grafy Design)** | 음양 조화, 균형, 전통+현대 융합 |
| **Healthcare Color Psychology** | Navy/Teal 기반 신뢰 색상 |
| **Piktochart Medical Palettes** | Trustworthy Teals 팔레트 |

### 7.2 적용 원칙

1. **일관성 우선**: 모든 슬라이드에 동일한 토큰 적용
2. **명시적 정의**: 모호한 값 없이 픽셀/HEX 단위로 명시
3. **타입 안전성**: TypeScript 타입으로 검증 가능한 토큰

---

## 8. TypeScript 타입 정의 (Preview)

```typescript
// Phase 1b에서 구현될 타입 미리보기

export type ColorToken = 
  | 'primary' | 'primary-dark' | 'primary-light'
  | 'secondary' | 'secondary-dark' | 'secondary-light'
  | 'accent' | 'accent-light'
  | 'white' | 'gray-50' | 'gray-100' | 'gray-200' | 'gray-400' | 'gray-700' | 'gray-900'
  | 'success' | 'warning' | 'info'

export type FontSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'caption'

export type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24

export type DesignTokens = {
  colors: Record<ColorToken, string>
  typography: {
    fontFamily: { sans: string; serif: string }
    fontSize: Record<FontSize, { size: number; lineHeight: number; letterSpacing: string }>
    fontWeight: Record<FontWeight, number>
  }
  spacing: Record<Spacing, number>
}
```

---

## Changelog

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| 1.0 | 2025-01-24 | 초기 버전 - Balanced Harmony 팔레트 적용 |
