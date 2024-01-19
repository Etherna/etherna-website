import { FacebookLogo, LinkedInLogo, TwitterLogo } from "@/components/assets/brands"

import { cn } from "@/utils/classnames"

interface ShareButtonsProps {
  title: string
  url: string
  className?: string
  vertical?: boolean
}

export function ShareButtons({ title, url, className, vertical = false }: ShareButtonsProps) {
  const svgClassName = cn("w-5 fill-gray-800 transition-colors duration-500 hover:fill-gray-600")
  return (
    <div
      className={cn("flex items-center space-x-4 lg:space-x-0", className, {
        "lg:space-y-8": vertical,
        "lg:flex-col lg:items-start": vertical,
      })}
    >
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${encodeURIComponent(title)}`}
        className=""
        target="_blank"
        rel="noreferrer noopener"
      >
        <FacebookLogo className={svgClassName} />
      </a>
      <a
        href={`https://twitter.com/share?url=${url}&text=${encodeURIComponent(title)}`}
        className=""
        target="_blank"
        rel="noreferrer noopener"
      >
        <TwitterLogo className={svgClassName} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        className=""
        target="_blank"
        rel="noreferrer noopener"
      >
        <LinkedInLogo className={svgClassName} />
      </a>
    </div>
  )
}
