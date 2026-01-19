"use client"

import dynamic from "next/dynamic"
import type { SlideContent } from "@/types/proposal"
import { Card } from "@/components/ui/card"

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
// Cover Slide
// =====================
interface CoverSlideProps {
  title: string
  subtitle?: string  // optional - Boris Cherny: ????뺤쓽? ?쇱튂
  date: string
  company: string
}

export function CoverSlide({ title, subtitle, date, company }: CoverSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center">
      <div className="space-y-8">
        {/* 濡쒓퀬/?꾩씠肄?*/}
        <div className="w-24 h-24 mx-auto rounded-2xl bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-4xl">호</span>
        </div>
        
        {/* ?쒕ぉ */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-2xl md:text-3xl font-semibold text-primary">
              {subtitle}
            </h2>
          )}
        </div>
        
        {/* ?섎떒 ?뺣낫 */}
        <div className="pt-12 space-y-2">
          <p className="text-lg text-muted-foreground">{date}</p>
          <p className="text-xl font-semibold text-secondary">{company}</p>
        </div>
      </div>
    </div>
  )
}

// =====================
// TOC Slide
// =====================
interface TocItem {
  act: number
  title: string
  startPage: number
}

interface TocSlideProps {
  items: readonly TocItem[]
  onNavigate?: (page: number) => void
}

export function TocSlide({ items, onNavigate }: TocSlideProps) {
  return (
    <div className="space-y-8 py-8">
      <h2 className="text-3xl font-bold text-foreground text-center">紐⑹감</h2>
      
      <div className="space-y-3 max-w-2xl mx-auto">
        {items.map((item) => (
          <button
            key={item.act}
            onClick={() => onNavigate?.(item.startPage)}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:bg-surface hover:border-primary transition-colors group"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
                {item.act}
              </span>
              <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </span>
            </div>
            <span className="text-muted-foreground font-medium">
              p.{item.startPage}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// =====================
// Divider Slide (ACT 媛꾩?)
// =====================
interface DividerSlideProps {
  act: number
  title: string
  subtitle: string
}

export function DividerSlide({ act, title, subtitle }: DividerSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center bg-gradient-to-br from-primary/5 to-secondary/5 -m-8 md:-m-12 lg:-m-16 p-8">
      <div className="space-y-6">
        {/* ACT 踰덊샇 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
          <span className="text-primary font-bold text-lg">ACT {act}</span>
        </div>
        
        {/* ?쒕ぉ */}
        <h1 className="text-5xl md:text-6xl font-bold text-primary">
          {title}
        </h1>
        
        {/* ?쒕툕??댄? */}
        <p className="text-2xl font-medium text-secondary">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

// =====================
// Content Slide
// =====================
interface ContentSlideProps {
  title: string
  content: string
  bullets?: readonly string[]
  emphasis?: string
  tone?: "positive" | "negative" | "neutral"
}

export function ContentSlide({ title, content, bullets, emphasis, tone = "neutral" }: ContentSlideProps) {
  const toneColors = {
    positive: "text-accent",
    negative: "text-destructive",
    neutral: "text-foreground",
  }
  
  const toneBg = {
    positive: "bg-accent/10",
    negative: "bg-destructive/10",
    neutral: "bg-surface",
  }

  return (
    <div className="space-y-8">
      {/* ?쒕ぉ */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      
      {/* 蹂몃Ц */}
      <p className="text-xl leading-relaxed text-muted-foreground">
        {content}
      </p>
      
      {/* 遺덈┸ ?ъ씤??*/}
      {bullets && bullets.length > 0 && (
        <div className={`p-6 rounded-lg ${toneBg[tone]}`}>
          <ul className="space-y-4">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                  tone === "positive" ? "bg-accent" : tone === "negative" ? "bg-destructive" : "bg-primary"
                }`}>
                  {index + 1}
                </span>
                <span className={`text-lg ${toneColors[tone]}`}>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* 媛뺤“ 臾멸뎄 */}
      {emphasis && (
        <div className="mt-8 p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
          <p className="text-xl font-semibold text-primary">{emphasis}</p>
        </div>
      )}
    </div>
  )
}


// =====================
// Comparison Slide
// =====================
interface ComparisonSlideProps {
  title: string
  before: {
    label: string
    items: readonly string[]
  }
  after: {
    label: string
    items: readonly string[]
  }
}

export function ComparisonSlide({ title, before, after }: ComparisonSlideProps) {
  return (
    <div className="space-y-8">
      {/* ?쒕ぉ */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
        {title}
      </h2>
      
      {/* 鍮꾧탳 ?뚯씠釉?*/}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Before */}
        <Card className="p-6 border-2 border-muted">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-muted-foreground text-center pb-2 border-b">
              {before.label}
            </h3>
            <ul className="space-y-3">
              {before.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-muted-foreground" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
        
        {/* After */}
        <Card className="p-6 border-2 border-primary bg-primary/5">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary text-center pb-2 border-b border-primary/20">
              {after.label}
            </h3>
            <ul className="space-y-3">
              {after.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}

// =====================
// Summary Slide
// =====================
interface SummarySlideProps {
  title: string
  keyPoints: readonly string[]
  nextSteps?: readonly string[]  // optional - Boris Cherny: ????뺤쓽? ?쇱튂
}

export function SummarySlide({ title, keyPoints, nextSteps }: SummarySlideProps) {
  return (
    <div className="space-y-8">
      {/* ?쒕ぉ */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
        {title}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* ?듭떖 ?ъ씤??*/}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">호</span>
            ?듭떖 ?붿빟
          </h3>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </Card>
        
        {/* ?ㅼ쓬 ?④퀎 */}
        {nextSteps && nextSteps.length > 0 && (
          <Card className="p-6 bg-accent/5 border-accent/20">
            <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm">호</span>
              Next Steps
            </h3>
            <ul className="space-y-3">
              {nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  )
}

// =====================
// Main Slide Renderer
// =====================
interface SlideRendererProps {
  content: SlideContent
  onNavigate?: (page: number) => void
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
        <div className="text-center text-muted-foreground">
          ?????녿뒗 ?щ씪?대뱶 ??낆엯?덈떎.
        </div>
      )
  }
}
