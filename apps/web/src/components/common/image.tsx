import { useState } from "react"

import { blurHashToDataURL } from "@/lib/blurhash"
import { cn } from "@/lib/utils"

import type { BundledImage } from "@/lib/bundle"

export interface ImageProps extends React.ComponentProps<"img"> {
  image?: BundledImage | null
}

export function Image({ className, image, src, srcSet, alt, style, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  const showBlurhash = image?.blurhash && !loaded

  return (
    <img
      className={cn("relative", className)}
      src={image?.src ?? src}
      srcSet={srcSet}
      alt={alt}
      loading="lazy"
      style={{
        backgroundImage: showBlurhash ? `url(${blurHashToDataURL(image.blurhash)})` : undefined,
        backgroundSize: showBlurhash ? "100% 100%" : undefined,
        ...style,
      }}
      onLoad={() => setLoaded(true)}
      {...image?.attributes}
      {...props}
    />
  )
}
