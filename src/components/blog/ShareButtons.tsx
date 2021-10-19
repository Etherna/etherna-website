import React from "react"
import classNames from "classnames"

import classes from "@styles/components/blog/ShareButtons.module.scss"
import FacebookLogo from "!svg-react-loader!@images/logos/facebook-logo.svg"
import TwitterLogo from "!svg-react-loader!@images/logos/twitter-logo.svg"
import LinkedInLogo from "!svg-react-loader!@images/logos/linkedin-logo.svg"

type ShareButtonsProps = {
  title: string
  url: string
  vertical?: boolean
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, vertical = false }) => {
  return (
    <div
      className={classNames(classes.shareButtons, {
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
