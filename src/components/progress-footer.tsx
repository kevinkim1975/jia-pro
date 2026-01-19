"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  const progress = (currentPage / totalPages) * 100

  return (
    <footer className="shrink-0 border-t border-border bg-white">
      {/* Progress Bar */}
      <div className="h-1 w-full bg-surface">
        <div
          className="h-full transition-all duration-300 bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="h-[130px] flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Previous Button */}
        <Button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="h-14 px-8 gap-3 font-semibold text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="text-lg">이전 페이지</span>
        </Button>

        {/* Current Page Indicator */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-muted-foreground">
            현재 페이지
          </span>
          <span className="text-4xl font-bold text-primary">
            {currentPage}
          </span>
        </div>

        {/* Next Button */}
        <Button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="h-14 px-8 gap-3 font-semibold text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg">다음 페이지</span>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </footer>
  )
}
