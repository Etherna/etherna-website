import { ReactComponent as DocIcon } from "@/assets/icons/document.svg"

import { HeaderMenuLink } from "@/components/layout/header-menu"

interface WhitepaperLinkProps {
  className?: string
  url: string
  filename: string
}

export function WhitepaperLink({ className, url, filename }: WhitepaperLinkProps) {
  return (
    <HeaderMenuLink
      className={className}
      href={url}
      download={filename}
      target="_blank"
      rel="noreferrer"
    >
      <DocIcon aria-hidden />
      <span>Whitepaper</span>
    </HeaderMenuLink>
  )
}
