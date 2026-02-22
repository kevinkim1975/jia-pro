"use client"

import dynamic from "next/dynamic"
import type { SlideContent } from "@/types/proposal"

// ── Individual slide imports ──────────────────
import { CoverSlide } from "./CoverSlide"
import { TocSlide } from "./TocSlide"
import { DividerSlide } from "./DividerSlide"
import { ContentSlide } from "./ContentSlide"
import { CardsSlide } from "./CardsSlide"
import { ComparisonSlide } from "./ComparisonSlide"
import { SummarySlide } from "./SummarySlide"
import { ClosingSlide } from "./ClosingSlide"
import { TwoColumnSlide } from "./TwoColumnSlide"
import { QuoteSlide } from "./QuoteSlide"
import { FlowStepsSlide } from "./FlowStepsSlide"

// ChartSlide 동적 로딩 (recharts 번들 분리 - Vercel best practice)
const ChartSlideComponent = dynamic(
  () => import("./ChartSlide").then(mod => ({ default: mod.ChartSlide })),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">차트 로딩 중...</div>
      </div>
    ),
    ssr: false,
  }
)

// ── SlideRenderer ─────────────────────────────
interface SlideRendererProps {
  readonly content: SlideContent
  readonly onNavigate?: (page: number) => void
}

export function SlideRenderer({ content, onNavigate }: SlideRendererProps) {
  switch (content.type) {
    case "cover":
      return (
        <CoverSlide
          title={content.title}
          subtitle={content.subtitle}
          date={content.date}
          company={content.company}
        />
      )

    case "toc":
      return (
        <TocSlide
          items={content.items}
          onNavigate={onNavigate}
        />
      )

    case "divider":
      return (
        <DividerSlide
          act={content.act}
          title={content.title}
          subtitle={content.subtitle}
        />
      )

    case "content":
      return (
        <ContentSlide
          title={content.title}
          content={content.content}
          bullets={content.bullets}
          emphasis={content.emphasis}
          tone={content.tone}
        />
      )

    case "cards":
      return (
        <CardsSlide
          title={content.title}
          cards={content.cards}
          bottomMessage={content.bottomMessage}
          tone={content.tone}
        />
      )

    case "chart":
      return (
        <ChartSlideComponent
          title={content.title}
          chart={content.chart}
          highlight={content.highlight}
          description={content.description}
        />
      )

    case "comparison":
      return (
        <ComparisonSlide
          title={content.title}
          quote={content.quote}
          before={content.before}
          after={content.after}
        />
      )

    case "summary":
      return (
        <SummarySlide
          title={content.title}
          keyPoints={content.keyPoints}
          nextSteps={content.nextSteps}
        />
      )

    case "closing":
      return (
        <ClosingSlide
          title={content.title}
          subtitle={content.subtitle}
          contact={content.contact}
          company={content.company}
        />
      )

    case "twoColumn":
      return (
        <TwoColumnSlide
          title={content.title}
          left={content.left}
          right={content.right}
          bottomMessage={content.bottomMessage}
        />
      )

    case "quote":
      return (
        <QuoteSlide
          message={content.message}
          subMessage={content.subMessage}
        />
      )

    case "flowSteps":
      return (
        <FlowStepsSlide
          title={content.title}
          steps={content.steps}
          bottomMessage={content.bottomMessage}
        />
      )

    default:
      return (
        <div className="flex items-center justify-center min-h-[400px] text-center text-gray-500">
          <div className="space-y-2">
            <p className="text-lg">지원하지 않는 슬라이드 타입입니다.</p>
            <p className="text-sm text-gray-400">관리자에게 문의해주세요.</p>
          </div>
        </div>
      )
  }
}

// ── Re-exports ────────────────────────────────
export { CoverSlide } from "./CoverSlide"
export { TocSlide } from "./TocSlide"
export { DividerSlide } from "./DividerSlide"
export { ContentSlide } from "./ContentSlide"
export { CardsSlide } from "./CardsSlide"
export { ComparisonSlide } from "./ComparisonSlide"
export { SummarySlide } from "./SummarySlide"
export { ClosingSlide } from "./ClosingSlide"
export { TwoColumnSlide } from "./TwoColumnSlide"
export { QuoteSlide } from "./QuoteSlide"
export { FlowStepsSlide } from "./FlowStepsSlide"
