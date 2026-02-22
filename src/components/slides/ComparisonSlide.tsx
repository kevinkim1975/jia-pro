/**
 * ComparisonSlide — Before/After 비교 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: header(center) → quote? → grid(2col: before | after) → arrow-badge
 * 배경: SLIDE_TOKEN_MAP.comparison.bg (surface 계열)
 * 정렬: center header, 2열 대비
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - title: string
 *   - quote?: string (인용구)
 *   - before: { label, items[] }
 *   - after: { label, items[] }
 *
 * 고정 (절대 불변):
 *   - Before 카드 → gray 톤 (좌측)
 *   - After 카드 → primary gradient 톤 (우측)
 *   - After 아이템 → CheckCircle2 아이콘
 *   - "변화의 핵심" 하단 뱃지
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * Before 카드: "border-2 border-gray-200 bg-gray-50/50"
 * After 카드: "border-2 border-[#004B8D]/30 bg-gradient-to-br from-[#004B8D]/5 to-[#48A9C5]/5"
 * 하단 뱃지: "px-6 py-3 rounded-full bg-[#10B981]/10 text-[#10B981]"
 */

import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { SlideHeader } from "./shared/SlideHeader"

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

export function ComparisonSlide({ title, quote, before, after }: ComparisonSlideProps) {
  return (
    <div className="space-y-8">
      <SlideHeader title={title} align="center" />

      {quote && (
        <p className="text-center text-lg italic text-gray-600 mb-8">
          &ldquo;{quote}&rdquo;
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Before */}
        <Card className="p-6 border-2 border-gray-200 bg-gray-50/50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-gray-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h3 className="text-xl font-bold text-gray-500">
                {before.label}
              </h3>
            </div>
            <ul className="space-y-3">
              {before.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-gray-400" />
                  <span className="text-gray-500 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* After */}
        <Card className="p-6 border-2 border-[#004B8D]/30 bg-gradient-to-br from-[#004B8D]/5 to-[#48A9C5]/5 shadow-sm hover:shadow-lg transition-shadow duration-200">
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-[#004B8D]/20">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#004B8D] to-[#48A9C5] flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h3 className="text-xl font-bold text-[#004B8D]">
                {after.label}
              </h3>
            </div>
            <ul className="space-y-3">
              {after.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-0.5 text-[#10B981]" />
                  <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="hidden md:flex justify-center">
        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#10B981]/10 text-[#10B981]">
          <span className="font-semibold">변화의 핵심</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
