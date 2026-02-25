"use client"

import { currentTheme } from "../../../config/theme"

const t = currentTheme

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CardItem {
  readonly title: string
  readonly subtitle?: string
  readonly description?: string
}

interface CardsSlideProps {
  readonly title: string
  readonly cards: readonly CardItem[]
  readonly bottomMessage?: string
  readonly tone?: "positive" | "negative" | "neutral"
}

// ============================================================================
// DESIGN TOKENS — #F6F8FA background, white sharp cards
// ============================================================================

type Tone = NonNullable<CardsSlideProps["tone"]>

interface ToneColors {
  readonly cardBg: string
  readonly cardBorder: string
  readonly accentFrom: string
  readonly accentTo: string
  readonly titleColor: string
  readonly subtitleColor: string
  readonly bottomBorder: string
  readonly bottomBg: string
}

const TONE_MAP: Record<Tone, ToneColors> = {
  positive: {
    cardBg: t.colors.white,
    cardBorder: t.colors.borderCard,
    accentFrom: t.colors.primary,
    accentTo: t.colors.secondary,
    titleColor: t.colors.primary,
    subtitleColor: t.colors.secondary,
    bottomBorder: t.colors.primary,
    bottomBg: "rgba(0, 75, 141, 0.04)",
  },
  neutral: {
    cardBg: t.colors.white,
    cardBorder: t.colors.borderCard,
    accentFrom: t.colors.neutral[600],
    accentTo: t.colors.neutral[400],
    titleColor: t.colors.neutral[600],
    subtitleColor: t.colors.neutral[500],
    bottomBorder: t.colors.neutral[600],
    bottomBg: "rgba(100, 116, 139, 0.04)",
  },
  negative: {
    cardBg: t.colors.white,
    cardBorder: t.colors.borderCard,
    accentFrom: t.colors.neutral[600],
    accentTo: t.colors.neutral[400],
    titleColor: t.colors.neutral[600],
    subtitleColor: t.colors.neutral[500],
    bottomBorder: t.colors.neutral[600],
    bottomBg: "rgba(100, 116, 139, 0.04)",
  },
}

// ============================================================================
// HELPERS
// ============================================================================

function hasDescription(desc: string | undefined): desc is string {
  return typeof desc === "string" && desc.trim() !== ""
}

function hasSubtitle(sub: string | undefined): sub is string {
  return typeof sub === "string" && sub.length > 0
}

function formatOrdinal(index: number): string {
  return String(index + 1).padStart(2, "0")
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CardsSlide({
  title,
  cards,
  bottomMessage,
  tone = "positive",
}: CardsSlideProps) {
  const colors: ToneColors = TONE_MAP[tone]
  const gridCols = cards.length <= 3 ? "grid-cols-3" : "grid-cols-4"

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        fontFamily: t.typography.fontFamily,
        background: t.colors.surfaceAlt,
        aspectRatio: "16 / 9",
      }}
    >
      <style>{`
        @keyframes cardsFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardsAccentBar {
          from { opacity: 0; width: 0; }
          to   { opacity: 1; width: 48px; }
        }
        @keyframes cardsTitleFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cardsBottomFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Content directly on #F6F8FA — no wrapper box */}
      <div
        className="relative flex flex-col h-full"
        style={{ zIndex: 10, padding: "6% 6% 5%" }}
      >
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              width: 48,
              height: 3,
              background: `linear-gradient(90deg, ${colors.accentFrom}, ${colors.accentTo})`,
              marginBottom: 14,
              animation: "cardsAccentBar 0.4s ease-out both",
            }}
          />
          <h2
            className="text-pretty"
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: t.colors.neutral[900],
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              animation: "cardsTitleFade 0.5s ease-out 0.1s both",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Card Grid — sharp corners */}
        <div
          className={`grid ${gridCols} flex-1`}
          style={{ gap: 20, alignItems: "stretch" }}
        >
          {cards.map((card: CardItem, index: number) => (
            <div
              key={index}
              className="flex flex-col"
              style={{
                position: "relative",
                overflow: "hidden",
                background: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                borderTop: "none",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
                padding: "24px 24px 28px",
                animation: `cardsFadeIn 0.5s ease-out ${0.2 + index * 0.1}s both`,
                minHeight: 0,
              }}
            >
              {/* Top accent bar */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${colors.accentFrom}, ${colors.accentTo})`,
                  zIndex: 1,
                }}
              />

              {/* Ordinal */}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(0, 75, 141, 0.28)",
                  letterSpacing: "0.05em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatOrdinal(index)}
              </span>

              {/* Title */}
              <div
                suppressHydrationWarning
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: colors.titleColor,
                  marginTop: 14,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  wordBreak: "keep-all",
                }}
              >
                {card.title}
              </div>

              {/* Subtitle */}
              {hasSubtitle(card.subtitle) && (
                <div
                  suppressHydrationWarning
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: colors.subtitleColor,
                    marginTop: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {card.subtitle}
                </div>
              )}

              {/* Description */}
              {hasDescription(card.description) && (
                <>
                  <div
                    style={{
                      height: 1,
                      background: t.colors.neutral[200],
                      marginTop: 12,
                      marginBottom: 10,
                    }}
                  />
                  <div
                    suppressHydrationWarning
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: t.colors.neutral[500],
                      lineHeight: 1.5,
                    }}
                  >
                    {card.description}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        {bottomMessage && (
          <div
            style={{
              marginTop: 16,
              paddingLeft: 16,
              paddingTop: 14,
              paddingBottom: 14,
              paddingRight: 20,
              borderLeft: `3px solid ${colors.bottomBorder}`,
              background: colors.bottomBg,
              animation: "cardsBottomFade 0.4s ease-out 0.6s both",
            }}
          >
            <p
              suppressHydrationWarning
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: t.colors.neutral[700],
                lineHeight: 1.5,
              }}
            >
              {bottomMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// SAMPLE DATA & DEFAULT EXPORT
// ============================================================================

const sampleData: CardsSlideProps = {
  title: "호원앤컴퍼니 CRM 연혁",
  cards: [
    {
      title: "2003",
      subtitle: "서울대 분당병원",
      description: "CRM 개발",
    },
    {
      title: "2004",
      subtitle: "초이스피부과",
      description: "로컬 최초",
    },
    {
      title: "현재",
      subtitle: "150개 기관",
      description: "운영",
    },
    {
      title: "2025.12",
      subtitle: "AI CRM",
      description: "개발 5개 시범",
    },
  ],
  bottomMessage:
    "\u201C20년간 의료기관 CRM을 만들어 왔습니다\u201D",
  tone: "positive",
}

export default function CardsSlidePreview() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: t.colors.surfaceAlt }}
    >
      <div style={{ width: "100%", maxWidth: 1100, padding: "40px" }}>
        <CardsSlide {...sampleData} />
      </div>
    </div>
  )
}
