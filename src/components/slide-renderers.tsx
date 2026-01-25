"use client"

import dynamic from "next/dynamic"
import type { SlideContent } from "@/types/proposal"
import { Card } from "@/components/ui/card"
import { SlideWrapper } from "@/components/SlideWrapper"
import {
  CheckCircle2,
  ArrowRight,
  Target,
  Lightbulb,
  TrendingUp,
  ChevronRight
} from "lucide-react"

// ChartSlide 동적 로딩 (recharts 번들 분리 - Vercel best practice)
const ChartSlide = dynamic(() => import("./chart-slide").then(mod => ({ default: mod.ChartSlide })), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-muted-foreground">차트 로딩 중...</div>
    </div>
  ),
  ssr: false
})

// =====================
// Cover Slide - 표지
// Cleveland Clinic 스타일의 전문적인 표지
// =====================
interface CoverSlideProps {
  readonly title: string
  readonly subtitle?: string
  readonly date: string
  readonly company: string
}

export function CoverSlide({ title, subtitle, date, company }: CoverSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center space-y-4 px-8">
        {/* 메인 타이틀 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#004B8D] leading-tight tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-[#48A9C5]">
            {subtitle}
          </h2>
        )}

        {/* 구분 요소 */}
        <div className="flex items-center justify-center gap-3 py-2">
          <div className="w-10 h-px bg-[#004B8D]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#004B8D]" />
          <div className="w-10 h-px bg-[#004B8D]/20" />
        </div>

        {/* 날짜 및 회사 정보 */}
        <div className="space-y-1">
          <p className="text-base text-gray-500">{date}</p>
          <p className="text-lg font-semibold text-[#004B8D]">{company}</p>
        </div>

        {/* 하단 라벨 */}
        <div className="pt-4">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Proposal</span>
        </div>
      </div>
    </div>
  )
}

// =====================
// TOC Slide - 목차
// 인터랙티브한 네비게이션 목차
// =====================
interface TocItem {
  readonly act: number
  readonly title: string
  readonly startPage: number
}

interface TocSlideProps {
  readonly items: readonly TocItem[]
  readonly onNavigate?: (page: number) => void
}

