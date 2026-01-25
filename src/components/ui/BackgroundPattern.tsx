"use client"

import {
  primary,
  neutral,
  opacity as opacityTokens,
} from "@/tokens"

// 배경 패턴 토큰 상수
const patternTokens = {
  defaultColor: neutral.gray400,    // #94A3B8
  primaryColor: primary.DEFAULT,     // #1A5F7A
  primaryDark: primary.dark,         // #134558
  opacityLight: opacityTokens[25],   // 0.25
  opacitySubtle: 0.07,               // 7% (radial gradient)
} as const

interface BackgroundPatternProps {
  readonly pattern?: 'crosshatch' | 'dots' | 'radial' | 'concentric' | 'none'
  readonly opacity?: number
  readonly color?: string
}

/**
 * BackgroundPattern - 슬라이드 배경 패턴 컴포넌트
 *
 * Boris Cherny 타입 안전성 원칙 적용:
 * - readonly props로 불변성 보장
 * - 리터럴 타입으로 패턴 종류 제한
 * - 토큰 기반 색상 시스템 적용
 */
export function BackgroundPattern({
  pattern = 'crosshatch',
  opacity = 7,
  color = patternTokens.defaultColor,
}: BackgroundPatternProps) {
  if (pattern === 'none') return null

  if (pattern === 'dots') {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: opacity / 100 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots-pattern"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-pattern)" />
      </svg>
    )
  }

  // radial 패턴 (fullHeight 슬라이드용 - 중앙에서 퍼지는 은은한 그라데이션)
  if (pattern === 'radial') {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="radial-pattern" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor={color}
              stopOpacity={patternTokens.opacitySubtle}
            />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#radial-pattern)" />
      </svg>
    )
  }

  // concentric 패턴 (동심원 - Cover 슬라이드용)
  if (pattern === 'concentric') {
    const concentricColor = patternTokens.primaryColor
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="concentric-pattern"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="60"
              cy="60"
              r="20"
              stroke={concentricColor}
              strokeWidth="1"
              fill="none"
              opacity="0.05"
            />
            <circle
              cx="60"
              cy="60"
              r="40"
              stroke={concentricColor}
              strokeWidth="1"
              fill="none"
              opacity="0.04"
            />
            <circle
              cx="60"
              cy="60"
              r="60"
              stroke={concentricColor}
              strokeWidth="1"
              fill="none"
              opacity="0.03"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#concentric-pattern)" />
      </svg>
    )
  }

  // crosshatch 패턴 (기본)
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: opacity / 100 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="crosshatch-pattern"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0L20 20M20 0L0 20"
            stroke={color}
            strokeWidth="0.8"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#crosshatch-pattern)" />
    </svg>
  )
}

export { patternTokens }
