/**
 * TocSlide — 목차 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: badge-header → title → toc-list(button×N)
 * 배경: SLIDE_TOKEN_MAP.toc.bg (surface 계열)
 * 정렬: center header, left-aligned list items
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - items: TocItem[] (act, title, startPage)
 *   - onNavigate?: (page) => void
 *
 * 고정 (절대 불변):
 *   - "Contents" 뱃지 상단 고정
 *   - ACT 번호 gradient box (from-[#004B8D] to-[#48A9C5])
 *   - hover 시 border + bg 변화
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 뱃지: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#004B8D]/10"
 * 리스트 버튼: "group w-full flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white"
 * ACT 번호: "w-10 h-10 rounded-lg bg-gradient-to-br from-[#004B8D] to-[#48A9C5] text-white"
 */

import { ChevronRight } from "lucide-react"

interface TocItem {
  readonly act: number
  readonly title: string
  readonly startPage: number
}

interface TocSlideProps {
  readonly items: readonly TocItem[]
  readonly onNavigate?: (page: number) => void
}

export function TocSlide({ items, onNavigate }: TocSlideProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#004B8D]/10 mb-2">
          <span className="text-xs font-semibold text-[#004B8D] uppercase tracking-wider">Contents</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#004B8D]">목차</h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-2">
        {items.map((item) => (
          <button
            key={item.act}
            onClick={() => onNavigate?.(item.startPage)}
            className="group w-full flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-[#004B8D]/30 hover:bg-[#004B8D]/5 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#004B8D] to-[#48A9C5] text-white font-bold text-base flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              {item.act}
            </div>
            <div className="flex-1 text-left">
              <span className="text-base font-semibold text-gray-800 group-hover:text-[#004B8D] transition-colors duration-200">
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400 group-hover:text-[#48A9C5] transition-colors">
                p.{item.startPage}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#004B8D] group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
