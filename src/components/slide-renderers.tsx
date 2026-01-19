"use client"

import dynamic from "next/dynamic"
import type { SlideContent } from "@/types/proposal"
import { Card } from "@/components/ui/card"
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
    <div className="relative flex flex-col items-center justify-center min-h-[900px] max-h-[900px] overflow-hidden">
      <div className="relative z-10 text-center space-y-6 px-8">
        {/* 메인 타이틀 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#004B8D] leading-tight tracking-tight">
          {title}
        </h1>
        
        {subtitle && (
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#48A9C5]">
            {subtitle}
          </h2>
        )}

        {/* 구분 요소 */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="w-12 h-px bg-[#004B8D]/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#004B8D]" />
          <div className="w-12 h-px bg-[#004B8D]/20" />
        </div>

        {/* 날짜 및 회사 정보 */}
        <div className="space-y-2">
          <p className="text-lg text-gray-500">{date}</p>
          <p className="text-xl font-semibold text-[#004B8D]">{company}</p>
        </div>
      </div>

      {/* 하단 라벨 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Proposal</span>
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
    <div className="min-h-[900px] max-h-[900px] overflow-y-auto py-8 px-4">
      {/* 헤더 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004B8D]/10 mb-4">
          <span className="text-sm font-semibold text-[#004B8D] uppercase tracking-wider">Contents</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#004B8D]">목차</h2>
      </div>

      {/* 목차 리스트 */}
      <div className="max-w-2xl mx-auto space-y-3">
        {items.map((item, index) => (
          <button
            key={item.act}
            onClick={() => onNavigate?.(item.startPage)}
            className="group w-full flex items-center gap-4 p-5 rounded-xl border-2 border-gray-100 bg-white hover:border-[#004B8D]/30 hover:bg-[#004B8D]/5 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {/* ACT 번호 */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#004B8D] to-[#48A9C5] text-white font-bold text-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              {item.act}
            </div>

            {/* 타이틀 */}
            <div className="flex-1 text-left">
              <span className="text-lg font-semibold text-gray-800 group-hover:text-[#004B8D] transition-colors duration-200">
                {item.title}
              </span>
            </div>

            {/* 페이지 번호 & 화살표 */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-400 group-hover:text-[#48A9C5] transition-colors">
                p.{item.startPage}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#004B8D] group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// =====================
// Divider Slide - ACT 구분 페이지
// Premium, Open Design - No Boxes
// 30년 경력 디자이너 관점의 세련된 섹션 전환
// =====================
interface DividerSlideProps {
  readonly act: number
  readonly title: string
  readonly subtitle: string
}

export function DividerSlide({ act, title, subtitle }: DividerSlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[900px] max-h-[900px] overflow-hidden bg-gradient-to-br from-[#003366] via-[#004B8D] to-[#2E8B9A] -m-8 md:-m-12 lg:-m-16 p-8 md:p-12 lg:p-16">
      {/* 배경 장식 패턴 - 가시성 향상 */}
      <div className="absolute inset-0">
        {/* 좌상단 원형 클러스터 */}
        <div className="absolute top-16 left-16 w-48 h-48 border-2 border-white/20 rounded-full" />
        <div className="absolute top-28 left-28 w-28 h-28 border border-white/15 rounded-full" />
        <div className="absolute top-8 left-40 w-16 h-16 border border-white/10 rounded-full" />
        
        {/* 우하단 원형 클러스터 */}
        <div className="absolute bottom-16 right-16 w-64 h-64 border-2 border-white/20 rounded-full" />
        <div className="absolute bottom-28 right-28 w-40 h-40 border border-white/15 rounded-full" />
        <div className="absolute bottom-40 right-40 w-20 h-20 border border-white/10 rounded-full" />
        
        {/* 추가 앰비언트 원형 */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-white/10 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-white/10 rounded-full" />
      </div>

      {/* 대형 배경 숫자 워터마크 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span 
          className="text-[350px] font-black text-white/[0.04] select-none leading-none"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {act}
        </span>
      </div>

      {/* 앰비언트 글로우 효과 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center space-y-8 px-8">
        {/* ACT 레이블 - 박스 없이 타이포그래피로만 */}
        <div className="space-y-2">
          <span 
            className="inline-block text-lg md:text-xl font-bold tracking-[0.3em] text-white/90 uppercase"
            style={{ 
              textShadow: '0 0 30px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.2)' 
            }}
          >
            ACT {act}
          </span>
          {/* 미니멀 언더라인 */}
          <div className="flex justify-center">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>

        {/* 메인 타이틀 - 대형, 임팩트 */}
        <h1 
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight"
          style={{ 
            textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 60px rgba(255,255,255,0.1)' 
          }}
        >
          {title}
        </h1>

        {/* 서브타이틀 - 우아한 영문 */}
        <p 
          className="text-2xl md:text-3xl font-light text-white/70 tracking-wide"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {subtitle}
        </p>

        {/* 하단 장식 라인 */}
        <div className="pt-6 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/40" />
          </div>
        </div>
      </div>

      {/* 하단 ACT 진행 인디케이터 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className={`rounded-full transition-all duration-500 ${
              n === act 
                ? 'w-10 h-2.5 bg-white shadow-lg shadow-white/30' 
                : n < act 
                  ? 'w-2.5 h-2.5 bg-white/50' 
                  : 'w-2.5 h-2.5 bg-white/25'
            }`}
          />
        ))}
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
    <div className="min-h-[900px] max-h-[900px] overflow-y-auto py-8 space-y-8">
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
// Comparison Slide - Before/After 비교
// 시각적 대비가 명확한 비교 레이아웃
// =====================
interface ComparisonSlideProps {
  readonly title: string
  readonly before: {
    readonly label: string
    readonly items: readonly string[]
  }
  readonly after: {
    readonly label: string
    readonly items: readonly string[]
  }
}

export function ComparisonSlide({ title, before, after }: ComparisonSlideProps) {
  return (
    <div className="min-h-[900px] max-h-[900px] overflow-y-auto py-8 space-y-8">
      {/* 타이틀 */}
      <div className="text-center space-y-3">
        <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full mx-auto" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

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
    <div className="min-h-[900px] max-h-[900px] overflow-y-auto py-8 space-y-8">
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

    case "chart":
      return (
        <ChartSlide
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
