import React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import type { VariantProps } from "class-variance-authority"

function TextColumns({
  children,
  className,
  centered,
  ...props
}: React.ComponentProps<"div"> & { centered?: boolean }) {
  return (
    <div
      className={cn(
        "group/text container flex gap-8 md:gap-12 lg:gap-20",
        {
          "flex-col items-center text-center": centered,
          "items-start": !centered,
        },
        className,
      )}
      {...props}
      data-centered={centered || undefined}
    >
      {children}
    </div>
  )
}

function TextColumnsMainColumn({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-1 flex-col", className)} {...props}>
      {children}
    </div>
  )
}

const titleVariants = cva(
  "mt-[0.35em] text-gradient font-bold max-w-screen-sm group/text:data-[centered]:mx-auto",
  {
    variants: {
      size: {
        sm: "text-2xl/none md:text-3xl/none lg:text-4xl/none",
        default: "text-3xl/none md:text-4xl/none lg:text-5xl/none",
        lg: "text-4xl/none md:text-5xl/none lg:text-6xl/none",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

interface TextColumnsTitleProps
  extends React.ComponentProps<"h2">,
    VariantProps<typeof titleVariants> {
  tag?: "h2" | "h3" | "h4" | "h5" | "h6"
}

function TextColumnsTitle({ children, className, size, ...props }: TextColumnsTitleProps) {
  const Tag = props.tag ?? "h2"
  return (
    <Tag className={cn(titleVariants({ size }), "text-6xl", className)} {...props}>
      {children}
    </Tag>
  )
}

function TextColumnsSubtitle({ children, className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "group/text:data-[centered]:mx-auto text-lg/none font-semibold text-secondary-foreground/70",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

function TextColumnsDescription({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/text:data-[centered]:mx-auto mt-6 max-w-screen-sm text-secondary-foreground/70 md:mt-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TextColumnsContentColumn({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/text:data-[centered]:md:w-1/2 group/text:data-[centered]:lg:w-1/3 flex shrink-0 flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  TextColumns,
  TextColumnsMainColumn,
  TextColumnsTitle,
  TextColumnsSubtitle,
  TextColumnsDescription,
  TextColumnsContentColumn,
}
