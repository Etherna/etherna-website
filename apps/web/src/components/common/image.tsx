import { useEffect, useRef, useState } from "react"

import { blurHashToDataURL } from "@/utils/blurhash"
import { cn } from "@/utils/classnames"

import type { AstroImageAsset } from "@/utils/data-parser"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  data: AstroImageAsset | null | undefined
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
}

export function Image({ className, data, objectFit, ...attr }: ImageProps) {
  const [hasLoaded, setHasLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) {
      setHasLoaded(true)
    }
  }, [])

  return (
    <div className="relative">
      <img
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(data?.attributes as any)}
        {...attr}
        ref={imgRef}
        className={className}
        loading="lazy"
        style={{
          objectFit,
        }}
        alt={attr.alt}
        onLoad={() => setHasLoaded(true)}
      />

      {data?.blurhash && (
        <div
          className={cn("absolute inset-0 transition-opacity duration-300", {
            "pointer-events-none opacity-0": hasLoaded,
          })}
          style={{
            backgroundImage: `url(${blurHashToDataURL(data.blurhash)})`,
            backgroundSize: "100% 100%",
          }}
        />
      )}
    </div>
  )
}
