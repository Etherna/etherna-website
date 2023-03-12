import classes from "@/styles/components/layout/HeaderMenu.module.scss"

import classNames from "@/utils/classnames"

type HeaderMenuProps = {
  children?: React.ReactNode
  className?: string
  position?: "left" | "right"
  landingMenu?: boolean
  correctMobile?: boolean
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  children,
  className,
  position,
  landingMenu,
  correctMobile,
}) => {
  return (
    <nav
      className={classNames(classes.headerMenu, className, {
        [classes.menuLanding]: landingMenu,
        [classes.menuLeft]: position === "left",
        [classes.menuRight]: position === "right",
        [classes.correctMobile]: correctMobile,
      })}
    >
      {children}
    </nav>
  )
}

export default HeaderMenu
