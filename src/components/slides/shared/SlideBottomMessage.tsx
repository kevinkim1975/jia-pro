/**
 * SlideBottomMessage — 슬라이드 하단 강조 메시지 (jia-pro Base)
 *
 * ── Skeleton ──────────────────────────────────
 * 구조: rounded-xl container → message text
 * 배경: gradient primary/10 → secondary/10
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
import { currentTheme } from "../../../../config/theme"

const t = currentTheme

interface SlideBottomMessageProps {
  readonly children: ReactNode
  readonly icon?: ReactNode
}

export function SlideBottomMessage({ children, icon }: SlideBottomMessageProps) {
  return (
    <div
      className="flex items-start gap-4 p-5 rounded-xl border-l-4"
      style={{
        background: `linear-gradient(to right, ${t.colors.primary}1A, ${t.colors.secondary}1A)`,
        borderColor: t.colors.primary,
      }}
    >
      {icon}
      <p className="text-xl font-semibold" style={{ color: t.colors.primary }}>
        {children}
      </p>
    </div>
  )
}
