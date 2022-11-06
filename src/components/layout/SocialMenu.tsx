import React from "react"
import classNames from "@utils/classnames"

import classes from "@styles/components/layout/SocialMenu.module.scss"
import { ReactComponent as FacebookLogo } from "@images/logos/facebook-logo.svg"
import { ReactComponent as TwitterLogo } from "@images/logos/twitter-logo.svg"
import { ReactComponent as TelegramLogo } from "@images/logos/telegram-logo.svg"
import { ReactComponent as DiscordLogo } from "@images/logos/discord-logo.svg"
import { ReactComponent as GithubLogo } from "@images/logos/github-logo.svg"

import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

type SocialMenuProps = {
  className?: string
  linkClassName?: string
  vertical?: boolean
  buttonStyle?: boolean
}

const SocialMenu: React.FC<SocialMenuProps> = ({ className, linkClassName, vertical, buttonStyle }) => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "common")

  return (
    <nav className={classNames(classes.socialMenu, className, {
      [classes.vertical]: vertical,
      [classes.buttonStyle]: buttonStyle
    })}>
      <a
        href="https://www.facebook.com/Etherna.io/"
        className={classNames(classes.socialLink, classes.facebook, linkClassName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookLogo />
        <span className={classes.socialName}>{t`facebookPage`}</span>
      </a>
      <a
        href="https://twitter.com/Etherna_io"
        className={classNames(classes.socialLink, classes.twitter, linkClassName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterLogo />
        <span className={classes.socialName}>{t`twitter`}</span>
      </a>
      <a
        href="https://discord.gg/vfHYEXf"
        className={classNames(classes.socialLink, classes.discord, linkClassName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <DiscordLogo />
        <span className={classes.socialName}>{t`discord`}</span>
      </a>
      <a
        href="https://t.me/etherna_io"
        className={classNames(classes.socialLink, classes.telegram, linkClassName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TelegramLogo />
        <span className={classes.socialName}>{t`telegramChannel`}</span>
      </a>
      <a
        href="https://github.com/Etherna"
        className={classNames(classes.socialLink, classes.github, linkClassName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubLogo />
        <span className={classes.socialName}>{t`github`}</span>
      </a>
    </nav>
  )
}

export default SocialMenu
