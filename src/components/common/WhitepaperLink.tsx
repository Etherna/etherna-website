import { ReactComponent as DocIcon } from "@/images/icons/document.svg"

type WhitepaperLinkProps = {
  className?: string
  url: string
  filename: string
}

const WhitepaperLink: React.FC<WhitepaperLinkProps> = ({ className, url, filename }) => {
  return (
    <a className={className} href={url} download={filename} target="_blank" rel="noreferrer">
      <DocIcon aria-hidden />
      <span>Whitepaper</span>
    </a>
  )
}

export default WhitepaperLink
