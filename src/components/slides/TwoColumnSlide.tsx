/**
 * TwoColumnSlide — 두 개의 정보 박스 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: header → grid(2col: left | right) → bottom-message?
 * 배경: SLIDE_TOKEN_MAP.twoColumn.bg (surface 계열)
 * 정렬: left header, 2열 대칭
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - title: string
 *   - left: { title, items[], highlight? }
 *   - right: { title, items[], highlight? }
 *   - bottomMessage?: string
 *
 * 고정 (절대 불변):
 *   - 좌측 카드 → primary 톤 (border-[#004B8D]/20, bg-[#004B8D]/5)
 *   - 우측 카드 → secondary 톤 (border-[#48A9C5]/20, bg-[#48A9C5]/5)
 *   - 2열 그리드 (md:grid-cols-2)
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 좌측 카드: "border-2 border-[#004B8D]/20 bg-[#004B8D]/5"
 * 우측 카드: "border-2 border-[#48A9C5]/20 bg-[#48A9C5]/5"
 * 좌측 제목: "text-xl font-bold text-[#004B8D]"
 * 우측 제목: "text-xl font-bold text-[#48A9C5]"
 */

import { Card } from "@/components/ui/card"
import { SlideHeader } from "./shared/SlideHeader"
import { SlideBottomMessage } from "./shared/SlideBottomMessage"

interface TwoColumnSlideProps {
  readonly title: string
  readonly left: {
    readonly title: string
    readonly items: readonly string[]
    readonly highlight?: string
  }
  readonly right: {
    readonly title: string
    readonly items: readonly string[]
    readonly highlight?: string
  }
  readonly bottomMessage?: string
}

export function TwoColumnSlide({ title, left, right, bottomMessage }: TwoColumnSlideProps) {
  return (
    <div className="space-y-8">
      <SlideHeader title={title} />

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-2 border-[#004B8D]/20 bg-[#004B8D]/5 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#004B8D] pb-3 border-b border-[#004B8D]/20">
              {left.title}
            </h3>
            {left.highlight && (
              <div className="text-3xl font-bold text-[#004B8D]">{left.highlight}</div>
            )}
            <ul className="space-y-3">
              {left.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-[#004B8D]" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-6 border-2 border-[#48A9C5]/20 bg-[#48A9C5]/5 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#48A9C5] pb-3 border-b border-[#48A9C5]/20">
              {right.title}
            </h3>
            {right.highlight && (
              <div className="text-3xl font-bold text-[#48A9C5]">{right.highlight}</div>
            )}
            <ul className="space-y-3">
              {right.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-[#48A9C5]" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {bottomMessage && (
        <SlideBottomMessage>{bottomMessage}</SlideBottomMessage>
      )}
    </div>
  )
}
