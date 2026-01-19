"use client"

import { ReactNode } from "react"

interface SlideWrapperProps {
  readonly children: ReactNode
  /** 전체 화면 높이 사용 여부 (Cover, Divider, Quote, Closing 등) */
  readonly fullHeight?: boolean
  /** 추가 className */
  readonly className?: string
}

/**
 * SlideWrapper - 모든 슬라이드 콘텐츠의 수직 중앙 정렬 래퍼
 *
 * 특징:
 * - 뷰포트 높이에서 헤더/푸터 높이(244px)를 뺀 영역 내에서 콘텐츠 중앙 정렬
 * - fullHeight=true: 전체 높이 사용 (Cover, Divider 등 중앙 정렬 슬라이드)
 * - fullHeight=false: 콘텐츠 높이에 맞춤 + 중앙 정렬
 * - max-w-4xl (896px)로 콘텐츠 너비 제한
 */
export function SlideWrapper({ children, fullHeight = false, className = "" }: SlideWrapperProps) {
  // 헤더 114px + 푸터 130px = 244px
  return (
    <div
      className={`
        flex flex-col justify-center items-center
        min-h-[calc(100vh-244px)]
        w-full
        px-6 md:px-8 lg:px-12
        py-8
        ${className}
      `}
    >
      <div
        className={`
          w-full max-w-4xl mx-auto
          ${fullHeight ? "flex flex-col justify-center flex-1" : ""}
        `}
      >
        {children}
      </div>
    </div>
  )
}
