import { Link } from "react-scroll"

import type { ReactScrollLinkProps } from "react-scroll/modules/components/Link"

const AnchorLink = Link as unknown as React.FC<
  ReactScrollLinkProps & {
    children?: React.ReactNode
    className?: string
  }
>

export default AnchorLink
