import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type ContainerProps = PropsWithChildren<{
  className?: string
  fluid?: boolean
  larger?: boolean
}>

const Container: React.FC<ContainerProps> = ({ children, fluid, larger, className }) => {
  return (
    <div
      className={classNames(
        "mx-auto w-full px-5",
        {
          "sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg": !fluid,
          "xl:max-w-screen-xl": !fluid && larger,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container
