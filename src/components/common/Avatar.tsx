import Image from "./Image"
import classNames from "@/utils/classnames"

import type { AstroImg } from "@/schema/app"

type AvatarProps = {
  id?: number
  src: string | AstroImg
  alt?: string
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => {
  return (
    <div className={classNames("overflow-hidden rounded-full", className)}>
      {typeof src === "string" ? (
        <img src={src} className="rounded-full" />
      ) : (
        <Image data={src} className="rounded-full" />
      )}
    </div>
  )
}

export default Avatar
