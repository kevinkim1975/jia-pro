# Design Direction - 정이안한의원 디자인 시스템

> **Version**: 2.0  
> **Last Updated**: 2025-01-25  
> **Status**: Approved  
> **Palette**: Yin-Yang Harmony (Hanisul Inspired)

---

## 1. 개요

### 1.1 프로젝트명
**jia-pro** - 정이안한의원 마케팅 전략 프레젠테이션 디자인 시스템

### 1.2 디자인 철학

**"Yin-Yang Harmony (음양 하모니)"**

GRAFY DESIGN의 Hanisul Cosmetic Rebranding에서 영감을 받은 디자인 철학:

| 요소 | 의미 | 표현 |
|------|------|------|
| 陽 (Yang) | 낮, 에너지, 활력 | 오렌지/코랄 계열 |
| 陰 (Yin) | 밤, 안정, 치유 | 블루/네이비 계열 |
| 調和 (Harmony) | 균형, 자연 | 수채화 붓터치, 여백 |

### 1.3 핵심 가치

```typescript
type DesignValue = 'Yin' | 'Yang' | 'Harmony'
```

1. **Yin (음)**: 밤, 안정, 치유 - 한의원의 치료적 신뢰감
2. **Yang (양)**: 낮, 에너지, 활력 - 건강 회복의 희망
3. **Harmony (조화)**: 수채화 붓터치, 한지 질감, 여백의 미

### 1.4 디자인 레퍼런스

**Primary Reference**: GRAFY DESIGN - Hanisul Cosmetic Rebranding
- 전통 한방의 컨셉 + 현대적 트렌드 융합
- 음양 기반 색상 팔레트
- 수채화 붓터치 그래픽 시스템
- 좌우 대칭과 곡선 강조

---

## 2. 색상 시스템 (Color Tokens)

### 2.1 Yin Colors (음 - 밤/치유)

| Token Name | Color Name | HEX | RGB | 용도 |
|------------|------------|-----|-----|------|
| `yin` | Deep Navy | `#1E3A5F` | rgb(30, 58, 95) | 제목, 주요 텍스트 |
| `yin-dark` | Midnight | `#152A45` | rgb(21, 42, 69) | 호버, 강조 |
| `yin-light` | Ocean Blue | `#2E5A8F` | rgb(46, 90, 143) | 서브 강조 |
| `yin-soft` | Soft Blue | `#7BA3C9` | rgb(123, 163, 201) | 수채화 터치 |

### 2.2 Yang Colors (양 - 낮/활력)

| Token Name | Color Name | HEX | RGB | 용도 |
|------------|------------|-----|-----|------|
| `yang` | Warm Coral | `#E8845F` | rgb(232, 132, 95) | 포인트, 강조 |
| `yang-dark` | Deep Coral | `#C96A45` | rgb(201, 106, 69) | 호버 |
| `yang-light` | Soft Peach | `#F4A98B` | rgb(244, 169, 139) | 하이라이트 |
| `yang-soft` | Pale Peach | `#FDDCC9` | rgb(253, 220, 201) | 수채화 터치 배경 |

### 2.3 Harmony Colors (조화)

| Token Name | Color Name | HEX | RGB | 용도 |
|------------|------------|-----|-----|------|
| `harmony` | Sage Green | `#8BAB8D` | rgb(139, 171, 141) | 자연, 치유 |
| `harmony-light` | Soft Sage | `#B5CDB6` | rgb(181, 205, 182) | 배경 터치 |
| `warm-gray` | Warm Gray | `#A69B91` | rgb(166, 155, 145) | 보조 요소 |

### 2.4 Neutral Colors

| Token Name | Color Name | HEX | RGB | 용도 |
|------------|------------|-----|-----|------|
| `white` | Pure White | `#FFFFFF` | rgb(255, 255, 255) | 슬라이드 배경 |
| `cream` | Warm Cream | `#FBF9F7` | rgb(251, 249, 247) | 따뜻한 배경 |
| `gray-100` | Light Gray | `#F0EDEA` | rgb(240, 237, 234) | 섹션 배경 |
| `gray-200` | Soft Gray | `#D9D4CF` | rgb(217, 212, 207) | 테두리 |
| `gray-400` | Medium Gray | `#9E9590` | rgb(158, 149, 144) | 캡션 |
| `gray-700` | Dark Gray | `#4A4541` | rgb(74, 69, 65) | 본문 텍스트 |
| `gray-900` | Charcoal | `#2D2926` | rgb(45, 41, 38) | 제목 텍스트 |

### 2.5 Semantic Colors

| Token Name | Color Name | HEX | 용도 |
|------------|------------|-----|------|
| `success` | Sage | `#8BAB8D` | 성공, 완료, 긍정 |
| `warning` | Coral | `#E8845F` | 주의, 강조 |
| `info` | Ocean | `#2E5A8F` | 정보, 안내 |

### 2.6 ❌ 금지 색상

```typescript
type ForbiddenColor = 
  | '#FF0000'  // Pure Red
  | '#FF4444'  // Bright Red
  | '#CC0000'  // Dark Red
  | '#00FF00'  // Neon Green
  | '#FF00FF'  // Magenta
```

**금지 사유**: 의료기관 부적합, Hanisul 스타일과 부조화

---

## 3. 그래픽 시스템 (Graphic Tokens)

### 3.1 수채화 붓터치 (Watercolor Brush)

```typescript
type BrushStyle = {
  type: 'watercolor'
  opacity: 0.15 | 0.25 | 0.40  // 투명도
  blend: 'soft-light' | 'multiply'
  edge: 'organic'  // 자연스러운 번짐
}
```

