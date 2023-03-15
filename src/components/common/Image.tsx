import { useCallback, useEffect, useRef, useState } from "react"

import { blurHashToDataURL } from "@/utils/blurhash"
import classNames from "@/utils/classnames"

import type { AstroImg } from "@/definitions/app"

type ImageProps = {
  data: AstroImg
} & React.ImgHTMLAttributes<HTMLImageElement>

const Image: React.FC<ImageProps> = ({ className, data, ...attr }) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) {
      setHasLoaded(true)
    }
  }, [])

  const onImgLoad = useCallback(() => {
    setHasLoaded(true)
  }, [])

  return (
    <div className="relative">
      <img
        {...(data.attributes as any)}
        {...attr}
        className={className}
        onLoad={onImgLoad}
        loading="lazy"
        ref={imgRef}
      />

      <div
        className={classNames("absolute inset-0 transition-opacity duration-300", {
          "pointer-events-none opacity-0": hasLoaded,
        })}
        style={{
          backgroundImage: `url(${blurHashToDataURL(data.blurhash)})`,
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  )
}

export default Image
