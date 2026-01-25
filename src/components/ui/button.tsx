import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  componentSpacing,
  componentEffects,
  spacing,
  borderRadius,
} from "@/tokens"

// 버튼 토큰 상수 (타입 안전성 보장)
const buttonTokens = {
  borderRadius: componentEffects.button.borderRadius,
  paddingX: componentSpacing.button.paddingX,
  paddingY: componentSpacing.button.paddingY,
  transition: componentEffects.button.transition,
  gap: spacing[2], // 8px
} as const

// 버튼 기본 스타일 (토큰 기반)
const buttonBaseStyle: React.CSSProperties = {
  borderRadius: buttonTokens.borderRadius,
  transition: `all ${buttonTokens.transition}`,
}

// 사이즈별 스타일 (토큰 기반)
const sizeStyles = {
  default: {
    height: 36,
    paddingLeft: buttonTokens.paddingX,
    paddingRight: buttonTokens.paddingX,
    paddingTop: buttonTokens.paddingY,
    paddingBottom: buttonTokens.paddingY,
  },
  sm: {
    height: 32,
    paddingLeft: spacing[3], // 12px
    paddingRight: spacing[3],
    borderRadius: borderRadius.sm,
  },
  lg: {
    height: 40,
    paddingLeft: spacing[8], // 32px
    paddingRight: spacing[8],
  },
  icon: {
    height: 36,
    width: 36,
  },
} as const satisfies Record<string, React.CSSProperties>

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "text-sm font-medium",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "text-xs",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const currentSize: ButtonSize = size ?? "default"

    // 토큰 기반 스타일과 사용자 스타일 병합
    const mergedStyle: React.CSSProperties = {
      ...buttonBaseStyle,
      ...sizeStyles[currentSize],
      gap: buttonTokens.gap,
      ...style,
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={mergedStyle}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, buttonTokens, sizeStyles }
