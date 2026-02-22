/**
 * ClosingSlide — 마감 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: bg-decoration → title → subtitle → gradient-bar → contact
 * 배경: SLIDE_TOKEN_MAP.closing.bg (primary 계열, SlideWrapper가 처리)
 * 정렬: 항상 center
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - title: string
 *   - subtitle: string
 *   - contact: { email, person }
 *   - company: string
 *
 * 고정 (절대 불변):
 *   - 배경 blur 장식 원 2개
 *   - gradient bar (from-[#004B8D] to-[#48A9C5])
 *   - center 정렬
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 제목: "text-6xl md:text-7xl lg:text-8xl font-bold text-[#004B8D]"
 * 부제: "text-xl md:text-2xl text-gray-600"
 * 회사: "text-lg font-semibold text-[#004B8D]"
 * 이메일: "text-[#48A9C5]"
 */

interface ClosingSlideProps {
  readonly title: string
  readonly subtitle: string
  readonly contact: {
    readonly email: string
    readonly person: string
  }
  readonly company: string
}

export function ClosingSlide({ title, subtitle, contact, company }: ClosingSlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#004B8D]/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#48A9C5]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center space-y-8 px-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#004B8D] leading-none">
          {title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="py-6 flex justify-center">
          <div className="w-20 h-1 bg-gradient-to-r from-[#004B8D] to-[#48A9C5] rounded-full" />
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-lg font-semibold text-[#004B8D]">{company}</p>
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <p>{contact.person}</p>
            <p className="text-[#48A9C5]">{contact.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
