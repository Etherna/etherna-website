import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import {
  DiscordLogo,
  FacebookLogo,
  GitHubLogo,
  InstagramLogo,
  LinkedInLogo,
  TelegramLogo,
  TwitterLogo,
} from "@/components/assets/brands"

import { cn } from "@/utils/classnames"

import type { AnchorHTMLAttributes } from "react"

export interface SocialUrls {
  facebook?: string | null
  instagram?: string | null
  twitter?: string | null
  linkedin?: string | null
  discord?: string | null
  telegram?: string | null
  github?: string | null
}

type SocialKey = keyof SocialUrls

interface SocialMenuProps {
  className?: string
  linkClassName?: string
  vertical?: boolean
  buttonStyle?: boolean
  socials: SocialUrls
}

const SocialInfo = {
  discord: { tKey: "discord", color: "#6378c5", logo: DiscordLogo },
  facebook: { tKey: "facebookPage", color: "#1877f2", logo: FacebookLogo },
  github: { tKey: "github", color: "#24292e", logo: GitHubLogo },
  instagram: { tKey: "instagram", color: "#e4405f", logo: InstagramLogo },
  linkedin: { tKey: "linkedin", color: "#0b78b7", logo: LinkedInLogo },
  telegram: { tKey: "telegramChannel", color: "#1392d1", logo: TelegramLogo },
  twitter: { tKey: "twitter", color: "#1da1f2", logo: TwitterLogo },
} as const satisfies Record<SocialKey, { tKey: string; color: string; logo: React.FC }>

export function SocialMenu({
  className,
  linkClassName,
  vertical,
  buttonStyle,
  socials,
}: SocialMenuProps) {
  const { t } = useTranslation("common")

  const socialsData = useMemo(() => {
    const keys = (Object.keys(socials) as SocialKey[]).filter(key => !!socials[key])
    return keys.map(key => ({
      href: socials[key] as string,
      name: SocialInfo[key].tKey,
      color: SocialInfo[key].color,
      logo: SocialInfo[key].logo,
    }))
  }, [socials])

  return (
    <nav
      className={cn(
        "flex items-center justify-between",
        {
          "flex-col": vertical,
          "items-center sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-center": buttonStyle,
        },
        className
      )}
    >
      {socialsData.map(({ href, name, color, logo: Logo }) => (
        <SocialMenuLink
          key={name}
          href={href}
          name={t(name)}
          color={color}
          className={linkClassName}
          buttonStyle={buttonStyle}
        >
          <Logo />
        </SocialMenuLink>
      ))}
    </nav>
  )
}

function SocialMenuLink({
  className,
  children,
  name,
  buttonStyle,
  color,
  style,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  name: string
  color: string
  buttonStyle?: boolean
}) {
  return (
    <a
      {...props}
      className={cn(
        "p-2 text-slate-400",
        "hover:text-[var(--social-color)]",
        "[&_svg]:h-4 [&_svg]:transition-[fill] [&_svg]:duration-500",
        buttonStyle && [
          "mx-4 mb-2 flex items-center whitespace-nowrap rounded",
          "bg-gray-200 px-4 text-gray-600 hover:bg-gray-100",
        ],
        className
      )}
      target="_blank"
      rel="noopener noreferrer"
      style={
        {
          ...style,
          "--social-color": color,
        } as React.CSSProperties
      }
    >
      {children}
      <span
        className={cn({
          "ml-2 text-sm font-semibold text-gray-600": buttonStyle,
          "sr-only": !buttonStyle,
        })}
      >
        {name}
      </span>
    </a>
  )
}
