/**
 * CardsSlide — 카드형 레이아웃 슬라이드 (3열)
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: header → card-grid(3col) → bottom-message
 * 배경: SLIDE_TOKEN_MAP.cards.bg (surface 계열)
 * 정렬: left header, center cards
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - title: string
 *   - cards: CardItem[] (title, subtitle?, description?)
 *   - bottomMessage?: string
 *   - tone?: 'positive' | 'negative' | 'neutral'
 *
 * 고정 (절대 불변):
 *   - 3열 그리드 (md:grid-cols-3)
 *   - 카드 gradient bg (tone에 의해 결정)
 *   - hover:-translate-y-1 효과
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 그리드: "grid md:grid-cols-3 gap-6"
 * 카드(positive): "bg-gradient-to-br from-[#004B8D] to-[#48A9C5] text-white p-8"
 * 카드 제목: "text-4xl font-bold"
 * 하단 메시지: "text-2xl font-semibold italic"
 */

import { Card } from "@/components/ui/card"
import { SlideHeader } from "./shared/SlideHeader"

interface CardItemProps {
  readonly title: string
  readonly subtitle?: string
  readonly description?: string
}

interface CardsSlideProps {
  readonly title: string
  readonly cards: readonly CardItemProps[]
  readonly bottomMessage?: string
  readonly tone?: 'positive' | 'negative' | 'neutral'
}

export function CardsSlide({ title, cards, bottomMessage, tone = 'positive' }: CardsSlideProps) {
  const toneConfig = {
    positive: {
      cardBg: "bg-gradient-to-br from-[#004B8D] to-[#48A9C5]",
      textColor: "text-white",
      messageColor: "text-[#004B8D]"
    },
    negative: {
      cardBg: "bg-gradient-to-br from-red-500 to-red-400",
      textColor: "text-white",
      messageColor: "text-red-600"
    },
    neutral: {
      cardBg: "bg-gradient-to-br from-gray-600 to-gray-500",
      textColor: "text-white",
      messageColor: "text-gray-700"
    }
  }

  const config = toneConfig[tone]

  return (
    <div className="space-y-12">
      <SlideHeader title={title} />

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`${config.cardBg} ${config.textColor} p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="text-center space-y-3">
              <h3 className="text-4xl font-bold">{card.title}</h3>
              {card.subtitle && (
                <p className="text-xl font-medium opacity-90">{card.subtitle}</p>
              )}
              {card.description && (
                <p className="text-sm opacity-75 pt-2 border-t border-white/20">
                  {card.description}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {bottomMessage && (
        <div className="text-center pt-8">
          <p className={`text-2xl font-semibold ${config.messageColor} italic`}>
            {bottomMessage}
          </p>
        </div>
      )}
    </div>
  )
}
