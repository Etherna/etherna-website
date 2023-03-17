import { useTranslation } from "react-i18next"

import { ReactComponent as DiscussionIcon } from "@/images/icons/discussion.svg"
import { ReactComponent as DiscordLogo } from "@/images/logos/discord-logo.svg"
import { ReactComponent as GithubLogo } from "@/images/logos/github-logo.svg"
import { ReactComponent as TelegramLogo } from "@/images/logos/telegram-logo.svg"
import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type BlogPostFooterProps = {
  className?: string
}

const BlogPostFooter: React.FC<BlogPostFooterProps> = ({ className }) => {
  const { t } = useTranslation(["common", "blog"])

  return (
    <footer
      className={classNames("mt-32 mb-4 border-t-2 border-b-2 border-gray-500 py-10", className)}
    >
      <h6 className="mt-0 mb-3 flex items-center text-center font-bold">
        <DiscussionIcon width="14" className="mr-2" />
        {t("blog:discussions")}
      </h6>
      <p className="mb-1 text-sm text-gray-600">{t("blog:contactsUsForMore")}</p>
      <p className="mb-1 text-sm text-gray-600">{t("blog:theseAreOurChannels")}</p>

      <ul className={classNames("mt-6 list-none pl-0", "not-wysiwyg")}>
        <FooterChannelItem href="https://discord.gg/vfHYEXf">
          <DiscordLogo width="14" className="mr-2" />
          <span className="social-name">{t("discord")}</span>
        </FooterChannelItem>
        <FooterChannelItem href="https://t.me/etherna_io">
          <TelegramLogo width="14" className="mr-2" />
          <span className="social-name">{t("telegramChannel")}</span>
        </FooterChannelItem>
        <FooterChannelItem href="https://github.com/Etherna/etherna/discussions">
          <GithubLogo width="14" className="mr-2" />
          <span className="social-name">{t("githubDiscussions")}</span>
        </FooterChannelItem>
      </ul>
    </footer>
  )
}

export const FooterChannelItem: React.FC<PropsWithChildren<{ href: string }>> = ({
  children,
  href,
}) => {
  return (
    <li>
      <a
        href={href}
        className="mt-1 inline-flex items-center text-sm font-medium text-gray-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </li>
  )
}

export default BlogPostFooter
