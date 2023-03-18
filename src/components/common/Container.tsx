import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type ContainerProps = PropsWithChildren<{
  className?: string
  fluid?: boolean
}>

const Container: React.FC<ContainerProps> = ({ children, fluid, className }) => {
  return (
    <div
      className={classNames(
        "mx-auto w-full px-5",
        {
          "xl:max-w-screen-xl; w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg":
            !fluid,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container
