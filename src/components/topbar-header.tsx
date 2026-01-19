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
    <header className="h-[114px] shrink-0 flex items-center px-6 gap-6 bg-primary">
      {/* Logo Section */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-secondary">
          <span className="text-white font-semibold text-3xl">정</span>
        </div>
      </div>

      {/* Title Section - Centered */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-white font-semibold text-2xl md:text-3xl text-pretty text-center">
          {title}
        </h1>
      </div>

      {/* Right Section - TOC Button + Page Number */}
      <div className="flex items-center gap-4 shrink-0">
        <Button
          variant="ghost"
          size="lg"
          onClick={onTocClick}
          className="text-white hover:bg-white/10 gap-2 font-medium text-xl"
        >
          <Menu className="h-7 w-7" />
          <span className="hidden sm:inline">목차</span>
        </Button>
        <div className="text-white font-semibold text-xl bg-white/10 px-5 py-2.5 rounded-md">
          {currentPage}/{totalPages}
        </div>
      </div>
    </header>
  )
}
