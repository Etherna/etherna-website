import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type CardProps = PropsWithChildren<{
  className?: string
  size?: "large"
}>

const Card: React.FC<CardProps> = ({ children, className, size }) => {
  return (
    <div
      className={classNames(
        "mx-auto max-w-3xl rounded-xl bg-white p-6",
        {
          "max-w-5xl": size === "large",
        },
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
