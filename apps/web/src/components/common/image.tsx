import { thumbhashToDataURL } from "@/lib/thumbhash"
import { cn } from "@/lib/utils"

import type { BundledImage } from "@/lib/bundle"

export interface ImageProps extends React.ComponentProps<"img"> {
  image?: BundledImage | null
}

export function Image({ className, image, src, srcSet, alt, style, ...props }: ImageProps) {
  return (
    <img
      className={cn("relative", className)}
      src={image?.src ?? src}
      srcSet={srcSet}
      alt={alt}
      loading="lazy"
      style={{
        backgroundImage: image?.thumbhash
          ? `url(${thumbhashToDataURL(image.thumbhash)})`
          : undefined,
        backgroundSize: image?.thumbhash ? "100% 100%" : undefined,
        ...style,
      }}
      // thumbhash is removed from custom script (src/pages/_templates/_scripts.astro)
      data-thumbhash={image?.thumbhash ? "true" : undefined}
      {...image?.attributes}
      {...props}
    />
  )
}
