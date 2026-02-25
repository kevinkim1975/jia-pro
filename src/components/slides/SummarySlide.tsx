import { SlideHeader } from "./shared/SlideHeader"
import { currentTheme } from "../../../config/theme"

const t = currentTheme

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

interface SummarySlideProps {
  readonly title: string
  readonly keyPoints: readonly string[]
  readonly nextSteps?: readonly string[]
}

function interpolateColor(
  start: [number, number, number],
  end: [number, number, number],
  f: number
): string {
  const r = Math.round(start[0] + (end[0] - start[0]) * f)
  const g = Math.round(start[1] + (end[1] - start[1]) * f)
  const b = Math.round(start[2] + (end[2] - start[2]) * f)
  return `rgb(${r}, ${g}, ${b})`
}

export function SummarySlide({ title, keyPoints, nextSteps }: SummarySlideProps) {
  const primaryRGB = hexToRgb(t.colors.primary)
  const accentRGB = hexToRgb(t.colors.secondary)

  const hasNextSteps = nextSteps && nextSteps.length > 0

  return (
    <div
      style={{
        width: 1280,
        height: 720,
        fontFamily: t.typography.fontFamily,
        backgroundColor: t.colors.neutral[50],
      }}
      className="flex flex-col"
    >
      {/* Content area — vertically centered */}
      <div className="flex-1 px-16 flex flex-col justify-center">
        {/* Header */}
        <div style={{ paddingLeft: 50 }}>
          <SlideHeader title={title} align="left" />
        </div>

        <div className="mt-8">
          {hasNextSteps ? (
            /* Asymmetric grid: 65% keyPoints / 35% nextSteps */
            <div className="flex gap-[28px] items-center">
              {/* Left — Key Points (65%) */}
              <div className="flex-none" style={{ width: "65%", paddingLeft: 50 }}>
                <KeyPointsSection keyPoints={keyPoints} primaryRGB={primaryRGB} accentRGB={accentRGB} />
              </div>

              {/* Right — Next Steps (35%) */}
              <div
                className="flex-none pl-8"
                style={{ width: "35%", borderLeft: `1px solid ${t.colors.border}` }}
              >
                <NextStepsSection nextSteps={nextSteps} />
              </div>
            </div>
          ) : (
            /* Full width keyPoints when no nextSteps */
            <div className="max-w-3xl" style={{ paddingLeft: 50 }}>
              <KeyPointsSection keyPoints={keyPoints} primaryRGB={primaryRGB} accentRGB={accentRGB} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function KeyPointsSection({
  keyPoints,
  primaryRGB,
  accentRGB,
}: {
  keyPoints: readonly string[]
  primaryRGB: [number, number, number]
  accentRGB: [number, number, number]
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(0, 75, 141, 0.6)" }}>
        핵심 요약
      </p>
      <div className="mt-6 space-y-5">
        {keyPoints.map((point, i) => {
          const f = keyPoints.length > 1 ? i / (keyPoints.length - 1) : 0
          const barColor = interpolateColor(primaryRGB, accentRGB, f)
          const pointNum = String(i + 1).padStart(2, "0")

          return (
            <div key={i} className="flex">
              {/* Accent bar */}
              <div
                className="flex-none w-1 rounded-full self-stretch"
                style={{ backgroundColor: barColor }}
              />
              {/* Content */}
              <div className="pl-4">
                <p className="text-xs font-bold" style={{ color: "rgba(0, 75, 141, 0.4)" }}>
                  POINT {pointNum}
                </p>
                <p className="text-base leading-relaxed mt-1" style={{ color: t.colors.textDark }}>
                  {point}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NextStepsSection({ nextSteps }: { nextSteps: readonly string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(16, 185, 129, 0.6)" }}>
        Next Steps
      </p>
      <div className="mt-6 space-y-4">
        {nextSteps.map((step, i) => (
          <div key={i} className="flex items-start">
            {/* Number circle */}
            <div
              className="flex-none w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
            >
              <span className="text-xs font-bold" style={{ color: t.colors.accent }}>
                {i + 1}
              </span>
            </div>
            {/* Text */}
            <p className="text-sm leading-snug ml-3" style={{ color: t.colors.textBody }}>
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
