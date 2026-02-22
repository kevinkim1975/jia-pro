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
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      {/* === GEOMETRIC DECORATIVE ELEMENTS (z-0) === */}

      {/* Element 1: Large gradient circle (top-right) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-12%",
          right: "-8%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,75,141,0.15) 0%, rgba(72,169,197,0.08) 50%, transparent 70%)",
          zIndex: 0,
          animation: "fadeIn 1.2s ease-out forwards, floatDrift1 12s ease-in-out infinite",
        }}
      />

      {/* Element 2: Outlined circle (bottom-left) */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-6%",
          left: "-3%",
          width: "400px",
          height: "400px",
          border: "2px solid rgba(0,75,141,0.18)",
          borderRadius: "50%",
          background: "transparent",
          zIndex: 0,
          animation: "fadeIn 1s ease-out 0.3s forwards, floatDrift2 14s ease-in-out infinite",
        }}
      />

      {/* Element 3: Small solid circle */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "12%",
          width: "16px",
          height: "16px",
          backgroundColor: "#48A9C5",
          borderRadius: "50%",
          zIndex: 0,
          animation: "pulse 4s ease-in-out infinite, floatDrift3 10s ease-in-out infinite",
        }}
      />

      {/* Element 4: Diagonal line (top-left to center) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, animation: "lineBreath1 8s ease-in-out infinite" }}
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0"
          x2="45%"
          y2="55%"
          stroke="rgba(0,75,141,0.12)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Element 5: Diagonal line (bottom-right) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, animation: "lineBreath2 9s ease-in-out infinite" }}
        preserveAspectRatio="none"
      >
        <line
          x1="100%"
          y1="100%"
          x2="60%"
          y2="50%"
          stroke="rgba(72,169,197,0.12)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Element 6: Small diamond shape */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "35%",
          right: "18%",
          width: "28px",
          height: "28px",
          border: "2px solid rgba(0,75,141,0.25)",
          background: "transparent",
          transform: "rotate(45deg)",
          zIndex: 0,
          animation: "spinSlow 16s infinite linear",
        }}
      />

      {/* Element 7: Dotted arc (right side) */}
      <svg
        className="absolute pointer-events-none"
        style={{
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "240px",
          height: "240px",
          zIndex: 0,
        }}
      >
        <path
          d="M 240 0 A 240 240 0 0 1 240 240"
          fill="none"
          stroke="rgba(0,75,141,0.16)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          style={{
            animation: "dashOffset 12s infinite linear",
          }}
        />
      </svg>

      {/* Element 8: Horizontal thin line */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "8%",
          top: "65%",
          width: "120px",
          height: "2px",
          backgroundColor: "rgba(72,169,197,0.3)",
          zIndex: 0,
          animation: "lineSlide 10s ease-in-out infinite",
        }}
      />

      {/* Element 9: Gradient rectangle (subtle) */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "15%",
          right: "20%",
          width: "120px",
          height: "72px",
          background: "linear-gradient(135deg, rgba(0,75,141,0.1), rgba(72,169,197,0.04))",
          border: "1px solid rgba(0,75,141,0.08)",
          borderRadius: "4px",
          zIndex: 0,
          animation: "floatDrift4 11s ease-in-out infinite",
        }}
      />

      {/* === TEXT CONTENT (z-10) === */}
      <div
        className="relative flex flex-col items-center justify-center w-full h-full"
        style={{
          zIndex: 10,
          animation: "slideUp 0.8s ease-out forwards",
          opacity: 0,
          transform: "translateY(12px)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "70px",
            fontWeight: 700,
            color: "#004B8D",
            letterSpacing: "-0.025em",
            lineHeight: 1.5,
            textAlign: "center",
            margin: 0,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#48A9C5",
              letterSpacing: "0.025em",
              lineHeight: 1.5,
              textAlign: "center",
              margin: 0,
              marginTop: "10px",
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Decorative Divider */}
        <div
          className="flex items-center justify-center"
          style={{
            marginTop: "24px",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "rgba(0,75,141,0.15)",
            }}
          />
          <div
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "#004B8D",
              opacity: 0.4,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "rgba(0,75,141,0.15)",
            }}
          />
        </div>

        {/* Date */}
        <p
          style={{
            fontSize: "17.5px",
            fontWeight: 400,
            color: "#64748B",
            lineHeight: 1.5,
            textAlign: "center",
            margin: 0,
            marginTop: "20px",
          }}
        >
          {date}
        </p>

        {/* Company */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#004B8D",
            lineHeight: 1.5,
            textAlign: "center",
            margin: 0,
            marginTop: "5px",
          }}
        >
          {company}
        </p>

        {/* PROPOSAL label */}
        <p
          style={{
            fontSize: "13.75px",
            fontWeight: 600,
            color: "#CBD5E1",
            textTransform: "uppercase",
            letterSpacing: "0.375em",
            lineHeight: 1.5,
            textAlign: "center",
            margin: 0,
            marginTop: "40px",
          }}
        >
          PROPOSAL
        </p>
      </div>

      {/* === CSS KEYFRAMES === */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spinSlow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }

        @keyframes dashOffset {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -120; }
        }

        @keyframes floatDrift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-17px, 12px); }
        }

        @keyframes floatDrift2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(14px, -8px); }
        }

        @keyframes floatDrift3 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(8px, -12px); }
          66% { transform: translate(-6px, 7px); }
        }

        @keyframes floatDrift4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, 12px) rotate(2.9deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.24; transform: scale(0.78); }
        }

        @keyframes lineBreath1 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.32; }
        }

        @keyframes lineBreath2 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.26; }
        }

        @keyframes lineSlide {
          0%, 100% { transform: translateX(0); width: 120px; }
          50% { transform: translateX(22px); width: 77px; }
        }
      `}</style>
    </div>
  )
}
