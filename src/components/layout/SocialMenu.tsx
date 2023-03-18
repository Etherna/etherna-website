import { useTranslation } from "react-i18next"

import { ReactComponent as DiscordLogo } from "@/assets/logos/discord-logo.svg"
import { ReactComponent as FacebookLogo } from "@/assets/logos/facebook-logo.svg"
import { ReactComponent as GithubLogo } from "@/assets/logos/github-logo.svg"
import { ReactComponent as TelegramLogo } from "@/assets/logos/telegram-logo.svg"
import { ReactComponent as TwitterLogo } from "@/assets/logos/twitter-logo.svg"

import classNames from "@/utils/classnames"

import type { AnchorHTMLAttributes } from "react"

type SocialMenuProps = {
  className?: string
  linkClassName?: string
  vertical?: boolean
  buttonStyle?: boolean
}

const SocialMenu: React.FC<SocialMenuProps> = ({
  className,
  linkClassName,
  vertical,
  buttonStyle,
}) => {
  const { t } = useTranslation("common")

  return (
    <nav
      className={classNames(
        "flex items-center justify-between",
        {
          "flex-col": vertical,
          "items-center sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-evenly": buttonStyle,
        },
        className
      )}
    >
      <SocialMenuLink
        href="https://www.facebook.com/Etherna.io/"
        name={t("facebookPage")}
        className={classNames(
          "hover:text-facebook",
          {
            "text-facebook": buttonStyle,
          },
          linkClassName
        )}
        buttonStyle={buttonStyle}
      >
        <FacebookLogo />
      </SocialMenuLink>
      <SocialMenuLink
        href="https://twitter.com/Etherna_io"
        name={t("twitter")}
        className={classNames(
          "hover:text-twitter",
          {
            "text-twitter": buttonStyle,
          },
          linkClassName
        )}
        buttonStyle={buttonStyle}
      >
        <TwitterLogo />
      </SocialMenuLink>
      <SocialMenuLink
        href="https://discord.gg/vfHYEXf"
        name={t("discord")}
        className={classNames(
          "hover:text-discord",
          {
            "text-discord": buttonStyle,
          },
          linkClassName
        )}
        buttonStyle={buttonStyle}
      >
        <DiscordLogo />
      </SocialMenuLink>
      <SocialMenuLink
        href="https://t.me/etherna_io"
        name={t("telegramChannel")}
        className={classNames(
          "hover:text-telegram",
          {
            "text-telegram": buttonStyle,
          },
          linkClassName
        )}
        buttonStyle={buttonStyle}
      >
        <TelegramLogo />
      </SocialMenuLink>
      <SocialMenuLink
        href="https://github.com/Etherna"
        name={t("github")}
        className={classNames(
          "hover:text-github",
          {
            "text-github": buttonStyle,
          },
          linkClassName
        )}
        buttonStyle={buttonStyle}
      >
        <GithubLogo />
      </SocialMenuLink>
    </nav>
  )
}

const SocialMenuLink: React.FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & { name: string; buttonStyle?: boolean }
> = ({ className, children, name, buttonStyle, ...props }) => {
  return (
    <a
      {...props}
      className={classNames(
        "p-2 text-slate-400",
        "[&_svg]:h-4 [&_svg]:transition-[fill] [&_svg]:duration-500",
        buttonStyle && [
          "mx-4 mb-2 flex items-center whitespace-nowrap rounded",
          "bg-gray-200 px-4 text-gray-600 hover:bg-gray-100",
        ],
        className
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span
        className={classNames({
          "ml-2 text-sm font-semibold text-gray-600": buttonStyle,
          "sr-only": !buttonStyle,
        })}
      >
        {name}
      </span>
    </a>
  )
}

export default SocialMenu
