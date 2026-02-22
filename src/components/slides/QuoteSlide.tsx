/**
 * QuoteSlide — 중앙 메시지 박스 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: bg-decoration → Card → quote-open → message → subMessage? → quote-close
 * 배경: SLIDE_TOKEN_MAP.quote.bg (primary 계열, SlideWrapper가 처리)
 * 정렬: 항상 center
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - message: string (메인 메시지)
 *   - subMessage?: string (보조 설명)
 *
 * 고정 (절대 불변):
 *   - Card 래핑 (border-2, backdrop-blur)
 *   - 인용부호 장식 (6xl, serif)
 *   - 배경 blur 장식 원 2개
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * Card: "p-12 border-2 border-[#004B8D]/20 bg-white/80 backdrop-blur-sm shadow-lg"
 * 메시지: "text-2xl md:text-3xl lg:text-4xl font-bold text-[#004B8D]"
 * 서브: "text-lg md:text-xl text-gray-600 whitespace-pre-line"
 * 인용부호: "text-6xl text-[#004B8D]/20 font-serif"
 */

import { Card } from "@/components/ui/card"

interface QuoteSlideProps {
  readonly message: string
  readonly subMessage?: string
}

export function QuoteSlide({ message, subMessage }: QuoteSlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#004B8D]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#48A9C5]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <Card className="p-12 border-2 border-[#004B8D]/20 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="space-y-6">
            <div className="text-6xl text-[#004B8D]/20 font-serif leading-none">&ldquo;</div>

            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#004B8D] leading-relaxed">
              {message}
            </p>

            {subMessage && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed pt-4 text-left whitespace-pre-line">
                {subMessage}
              </p>
            )}

            <div className="text-6xl text-[#004B8D]/20 font-serif leading-none rotate-180">&ldquo;</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
