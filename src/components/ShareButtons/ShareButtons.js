import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import FacebookLogo from "!svg-react-loader!@images/logos/facebook-logo.svg"
import TwitterLogo from "!svg-react-loader!@images/logos/twitter-logo.svg"
import LinkedInLogo from "!svg-react-loader!@images/logos/linkedin-logo.svg"

import "./share-buttons.scss"

const ShareButtons = ({ title, url, vertical }) => {
  return (
    <div
      className={classnames("share-buttons", {
        "share-buttons-vertical": vertical
      })}
    >
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
        className="share-buttons-item facebook"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FacebookLogo />
      </a>
      <a
        href={`https://twitter.com/share?url=${url}&text=${title}`}
        className="share-buttons-item twitter"
        target="_blank"
        rel="noreferrer noopener"
      >
        <TwitterLogo />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        className="share-buttons-item linkedin"
        target="_blank"
        rel="noreferrer noopener"
      >
        <LinkedInLogo />
      </a>
    </div>
  )
}

ShareButtons.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  vertical: PropTypes.bool,
}

ShareButtons.defaultProps = {
  vertical: false,
}

export default ShareButtons
