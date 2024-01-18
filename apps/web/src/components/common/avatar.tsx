import { Image } from "./image"
import { cn } from "@/utils/classnames"

import type { AstroImageAsset } from "@/utils/data-parser"

interface AvatarProps {
  id?: number
  src: string | AstroImageAsset
  alt?: string
  className?: string
}

export function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <div className={cn("overflow-hidden rounded-full", className)}>
      {typeof src === "string" ? (
        <img src={src} className="rounded-full" alt={alt} />
      ) : (
        <Image data={src} className="rounded-full" alt={alt} />
      )}
    </div>
  )
}
