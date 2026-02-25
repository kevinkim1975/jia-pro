/**
 * SlideHeader — 슬라이드 제목 영역 (jia-pro Base)
 *
 * ── Skeleton ──────────────────────────────────
 * 순서: accent-bar → title (순서 고정)
 * accent-bar: w-12 h-1 gradient
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능: title text, align variant
 * 고정 불변: accent-bar→title 순서, gradient 색상
 *
 * ── Absolute Rules ─────────────────────────────
 * - title 없이 accent-bar만 단독 사용 금지
 * - gradient 색상 변경 금지 (primary → secondary)
 */

import { currentTheme } from "../../../../config/theme"

const t = currentTheme

interface SlideHeaderProps {
  readonly title: string
  readonly align?: 'left' | 'center'
}

export function SlideHeader({ title, align = 'left' }: SlideHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div className={`space-y-2 ${isCenter ? 'text-center space-y-3' : ''}`}>
      <div
        className={`w-12 h-1 rounded-full ${isCenter ? 'mx-auto' : ''}`}
        style={{ background: `linear-gradient(to right, ${t.colors.primary}, ${t.colors.secondary})` }}
      />
      <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${isCenter ? '' : 'leading-tight'}`}>
        {title}
      </h2>
    </div>
  )
}
