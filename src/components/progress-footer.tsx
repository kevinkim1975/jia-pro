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
      <div className="h-14 flex items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Previous Button */}
        <Button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="h-9 px-4 gap-2 font-semibold text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">이전</span>
        </Button>

        {/* Current Page Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            페이지
          </span>
          <span className="text-xl font-bold text-primary">
            {currentPage}
          </span>
        </div>

        {/* Next Button */}
        <Button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="h-9 px-4 gap-2 font-semibold text-white bg-secondary hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm">다음</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  )
}
