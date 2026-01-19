"use client"

import { useState, useCallback, useEffect } from "react"
import { TopbarHeader } from "./topbar-header"
import { ProgressFooter } from "./progress-footer"
import { SlideRenderer } from "./slide-renderers"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { proposal, getSlideByPage, getTocItems } from "@/data/proposal-data"

export function ProposalViewer() {
  const [currentPage, setCurrentPage] = useState(1)
  const [tocOpen, setTocOpen] = useState(false)
  const totalPages = proposal.totalPages

  // 현재 슬라이드 가져오기
  const currentSlide = getSlideByPage(currentPage)
  const tocItems = getTocItems()

  // 네비게이션 핸들러 (functional setState - Vercel best practice)
  const handlePrevious = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }, [totalPages])

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault()
        handleNext()
      } else if (e.key === "Home") {
        e.preventDefault()
        setCurrentPage(1)
      } else if (e.key === "End") {
        e.preventDefault()
        setCurrentPage(totalPages)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlePrevious, handleNext, totalPages])

  const handleTocClick = () => {
    setTocOpen(true)
  }

  const handlePageSelect = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setTocOpen(false)
  }

  // 현재 ACT 찾기
  const currentAct = currentSlide?.act || 1

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top Bar */}
      <TopbarHeader
        currentPage={currentPage}
        totalPages={totalPages}
        onTocClick={handleTocClick}
        title={`${proposal.clientName} 마케팅 전략 제안`}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div>
            <div className="p-8 md:p-12 lg:p-16 min-h-[600px]">
              {currentSlide ? (
                <SlideRenderer
                  content={currentSlide.content}
                  onNavigate={handlePageSelect}
                />
              ) : (
                <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
                  <p>페이지를 불러오는 중...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Progress Footer */}
      <ProgressFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* Table of Contents Sidebar */}
      <Sheet open={tocOpen} onOpenChange={setTocOpen}>
        <SheetContent side="right" className="w-[320px] sm:w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold text-primary">
              목차
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-1">
            {/* ACT별로 그룹화된 목차 */}
            {tocItems.map((item) => (
              <button
                key={item.pageNumber}
                onClick={() => handlePageSelect(item.pageNumber)}
                className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                  currentAct === item.act
                    ? "bg-primary text-white"
                    : "hover:bg-surface text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentAct === item.act
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {item.act}
                    </span>
                    <div>
                      <span className="font-medium block">{item.title}</span>
                      <span className={`text-xs ${
                        currentAct === item.act ? "text-white/70" : "text-muted-foreground"
                      }`}>
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className={`text-sm ${
                    currentAct === item.act ? "text-white/70" : "text-muted-foreground"
                  }`}>
                    p.{item.pageNumber}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 빠른 이동 */}
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">빠른 이동</h4>
            <div className="grid grid-cols-5 gap-2">
              {[1, 10, 20, 30, 40, 50].filter(p => p <= totalPages).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageSelect(pageNum)}
                  className={`p-2 rounded text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-primary text-white"
                      : "bg-surface hover:bg-primary/10 text-foreground"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </div>

          {/* 단축키 안내 */}
          <div className="mt-6 p-4 bg-surface rounded-lg">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">키보드 단축키</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>← / → : 이전/다음 페이지</li>
              <li>Space : 다음 페이지</li>
              <li>Home / End : 처음/끝으로</li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
