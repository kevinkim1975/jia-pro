/**
 * ChartSlide — 차트/그래프 슬라이드
 *
 * ── Skeleton (고정 불변) ──────────────────────
 * 구조: header → chart-card(ResponsiveContainer) → highlight? → description?
 * 배경: SLIDE_TOKEN_MAP.chart.bg (surface 계열)
 * 정렬: left header
 *
 * ── Exchange Table ─────────────────────────────
 * 교체 가능 (Props):
 *   - title: string
 *   - chart: ChartData (line | bar | pie)
 *   - highlight?: string (하단 강조)
 *   - description?: string (설명)
 *
 * 고정 (절대 불변):
 *   - recharts 기반 렌더링 (동적 로딩)
 *   - CHART_COLORS 팔레트 (#004B8D, #48A9C5, #10B981, #F59E0B, #EF4444)
 *   - highlight → emerald 톤 border-l-4
 *
 * ── Tailwind 패턴 (확정값) ──────────────────────
 * 차트 카드: "p-6 border-2 border-gray-100 bg-white shadow-sm"
 * highlight: "p-5 rounded-xl bg-gradient-to-r from-[#10B981]/10 to-[#48A9C5]/10 border-l-4 border-[#10B981]"
 *
 * ── 번들 최적화 ──────────────────────────────
 * recharts를 포함하므로 dynamic import + ssr:false로 사용.
 * slides/index.ts에서 이 파일을 dynamic()으로 로딩한다.
 */
"use client"

export { ChartSlide } from "../chart-slide"
