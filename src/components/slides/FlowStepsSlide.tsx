/**
 * FlowStepsSlide — 단계별 플로우 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: header → flow-steps(card×N + arrow×(N-1)) → bottom-message?
 * 배경: SLIDE_TOKEN_MAP.flowSteps.bg (surfaceVariant 계열)
 * 정렬: left header, center flow
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - title: string
 *   - steps: { step, title, description? }[]
 *   - bottomMessage?: string
 *
 * 고정 (절대 불변):
 *   - 스텝 카드 간 ArrowRight 연결
 *   - 스텝 번호 gradient box (from-[#004B8D] to-[#48A9C5])
 *   - 스텝 카드 min-w-[180px]
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 스텝 카드: "border-2 border-[#004B8D]/20 bg-gradient-to-br from-[#004B8D]/5 to-[#48A9C5]/5 min-w-[180px]"
 * 스텝 번호: "w-12 h-12 rounded-xl bg-gradient-to-br from-[#004B8D] to-[#48A9C5] text-white"
 * 화살표: "w-8 h-8 text-[#48A9C5]"
 */

import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { SlideHeader } from "./shared/SlideHeader"
import { SlideBottomMessage } from "./shared/SlideBottomMessage"

interface FlowStepsSlideProps {
  readonly title: string
  readonly steps: readonly {
    readonly step: number
    readonly title: string
    readonly description?: string
  }[]
  readonly bottomMessage?: string
}

export function FlowStepsSlide({ title, steps, bottomMessage }: FlowStepsSlideProps) {
  return (
    <div className="space-y-8">
      <SlideHeader title={title} />

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 py-8">
        {steps.map((step, index) => (
          <div key={step.step} className="flex items-center">
            <Card className="p-6 border-2 border-[#004B8D]/20 bg-gradient-to-br from-[#004B8D]/5 to-[#48A9C5]/5 shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[180px]">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#004B8D] to-[#48A9C5] text-white font-bold text-xl flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-[#004B8D]">{step.title}</h3>
                {step.description && (
                  <p className="text-sm text-gray-600">{step.description}</p>
                )}
              </div>
            </Card>

            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center px-2">
                <ArrowRight className="w-8 h-8 text-[#48A9C5]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {bottomMessage && (
        <SlideBottomMessage>{bottomMessage}</SlideBottomMessage>
      )}
    </div>
  )
}
