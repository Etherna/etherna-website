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
        "group/text container flex flex-col gap-8 md:gap-12 lg:gap-20",
        {
          "items-center text-center": centered,
          "items-start md:flex-row": !centered,
        },
        className,
      )}
      {...props}
      data-centered={centered || undefined}
      data-inline={!centered || undefined}
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
  "mt-[0.35em] text-gradient font-bold max-w-screen-sm group-data-[centered]/text:mx-auto",
  {
    variants: {
      size: {
        xs: "text-base/none md:text-lg/none lg:text-xl/none [&+*]:md:mt-2 [&+*]:md:mt-4",
        sm: "text-2xl/none md:text-3xl/none lg:text-4xl/none [&+*]:md:mt-3 [&+*]:md:mt-5",
        default: "text-3xl/none md:text-4xl/none lg:text-5xl/none [&+*]:md:mt-6 [&+*]:md:mt-8",
        lg: "text-4xl/none md:text-5xl/none lg:text-6xl/none [&+*]:md:mt-7 [&+*]:md:mt-9",
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
    <Tag className={cn(titleVariants({ size }), className)} {...props}>
      {children}
    </Tag>
  )
}

const subtitleVariants = cva(
  "font-semibold text-secondary-foreground/70 group-data-[centered]/text:mx-auto",
  {
    variants: {
      size: {
        sm: "text-sm/none",
        default: "text-lg/none",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

interface TextColumnsSubtitleProps
  extends React.ComponentProps<"p">,
    VariantProps<typeof subtitleVariants> {}

function TextColumnsSubtitle({ children, className, size, ...props }: TextColumnsSubtitleProps) {
  return (
    <p className={cn(subtitleVariants({ size }), className)} {...props}>
      {children}
    </p>
  )
}

function TextColumnsDescription({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-screen-sm text-secondary-foreground/70 group-data-[centered]/text:mx-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const contentColumnVariants = cva("flex w-full shrink-0 flex-col", {
  variants: {
    centeredSize: {
      sm: "mx-auto max-w-screen-sm",
      default: "",
    },
    inlineSize: {
      sm: "",
      default: "group-data-[inline]/text:md:w-1/2 group-data-[inline]/text:lg:w-1/3",
      lg: "group-data-[inline]/text:lg:w-3/5",
      full: "w-full",
    },
  },
  defaultVariants: {
    centeredSize: "default",
    inlineSize: "default",
  },
})

interface TextColumnsContentColumnProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof contentColumnVariants> {}

function TextColumnsContentColumn({
  children,
  className,
  centeredSize,
  inlineSize,
  ...props
}: TextColumnsContentColumnProps) {
  return (
    <div className={cn(contentColumnVariants({ centeredSize, inlineSize }), className)} {...props}>
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
