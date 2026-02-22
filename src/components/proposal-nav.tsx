"use client"

import { Button } from "@/components/ui/button"
import { Menu, ChevronLeft, ChevronRight } from "lucide-react"

// ═══════════════════════════════════════════════════════════════
// COMPONENT 1: TopbarHeader
// ═══════════════════════════════════════════════════════════════

interface TopbarHeaderProps {
  currentPage: number
  totalPages: number
  onTocClick: () => void
  title?: string
}

export function TopbarHeader({
  currentPage,
  totalPages,
  onTocClick,
  title = "정이안한의원 마케팅 전략 제안",
}: TopbarHeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-4 shrink-0 select-none"
      style={{
        height: 44,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Logo */}
        <div
          className="flex items-center justify-center shrink-0 rounded-lg"
          style={{
            width: 26,
            height: 26,
            border: "1.5px solid #004B8D",
            backgroundColor: "transparent",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#004B8D",
              lineHeight: 1,
            }}
          >
            정
          </span>
        </div>

        {/* Title */}
        <span
          className="truncate"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#475569",
            lineHeight: 1,
          }}
        >
          {title}
        </span>
      </div>

      {/* Right: TOC button + Page indicator */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Page indicator */}
        <span
          style={{
            fontSize: 12,
            color: "#94A3B8",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {currentPage} / {totalPages}
        </span>

        {/* TOC Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onTocClick}
          className="h-7 gap-1.5 px-2 hover:bg-transparent"
          style={{
            fontSize: 13,
            color: "#94A3B8",
            backgroundColor: "transparent",
            border: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#004B8D"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#94A3B8"
          }}
        >
          <Menu style={{ width: 14, height: 14 }} />
          <span>목차</span>
        </Button>
      </div>
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT 2: ProgressFooter
// ═══════════════════════════════════════════════════════════════

interface ProgressFooterProps {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

export function ProgressFooter({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: ProgressFooterProps) {
  const progressPercent = totalPages > 0 ? (currentPage / totalPages) * 100 : 0
  const isFirst = currentPage <= 1
  const isLast = currentPage >= totalPages

  return (
    <footer
      className="relative shrink-0 select-none"
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Progress bar — sits ON TOP of the border line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 2, transform: "translateY(-1px)" }}
      >
        {/* Track: transparent, effectively invisible */}
        <div className="relative w-full h-full" style={{ backgroundColor: "transparent" }}>
          {/* Fill */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: "#004B8D",
              transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>

      {/* Border line */}
      <div style={{ borderTop: "1px solid #E2E8F0" }} />

      {/* Footer content */}
      <div
        className="flex items-center justify-between px-4"
        style={{ height: 43 }}
      >
        {/* Previous button */}
        <NavButton
          onClick={onPrevious}
          disabled={isFirst}
          direction="left"
          label="이전"
        />

        {/* Page indicator */}
        <div className="flex flex-col items-center gap-0.5">
          <span
            style={{
              fontSize: 11,
              color: "#94A3B8",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            페이지
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#334155",
              lineHeight: 1,
            }}
          >
            {currentPage}
          </span>
        </div>

        {/* Next button */}
        <NavButton
          onClick={onNext}
          disabled={isLast}
          direction="right"
          label="다음"
        />
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════
// Internal helper: NavButton
// ═══════════════════════════════════════════════════════════════

function NavButton({
  onClick,
  disabled,
  direction,
  label,
}: {
  onClick: () => void
  disabled: boolean
  direction: "left" | "right"
  label: string
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1 cursor-pointer disabled:cursor-default transition-colors"
      style={{
        height: 28,
        fontSize: 13,
        color: disabled ? "#94A3B8" : "#94A3B8",
        opacity: disabled ? 0.25 : 1,
        backgroundColor: "transparent",
        border: "none",
        padding: "0 4px",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = "#004B8D"
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = "#94A3B8"
        }
      }}
    >
      {direction === "left" && <Icon style={{ width: 14, height: 14 }} />}
      <span>{label}</span>
      {direction === "right" && <Icon style={{ width: 14, height: 14 }} />}
    </button>
  )
}
