/**
 * DividerSlide — ACT 구분(간지) 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: bg-watermark(숫자) → ACT label → title → subtitle → gradient-bar
 * 배경: SLIDE_TOKEN_MAP.divider.bg (primary 계열, SlideWrapper가 처리)
 * 정렬: 항상 center
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - act: number (ACT 번호)
 *   - title: string (한글 제목)
 *   - subtitle: string (영문 부제)
 *
 * 고정 (절대 불변):
 *   - 워터마크 숫자 (180px, 3% opacity)
 *   - "ACT N" 라벨 형식
 *   - 하단 gradient bar (from-[#004B8D] to-[#48A9C5])
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 워터마크: "text-[180px] font-black text-[#004B8D]/[0.03]"
 * ACT 라벨: "text-xs font-semibold tracking-[0.4em] text-[#48A9C5] uppercase"
 * 제목: "text-4xl md:text-5xl font-bold text-[#004B8D]"
 * 부제: "text-base md:text-lg font-light text-[#48A9C5] tracking-wide"
 */

interface DividerSlideProps {
  readonly act: number
  readonly title: string
  readonly subtitle: string
}

export function DividerSlide({ act, title, subtitle }: DividerSlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[180px] font-black text-[#004B8D]/[0.03] leading-none">
          {act}
        </span>
      </div>

      <div className="relative z-10 text-center space-y-4">
        <span className="inline-block text-xs font-semibold tracking-[0.4em] text-[#48A9C5] uppercase">
          ACT {act}
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-[#004B8D] leading-none">
          {title}
        </h1>

        <p className="text-base md:text-lg font-light text-[#48A9C5] tracking-wide">
          {subtitle}
        </p>

        <div className="pt-4 flex justify-center">
          <div className="w-12 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        </div>
      </div>
    </div>
  )
}
