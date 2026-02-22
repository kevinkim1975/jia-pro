"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

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
