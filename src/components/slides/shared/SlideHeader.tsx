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
 * - gradient 색상 변경 금지 (#004B8D → #48A9C5)
 */

interface SlideHeaderProps {
  readonly title: string
  readonly align?: 'left' | 'center'
}

export function SlideHeader({ title, align = 'left' }: SlideHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div className={`space-y-2 ${isCenter ? 'text-center space-y-3' : ''}`}>
      <div className={`w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full ${isCenter ? 'mx-auto' : ''}`} />
      <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${isCenter ? '' : 'leading-tight'}`}>
        {title}
      </h2>
    </div>
  )
}
