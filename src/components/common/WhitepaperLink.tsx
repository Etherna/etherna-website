import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { ReactComponent as DocIcon } from "@images/icons/document.svg"

type WhitepaperLinkProps = {
  className?: string
}

const WhitepaperLink: React.FC<WhitepaperLinkProps> = ({ className }) => {
  const data = useStaticQuery(graphql`query {
    directusDocument {
      whitepaper {
        filename_download
        localFile {
          url
        }
      }
    }
  }`)

  return (
    <a
      className={className}
      href={data.directusDocument.whitepaper.localFile.url}
      download={data.directusDocument.whitepaper.filename_download}
      target="_blank"
      rel="noreferrer"
    >
      <DocIcon aria-hidden />
      <span>Whitepaper</span>
    </a>
  )
}

export default WhitepaperLink
