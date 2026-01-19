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
  title = "정이안한의원 마케팅 전략 제안"
}: TopbarHeaderProps) {
  return (
    <header className="h-14 shrink-0 flex items-center px-4 gap-4 bg-primary">
      {/* Logo Section */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-secondary">
          <span className="text-white font-semibold text-lg">정</span>
        </div>
      </div>

      {/* Title Section - Centered */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-white font-semibold text-base md:text-lg text-pretty text-center">
          {title}
        </h1>
      </div>

      {/* Right Section - TOC Button + Page Number */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onTocClick}
          className="text-white hover:bg-white/10 gap-1.5 font-medium text-sm"
        >
          <Menu className="h-4 w-4" />
          <span className="hidden sm:inline">목차</span>
        </Button>
        <div className="text-white font-semibold text-sm bg-white/10 px-3 py-1.5 rounded-md">
          {currentPage}/{totalPages}
        </div>
      </div>
    </header>
  )
}
