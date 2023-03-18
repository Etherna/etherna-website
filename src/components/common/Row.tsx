import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type RowProps = PropsWithChildren<{
  className?: string
  elRef?: React.RefObject<HTMLDivElement>
}>

const Row: React.FC<RowProps> = ({ children, className, elRef }) => {
  return (
    <div className={classNames("-mx-5 flex flex-wrap", className)} ref={elRef}>
      {children}
    </div>
  )
}

export default Row
