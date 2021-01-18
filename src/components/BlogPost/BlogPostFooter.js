import React from "react"

import DiscussionIcon from "!svg-react-loader!@images/icons/discussion.svg"
import TelegramLogo from "!svg-react-loader!@images/logos/telegram-logo.svg"
import DiscordLogo from "!svg-react-loader!@images/logos/discord-logo.svg"
import GithubLogo from "!svg-react-loader!@images/logos/github-logo.svg"

import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const BlogFooter = () => {
  const [locale] = useLocale()
  const transCommon = useTranslations(locale, "common")
  const transBlog = useTranslations(locale, "blog")

  return (
    <footer className="post-footer">
      <h6 className="post-footer-title">
        <DiscussionIcon width="14" className="mr-2" />
        Discussions
      </h6>
      <p className="post-footer-notice">{transBlog("contactsUsForMore")}</p>
      <p className="post-footer-notice">{transBlog("theseAreOurChannels")}</p>

      <ul className="post-footer-channels">
        <li className="post-footer-channel">
          <a
            href="https://t.me/etherna_io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramLogo width="14" className="mr-1" />
            <span className="social-name">{transCommon("telegramChannel")}</span>
          </a>
        </li>
        <li className="post-footer-channel">
          <a
            href="https://discord.gg/vfHYEXf"
            className="social-link discord"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordLogo width="14" className="mr-1" />
            <span className="social-name">{transCommon("discord")}</span>
          </a>
        </li>
        <li className="post-footer-channel">
          <a
            href="https://github.com/Etherna/etherna/discussions"
            className="social-link github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogo width="14" className="mr-1" />
            <span className="social-name">{transCommon("githubDiscussions")}</span>
          </a>
        </li>
      </ul>
    </footer>
  )
}

BlogFooter.propTypes = {

}

export default BlogFooter
