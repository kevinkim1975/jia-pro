import { TrendingUp, Target, Lightbulb } from "lucide-react"
import { SlideHeader } from "./shared/SlideHeader"
import { SlideBottomMessage } from "./shared/SlideBottomMessage"

interface ContentSlideProps {
  readonly title: string
  readonly content: string
  readonly bullets?: readonly string[]
  readonly emphasis?: string
  readonly tone?: "positive" | "negative" | "neutral"
}

const toneConfig = {
  positive: {
    accent: "#059669",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    icon: TrendingUp,
    badge: "▲ 긍정",
  },
  negative: {
    accent: "#DC2626",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: Target,
    badge: "▼ 주의",
  },
  neutral: {
    accent: "#004B8D",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-[#004B8D]",
    icon: Lightbulb,
    badge: null,
  },
} as const


function BulletTimeline({
  bullets,
  tone,
}: {
  bullets: readonly string[]
  tone: "positive" | "negative" | "neutral"
}) {
  const config = toneConfig[tone]

  return (
    <div className="relative pl-6">
      {/* Vertical timeline line — spans from first node center to last node center */}
      {bullets.length > 1 && (
        <div
          className="absolute left-[5px] w-0.5"
          style={{
            backgroundColor: config.accent,
            top: "6px",
            bottom: `calc(${(bullets.length - 1) * 0}px + 6px)`,
            height: `calc(100% - 12px)`,
            opacity: 0.3,
          }}
        />
      )}

      <div className="flex flex-col gap-4">
        {bullets.map((bullet, index) => (
          <div key={index} className="relative flex items-start gap-4">
            {/* Timeline node */}
            <div
              className="absolute -left-6 top-[14px] w-3 h-3 border-2 bg-white shrink-0 z-10"
              style={{ borderColor: config.accent }}
            />

            {/* Bullet card */}
            <div className="flex-1 bg-white p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <span
                  className={`text-xs font-bold ${config.text} mt-0.5 shrink-0`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-gray-700 leading-relaxed">
                  {bullet}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ContentSlide({
  title,
  content,
  bullets,
  emphasis,
  tone = "neutral",
}: ContentSlideProps) {
  const hasBullets = bullets && bullets.length > 0
  const hasContent = content !== ""
  const hasEmphasis = !!emphasis
  const ToneIcon = toneConfig[tone].icon

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        backgroundColor: "#F8FAFC",
        fontFamily:
          "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="flex-1 flex flex-col justify-center px-16 py-12">
        {/* Header */}
        <div className="flex items-start justify-between">
          <SlideHeader title={title} />
          {toneConfig[tone].badge && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${toneConfig[tone].bg} ${toneConfig[tone].text}`}>
              {toneConfig[tone].badge}
            </span>
          )}
        </div>

        {/* Body text */}
        {hasContent && (
          <p className="text-lg text-gray-500 font-medium mt-3">{content}</p>
        )}

        {/* Bullets timeline — mt-8 (32px) from subtitle to first bullet, gap-4 (16px) between bullets */}
        {hasBullets && (
          <div className="mt-8">
            <BulletTimeline bullets={bullets} tone={tone} />
          </div>
        )}

        {/* Bottom message — mt-8 (32px) = exactly 2x the bullet gap-4 (16px) */}
        {hasEmphasis && (
          <div className="mt-8">
            <SlideBottomMessage icon={<ToneIcon className="w-6 h-6 text-[#004B8D] flex-shrink-0 mt-0.5" />}>
              {emphasis}
            </SlideBottomMessage>
          </div>
        )}
      </div>
    </div>
  )
}
