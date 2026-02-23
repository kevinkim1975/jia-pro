"use client"

interface DividerSlideProps {
  readonly act: number
  readonly title: string
  readonly subtitle: string
}

export function DividerSlide({ act, title, subtitle }: DividerSlideProps) {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(140deg, #004B8D 0%, #002D5A 100%)",
        fontFamily:
          "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      <style>{`
        /* ── Outer ring: slow rotation ── */
        @keyframes outerSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        /* ── Middle ring: reverse slow rotation ── */
        @keyframes middleSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        /* ── Inner ring: gentle breathing scale ── */
        @keyframes innerBreathe {
          0%, 100% { transform: scale(1); opacity: 0.12; }
          50%      { transform: scale(1.06); opacity: 0.22; }
        }
        /* ── Act number: subtle pulse ── */
        @keyframes numberPulse {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }
        /* ── Text float: gentle up-down ── */
        @keyframes textFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        /* ── Ink stroke: draw in and out ── */
        @keyframes inkDraw {
          0%   { stroke-dashoffset: 0; opacity: 0.03; }
          50%  { stroke-dashoffset: 150; opacity: 0.07; }
          100% { stroke-dashoffset: 0; opacity: 0.03; }
        }
        /* ── Tiny ring: scale pulse ── */
        @keyframes tinyRingPulse {
          0%, 100% { transform: scale(1); opacity: 0.08; }
          50%      { transform: scale(1.3); opacity: 0.16; }
        }
        /* ── Dot pulse ── */
        @keyframes dotPulse {
          0%, 100% { opacity: 0.10; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(1.5); }
        }
        /* ── Accent dots: staggered wave ── */
        @keyframes dotWave {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50%      { transform: translateY(-3px); opacity: 0.6; }
        }
        /* ── Line fragment: width breathe ── */
        @keyframes lineBreathe {
          0%, 100% { width: 60px; opacity: 0.05; }
          50%      { width: 90px; opacity: 0.12; }
        }
        /* ── ACT label: letter-spacing pulse ── */
        @keyframes labelPulse {
          0%, 100% { letter-spacing: 0.3em; opacity: 0.9; }
          50%      { letter-spacing: 0.45em; opacity: 1; }
        }
        /* ── Subtitle: gentle opacity ── */
        @keyframes subtitleGlow {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
      `}</style>

      {/* ── Faint ink stroke (top-left) ── */}
      <svg
        width="160"
        height="80"
        viewBox="0 0 160 80"
        className="absolute pointer-events-none"
        style={{ top: "5%", left: "3%", zIndex: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="inkStrokeBlur">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>
        <path
          d="M10 60 Q50 10, 90 40 T150 20"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#inkStrokeBlur)"
          strokeDasharray="300"
          strokeDashoffset="0"
          style={{ animation: "inkDraw 12s ease-in-out infinite" }}
        />
      </svg>

      {/* ── Tiny ring (top-right) ── */}
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        className="absolute pointer-events-none"
        style={{ top: "10%", right: "12%", zIndex: 0 }}
        aria-hidden="true"
      >
        <circle
          cx="15"
          cy="15"
          r="13"
          fill="none"
          stroke="rgba(157,197,187,0.08)"
          strokeWidth="1"
          style={{ animation: "tinyRingPulse 6s ease-in-out infinite" }}
        />
      </svg>

      {/* ── Small pulsing dot (bottom-right) ── */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "8%",
          right: "10%",
          width: 6,
          height: 6,
          backgroundColor: "rgba(72,169,197,0.15)",
          zIndex: 0,
          animation: "dotPulse 4s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* ── Central seal area: circles + act number ── */}
      <div className="relative" style={{ width: 240, height: 240, flexShrink: 0 }}>
        {/* Outer ring */}
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="absolute inset-0"
          style={{ animation: "outerSpin 60s linear infinite" }}
        >
          <circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke="rgba(157,197,187,0.12)"
            strokeWidth="1"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />
        </svg>

        {/* Middle ring (ink-bleed) */}
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="absolute inset-0"
          style={{ animation: "middleSpin 45s linear infinite" }}
        >
          <defs>
            <filter id="inkBleed">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
          <circle
            cx="120"
            cy="120"
            r="80"
            fill="none"
            stroke="rgba(72,169,197,0.15)"
            strokeWidth="1.5"
            filter="url(#inkBleed)"
            strokeLinecap="round"
          />
        </svg>

        {/* Inner ring */}
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="absolute inset-0"
          style={{ animation: "innerBreathe 8s ease-in-out infinite" }}
        >
          <circle
            cx="120"
            cy="120"
            r="50"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Act number centered in the rings */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: "numberPulse 5s ease-in-out infinite" }}
        >
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {act}
          </span>
        </div>
      </div>

      {/* ── Text stack (below circles) ── */}
      <div className="relative z-10 flex flex-col items-center" style={{ marginTop: 32 }}>
        {/* ACT label */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: "#48A9C5",
            textTransform: "uppercase",
            animation: "labelPulse 7s ease-in-out infinite",
          }}
        >
          ACT {act}
        </span>

        {/* Title */}
        <h2
          style={{
            fontSize: title.length > 12 ? 30 : 36,
            fontWeight: 700,
            color: "#FFFFFF",
            marginTop: 14,
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            paddingLeft: 40,
            paddingRight: 40,
            animation: "textFloat 6s ease-in-out infinite",
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "rgba(72,169,197,0.8)",
            marginTop: 10,
            textTransform: "uppercase",
            animation: "subtitleGlow 5s ease-in-out infinite",
          }}
        >
          {subtitle}
        </span>

        {/* Accent dots */}
        <div
          className="flex"
          style={{
            gap: 12,
            marginTop: 20,

          }}
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 4,
                height: 4,
                backgroundColor: "rgba(157,197,187,0.3)",
                animation: `dotWave 3s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Horizontal line fragment */}
        <div
          style={{
            width: 60,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.05)",
            marginTop: 16,
            animation: "lineBreathe 8s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}