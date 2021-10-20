import React from "react"

import classes from "@styles/components/blog/BlogPostFooter.module.scss"
import { ReactComponent as DiscussionIcon } from "@images/icons/discussion.svg"
import { ReactComponent as TelegramLogo } from "@images/logos/telegram-logo.svg"
import { ReactComponent as DiscordLogo } from "@images/logos/discord-logo.svg"
import { ReactComponent as GithubLogo } from "@images/logos/github-logo.svg"

import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const BlogPostFooter: React.FC = () => {
  const [locale] = useLocale()
  const { t: tCommon } = useTranslations(locale, "common")
  const { t: tBlog } = useTranslations(locale, "blog")

  return (
    <footer className={classes.postFooter}>
      <h6 className={classes.postFooterTitle}>
        <DiscussionIcon width="14" className="mr-2" />
        {tBlog`discussions`}
      </h6>
      <p className={classes.postFooterNotice}>{tBlog`contactsUsForMore`}</p>
      <p className={classes.postFooterNotice}>{tBlog`theseAreOurChannels`}</p>

      <ul className={classes.postFooterChannels}>
        <li className={classes.postFooterChannel}>
          <a
            href="https://t.me/etherna_io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramLogo width="14" className="mr-1" />
            <span className="social-name">{tCommon`telegramChannel`}</span>
          </a>
        </li>
        <li className={classes.postFooterChannel}>
          <a
            href="https://discord.gg/vfHYEXf"
            className="social-link discord"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordLogo width="14" className="mr-1" />
            <span className="social-name">{tCommon`discord`}</span>
          </a>
        </li>
        <li className={classes.postFooterChannel}>
          <a
            href="https://github.com/Etherna/etherna/discussions"
            className="social-link github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogo width="14" className="mr-1" />
            <span className="social-name">{tCommon`githubDiscussions`}</span>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default BlogPostFooter
