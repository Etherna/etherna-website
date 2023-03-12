import classes from "@/styles/components/common/Row.module.scss"

import classNames from "@/utils/classnames"

type RowProps = {
  children?: React.ReactNode
  className?: string
  elRef?: React.RefObject<HTMLDivElement>
}

const Row: React.FC<RowProps> = ({ children, className, elRef }) => {
  return (
    <div className={classNames(classes.row, className)} ref={elRef}>
      {children}
    </div>
  )
}

export default Row
