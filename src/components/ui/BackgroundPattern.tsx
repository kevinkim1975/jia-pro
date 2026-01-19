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
