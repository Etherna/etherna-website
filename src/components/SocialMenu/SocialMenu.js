import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import FacebookLogo from "!svg-react-loader!@images/svg/facebook-logo.svg"
import TwitterLogo from "!svg-react-loader!@images/svg/twitter-logo.svg"
import TelegramLogo from "!svg-react-loader!@images/svg/telegram-logo.svg"
import DiscordLogo from "!svg-react-loader!@images/svg/discord-logo.svg"

import "./social-menu.scss"

const SocialMenu = ({ vertical, buttonStyle }) => (
  <nav className={classnames("social-menu", {
    "social-menu-vertical": vertical,
    "social-menu-button-style": buttonStyle
  })}>
    <a
      href="https://www.facebook.com/Etherna.io/"
      className="social-link facebook"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FacebookLogo />
      <span className="social-name">Facebook Page</span>
    </a>
    <a
      href="https://twitter.com/Etherna_io"
      className="social-link twitter"
      target="_blank"
      rel="noopener noreferrer"
    >
      <TwitterLogo />
      <span className="social-name">Twitter</span>
    </a>
    <a
      href="https://t.me/etherna_io"
      className="social-link telegram"
      target="_blank"
      rel="noopener noreferrer"
    >
      <TelegramLogo />
      <span className="social-name">Telegram Feed</span>
    </a>
    <a
      href="https://discord.gg/vfHYEXf"
      className="social-link discord"
      target="_blank"
      rel="noopener noreferrer"
    >
      <DiscordLogo />
      <span className="social-name">Discord</span>
    </a>
  </nav>
)

SocialMenu.propTypes = {
  vertical: PropTypes.bool,
  buttonStyle: PropTypes.bool,
}

SocialMenu.defaultProps = {
  vertical: false,
  buttonStyle: false
}

export default SocialMenu