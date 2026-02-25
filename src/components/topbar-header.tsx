"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface TopbarHeaderProps {
  currentPage: number
  totalPages: number
  onTocClick: () => void
  onFullscreenToggle?: () => void
  isFullscreen?: boolean
  title?: string
}

export function TopbarHeader({
  currentPage,
  totalPages,
  onTocClick,
  onFullscreenToggle,
  isFullscreen = false,
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
        <img
          src="/logo.jpg"
          alt="로고"
          className="shrink-0"
          style={{
            height: 26,
            width: "auto",
            filter: "grayscale(100%) opacity(0.45)",
          }}
        />

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

        {/* Fullscreen Toggle */}
        {onFullscreenToggle && (
          <span
            onClick={onFullscreenToggle}
            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {isFullscreen ? "축소" : "전체화면"}
          </span>
        )}

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
