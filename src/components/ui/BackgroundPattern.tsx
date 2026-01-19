"use client"

interface BackgroundPatternProps {
  readonly pattern?: 'crosshatch' | 'dots' | 'radial' | 'none'
  readonly opacity?: number
  readonly color?: string
}

/**
 * BackgroundPattern - 슬라이드 배경 패턴 컴포넌트
 * 
 * Boris Cherny 타입 안전성 원칙 적용:
 * - readonly props로 불변성 보장
 * - 리터럴 타입으로 패턴 종류 제한
 * 
 * 가시성 조정 (2025-01-19):
 * - opacity: 3% → 8% (은은하지만 인식 가능)
 * - strokeWidth: 0.5px → 0.8px (선명도 향상)
 * - 패턴 크기: 8px → 20px (덜 촘촘하게)
 */
export function BackgroundPattern({
  pattern = 'crosshatch',
  opacity = 7,
  color = '#94A3B8'
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
            <stop offset="0%" stopColor={color} stopOpacity="0.07" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#radial-pattern)" />
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
