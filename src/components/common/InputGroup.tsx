import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type InputGroupProps = PropsWithChildren<{
  className?: string
}>

const InputGroup: React.FC<InputGroupProps> = ({ children, className }) => {
  return <div className={classNames("mb-6 flex flex-col", className)}>{children}</div>
}

export default InputGroup
