import { SlideBottomMessage } from "./shared/SlideBottomMessage"
import { currentTheme } from "../../../config/theme"

const t = currentTheme

interface FlowStepsSlideProps {
  readonly title: string
  readonly steps: readonly {
    readonly step: number
    readonly title: string
    readonly description?: string
  }[]
  readonly bottomMessage?: string
}

function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const r1 = parseInt(color1.slice(1, 3), 16)
  const g1 = parseInt(color1.slice(3, 5), 16)
  const b1 = parseInt(color1.slice(5, 7), 16)
  const r2 = parseInt(color2.slice(1, 3), 16)
  const g2 = parseInt(color2.slice(3, 5), 16)
  const b2 = parseInt(color2.slice(5, 7), 16)

  const r = Math.round(r1 + (r2 - r1) * factor)
  const g = Math.round(g1 + (g2 - g1) * factor)
  const b = Math.round(b1 + (b2 - b1) * factor)

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

function getAccentColor(index: number, total: number): string {
  if (total <= 1) return t.colors.primary
  const factor = index / (total - 1)
  return interpolateColor(t.colors.primary, t.colors.secondary, factor)
}

function getGridClass(count: number): string {
  switch (count) {
    case 2:
      return "grid-cols-2"
    case 3:
      return "grid-cols-3"
    case 4:
      return "grid-cols-4"
    case 5:
      return "grid-cols-5"
    default:
      return "grid-cols-4"
  }
}

export function FlowStepsSlide({
  title,
  steps,
  bottomMessage,
}: FlowStepsSlideProps) {
  return (
    <div
      style={{
        width: "1280px",
        height: "720px",
        backgroundColor: t.colors.neutral[50],
        fontFamily: t.typography.fontFamily,
        padding: "0 64px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 800,
          color: t.colors.primary,
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        {title}
      </h1>

      <div
        className={`grid ${getGridClass(steps.length)} gap-8 items-start`}
        style={{ marginTop: "32px" }}
      >
        {steps.map((step, index) => (
          <div key={step.step} className="flex flex-col items-start relative">
            <div
              style={{
                width: "40px",
                height: "3px",
                backgroundColor: getAccentColor(index, steps.length),
              }}
            />
            <div
              style={{
                fontSize: "48px",
                fontWeight: 900,
                color: t.colors.primary,
                opacity: 0.2,
                lineHeight: 1,
                marginTop: "12px",
              }}
            >
              {String(step.step).padStart(2, "0")}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: t.colors.textDark,
                lineHeight: 1.4,
                marginTop: "8px",
              }}
            >
              {step.title}
            </div>
            {step.description && (
              <div
                style={{
                  fontSize: "14px",
                  color: t.colors.textMuted,
                  lineHeight: 1.5,
                  marginTop: "4px",
                }}
              >
                {step.description}
              </div>
            )}
            {index < steps.length - 1 && (
              <div
                className="absolute top-0 right-0"
                style={{
                  width: "1px",
                  height: "80%",
                  backgroundColor: t.colors.border,
                  transform: "translateX(16px)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {bottomMessage && (
        <div style={{ marginTop: "32px" }} className="[&>div]:rounded-none">
          <SlideBottomMessage>{bottomMessage}</SlideBottomMessage>
        </div>
      )}
    </div>
  )
}
