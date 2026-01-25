"use client"

import { ReactNode, CSSProperties } from "react"
import { BackgroundPattern } from "@/components/ui/BackgroundPattern"
import {
  spacing,
  componentSpacing,
  slideCanvas,
  breakpoints,
} from "@/tokens"

// SlideWrapper 토큰 상수
const slideWrapperTokens = {
  // 패딩 (반응형)
  paddingX: {
    mobile: spacing[4],   // 16px
    tablet: spacing[6],   // 24px
    desktop: spacing[8],  // 32px
  },
  paddingY: spacing[4],   // 16px
  // 콘텐츠 영역
  maxWidth: 896,          // max-w-4xl (콘텐츠 뷰)
  slideMaxWidth: slideCanvas.contentArea.width, // 1792px (프레젠테이션 뷰)
  // 슬라이드 캔버스 참조
  slideCanvasPadding: componentSpacing.slide.padding, // 64px
} as const

// 기본 스타일 (토큰 기반)
const wrapperBaseStyle: CSSProperties = {
  paddingTop: slideWrapperTokens.paddingY,
  paddingBottom: slideWrapperTokens.paddingY,
}

const contentBaseStyle: CSSProperties = {
  maxWidth: slideWrapperTokens.maxWidth,
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
}

interface SlideWrapperProps {
  readonly children: ReactNode
  /** 전체 화면 높이 사용 여부 (Cover, Divider, Quote, Closing 등) */
  readonly fullHeight?: boolean
  /** 배경 패턴 표시 여부 (콘텐츠 슬라이드용) */
  readonly showPattern?: boolean
  /** 패턴 타입 (기본값: crosshatch) */
  readonly patternType?: 'crosshatch' | 'dots' | 'radial' | 'concentric' | 'none'
  /** 추가 className */
  readonly className?: string
  /** 추가 style */
  readonly style?: CSSProperties
}

/**
 * SlideWrapper - 모든 슬라이드 콘텐츠의 수직 중앙 정렬 래퍼
 *
 * 토큰 기반 설계:
 * - spacing 토큰으로 패딩 정의
 * - slideCanvas 토큰으로 프레젠테이션 레이아웃 참조
 * - breakpoints 토큰으로 반응형 기준점 정의
 *
 * 특징:
 * - h-full로 부모 높이 상속 (100vh - 헤더 - 푸터)
 * - fullHeight=true: 전체 높이 사용 (Cover, Divider 등 중앙 정렬 슬라이드)
 * - fullHeight=false: 콘텐츠 높이에 맞춤 + 중앙 정렬
 * - showPattern=true: 연한 빗금 배경 패턴 표시
 * - max-w: 896px (콘텐츠 뷰)
 * - overflow-auto로 필요시 스크롤
 */
export function SlideWrapper({
  children,
  fullHeight = false,
  showPattern = false,
  patternType = 'crosshatch',
  className = "",
  style,
}: SlideWrapperProps) {
  return (
    <div
      className={`
        relative
        flex flex-col justify-center items-center
        h-full
        w-full
        px-4 md:px-6 lg:px-8
        overflow-auto
        ${className}
      `}
      style={{ ...wrapperBaseStyle, ...style }}
    >
      {showPattern && <BackgroundPattern pattern={patternType} />}
      <div
        className={`
          relative z-10
          ${fullHeight ? "flex flex-col justify-center flex-1" : ""}
        `}
        style={contentBaseStyle}
      >
        {children}
      </div>
    </div>
  )
}

export { slideWrapperTokens }
