import { useTranslation } from "react-i18next"

import { MessageCircleIcon } from "lucide-react"
import { DiscordLogo, GitHubLogo, TelegramLogo } from "@/components/assets/brands"

import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface BlogPostFooterProps {
  className?: string
}

export function BlogPostFooter({ className }: BlogPostFooterProps) {
  const { t } = useTranslation(["common", "blog"])

  return (
    <footer className={cn("mb-4 mt-32 border-b-2 border-t-2 border-gray-500 py-10", className)}>
      <h6 className="mb-3 mt-0 flex items-center text-center font-bold">
        <MessageCircleIcon className="mr-2" width="14" />
        {t("blog:discussions")}
      </h6>
      <p className="mb-1 text-sm text-gray-600">{t("blog:contactsUsForMore")}</p>
      <p className="mb-1 text-sm text-gray-600">{t("blog:theseAreOurChannels")}</p>

      <ul className={cn("mt-6 list-none pl-0", "not-wysiwyg")}>
        <FooterChannelItem href="https://discord.gg/vfHYEXf">
          <DiscordLogo className="mr-2" width="14" />
          <span className="social-name">{t("discord")}</span>
        </FooterChannelItem>
        <FooterChannelItem href="https://t.me/etherna_io">
          <TelegramLogo className="mr-2" width="14" />
          <span className="social-name">{t("telegramChannel")}</span>
        </FooterChannelItem>
        <FooterChannelItem href="https://github.com/Etherna/etherna/discussions">
          <GitHubLogo className="mr-2" width="14" />
          <span className="social-name">{t("githubDiscussions")}</span>
        </FooterChannelItem>
      </ul>
    </footer>
  )
}

export function FooterChannelItem({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <li>
      <a
        className="mt-1 inline-flex items-center text-sm font-medium text-gray-800"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    </li>
  )
}
