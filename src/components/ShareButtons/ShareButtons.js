import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import FacebookLogo from "!svg-react-loader!@images/svg/facebook-logo.svg"
import TwitterLogo from "!svg-react-loader!@images/svg/twitter-logo.svg"

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