| 용도 | 색상 | 투명도 | 위치 |
|------|------|--------|------|
| 배경 장식 | `yin-soft`, `yang-soft` | 15-25% | 코너, 여백 |
| 섹션 구분 | `harmony-light` | 25-40% | 가로 띠 |
| 포인트 | `yang` | 40% | 강조 요소 뒤 |

### 3.2 한지 질감 (Hanji Texture)

```typescript
type HanjiTexture = {
  type: 'paper'
  grain: 'subtle'
  opacity: 0.05  // 매우 미묘하게
}
```

### 3.3 장식 요소

| 요소 | 형태 | 색상 | 용도 |
|------|------|------|------|
| 나뭇잎 | 추상적 곡선 | `harmony`, `yin-soft` | 코너 장식 |
| 붓터치 | 수채화 번짐 | `yang-soft`, `yin-soft` | 배경 |
| 선 | 섬세한 곡선 | `gray-200` | 구분선 |

---

## 4. 타이포그래피 (Typography Tokens)

### 4.1 폰트 패밀리

```typescript
type FontFamily = {
  sans: 'Pretendard, -apple-system, system-ui, sans-serif'
  serif: 'Noto Serif KR, Georgia, serif'  // 전통적 느낌
}
```

### 4.2 폰트 스케일

| Token | Size | Line Height | 용도 |
|-------|------|-------------|------|
| `display` | 48px | 1.2 | 커버 타이틀 |
| `h1` | 36px | 1.3 | 슬라이드 제목 |
| `h2` | 28px | 1.4 | 섹션 제목 |
| `h3` | 22px | 1.4 | 서브섹션 |
| `h4` | 18px | 1.5 | 카드 제목 |
| `body` | 16px | 1.6 | 본문 |
| `body-sm` | 14px | 1.6 | 보조 텍스트 |
| `caption` | 12px | 1.5 | 캡션 |

### 4.3 폰트 웨이트

| Token | Weight | 용도 |
|-------|--------|------|
| `bold` | 700 | 제목 |
| `semibold` | 600 | 서브타이틀 |
| `medium` | 500 | 버튼, 레이블 |
| `regular` | 400 | 본문 |
| `light` | 300 | 캡션 (제한적) |

---

## 5. 간격 시스템 (Spacing Tokens)

### 5.1 기본 단위

**Base Unit**: `8px`

### 5.2 간격 스케일

| Token | Value | 용도 |
|-------|-------|------|
| `space-1` | 4px | 미세 조정 |
| `space-2` | 8px | 인라인 간격 |
| `space-3` | 12px | 밀접 요소 |
| `space-4` | 16px | 기본 간격 |
| `space-6` | 24px | 카드 패딩 |
| `space-8` | 32px | 섹션 간격 |
| `space-12` | 48px | 주요 분리 |
| `space-16` | 64px | 슬라이드 여백 |
| `space-24` | 96px | 커버 여백 |

---

## 6. 레이아웃 원칙

### 6.1 슬라이드 캔버스

```typescript
type SlideCanvas = {
  width: 1920
  height: 1080
  aspectRatio: '16:9'
  padding: 64
}
```

### 6.2 여백 원칙 (Hanisul Style)

| 원칙 | 설명 |
|------|------|
| **여백은 콘텐츠** | 최소 20% 여백 유지 |
| **호흡하는 레이아웃** | 슬라이드당 핵심 메시지 1-2개 |
| **좌우 대칭** | 음양 조화 표현 |

### 6.3 박스/테두리 사용 금지

```typescript
type LayoutRule = {
  avoidBoxes: true  // 박스 형태 콘텐츠 영역 금지
  useWhitespace: true  // 여백으로 구분
  organicShapes: true  // 유기적 형태 선호
}
```

---

## 7. v0.dev 프롬프트 가이드

### 7.1 필수 포함 요소

```
## 색상 팔레트 (Hanisul Style - 반드시 이 색상만 사용)
- Yin (음): #1E3A5F (Deep Navy) - 제목, 주요 텍스트
- Yang (양): #E8845F (Warm Coral) - 포인트, 강조
- Harmony: #8BAB8D (Sage Green) - 자연, 치유
- Yin Soft: #7BA3C9 - 수채화 터치
- Yang Soft: #FDDCC9 - 배경 터치
- 텍스트: #2D2926 (Charcoal)
- 배경: #FFFFFF 또는 #FBF9F7 (Cream)

## 디자인 스타일
- 수채화 붓터치 장식 (15-25% 투명도)
- 박스/테두리 없이 여백으로 구분
- 좌우 대칭, 중앙 정렬
- 20% 이상 여백 유지
- 빨간색 사용 금지
```

---

## 8. TypeScript 타입 정의

```typescript
export type YinYangColor = 
  | 'yin' | 'yin-dark' | 'yin-light' | 'yin-soft'
  | 'yang' | 'yang-dark' | 'yang-light' | 'yang-soft'
  | 'harmony' | 'harmony-light' | 'warm-gray'
  | 'white' | 'cream' | 'gray-100' | 'gray-200' | 'gray-400' | 'gray-700' | 'gray-900'

export type BrushOpacity = 0.15 | 0.25 | 0.40

export type DesignTokens = {
  colors: Record<YinYangColor, string>
  brush: {
    opacity: BrushOpacity
    style: 'watercolor'
  }
}
```

---

## Changelog

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| 1.0 | 2025-01-24 | 초기 버전 - Balanced Harmony 팔레트 |
| 2.0 | 2025-01-25 | Hanisul Style 적용 - Yin-Yang Harmony 팔레트, 수채화 붓터치 |
