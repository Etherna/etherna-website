import classes from "@styles/components/common/InputGroup.module.scss"

import classNames from "@/utils/classnames"

type InputGroupProps = {
  children?: React.ReactNode
  className?: string
}

const InputGroup: React.FC<InputGroupProps> = ({ children, className }) => {
  return <div className={classNames(classes.inputGroup, className)}>{children}</div>
}

export default InputGroup
