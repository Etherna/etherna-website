import { ReactComponent as FacebookLogo } from "@/images/logos/facebook-logo.svg"
import { ReactComponent as LinkedInLogo } from "@/images/logos/linkedin-logo.svg"
import { ReactComponent as TwitterLogo } from "@/images/logos/twitter-logo.svg"

import classNames from "@/utils/classnames"

type ShareButtonsProps = {
  title: string
  url: string
  className?: string
  vertical?: boolean
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, className, vertical = false }) => {
  const svgClassName = classNames(
    "w-5 fill-gray-800 transition-colors duration-500 hover:fill-gray-600"
  )
  return (
    <div
      className={classNames("flex items-center space-x-4 lg:space-x-0", className, {
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
export default ShareButtons
