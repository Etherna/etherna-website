import classes from "@/styles/components/common/Prose.module.scss"

import classNames from "@/utils/classnames"

type ProseProps = {
  children?: React.ReactNode
  className?: string
}

const Prose: React.FC<ProseProps> = ({ children, className }) => {
  return <div className={classNames(classes.prosePost, className)}>{children}</div>
}

export default Prose
