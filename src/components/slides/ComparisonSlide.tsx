import { CheckCircle2 } from "lucide-react"
import { SlideHeader } from "./shared/SlideHeader"
import { currentTheme } from "../../../config/theme"

const t = currentTheme

interface ComparisonSlideProps {
  readonly title: string
  readonly quote?: string
  readonly before: {
    readonly label: string
    readonly items: readonly string[]
  }
  readonly after: {
    readonly label: string
    readonly items: readonly string[]
  }
}

export function ComparisonSlide({
  title,
  quote,
  before,
  after,
}: ComparisonSlideProps) {
  const rowCount = Math.max(before.items.length, after.items.length)

  return (
    <div
      className="flex w-full flex-col items-center justify-center px-16 py-12"
      style={{
        width: 1280,
        height: 720,
        fontFamily: t.typography.fontFamily,
        backgroundColor: t.colors.neutral[50],
      }}
    >
      {/* Header */}
      <SlideHeader title={title} align="center" />

      {/* Quote (optional) */}
      {quote && (
        <p className="mb-8 text-center text-base italic" style={{ color: t.colors.textMuted }}>
          <span style={{ color: t.colors.secondary }}>{'" '}</span>
          {quote}
          <span style={{ color: t.colors.secondary }}>{' "'}</span>
        </p>
      )}

      {/* Table Container */}
      <div
        className={`w-full max-w-4xl overflow-hidden border bg-white shadow-sm ${!quote ? 'mt-10' : ''}`}
        style={{ borderColor: t.colors.border }}
      >
        {/* Header Row */}
        <div className="grid grid-cols-2">
          <div
            className="px-6 py-4 text-lg font-semibold"
            style={{
              color: t.colors.textLight,
              backgroundColor: "rgba(243, 244, 246, 0.5)",
            }}
          >
            {before.label}
          </div>
          <div
            className="px-6 py-4 text-lg font-semibold"
            style={{
              color: t.colors.primary,
              backgroundColor: "rgba(0, 75, 141, 0.05)",
              borderLeft: `2px solid ${t.colors.border}`,
            }}
          >
            {after.label}
          </div>
        </div>

        {/* Item Rows */}
        {Array.from({ length: rowCount }).map((_, i) => {
          const beforeItem = before.items[i]
          const afterItem = after.items[i]
          const isLast = i === rowCount - 1

          return (
            <div
              key={i}
              className="grid grid-cols-2"
              style={{
                borderTop: `1px solid ${t.colors.neutral[100]}`,
              }}
            >
              {/* Before Cell */}
              <div className="flex items-center gap-3 px-6 py-5">
                {beforeItem ? (
                  <>
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: t.colors.neutral[300] }}
                    />
                    <span
                      className="text-base"
                      style={{ color: t.colors.textMuted }}
                    >
                      {beforeItem}
                    </span>
                  </>
                ) : null}
              </div>

              {/* After Cell */}
              <div
                className="flex items-center gap-3 px-6 py-5"
                style={{
                  borderLeft: `2px solid ${t.colors.border}`,
                }}
              >
                {afterItem ? (
                  <>
                    <CheckCircle2
                      className="h-5 w-5 shrink-0"
                      style={{ color: t.colors.accent }}
                    />
                    <span
                      className="text-base font-medium"
                      style={{ color: t.colors.textDark }}
                    >
                      {afterItem}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
