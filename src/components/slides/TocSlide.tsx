"use client"

import { ChevronRight } from "lucide-react"
import { currentTheme } from "../../../config/theme"

const t = currentTheme

interface TocItem {
  readonly act: number
  readonly title: string
  readonly startPage: number
}

interface TocSlideProps {
  readonly items: readonly TocItem[]
  readonly onNavigate?: (page: number) => void
}

const sampleItems: TocItem[] = [
  { act: 1, title: "상황", startPage: 3 },
  { act: 2, title: "위기", startPage: 6 },
  { act: 3, title: "전환점", startPage: 13 },
  { act: 4, title: "해결책 1: 마케팅 전략", startPage: 18 },
  { act: 5, title: "해결책 2: AI CRM", startPage: 25 },
  { act: 6, title: "요약 및 Next Step", startPage: 45 },
]

export function TocSlide({ items = sampleItems, onNavigate }: TocSlideProps) {
  return (
    <div
      className="relative w-full h-full flex flex-col px-6 py-14 overflow-hidden select-none"
      style={{ fontFamily: t.typography.fontFamily }}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawLineDown {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes headerLineGrow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(6px, -8px) rotate(1.5deg); }
        }

        @keyframes floatMedium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-4px, 6px) rotate(-1deg); }
        }

        @keyframes floatFast {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(3px, -5px); }
        }

        .toc-row {
          animation: fadeSlideIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .toc-row:nth-child(1) { animation-delay: 0.3s; }
        .toc-row:nth-child(2) { animation-delay: 0.42s; }
        .toc-row:nth-child(3) { animation-delay: 0.54s; }
        .toc-row:nth-child(4) { animation-delay: 0.66s; }
        .toc-row:nth-child(5) { animation-delay: 0.78s; }
        .toc-row:nth-child(6) { animation-delay: 0.9s; }

        .toc-vertical-line {
          animation: drawLineDown 0.9s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both;
          transform-origin: top center;
        }

        .toc-header-line {
          animation: headerLineGrow 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.1s both;
          transform-origin: left center;
        }

        .toc-header-label {
          animation: fadeSlideIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.05s both;
        }

        .toc-row .act-number {
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .toc-row .row-title {
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .toc-row .row-page {
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .toc-row .row-chevron {
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateX(-6px);
        }

        .toc-row .dot-leader {
          transition: opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .toc-row:hover .act-number {
          opacity: 1 !important;
          color: ${t.colors.primary};
        }

        .toc-row:hover .row-title {
          color: ${t.colors.primary};
          transform: translateX(4px);
        }

        .toc-row:hover .row-page {
          color: ${t.colors.primary};
        }

        .toc-row:hover .row-chevron {
          opacity: 1;
          transform: translateX(0);
          color: ${t.colors.secondary};
        }

        .toc-row:hover .dot-leader {
          opacity: 0.3;
        }

        .toc-row:focus-visible {
          outline: 2px solid ${t.colors.secondary};
          outline-offset: 4px;
          border-radius: 4px;
        }

        @keyframes pulseOpacity1 {
          0%, 100% { opacity: 0.04; border-color: ${t.colors.primary}; }
          30% { opacity: 0.12; border-color: ${t.colors.secondary}; }
          60% { opacity: 0.06; border-color: #0068C8; }
        }

        @keyframes pulseOpacity2 {
          0%, 100% { opacity: 0.05; border-color: ${t.colors.secondary}; }
          40% { opacity: 0.14; border-color: ${t.colors.primary}; }
          70% { opacity: 0.03; border-color: #6BC5DB; }
        }

        @keyframes pulseGradient {
          0%, 100% { opacity: 0.03; filter: hue-rotate(0deg) brightness(1); }
          35% { opacity: 0.10; filter: hue-rotate(15deg) brightness(1.3); }
          65% { opacity: 0.06; filter: hue-rotate(-10deg) brightness(0.9); }
        }

        @keyframes pulseLine {
          0%, 100% { opacity: 0.05; }
          25% { opacity: 0.14; }
          50% { opacity: 0.03; }
          75% { opacity: 0.10; }
        }

        .deco-1 {
          animation: floatSlow 14s ease-in-out infinite, fadeIn 1.2s ease 0.5s both, pulseOpacity1 8s ease-in-out infinite;
        }
        .deco-2 {
          animation: floatMedium 11s ease-in-out infinite, fadeIn 1.2s ease 0.8s both, pulseOpacity2 6.5s ease-in-out infinite;
        }
        .deco-3 {
          animation: floatFast 9s ease-in-out infinite, fadeIn 1.2s ease 1.1s both, pulseGradient 7s ease-in-out infinite;
        }
        .deco-4 {
          animation: floatSlow 16s ease-in-out infinite, fadeIn 1.2s ease 1.3s both, pulseLine 5s ease-in-out infinite;
        }
      `}</style>

      {/* ── Decorative Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Large circle — top right */}
        <div
          className="deco-1 absolute"
          style={{
            top: "-60px",
            right: "-40px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: `1.5px solid ${t.colors.primary}`,
            opacity: 0.05,
          }}
        />
        {/* Rotated square — right middle */}
        <div
          className="deco-2 absolute"
          style={{
            top: "38%",
            right: "60px",
            width: "120px",
            height: "120px",
            border: `1.5px solid ${t.colors.secondary}`,
            opacity: 0.06,
            transform: "rotate(45deg)",
          }}
        />
        {/* Small circle — bottom left */}
        <div
          className="deco-3 absolute"
          style={{
            bottom: "80px",
            left: "30px",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.secondary})`,
            opacity: 0.04,
          }}
        />
        {/* Horizontal line accent — bottom right */}
        <div
          className="deco-4 absolute"
          style={{
            bottom: "140px",
            right: "100px",
            width: "180px",
            height: "1.5px",
            background: `linear-gradient(90deg, transparent, ${t.colors.primary}, transparent)`,
            opacity: 0.06,
          }}
        />
      </div>

      {/* ── Header Section ── */}
      <div className="relative mb-14" style={{ zIndex: 10 }}>
        <p
          className="toc-header-label text-xs font-semibold tracking-[0.25em] uppercase mb-3"
          style={{ color: t.colors.primary }}
        >
          Contents
        </p>
        <div
          className="toc-header-line h-[2px] w-24"
          style={{
            background: `linear-gradient(90deg, ${t.colors.primary}, ${t.colors.secondary})`,
          }}
        />
      </div>

      {/* ── Editorial List ── */}
      <div className="relative flex flex-1" style={{ zIndex: 10 }}>
        {/* Vertical accent line */}
        <div className="relative flex-shrink-0" style={{ width: "110px" }}>
          <div
            className="toc-vertical-line absolute right-0 top-0 bottom-0"
            style={{
              width: "1.5px",
              background: `linear-gradient(180deg, ${t.colors.primary} 0%, ${t.colors.secondary} 60%, transparent 100%)`,
              opacity: 0.3,
            }}
          />
        </div>

        {/* Content rows */}
        <div className="flex flex-col justify-between flex-1 pl-8">
          {(items ?? sampleItems).map((item) => (
            <button
              key={item.act}
              className="toc-row group relative flex items-center w-full text-left py-4 cursor-pointer bg-transparent border-none"
              onClick={() => onNavigate?.(item.startPage)}
              aria-label={`ACT ${item.act}: ${item.title} — Page ${item.startPage}`}
            >
              {/* Large ACT number — positioned over the left zone */}
              <span
                className="act-number absolute font-light tabular-nums"
                style={{
                  left: "-130px",
                  width: "100px",
                  textAlign: "right",
                  fontSize: "54px",
                  lineHeight: "1",
                  color: t.colors.primary,
                  opacity: 0.15,
                  letterSpacing: "-0.03em",
                }}
              >
                {String(item.act).padStart(2, "0")}
              </span>

              {/* Title */}
              <span
                className="row-title flex-shrink-0 text-lg font-medium"
                style={{ color: t.colors.neutral[800] }}
              >
                {item.title}
              </span>

              {/* Dot leaders */}
              <span
                className="dot-leader flex-1 mx-4 overflow-hidden"
                style={{
                  borderBottom: `1.5px dotted ${t.colors.neutral[300]}`,
                  minWidth: "40px",
                  height: "1px",
                  alignSelf: "flex-end",
                  marginBottom: "6px",
                  opacity: 0.6,
                }}
              />

              {/* Page number */}
              <span
                className="row-page flex-shrink-0 text-sm font-normal tabular-nums"
                style={{
                  color: t.colors.neutral[500],
                  fontVariantNumeric: "tabular-nums",
                  minWidth: "40px",
                  textAlign: "right",
                }}
              >
                {"p."}
                {item.startPage}
              </span>

              {/* Hover chevron */}
              <ChevronRight
                className="row-chevron flex-shrink-0 ml-2"
                size={16}
                strokeWidth={2}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Footer subtle branding ── */}
      <div
        className="relative mt-auto pt-10 flex items-center gap-3"
        style={{ zIndex: 10, animation: "fadeIn 1s ease 1.2s both" }}
      >
        <div
          className="h-[1px] flex-1"
          style={{
            background: `linear-gradient(90deg, ${t.colors.neutral[200]}, transparent)`,
          }}
        />
        <span
          className="text-[10px] font-medium tracking-[0.2em] uppercase"
          style={{ color: t.colors.neutral[400] }}
        >
          Proposal
        </span>
      </div>
    </div>
  )
}
