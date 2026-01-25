import * as React from "react"

import { cn } from "@/lib/utils"
import {
  componentSpacing,
  componentEffects,
  spacing,
} from "@/tokens"

// Card 토큰 상수 (타입 안전성 보장)
const cardTokens = {
  borderRadius: componentEffects.card.borderRadius,
  border: componentEffects.card.border,
  shadow: componentEffects.card.shadow,
  padding: componentSpacing.card.padding,
  margin: componentSpacing.card.margin,
  gap: spacing[1], // 4px (space-y-1.5 대체)
} as const

// Card 기본 스타일 (토큰 기반)
const cardBaseStyle: React.CSSProperties = {
  borderRadius: cardTokens.borderRadius,
  border: cardTokens.border,
  boxShadow: cardTokens.shadow,
}

// 서브컴포넌트 스타일
const cardHeaderStyle: React.CSSProperties = {
  padding: cardTokens.padding,
  display: "flex",
  flexDirection: "column",
  gap: cardTokens.gap,
}

const cardContentStyle: React.CSSProperties = {
  padding: cardTokens.padding,
  paddingTop: 0,
}

const cardFooterStyle: React.CSSProperties = {
  padding: cardTokens.padding,
  paddingTop: 0,
  display: "flex",
  alignItems: "center",
}

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-card text-card-foreground", className)}
    style={{ ...cardBaseStyle, ...style }}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    style={{ ...cardHeaderStyle, ...style }}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    style={{ ...cardContentStyle, ...style }}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    style={{ ...cardFooterStyle, ...style }}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardTokens,
}
