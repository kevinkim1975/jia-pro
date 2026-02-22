/**
 * SlideBottomMessage — 슬라이드 하단 강조 메시지 (jia-pro Base)
 *
 * ── Skeleton ──────────────────────────────────
 * 구조: rounded-xl container → message text
 * 배경: gradient from-[#004B8D]/10 to-[#48A9C5]/10
 * 좌측: 4px primary border
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능: message text, icon (optional)
 * 고정 불변: gradient 배경, border-l-4, padding
 *
 * ── Absolute Rules ─────────────────────────────
 * - 배경 gradient 색상 변경 금지
 * - border-l-4 제거 금지
 */

import type { ReactNode } from "react"

interface SlideBottomMessageProps {
  readonly children: ReactNode
  readonly icon?: ReactNode
}

export function SlideBottomMessage({ children, icon }: SlideBottomMessageProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-[#004B8D]/10 to-[#48A9C5]/10 border-l-4 border-[#004B8D]">
      {icon}
      <p className="text-xl font-semibold text-[#004B8D]">
        {children}
      </p>
    </div>
  )
}
