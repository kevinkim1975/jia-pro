# 콘텐츠 슬라이드에 Cross Hatch 배경 패턴 추가

## 목표
콘텐츠 페이지에 연한 빗금(Cross Hatch) 패턴을 추가하여 밋밋함 해소

## 적용 대상
콘텐츠 슬라이드만 (배경 패턴 O):
- toc, content, cards, chart, comparison, summary, twoColumn, flowSteps

적용하지 않음 (배경 패턴 X):
- cover, divider, closing, quote (이미 장식 있거나 중앙 집중 디자인)

---

## 구현 1: BackgroundPattern 컴포넌트 생성

파일: src/components/ui/BackgroundPattern.tsx

```tsx
"use client"

interface BackgroundPatternProps {
  readonly pattern?: 'crosshatch' | 'none'
  readonly opacity?: number
  readonly color?: string
}

export function BackgroundPattern({ 
  pattern = 'crosshatch',
  opacity = 3,
  color = '#94A3B8'
}: BackgroundPatternProps) {
  if (pattern === 'none') return null

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: opacity / 100 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="crosshatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0L8 8M8 0L0 8"
            stroke={color}
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#crosshatch)" />
    </svg>
  )
}
```

---

## 구현 2: SlideWrapper에 showPattern prop 추가

파일: src/components/SlideWrapper.tsx

변경 사항:
1. BackgroundPattern import 추가
2. showPattern prop 추가 (기본값 false)
3. relative 클래스 추가
4. 패턴 컴포넌트 렌더링

```tsx
"use client"

import { ReactNode } from "react"
import { BackgroundPattern } from "@/components/ui/BackgroundPattern"

interface SlideWrapperProps {
  readonly children: ReactNode
  readonly fullHeight?: boolean
  readonly showPattern?: boolean  // 새로 추가
  readonly className?: string
}

export function SlideWrapper({ 
  children, 
  fullHeight = false, 
  showPattern = false,  // 새로 추가
  className = "" 
}: SlideWrapperProps) {
  return (
    <div
      className={`
        relative
        flex flex-col justify-center items-center
        h-full w-full
        px-4 md:px-6 lg:px-8
        overflow-auto
        ${className}
      `}
    >
      {showPattern && <BackgroundPattern opacity={3} />}
      <div
        className={`
          relative z-10
          w-full max-w-4xl mx-auto
          ${fullHeight ? "flex flex-col justify-center flex-1" : ""}
        `}
      >
        {children}
      </div>
    </div>
  )
}
```

---

## 구현 3: SlideRenderer에서 타입별 패턴 적용

파일: src/components/slide-renderers.tsx

SlideRenderer 함수에서 콘텐츠 타입에만 showPattern={true} 추가:

패턴 적용 O:
- toc: <SlideWrapper showPattern>
- content: <SlideWrapper showPattern>
- cards: <SlideWrapper showPattern>
- chart: <SlideWrapper showPattern>
- comparison: <SlideWrapper showPattern>
- summary: <SlideWrapper showPattern>
- twoColumn: <SlideWrapper showPattern>
- flowSteps: <SlideWrapper showPattern>

패턴 적용 X (그대로 유지):
- cover: <SlideWrapper fullHeight>
- divider: <SlideWrapper fullHeight>
- closing: <SlideWrapper fullHeight>
- quote: <SlideWrapper fullHeight>

---

## 수정 순서
1. src/components/ui/BackgroundPattern.tsx 생성
2. src/components/SlideWrapper.tsx 수정
3. src/components/slide-renderers.tsx 수정 (SlideRenderer 함수)

## 패턴 스펙
- 패턴: Cross Hatch (빗금)
- 크기: 8x8px 반복
- 선 두께: 0.5px
- 색상: #94A3B8 (Gray)
- 투명도: 3%

## 향후 조정
투명도가 너무 연하면 opacity를 5 또는 7로 올려볼 것
