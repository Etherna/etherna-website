import { ReactComponent as DocIcon } from "@/assets/icons/document.svg"

import HeaderMenu from "@/components/layout/HeaderMenu"

interface WhitepaperLinkProps {
  className?: string
  url: string
  filename: string
}

export function WhitepaperLink({ className, url, filename }: WhitepaperLinkProps) {
  return (
    <HeaderMenu.Link
      className={className}
      href={url}
      download={filename}
      target="_blank"
      rel="noreferrer"
    >
      <DocIcon aria-hidden />
      <span>Whitepaper</span>
    </HeaderMenu.Link>
  )
}
