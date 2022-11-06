import React from "react"
import classNames from "@utils/classnames"

import classes from "@styles/components/blog/ShareButtons.module.scss"
import { ReactComponent as FacebookLogo } from "@images/logos/facebook-logo.svg"
import { ReactComponent as TwitterLogo } from "@images/logos/twitter-logo.svg"
import { ReactComponent as LinkedInLogo } from "@images/logos/linkedin-logo.svg"

type ShareButtonsProps = {
  title: string
  url: string
  className?: string
  vertical?: boolean
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, className, vertical = false }) => {
  return (
    <div
      className={classNames(classes.shareButtons, className, {
        [classes.shareButtonsVertical]: vertical
      })}
    >
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
        className={classNames(classes.shareButtonsItem, "facebook")}
        target="_blank"
        rel="noreferrer noopener"
      >
        <FacebookLogo />
      </a>
      <a
        href={`https://twitter.com/share?url=${url}&text=${title}`}
        className={classNames(classes.shareButtonsItem, "twitter")}
        target="_blank"
        rel="noreferrer noopener"
      >
        <TwitterLogo />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        className={classNames(classes.shareButtonsItem, "linkedin")}
        target="_blank"
        rel="noreferrer noopener"
      >
        <LinkedInLogo />
      </a>
    </div>
  )
}
export default ShareButtons
