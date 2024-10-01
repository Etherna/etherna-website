import { blurHashToDataURL } from "@/lib/blurhash"
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
        backgroundImage: image?.blurhash ? `url(${blurHashToDataURL(image.blurhash)})` : undefined,
        backgroundSize: image?.blurhash ? "100% 100%" : undefined,
        ...style,
      }}
      // blurhash is removed from custom script (src/pages/_templates/_scripts.astro)
      data-blurhash={image?.blurhash ? "true" : undefined}
      {...image?.attributes}
      {...props}
    />
  )
}
