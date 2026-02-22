/**
 * SummarySlide — 핵심 요약 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: badge-header → grid(keyPoints | nextSteps?)
 * 배경: SLIDE_TOKEN_MAP.summary.bg (surfaceVariant 계열)
 * 정렬: center header
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - title: string
 *   - keyPoints: string[]
 *   - nextSteps?: string[]
 *
 * 고정 (절대 불변):
 *   - "Summary" 뱃지 + Target 아이콘
 *   - keyPoints 카드 → primary gradient icon
 *   - nextSteps 카드 → emerald gradient icon
 *   - 넘버링 배치
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 뱃지: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004B8D]/10"
 * keyPoints 카드: "border-2 border-[#004B8D]/20 bg-gradient-to-br from-[#004B8D]/5"
 * nextSteps 카드: "border-2 border-[#10B981]/20 bg-gradient-to-br from-[#10B981]/5"
 */

import { Card } from "@/components/ui/card"
import { Target, Lightbulb, ArrowRight } from "lucide-react"

interface SummarySlideProps {
  readonly title: string
  readonly keyPoints: readonly string[]
  readonly nextSteps?: readonly string[]
}

export function SummarySlide({ title, keyPoints, nextSteps }: SummarySlideProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004B8D]/10">
          <Target className="w-4 h-4 text-[#004B8D]" />
          <span className="text-sm font-semibold text-[#004B8D] uppercase tracking-wider">Summary</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

      <div className={`grid gap-6 ${nextSteps && nextSteps.length > 0 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
        <Card className="p-6 border-2 border-[#004B8D]/20 bg-gradient-to-br from-[#004B8D]/5 to-transparent shadow-sm">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#004B8D] to-[#48A9C5] flex items-center justify-center shadow-md">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#004B8D]">핵심 요약</h3>
            </div>
            <ul className="space-y-4">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#004B8D] text-white text-sm font-bold flex items-center justify-center shadow-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed pt-0.5">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {nextSteps && nextSteps.length > 0 && (
          <Card className="p-6 border-2 border-[#10B981]/20 bg-gradient-to-br from-[#10B981]/5 to-transparent shadow-sm">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#48A9C5] flex items-center justify-center shadow-md">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#10B981]">Next Steps</h3>
              </div>
              <ul className="space-y-4">
                {nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#10B981] text-white text-sm font-bold flex items-center justify-center shadow-sm">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
