import { FileTextIcon } from "lucide-react"

import { HeaderMenuLink } from "@/components/layout/header-menu"

interface WhitepaperLinkProps {
  className?: string
  url: string
}

export function WhitepaperLink({ className, url }: WhitepaperLinkProps) {
  return (
    <HeaderMenuLink className={className} href={url} target="_blank" rel="noreferrer">
      <FileTextIcon aria-hidden />
      <span>Whitepaper</span>
    </HeaderMenuLink>
  )
}
