import { useEffect, useRef, useState } from "react"

import { blurHashToDataURL } from "@/utils/blurhash"
import classNames from "@/utils/classnames"

import type { AstroImg } from "@/definitions/app"

type ImageProps = {
  data: AstroImg
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
} & React.ImgHTMLAttributes<HTMLImageElement>

const Image: React.FC<ImageProps> = ({ className, data, objectFit, ...attr }) => {
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
        {...(data.attributes as any)}
        {...attr}
        className={className}
        onLoad={() => setHasLoaded(true)}
        loading="lazy"
        ref={imgRef}
        style={{
          objectFit,
        }}
      />

      {data.blurhash && (
        <div
          className={classNames("absolute inset-0 transition-opacity duration-300", {
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

export default Image
