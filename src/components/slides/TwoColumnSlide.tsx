"use client"

/**
 * TwoColumnSlide — "Elevated Panels" Design
 *
 * Boris Cherny의 TypeScript 설계 원칙 적용:
 * 1. readonly를 통한 불변성 보장 — props는 절대 변이되지 않음
 * 2. 타입 좁히기(narrowing)로 옵셔널 필드의 안전한 처리
 * 3. 각 함수/컴포넌트의 타입 시그니처가 곧 문서
 */

import { useEffect, useState } from "react"
import { currentTheme } from "../../../config/theme"

const t = currentTheme

// ─── Step 1: 타입 정의 (Type-Level Design) ───────────────────────
// Boris Cherny: "타입은 코드의 첫 번째 설계 문서다."
// readonly를 통해 이 데이터가 절대 변이되지 않음을 컴파일 타임에 보장한다.

interface ColumnData {
  readonly title: string
  readonly items: readonly string[]
  readonly highlight?: string // 11개 슬라이드 중 1개만 사용 — 옵셔널의 정당한 사용
}

interface TwoColumnSlideProps {
  readonly title: string
  readonly left: ColumnData
  readonly right: ColumnData
  readonly bottomMessage?: string
}

// ─── Step 2: 칼럼 "identity" 타입 ────────────────────────────────
// Boris Cherny: "유니온 타입은 '가능한 상태의 집합'을 정확하게 표현한다."
// left와 right 각각의 색상 identity를 타입 수준에서 구분한다.

type ColumnSide = "left" | "right"

/** 주어진 side에 대한 색상 팔레트를 반환 — 순수 함수, 부수효과 없음 */
function getColumnColors(side: ColumnSide) {
  return side === "left"
    ? {
        accent: t.colors.primary,
        bgTint: "rgba(0, 75, 141, 0.03)",
        border: "rgba(0, 75, 141, 0.10)",
        separatorColor: "rgba(0, 75, 141, 0.15)",
        highlightBg: "rgba(0, 75, 141, 0.06)",
        bulletColor: t.colors.primary,
      }
    : {
        accent: t.colors.secondary,
        bgTint: "rgba(72, 169, 197, 0.03)",
        border: "rgba(72, 169, 197, 0.10)",
        separatorColor: "rgba(72, 169, 197, 0.15)",
        highlightBg: "rgba(72, 169, 197, 0.07)",
        bulletColor: t.colors.secondary,
      }
}

// ─── Step 3: 서브 컴포넌트 — 단일 책임 원칙 ─────────────────────
// Boris Cherny: "작은 함수, 작은 타입, 명확한 계약."

/** 카드 내부의 하이라이트 "hero badge" — highlight가 있을 때만 렌더링 */
function HighlightBadge({
  text,
  backgroundColor,
  textColor,
}: {
  readonly text: string
  readonly backgroundColor: string
  readonly textColor: string
}) {
  return (
    <div
      className="px-5 py-3 mb-4"
      style={{ backgroundColor }}
    >
      <p
        className="text-2xl font-bold"
        style={{ color: textColor, fontFamily: t.typography.fontFamily }}
      >
        {text}
      </p>
    </div>
  )
}

/** 리스트 아이템 하나 — 불릿 + 텍스트 */
function ListItem({
  text,
  bulletColor,
}: {
  readonly text: string
  readonly bulletColor: string
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-2 shrink-0 rounded-full"
        style={{
          width: 7,
          height: 7,
          backgroundColor: bulletColor,
          boxShadow: `0 0 0 2px white, 0 0 0 3px ${bulletColor}`,
        }}
        aria-hidden="true"
      />
      <span
        className="text-base leading-relaxed"
        style={{ color: t.colors.neutral[700], fontFamily: t.typography.fontFamily }}
      >
        {text}
      </span>
    </li>
  )
}

