import { useState } from "react"
import { colord } from "colord"

import { CheckIcon, ClipboardIcon, DownloadIcon } from "lucide-react"

import { Image } from "../common/image"
import { RichText } from "../common/rich-text"
import { Svg } from "../common/svg"
import {
  TextColumns,
  TextColumnsContentColumn,
  TextColumnsDescription,
  TextColumnsMainColumn,
  TextColumnsSubtitle,
  TextColumnsTitle,
} from "../layout/text-columns"
import { Button } from "../ui/button"
import { BaseBlock } from "./base-block"
import { hasBundledImage } from "@/lib/bundle"
import { hslValue, rgbValue } from "@/lib/colors"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn } from "@/lib/utils"

import type { BrandBlock } from "@payload-types"

export function BrandBlock({
  id,
  blockType,
  title,
  subtitle,
  text,
  background,
  heading,
  centered,
  forceFullWidth,
  titleSize,
  colors,
  logos,
}: BrandBlock) {
  const colorsList = colors ?? []
  const logosList = logos ?? []

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns centered={centered ?? false} inline={!forceFullWidth && !centered}>
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "sm"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
        <TextColumnsContentColumn className="gap-8 lg:gap-12" inlineSize={"lg"}>
          {logosList.length > 0 && (
            <BrandList>
              {logosList.map((logo, index) => (
                <BrandItem
                  className={cn("px-6 md:px-12", {
                    "bg-white text-slate-500 reset-current-bg-white": logo.variant !== "dark",
                    "bg-black text-slate-300 reset-current-bg-black": logo.variant === "dark",
                  })}
                  key={index}
                >
                  <div className="absolute left-2 top-2 flex items-center">
                    {hasBundledImage(logo.pngLogo) && (
                      <DownloadButton
                        downloadUrl={logo.pngLogo.bundled.image.src}
                        filename={logo.pngLogo.bundled.image.filename}
                      >
                        PNG
                      </DownloadButton>
                    )}
                    {hasBundledImage(logo.svgLogo) && (
                      <DownloadButton
                        downloadUrl={logo.svgLogo.bundled.image.src}
                        filename={logo.svgLogo.bundled.image.filename}
                      >
                        SVG
                      </DownloadButton>
                    )}
                  </div>

                  <div className="absolute right-2 top-2">
                    {hasBundledImage(logo.svgLogo) && logo.svgLogo.bundled.image.svgContent && (
                      <CopyButton content={logo.svgLogo.bundled.image.svgContent} />
                    )}
                  </div>

                  {hasBundledImage(logo.svgLogo) ? (
                    <Svg svg={logo.svgLogo.bundled.image.svgContent} />
                  ) : hasBundledImage(logo.pngLogo) ? (
                    <Image image={logo.pngLogo.bundled.image} />
                  ) : (
                    <p className="text-center text-sm text-muted-foreground">Asset not found</p>
                  )}
                </BrandItem>
              ))}
            </BrandList>
          )}
          {colorsList.length > 0 && (
            <BrandList>
              {colorsList.map((color, index) => (
                <BrandItem
                  className={cn("flex flex-col items-center justify-center gap-1", {
                    "text-white": colord(color.color).isDark(),
                    "text-black": colord(color.color).isLight(),
                  })}
                  key={index}
                  style={{
                    backgroundColor: color.color,
                    ["--current-background" as string]: hslValue(color.color, " "),
                  }}
                >
                  <div className="absolute right-2 top-2">
                    <CopyButton className="border-black/20" content={color.color} />
                  </div>

                  <p className="mb-3 text-base font-medium">{color.name}</p>
                  <p className="text-sm font-medium">
                    <span className="text-xs opacity-50">hex </span>
                    <span className="font-semibold">{color.color}</span>
                  </p>
                  <p className="text-sm font-medium">
                    <span className="text-xs opacity-50">hsl </span>
                    <span className="font-semibold">{hslValue(color.color)}</span>
                  </p>
                  <p className="text-sm font-medium">
                    <span className="text-xs opacity-50">rgb </span>
                    <span className="font-semibold">{rgbValue(color.color)}</span>
                  </p>
                </BrandItem>
              ))}
            </BrandList>
          )}
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}

function BrandList({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "flex flex-col divide-y divide-current-background overflow-hidden rounded-lg md:flex-row md:divide-x md:divide-y-0",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  )
}

function BrandItem({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li className="relative flex-1" {...props}>
      <div
        className={cn(
          "flex h-40 w-full flex-col items-center justify-center p-4 md:h-52",
          className,
        )}
      >
        {children}
      </div>
    </li>
  )
}

function DownloadButton({
  className,
  children,
  downloadUrl,
  filename,
  ...props
}: React.ComponentProps<"button"> & { downloadUrl: string; filename?: string }) {
  return (
    <Button
      className={cn(
        "text-2xs pointer-coarse:text-xs pointer-coarse:h-8 h-6 gap-1 rounded-[6px] px-1 font-semibold [&:not(:first-child)]:-ml-px [&:not(:first-child)]:rounded-l-none [&:not(:last-child)]:rounded-r-none",
        className,
      )}
      variant={"outline"}
      size={"sm"}
      onClick={() => {
        const link = document.createElement("a")
        link.href = downloadUrl
        link.download = filename ?? ""
        link.click()
      }}
      {...props}
    >
      <DownloadIcon className="pointer-coarse:size-4 size-3" />
      {children}
    </Button>
  )
}

function CopyButton({
  className,
  content,
  ...props
}: React.ComponentProps<"button"> & { content: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      className={cn("pointer-coarse:h-8 pointer-coarse:w-8 h-6 w-6 rounded-[6px] p-1", className)}
      variant={"outline"}
      size={"sm"}
      onClick={() => {
        navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      {...props}
    >
      {copied ? (
        <CheckIcon className="pointer-coarse:size-4 size-3 text-green-500" strokeWidth={3} />
      ) : (
        <ClipboardIcon className="pointer-coarse:size-4 size-3" />
      )}
    </Button>
  )
}