export function TocSlide({ items, onNavigate }: TocSlideProps) {
  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#004B8D]/10 mb-2">
          <span className="text-xs font-semibold text-[#004B8D] uppercase tracking-wider">Contents</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#004B8D]">목차</h2>
      </div>

      {/* 목차 리스트 */}
      <div className="max-w-2xl mx-auto space-y-2">
        {items.map((item, index) => (
          <button
            key={item.act}
            onClick={() => onNavigate?.(item.startPage)}
            className="group w-full flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-[#004B8D]/30 hover:bg-[#004B8D]/5 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {/* ACT 번호 */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#004B8D] to-[#48A9C5] text-white font-bold text-base flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              {item.act}
            </div>

            {/* 타이틀 */}
            <div className="flex-1 text-left">
              <span className="text-base font-semibold text-gray-800 group-hover:text-[#004B8D] transition-colors duration-200">
                {item.title}
              </span>
            </div>

            {/* 페이지 번호 & 화살표 */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400 group-hover:text-[#48A9C5] transition-colors">
                p.{item.startPage}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#004B8D] group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// =====================
// Divider Slide - ACT 구분 페이지
// 미니멀 타이포그래피 중심 디자인
// 배경색 없음 - 전체 페이지와 통일
// =====================
interface DividerSlideProps {
  readonly act: number
  readonly title: string
  readonly subtitle: string
}

export function DividerSlide({ act, title, subtitle }: DividerSlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      {/* 대형 배경 숫자 워터마크 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[180px] font-black text-[#004B8D]/[0.03] leading-none">
          {act}
        </span>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center space-y-4">
        {/* ACT 레이블 */}
        <span className="inline-block text-xs font-semibold tracking-[0.4em] text-[#48A9C5] uppercase">
          ACT {act}
        </span>

        {/* 메인 타이틀 */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#004B8D] leading-none">
          {title}
        </h1>

        {/* 서브타이틀 */}
        <p className="text-base md:text-lg font-light text-[#48A9C5] tracking-wide">
          {subtitle}
        </p>

        {/* 하단 장식 */}
        <div className="pt-4 flex justify-center">
          <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        </div>
      </div>
    </div>
  )
}

// =====================
// Content Slide - 일반 콘텐츠
// 가독성 높은 콘텐츠 레이아웃
// =====================
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
      {/* 타이틀 */}
      <div className="space-y-2">
        <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
      </div>

      {/* 본문 */}
      <p className="text-lg md:text-xl leading-relaxed text-gray-600">
        {content}
      </p>

      {/* 불릿 포인트 */}
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

      {/* 강조 문구 */}
      {emphasis && (
        <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-[#004B8D]/10 to-[#48A9C5]/10 border-l-4 border-[#004B8D]">
          <Lightbulb className="w-6 h-6 text-[#004B8D] flex-shrink-0 mt-0.5" />
          <p className="text-xl font-semibold text-[#004B8D]">
            {emphasis}
          </p>
        </div>
      )}
    </div>
  )
}

// =====================
// Cards Slide - 카드형 레이아웃 (3열)
// 원본 "성장의 동력" 슬라이드 스타일
// =====================
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
      {/* 타이틀 */}
      <div className="space-y-2">
        <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
      </div>

      {/* 카드 그리드 */}
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

      {/* 하단 메시지 */}
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

// =====================
// Comparison Slide - Before/After 비교
// 시각적 대비가 명확한 비교 레이아웃
// =====================
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
      {/* 타이틀 */}
      <div className="text-center space-y-3">
        <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full mx-auto" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

      {/* 인용구 */}
      {quote && (
        <p className="text-center text-lg italic text-gray-600 mb-8">
          "{quote}"
        </p>
      )}

      {/* 비교 테이블 */}
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

      {/* 화살표 표시 (모바일에서 숨김) */}
      <div className="hidden md:flex justify-center">
        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#10B981]/10 text-[#10B981]">
          <span className="font-semibold">변화의 핵심</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

// =====================
// Summary Slide - 핵심 요약
// 액션 지향적인 요약 레이아웃
// =====================
interface SummarySlideProps {
  readonly title: string
  readonly keyPoints: readonly string[]
  readonly nextSteps?: readonly string[]
}

export function SummarySlide({ title, keyPoints, nextSteps }: SummarySlideProps) {
  return (
    <div className="space-y-8">
      {/* 타이틀 */}
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
        {/* 핵심 포인트 */}
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

        {/* Next Steps */}
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

// =====================
// Closing Slide - 마지막 페이지
// 미니멀 타이포그래피 중심 디자인
// =====================
interface ClosingSlideProps {
  readonly title: string
  readonly subtitle: string
  readonly contact: {
    readonly email: string
    readonly person: string
  }
  readonly company: string
}

export function ClosingSlide({ title, subtitle, contact, company }: ClosingSlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      {/* 배경 장식 - 미니멀 */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#004B8D]/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#48A9C5]/[0.03] rounded-full blur-3xl" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center space-y-8 px-8">
        {/* 메인 타이틀 */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#004B8D] leading-none">
          {title}
        </h1>

        {/* 서브타이틀 */}
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* 장식 라인 */}
        <div className="py-6 flex justify-center">
          <div className="w-20 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        </div>

        {/* 연락처 정보 */}
        <div className="space-y-4 pt-4">
          <p className="text-lg font-semibold text-[#004B8D]">{company}</p>
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <p>{contact.person}</p>
            <p className="text-[#48A9C5]">{contact.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================
// TwoColumn Slide - 두 개의 정보 박스
// 시장 변화, AI vs 사람 등 대비 레이아웃
// =====================
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
      {/* 타이틀 */}
      <div className="space-y-2">
        <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
      </div>

      {/* 2열 박스 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 왼쪽 박스 */}
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

        {/* 오른쪽 박스 */}
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

      {/* 하단 메시지 */}
      {bottomMessage && (
        <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-[#004B8D]/10 to-[#48A9C5]/10 border-l-4 border-[#004B8D]">
          <p className="text-xl font-semibold text-[#004B8D]">
            {bottomMessage}
          </p>
        </div>
      )}
    </div>
  )
}

// =====================
// Quote Slide - 중앙 메시지 박스
// 전략 방향, 질문 등 임팩트 메시지
// =====================
interface QuoteSlideProps {
  readonly message: string
  readonly subMessage?: string
}

export function QuoteSlide({ message, subMessage }: QuoteSlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#004B8D]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#48A9C5]/[0.03] rounded-full blur-3xl" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <Card className="p-12 border-2 border-[#004B8D]/20 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="space-y-6">
            {/* 인용 부호 */}
            <div className="text-6xl text-[#004B8D]/20 font-serif leading-none">"</div>

            {/* 메인 메시지 */}
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#004B8D] leading-relaxed">
              {message}
            </p>

            {/* 서브 메시지 */}
            {subMessage && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed pt-4 text-left whitespace-pre-line">
                {subMessage}
              </p>
            )}

            {/* 인용 부호 닫기 */}
            <div className="text-6xl text-[#004B8D]/20 font-serif leading-none rotate-180">"</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// =====================
// FlowSteps Slide - 단계별 플로우
// 실행 로드맵, Next Step 등
// =====================
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
      {/* 타이틀 */}
      <div className="space-y-2">
        <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
      </div>

      {/* 플로우 스텝 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 py-8">
        {steps.map((step, index) => (
          <div key={step.step} className="flex items-center">
            {/* 스텝 카드 */}
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

            {/* 화살표 (마지막 아이템 제외) */}
            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center px-2">
                <ArrowRight className="w-8 h-8 text-[#48A9C5]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 메시지 */}
      {bottomMessage && (
        <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-[#004B8D]/10 to-[#48A9C5]/10 border-l-4 border-[#004B8D]">
          <p className="text-xl font-semibold text-[#004B8D]">
            {bottomMessage}
          </p>
        </div>
      )}
    </div>
  )
}

// =====================
// Main Slide Renderer
// 슬라이드 타입에 따른 렌더링 분기
// =====================
interface SlideRendererProps {
  readonly content: SlideContent
  readonly onNavigate?: (page: number) => void
}

export function SlideRenderer({ content, onNavigate }: SlideRendererProps) {
  switch (content.type) {
    case "cover":
      return (
        <SlideWrapper fullHeight showPattern patternType="concentric">
          <CoverSlide
            title={content.title}
            subtitle={content.subtitle}
            date={content.date}
            company={content.company}
          />
        </SlideWrapper>
      )

    case "toc":
      return (
        <SlideWrapper showPattern>
          <TocSlide
            items={content.items}
            onNavigate={onNavigate}
          />
        </SlideWrapper>
      )

    case "divider":
      return (
        <SlideWrapper fullHeight showPattern patternType="radial">
          <DividerSlide
            act={content.act}
            title={content.title}
            subtitle={content.subtitle}
          />
        </SlideWrapper>
      )

    case "content":
      return (
        <SlideWrapper showPattern>
          <ContentSlide
            title={content.title}
            content={content.content}
            bullets={content.bullets}
            emphasis={content.emphasis}
            tone={content.tone}
          />
        </SlideWrapper>
      )

    case "cards":
      return (
        <SlideWrapper showPattern>
          <CardsSlide
            title={content.title}
            cards={content.cards}
            bottomMessage={content.bottomMessage}
            tone={content.tone}
          />
        </SlideWrapper>
      )

    case "chart":
      return (
        <SlideWrapper showPattern>
          <ChartSlide
            title={content.title}
            chart={content.chart}
            highlight={content.highlight}
            description={content.description}
          />
        </SlideWrapper>
      )

    case "comparison":
      return (
        <SlideWrapper showPattern>
          <ComparisonSlide
            title={content.title}
            quote={content.quote}
            before={content.before}
            after={content.after}
          />
        </SlideWrapper>
      )

    case "summary":
      return (
        <SlideWrapper showPattern>
          <SummarySlide
            title={content.title}
            keyPoints={content.keyPoints}
            nextSteps={content.nextSteps}
          />
        </SlideWrapper>
      )

    case "closing":
      return (
        <SlideWrapper fullHeight showPattern patternType="radial">
          <ClosingSlide
            title={content.title}
            subtitle={content.subtitle}
            contact={content.contact}
            company={content.company}
          />
        </SlideWrapper>
      )

    case "twoColumn":
      return (
        <SlideWrapper showPattern>
          <TwoColumnSlide
            title={content.title}
            left={content.left}
            right={content.right}
            bottomMessage={content.bottomMessage}
          />
        </SlideWrapper>
      )

    case "quote":
      return (
        <SlideWrapper fullHeight showPattern patternType="radial">
          <QuoteSlide
            message={content.message}
            subMessage={content.subMessage}
          />
        </SlideWrapper>
      )

    case "flowSteps":
      return (
        <SlideWrapper showPattern>
          <FlowStepsSlide
            title={content.title}
            steps={content.steps}
            bottomMessage={content.bottomMessage}
          />
        </SlideWrapper>
      )

    default:
      return (
        <SlideWrapper>
          <div className="flex items-center justify-center min-h-[400px] text-center text-gray-500">
            <div className="space-y-2">
              <p className="text-lg">지원하지 않는 슬라이드 타입입니다.</p>
              <p className="text-sm text-gray-400">관리자에게 문의해주세요.</p>
            </div>
          </div>
        </SlideWrapper>
      )
  }
}
