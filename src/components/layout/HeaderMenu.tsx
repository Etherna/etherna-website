import classNames from "@/utils/classnames"

import type { AnchorHTMLAttributes } from "react"

type HeaderMenuProps = {
  children?: React.ReactNode
  className?: string
  position?: "left" | "right"
  landingMenu?: boolean
  correctMobile?: boolean
}

type HeaderMenuLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode
  className?: string
  href?: string
  isAnchor?: boolean
}

const HeaderMenu: React.FC<HeaderMenuProps> & {
  Link: typeof HeaderMenuLink
} = ({ children, className, position, landingMenu, correctMobile }) => {
  return (
    <nav
      className={classNames(
        "flex flex-nowrap items-center lg:ml-0 lg:px-4",
        {
          "hidden xl:flex": landingMenu,
          "lg:mr-auto": position === "left",
          "lg:ml-auto": position === "right",
          "-ml-3.5 lg:ml-0": correctMobile,
        },
        className
      )}
    >
      {children}
    </nav>
  )
}
HeaderMenu.Link = HeaderMenuLink

function HeaderMenuLink({ children, className, isAnchor, ...props }: HeaderMenuLinkProps) {
  return (
    <a
      {...props}
      className={classNames(
        "items-center whitespace-nowrap px-3 py-2 text-sm font-semibold text-gray-700 transition duration-500 hover:text-gray-600",
        "[&_svg]:mr-1.5 [&_svg]:h-[1.2em]",
        {
          "relative px-4 py-2 text-gray-700 hover:text-gray-800": isAnchor,
        },
        className
      )}
    >
      {children}
    </a>
  )
}

export default HeaderMenu
