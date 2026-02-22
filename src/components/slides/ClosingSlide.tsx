"use client"

import { useEffect, useState } from "react"

interface ClosingSlideProps {
  readonly title: string
  readonly subtitle: string
  readonly company: string
}

const sampleData = {
  title: "감사합니다",
  subtitle: "맞는 방향이 올바른 프로세스를 만날 때,\n성공하는 의료기관을 만듭니다.",
  company: "호원앤컴퍼니",
}

export function ClosingSlide({
  title = sampleData.title,
  subtitle = sampleData.subtitle,
  company = sampleData.company,
}: Partial<ClosingSlideProps>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        fontFamily:
          "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        minHeight: "560px",
        padding: "64px 0",
      }}
    >
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes horizontalReveal {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes expandContract {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes dashRotate {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 251; }
        }
        @keyframes orbitSlow {
          from { transform: rotate(0deg) translateX(18px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes scaleRotate {
          0% { transform: scale(0.85) rotate(0deg); }
          50% { transform: scale(1.15) rotate(90deg); }
          100% { transform: scale(0.85) rotate(180deg); }
        }
        @keyframes rotateReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .geo-fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        .geo-fade-d1 { animation-delay: 0.2s; }
        .geo-fade-d2 { animation-delay: 0.4s; }
        .geo-fade-d3 { animation-delay: 0.6s; }
        .geo-fade-d4 { animation-delay: 0.8s; }
        .geo-fade-d5 { animation-delay: 1.0s; }
        .geo-fade-d6 { animation-delay: 1.2s; }

        .closing-fade-title { opacity: 0; animation: fadeIn 0.6s ease-out 0.2s forwards; }
        .closing-fade-subtitle { opacity: 0; animation: fadeIn 0.6s ease-out 0.4s forwards; }
        .closing-fade-rule { opacity: 0; animation: fadeIn 0.6s ease-out 0.5s forwards; }
        .closing-fade-company { opacity: 0; animation: fadeIn 0.6s ease-out 0.6s forwards; }
        .closing-rule-reveal { animation: horizontalReveal 0.8s ease-out 0.5s forwards; }
      `}</style>

      {/* ===== GEOMETRIC PATTERNS ===== */}

      {/* 1. Vertical accent line (left edge) - gradient stroke draw */}
      <div
        className="absolute pointer-events-none"
        style={{ left: "3.5%", top: "10%", height: "55%", zIndex: 0 }}
      >
        <svg width="2" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="cl-line-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#004B8D" />
              <stop offset="100%" stopColor="#48A9C5" />
            </linearGradient>
          </defs>
          <line x1="1" y1="0" x2="1" y2="100" stroke="url(#cl-line-g)" strokeWidth="2" strokeLinecap="round"
            pathLength="1" strokeDasharray="1" strokeDashoffset="1"
            style={{ animation: "drawLine 1s ease-out 0.3s forwards" }} />
        </svg>
      </div>

      {/* 2. Large dashed circle - slowly rotating (top-right) */}
      <div
        className="absolute pointer-events-none geo-fade-in geo-fade-d1"
        style={{ top: "2%", right: "8%", width: "120px", height: "120px", zIndex: 0 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="55" fill="none"
            stroke="rgba(0, 75, 141, 0.25)" strokeWidth="1.2" strokeDasharray="8 10"
            style={{ animation: "dashRotate 25s linear infinite", transformOrigin: "60px 60px" }} />
        </svg>
      </div>

      {/* 3. Spinning diamond (bottom-right) */}
      <div
        className="absolute pointer-events-none geo-fade-in geo-fade-d2"
        style={{ bottom: "8%", right: "10%", width: "40px", height: "40px", zIndex: 0 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40"
          style={{ animation: "spinSlow 20s linear infinite", transformOrigin: "20px 20px" }}>
          <rect x="6" y="6" width="28" height="28" fill="none"
            stroke="rgba(0, 75, 141, 0.35)" strokeWidth="1.5" transform="rotate(45 20 20)" />
        </svg>
      </div>

      {/* 4. Concentric circles - expanding/contracting (center-right) */}
      <div
        className="absolute pointer-events-none geo-fade-in geo-fade-d2"
        style={{ top: "35%", right: "14%", width: "80px", height: "80px", zIndex: 0,
          animation: "expandContract 7s ease-in-out infinite, fadeIn 0.8s ease-out 0.4s forwards" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(0, 75, 141, 0.2)" strokeWidth="1" />
          <circle cx="40" cy="40" r="24" fill="none" stroke="rgba(0, 75, 141, 0.15)" strokeWidth="1" />
          <circle cx="40" cy="40" r="12" fill="none" stroke="rgba(0, 75, 141, 0.1)" strokeWidth="1" />
        </svg>
      </div>

      {/* 5. Orbiting dot (top center) */}
      <div
        className="absolute pointer-events-none geo-fade-in geo-fade-d3"
        style={{ top: "5%", left: "45%", width: "48px", height: "48px", zIndex: 0 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="2" fill="rgba(0, 75, 141, 0.25)" />
          <circle cx="24" cy="6" r="3.5" fill="rgba(72, 169, 197, 0.4)"
            style={{ animation: "orbitSlow 14s linear infinite", transformOrigin: "24px 24px" }} />
        </svg>
      </div>

      {/* 6. Swaying hexagon (right upper) */}
      <div
        className="absolute pointer-events-none geo-fade-in geo-fade-d4"
        style={{ top: "18%", right: "4%", zIndex: 0, transformOrigin: "center center",
          animation: "sway 6s ease-in-out infinite, fadeIn 0.8s ease-out 0.8s forwards" }}
      >
        <svg width="48" height="54" viewBox="0 0 48 54">
          <polygon points="24,2 46,14 46,40 24,52 2,40 2,14"
            fill="none" stroke="rgba(0, 75, 141, 0.22)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 7. Rotating square (bottom center) */}
      <div
        className="absolute pointer-events-none geo-fade-in geo-fade-d5"
        style={{ bottom: "6%", left: "42%", zIndex: 0 }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32"
          style={{ animation: "scaleRotate 10s ease-in-out infinite", transformOrigin: "16px 16px" }}>
          <rect x="4" y="4" width="24" height="24" fill="none"
            stroke="rgba(72, 169, 197, 0.3)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 8. Dashed arc - swaying (top-left corner) */}
      <div
        className="absolute pointer-events-none geo-fade-in geo-fade-d2"
        style={{ top: "2%", left: "8%", zIndex: 0, transformOrigin: "center center",
          animation: "sway 8s ease-in-out infinite, fadeIn 0.8s ease-out 0.4s forwards" }}
      >
        <svg width="60" height="40" viewBox="0 0 60 40">
          <path d="M 4 36 A 36 36 0 0 1 56 36" fill="none"
            stroke="rgba(0, 75, 141, 0.2)" strokeWidth="1.2" strokeDasharray="5 5" />
        </svg>
      </div>

      {/* 9. Reverse-spinning ring (bottom-left) */}
      <div
        className="absolute pointer-events-none geo-fade-in geo-fade-d6"
        style={{ bottom: "4%", left: "25%", zIndex: 0 }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50"
          style={{ animation: "rotateReverse 30s linear infinite", transformOrigin: "25px 25px" }}>
          <circle cx="25" cy="25" r="22" fill="none"
            stroke="rgba(72, 169, 197, 0.2)" strokeWidth="1" strokeDasharray="3 8" />
        </svg>
      </div>

      {/* 10. Subtle gradient blur (top-right) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-8%", right: "0%", width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(72, 169, 197, 0.06) 0%, transparent 65%)",
          filter: "blur(50px)", zIndex: 0,
        }}
      />

      {/* ===== CONTENT AREA ===== */}
      <div
        className="relative flex flex-col justify-between"
        style={{ zIndex: 10, minHeight: "420px", paddingLeft: "8%", paddingRight: "8%" }}
      >
        <div style={{ maxWidth: "62%" }}>
          <h1
            className={mounted ? "closing-fade-title" : ""}
            style={{
              fontSize: "60px", fontWeight: 700, color: "#004B8D",
              letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
              opacity: mounted ? undefined : 0,
            }}
          >
            {title}
          </h1>

          <p
            className={mounted ? "closing-fade-subtitle" : ""}
            style={{
              fontSize: "21px", fontWeight: 400, color: "#475569",
              lineHeight: 1.7, whiteSpace: "pre-line",
              margin: 0, marginBlockStart: "22px",
              opacity: mounted ? undefined : 0,
            }}
          >
            {subtitle}
          </p>

          <div
            className={mounted ? "closing-fade-rule" : ""}
            style={{ marginTop: "40px", height: "1px", maxWidth: "30%", overflow: "hidden", opacity: mounted ? undefined : 0 }}
          >
            <div
              className={mounted ? "closing-rule-reveal" : ""}
              style={{
                height: "1px",
                background: "linear-gradient(to right, #004B8D, transparent)",
                width: mounted ? undefined : "0%",
              }}
            />
          </div>
        </div>

        <div
          className={mounted ? "closing-fade-company" : ""}
          style={{ alignSelf: "flex-end", marginTop: "80px", opacity: mounted ? undefined : 0 }}
        >
          <span style={{ fontSize: "18px", fontWeight: 600, color: "#004B8D", letterSpacing: "0.01em" }}>
            {company}
          </span>
        </div>
      </div>
    </div>
  )
}
