"use client"

import { ReactNode } from "react"
import { BackgroundPattern } from "@/components/ui/BackgroundPattern"

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
}

/**
 * SlideWrapper - 모든 슬라이드 콘텐츠의 수직 중앙 정렬 래퍼
 *
 * 특징:
 * - h-full로 부모 높이 상속 (100vh - 헤더 - 푸터)
 * - fullHeight=true: 전체 높이 사용 (Cover, Divider 등 중앙 정렬 슬라이드)
 * - fullHeight=false: 콘텐츠 높이에 맞춤 + 중앙 정렬
 * - showPattern=true: 연한 빗금 배경 패턴 표시
 * - max-w-4xl (896px)로 콘텐츠 너비 제한
 * - overflow-auto로 필요시 스크롤
 */
export function SlideWrapper({
  children,
  fullHeight = false,
  showPattern = false,
  patternType = 'crosshatch',
  className = ""
}: SlideWrapperProps) {
  return (
    <div
      className={`
        relative
        flex flex-col justify-center items-center
        h-full
        w-full
        px-4 md:px-6 lg:px-8
        py-4
        overflow-auto
        ${className}
      `}
    >
      {showPattern && <BackgroundPattern pattern={patternType} />}
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
