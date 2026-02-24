"use client"

interface CoverSlideProps {
  readonly title: string
  readonly subtitle?: string
  readonly date: string
  readonly company: string
}

export function CoverSlide({ title, subtitle, date, company }: CoverSlideProps) {
  return (
    <div
      style={{
        width: 1280,
        height: 720,
        fontFamily:
          "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
        display: "flex",
      }}
    >
      {/* ── CSS Keyframes ── */}
      <style>{`
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        @keyframes dividerGrow {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate(calc(-50% + 40px), calc(-50% + 115px)); }
          50% { transform: translate(calc(-50% + 46px), calc(-50% + 105px)); }
        }
        @keyframes arcPulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.14; transform: scale(1.04); }
        }
        @keyframes hexRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Left Color Block (~40%) ── */}
      <div
        style={{
          width: "40%",
          height: "100%",
          background: "linear-gradient(160deg, #001529 0%, #003366 40%, #004B8D 100%)",
          position: "relative",
          animation: "slideInFromLeft 500ms ease-out 0ms both",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Decorative: Large year watermark */}
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(calc(-50% + 40px), calc(-50% + 115px))",
            fontSize: 120,
            fontWeight: 900,
            color: "rgba(255,255,255,0.06)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            animation: "floatSlow 12s ease-in-out infinite",
          }}
        >
          2026
        </span>

        {/* Decorative: Arc element */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 40,
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px solid rgba(72,169,197,0.12)",
            animation: "arcPulse 14s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Decorative: Small circle */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 60,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(72,169,197,0.08)",
            animation: "arcPulse 10s ease-in-out infinite 2s",
            pointerEvents: "none",
          }}
        />

        {/* PROPOSAL label — vertical */}
        <span
          style={{
            position: "absolute",
            bottom: 63,
            right: 32,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.18)",
            textTransform: "uppercase" as const,
            writingMode: "vertical-rl" as const,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          PROPOSAL
        </span>
      </div>

      {/* ── Divider Line ── */}
      <div
        style={{
          width: 1,
          height: "100%",
          position: "relative",
          flexShrink: 0,
          transformOrigin: "center top",
          animation: "dividerGrow 400ms ease-out 300ms both",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent 0%, #48A9C5 30%, #48A9C5 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Right Text Area (~60%) ── */}
      <div
        style={{
          flex: 1,
          height: "100%",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "center",
          paddingLeft: 64,
          paddingRight: 48,
          position: "relative",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#004B8D",
            lineHeight: 1.15,
            margin: 0,
            animation: "fadeInRight 500ms ease-out 500ms both",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#48A9C5",
              margin: 0,
              marginTop: 14,
              animation: "fadeInRight 500ms ease-out 600ms both",
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Horizontal divider accent */}
        <div
          style={{
            width: 72,
            height: 2,
            background: "linear-gradient(to right, #004B8D, #48A9C5)",
            marginTop: 28,
            borderRadius: 1,
            animation: "fadeIn 400ms ease-out 700ms both",
          }}
        />

        {/* Date */}
        <p
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "#64748B",
            margin: 0,
            marginTop: 28,
            animation: "fadeIn 400ms ease-out 800ms both",
          }}
        >
          {date}
        </p>

        {/* Company */}
        <p
          style={{
            fontSize: 19,
            fontWeight: 600,
            color: "#004B8D",
            margin: 0,
            marginTop: 6,
            animation: "fadeIn 400ms ease-out 900ms both",
          }}
        >
          {company}
        </p>

        {/* Decorative: Rotating hexagon — top-right corner */}
        <svg
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            top: 32,
            right: 36,
            width: 72,
            height: 72,
            animation: "hexRotate 30s linear infinite",
            pointerEvents: "none",
          }}
        >
          <polygon
            points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
            fill="none"
            stroke="rgba(0,75,141,0.12)"
            strokeWidth="1.5"
          />
          <polygon
            points="50 18, 78 33, 78 67, 50 82, 22 67, 22 33"
            fill="none"
            stroke="rgba(72,169,197,0.15)"
            strokeWidth="1"
          />
        </svg>

        {/* Bottom-right subtle accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 48,
            width: 48,
            height: 2,
            background: "linear-gradient(to right, #48A9C5, rgba(72,169,197,0.2))",
            borderRadius: 1,
            animation: "fadeIn 400ms ease-out 1000ms both",
          }}
        />
      </div>
    </div>
  )
}