/** 하나의 "Elevated Panel" 카드 */
function ColumnCard({
  data,
  side,
  animationDelay,
}: {
  readonly data: ColumnData
  readonly side: ColumnSide
  readonly animationDelay: string
}) {
  const colors = getColumnColors(side)

  return (
    <div
      className="tcs-card-enter flex-1 relative overflow-hidden"
      style={{
        backgroundColor: colors.bgTint,
        border: `1px solid ${colors.border}`,
        borderTop: `3px solid ${colors.accent}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        animationDelay,
      }}
    >
      <div className="p-7 relative z-10">
        {/* Column Title */}
        <h3
          className="text-xl font-bold pb-3"
          style={{ color: colors.accent, fontFamily: t.typography.fontFamily }}
        >
          {data.title}
        </h3>

        {/* Separator */}
        <div
          className="mb-4"
          style={{
            height: 1,
            background: `linear-gradient(to right, ${colors.separatorColor}, transparent)`,
          }}
        />

        {/* Highlight — Boris Cherny 원칙: 옵셔널 값은 좁히기(narrowing)로 안전하게 처리 */}
        {data.highlight !== undefined && (
          <HighlightBadge
            text={data.highlight}
            backgroundColor={colors.highlightBg}
            textColor={colors.accent}
          />
        )}

        {/* Item List */}
        <ul className="flex flex-col gap-3.5">
          {data.items.map((item: string, index: number) => (
            <ListItem
              key={`${side}-item-${index}`}
              text={item}
              bulletColor={colors.bulletColor}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Step 4: 데코레이티브 요소 ───────────────────────────────────
// 사양의 5개 기하학적 요소를 정확하게 구현

function GeometricElements() {
  return (
    <>
      {/* 1. 큰 그라데이션 원 — 우상단 */}
      <div
        className="tcs-geo-drift absolute pointer-events-none"
        style={{
          width: 280,
          height: 280,
          top: "-8%",
          right: "-6%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(72, 169, 197, 0.05) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* 2. 작은 그라데이션 원 — 좌하단 (정적) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 180,
          height: 180,
          bottom: "-5%",
          left: "-4%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 75, 141, 0.04) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* 3. 아웃라인 원 — 좌상단 (정적) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 100,
          height: 100,
          top: "2%",
          left: "1%",
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 75, 141, 0.08)",
          zIndex: 0,
        }}
      />

      {/* 4. 작은 솔리드 점 — 우하단 (펄스 애니메이션) */}
      <div
        className="tcs-geo-pulse absolute pointer-events-none"
        style={{
          width: 8,
          height: 8,
          bottom: "5%",
          right: "4%",
          borderRadius: "50%",
          backgroundColor: "rgba(72, 169, 197, 0.15)",
          zIndex: 0,
        }}
      />

      {/* 5. 수평 대시 — 우측 중간 (정적) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 40,
          height: 1.5,
          top: "55%",
          right: "1%",
          backgroundColor: "rgba(0, 75, 141, 0.06)",
          zIndex: 0,
        }}
      />
    </>
  )
}

// ─── Step 5: 메인 컴포넌트 ──────────────────────────────────────
// Boris Cherny: "export된 함수의 시그니처는 모듈의 공개 API다.
// 이름, 매개변수 타입, 반환 타입 — 이 세 가지가 모든 것을 말해야 한다."

export function TwoColumnSlide({
  title,
  left,
  right,
  bottomMessage,
}: TwoColumnSlideProps) {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <style>{`
        @keyframes tcs-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tcs-cardRise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tcs-messageRise {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tcs-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        @keyframes tcs-pulse {
          0%, 100% { opacity: 0.10; }
          50% { opacity: 0.20; }
        }

        .tcs-accent-bar {
          opacity: 0;
          animation: tcs-fadeIn 0.4s ease-out forwards;
        }
        .tcs-title-text {
          opacity: 0;
          animation: tcs-fadeIn 0.5s ease-out 0.1s forwards;
        }
        .tcs-card-enter {
          opacity: 0;
          animation: tcs-cardRise 0.5s ease-out forwards;
        }
        .tcs-message-enter {
          opacity: 0;
          animation: tcs-messageRise 0.4s ease-out 0.5s forwards;
        }
        .tcs-geo-drift {
          animation: tcs-drift 14s ease-in-out infinite;
        }
        .tcs-geo-pulse {
          animation: tcs-pulse 6s ease-in-out infinite;
        }
      `}</style>

      <div
        className="relative w-full overflow-hidden"
        style={{
          fontFamily: t.typography.fontFamily,
          backgroundColor: t.colors.neutral[50],
          minHeight: "100dvh",
        }}
      >
        {/* Geometric decorative elements — z-0, 콘텐츠 아래 */}
        {mounted && <GeometricElements />}

        {/* 콘텐츠 영역 — z-10 */}
        <div className="relative z-10 flex flex-col justify-center min-h-dvh px-8 py-10 md:px-12 lg:px-16">
          {/* ─── ZONE A: Header ──────────────────────────── */}
          <header className="mb-8">
            <div
              className="tcs-accent-bar mb-4 rounded-full"
              style={{
                width: 48,
                height: 4,
                background: `linear-gradient(to right, ${t.colors.primary}, ${t.colors.secondary})`,
              }}
            />
            <h2
              className="tcs-title-text text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: t.colors.neutral[900], fontFamily: t.typography.fontFamily }}
            >
              {title}
            </h2>
          </header>

          {/* ─── ZONE B: Two Card Panels ─────────────────── */}
          <div className="flex flex-col md:flex-row gap-7 mb-8">
            <ColumnCard data={left} side="left" animationDelay="0.2s" />
            <ColumnCard data={right} side="right" animationDelay="0.35s" />
          </div>

          {/* ─── ZONE C: Bottom Message (optional) ───────── */}
          {/* Boris Cherny: undefined 체크로 좁히기 — 값이 없으면 아무것도 렌더링하지 않는다 */}
          {bottomMessage !== undefined && (
            <div
              className="tcs-message-enter px-5 py-3.5"
              style={{
                borderLeft: `4px solid ${t.colors.secondary}`,
                background: `linear-gradient(to right, rgba(72, 169, 197, 0.05), transparent)`,
              }}
            >
              <p
                className="text-sm"
                style={{
                  color: t.colors.neutral[600],
                  fontFamily: t.typography.fontFamily,
                }}
              >
                {bottomMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── Step 6: 샘플 데이터 (Preview용) ────────────────────────────
// Boris Cherny: "테스트 데이터도 타입이 보호해야 한다."

const sampleData = {
  title: "가격 구성",
  left: {
    title: "정가",
    items: [
      "맞춤형 CRM: 1억6,500만",
      "교육 프로그램: 1억1,880만",
      "PTD+모니터링: 990만",
      "총액: 2억9,370만원",
    ],
  },
  right: {
    title: "제안가",
    highlight: "330만원 × 36개월",
    items: [
      "= 1억 1,880만원",
      "할인: 1억 7,490만원 (59.6%)",
      "*AI 기능 추가 포함",
    ],
  },
  bottomMessage: "모니터링 요원 비용은 실비 청구됩니다",
} as const satisfies TwoColumnSlideProps
// satisfies — Boris Cherny가 강조하는 패턴:
// "as const로 리터럴 타입을 보존하면서, satisfies로 구조적 적합성을 검증한다."

export default function TwoColumnSlidePreview() {
  return <TwoColumnSlide {...sampleData} />
}
