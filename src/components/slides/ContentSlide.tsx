/**
 * ContentSlide — 일반 콘텐츠 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: header → body-text → bullets(Card) → emphasis
 * 배경: SLIDE_TOKEN_MAP.content.bg (surface 계열)
 * 정렬: left
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - title: string
 *   - content: string (본문)
 *   - bullets?: string[] (넘버링 리스트)
 *   - emphasis?: string (하단 강조 문구)
 *   - tone?: 'positive' | 'negative' | 'neutral'
 *
 * 고정 (절대 불변):
 *   - SlideHeader accent-bar 패턴
 *   - bullets는 Card 안에 넘버링 배치
 *   - emphasis는 SlideBottomMessage + Lightbulb icon
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 본문: "text-lg md:text-xl leading-relaxed text-gray-600"
 * 넘버링: "w-7 h-7 rounded-lg text-white text-sm font-bold" + tone accent color
 * 불릿 텍스트: "text-lg text-gray-700 leading-relaxed"
 */

import { Card } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Target } from "lucide-react"
import { SlideHeader } from "./shared/SlideHeader"
import { SlideBottomMessage } from "./shared/SlideBottomMessage"

interface ContentSlideProps {
  readonly title: string
  readonly content: string
  readonly bullets?: readonly string[]
  readonly emphasis?: string
  readonly tone?: "positive" | "negative" | "neutral"
}

export function ContentSlide({ title, content, bullets, emphasis, tone = "neutral" }: ContentSlideProps) {
  const toneConfig = {
    positive: {
      accent: "#10B981",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: <TrendingUp className="w-5 h-5" />
    },
    negative: {
      accent: "#EF4444",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: <Target className="w-5 h-5" />
    },
    neutral: {
      accent: "#004B8D",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-[#004B8D]",
      icon: <Lightbulb className="w-5 h-5" />
    }
  }

  const config = toneConfig[tone]

  return (
    <div className="space-y-8">
      <SlideHeader title={title} />

      <p className="text-lg md:text-xl leading-relaxed text-gray-600">
        {content}
      </p>

      {bullets && bullets.length > 0 && (
        <Card className={`p-6 ${config.bg} ${config.border} border-2 shadow-sm`}>
          <ul className="space-y-4">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm"
                  style={{ backgroundColor: config.accent }}
                >
                  {index + 1}
                </span>
                <span className="text-lg text-gray-700 leading-relaxed pt-0.5">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {emphasis && (
        <SlideBottomMessage icon={<Lightbulb className="w-6 h-6 text-[#004B8D] flex-shrink-0 mt-0.5" />}>
          {emphasis}
        </SlideBottomMessage>
      )}
    </div>
  )
}
