import { ReactComponent as DocIcon } from "@/assets/icons/document.svg"

import HeaderMenu from "@/components/layout/HeaderMenu"

type WhitepaperLinkProps = {
  className?: string
  url: string
  filename: string
}

const WhitepaperLink: React.FC<WhitepaperLinkProps> = ({ className, url, filename }) => {
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

export default WhitepaperLink
