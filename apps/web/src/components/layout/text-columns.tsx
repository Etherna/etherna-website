import React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import type { VariantProps } from "class-variance-authority"

function TextColumns({
  children,
  className,
  centered,
  inline = true,
  ...props
}: React.ComponentProps<"div"> & { centered?: boolean; inline?: boolean }) {
  return (
    <div
      className={cn(
        "group/text container flex flex-col gap-8 lg:gap-12 xl:gap-20",
        {
          "items-center text-center": centered,
          "items-start lg:flex-row": inline,
          "gap-8 lg:gap-10 xl:gap-12": !inline,
        },
        className,
      )}
      {...props}
      data-centered={centered || undefined}
      data-inline={inline || undefined}
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
      tag: {
        h2: "",
        h3: "",
        h4: "",
        h5: "",
        h6: "",
      },
      size: {
        xs: "[&+*]:md:mt-2 [&+*]:md:mt-4",
        sm: "[&+*]:md:mt-3 [&+*]:md:mt-5",
        default: "[&+*]:md:mt-6 [&+*]:md:mt-8",
        lg: "[&+*]:md:mt-7 [&+*]:md:mt-9",
      },
    },
    defaultVariants: {
      tag: "h2",
      size: "default",
    },
    compoundVariants: [
      {
        tag: "h2",
        size: "xs",
        className: "text-base/tight md:text-lg/tight lg:text-xl/tight",
      },
      {
        tag: "h2",
        size: "sm",
        className: "text-2xl/tight md:text-3xl/tight lg:text-4xl/extra-tight",
      },
      {
        tag: "h2",
        size: "default",
        className: "text-3xl/tight md:text-4xl/tight lg:text-5xl/extra-tight",
      },
      {
        tag: "h2",
        size: "lg",
        className: "text-4xl/tight md:text-5xl/tight lg:text-6xl/extra-tight",
      },
      {
        tag: "h3",
        size: "xs",
        className: "text-base/tight md:text-lg/tight lg:text-xl/tight",
      },
      {
        tag: "h3",
        size: "sm",
        className: "text-xl/tight md:text-2xl/tight lg:text-3xl/tight",
      },
      {
        tag: "h3",
        size: "default",
        className: "text-xl/tight md:text-2xl/tight lg:text-4xl/tight",
      },
      {
        tag: "h3",
        size: "lg",
        className: "text-2xl/tight md:text-3xl/tight lg:text-5xl/tight",
      },
      {
        tag: "h4",
        size: "xs",
        className: "text-sm/tight md:text-base/tight lg:text-lg/tight",
      },
      {
        tag: "h4",
        size: "sm",
        className: "text-base/tight md:text-lg/tight lg:text-xl/tight",
      },
      {
        tag: "h4",
        size: "default",
        className: "text-lg/tight md:text-xl/tight lg:text-2xl/tight",
      },
      {
        tag: "h4",
        size: "lg",
        className: "text-xl/tight md:text-2xl/tight lg:text-4xl/tight",
      },
    ],
  },
)

interface TextColumnsTitleProps
  extends React.ComponentProps<"h2">,
    VariantProps<typeof titleVariants> {}

function TextColumnsTitle({ children, className, size, tag, ...props }: TextColumnsTitleProps) {
  const Tag = tag ?? "h2"
  return (
    <Tag className={cn(titleVariants({ size, tag }), className)} {...props}>
      {children}
    </Tag>
  )
}

const subtitleVariants = cva(
  "font-semibold text-secondary-foreground/70 group-data-[centered]/text:mx-auto",
  {
    variants: {
      size: {
        xs: "text-sm/tight",
        sm: "text-sm/tight",
        default: "textbase lg:text-lg/tight",
        lg: "textbase lg:text-lg/tight",
        xl: "textbase lg:text-lg/tight",
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
        "prose max-w-screen-sm text-secondary-foreground/70 dark:prose-invert group-data-[centered]/text:mx-auto",
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
      sm: "group-data-[inline]/text:lg:w-1/3 group-data-[inline]/text:xl:w-1/4",
      default: "group-data-[inline]/text:lg:w-1/2 group-data-[inline]/text:xl:w-1/3",
      lg: "group-data-[inline]/text:lg:w-3/5 group-data-[inline]/text:xl:w-3/5",
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
